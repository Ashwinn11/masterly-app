import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getWebhookSecret } from '@/lib/lemonsqueezy';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * Verify the webhook signature
 */
function verifySignature(payload: string, signature: string, secret: string): boolean {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(payload).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(request: NextRequest) {
    try {
        const rawBody = await request.text();
        const signature = request.headers.get('x-signature');

        if (!signature) {
            return NextResponse.json(
                { error: 'Missing signature' },
                { status: 401 }
            );
        }

        // Verify webhook signature
        const secret = getWebhookSecret();
        const isValid = verifySignature(rawBody, signature, secret);

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 401 }
            );
        }

        const event = JSON.parse(rawBody);
        const eventName = event.meta?.event_name;
        const data = event.data;
        const meta = event.meta;

        console.log('--- Lemon Squeezy Webhook Received ---');
        console.log('Event:', eventName);
        console.log('Payload Data ID:', data?.id);

        // Extract user_id from either meta or data.attributes (LS structures can vary)
        const userId = meta?.custom_data?.user_id ||
            data?.attributes?.custom_data?.user_id ||
            event?.meta?.custom_data?.user_id;

        console.log('Detected User ID:', userId);

        const supabase = createAdminClient();

        // Handle different webhook events
        switch (eventName) {
            case 'order_created':
                console.log('Processing order_created...');
                await handleOrderCreated(supabase, data, userId);
                break;

            case 'subscription_created': {
                console.log('Processing subscription_created...');
                const subResult = await handleSubscriptionCreated(supabase, data, userId);
                console.log('Subscription insert result:', subResult);
                break;
            }
            // ... (rest of switch)

            case 'subscription_updated':
                await handleSubscriptionUpdated(supabase, data);
                break;

            case 'subscription_cancelled':
                await handleSubscriptionCancelled(supabase, data);
                break;

            case 'subscription_resumed':
                await handleSubscriptionResumed(supabase, data);
                break;

            case 'subscription_expired':
                await handleSubscriptionExpired(supabase, data);
                break;

            case 'subscription_paused':
                await handleSubscriptionPaused(supabase, data);
                break;

            case 'subscription_unpaused':
                await handleSubscriptionUnpaused(supabase, data);
                break;

            case 'subscription_payment_success':
                await handleSubscriptionPaymentSuccess(supabase, data);
                break;

            case 'subscription_payment_failed':
                await handleSubscriptionPaymentFailed(supabase, data);
                break;

            default:
                console.log('Unhandled event:', eventName);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        );
    }
}

async function handleOrderCreated(supabase: any, data: any, userId: string | null) {
    if (!userId) {
        console.warn('handleOrderCreated: No userId found in payload');
        return;
    }

    // Store order in database
    const { error } = await supabase.from('orders').insert({
        user_id: userId,
        order_id: data.id,
        status: data.attributes.status,
        total: data.attributes.total,
        currency: data.attributes.currency,
        created_at: data.attributes.created_at,
    });

    if (error) console.error('Error inserting order:', error);
}

async function handleSubscriptionCreated(supabase: any, data: any, userId: string | null) {
    if (!userId) {
        console.warn('handleSubscriptionCreated: No userId found in payload');
        return;
    }

    // Store subscription in database
    const { error } = await supabase.from('subscriptions').upsert({
        user_id: userId,
        subscription_id: data.id,
        status: data.attributes.status,
        variant_id: data.attributes.variant_id,
        product_id: data.attributes.product_id,
        renews_at: data.attributes.renews_at,
        ends_at: data.attributes.ends_at,
        trial_ends_at: data.attributes.trial_ends_at,
        created_at: data.attributes.created_at,
        updated_at: data.attributes.updated_at,
    }, {
        onConflict: 'subscription_id'
    });

    if (error) console.error('Error inserting subscription:', error);
}

async function handleSubscriptionUpdated(supabase: any, data: any) {
    await supabase.from('subscriptions').update({
        status: data.attributes.status,
        variant_id: data.attributes.variant_id,
        renews_at: data.attributes.renews_at,
        ends_at: data.attributes.ends_at,
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
}

async function handleSubscriptionCancelled(supabase: any, data: any) {
    await supabase.from('subscriptions').update({
        status: 'cancelled',
        ends_at: data.attributes.ends_at,
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
}

async function handleSubscriptionResumed(supabase: any, data: any) {
    await supabase.from('subscriptions').update({
        status: 'active',
        ends_at: null,
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
}

async function handleSubscriptionExpired(supabase: any, data: any) {
    await supabase.from('subscriptions').update({
        status: 'expired',
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
}

async function handleSubscriptionPaused(supabase: any, data: any) {
    await supabase.from('subscriptions').update({
        status: 'paused',
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
}

async function handleSubscriptionUnpaused(supabase: any, data: any) {
    await supabase.from('subscriptions').update({
        status: 'active',
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
}

async function handleSubscriptionPaymentSuccess(supabase: any, data: any) {
    await supabase.from('subscriptions').update({
        status: 'active',
        renews_at: data.attributes.renews_at,
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
}

async function handleSubscriptionPaymentFailed(supabase: any, data: any) {
    await supabase.from('subscriptions').update({
        status: 'past_due',
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
}
