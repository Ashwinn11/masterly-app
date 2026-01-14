import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getWebhookSecret } from '@/lib/lemonsqueezy';
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

        let handlerResult = null;

        // Handle different webhook events
        switch (eventName) {
            case 'order_created':
                console.log('Processing order_created...');
                handlerResult = await handleOrderCreated(supabase, data, userId);
                break;

            case 'subscription_created': {
                console.log('Processing subscription_created...');
                handlerResult = await handleSubscriptionCreated(supabase, data, userId);
                break;
            }

            case 'subscription_updated':
                handlerResult = await handleSubscriptionUpdated(supabase, data);
                break;

            case 'subscription_cancelled':
                handlerResult = await handleSubscriptionCancelled(supabase, data);
                break;

            case 'subscription_resumed':
                handlerResult = await handleSubscriptionResumed(supabase, data);
                break;

            case 'subscription_expired':
                handlerResult = await handleSubscriptionExpired(supabase, data);
                break;

            case 'subscription_paused':
                handlerResult = await handleSubscriptionPaused(supabase, data);
                break;

            case 'subscription_unpaused':
                handlerResult = await handleSubscriptionUnpaused(supabase, data);
                break;

            case 'subscription_payment_success':
                handlerResult = await handleSubscriptionPaymentSuccess(supabase, data);
                break;

            case 'subscription_payment_failed':
                handlerResult = await handleSubscriptionPaymentFailed(supabase, data);
                break;

            default:
                console.log('Unhandled event:', eventName);
        }

        return NextResponse.json({
            received: true,
            version: 'V2-VALIDATED',
            eventName,
            userId,
            db_error: handlerResult
        });
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
        return { message: 'No userId found in payload' };
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

    if (error) {
        console.error('Error inserting order:', error);
        return error;
    }
    return null;
}

async function handleSubscriptionCreated(supabase: any, data: any, userId: string | null) {
    if (!userId) {
        console.warn('handleSubscriptionCreated: No userId found in payload');
        return { message: 'No userId found in payload' };
    }

    // Store subscription in database
    const { error } = await supabase.from('subscriptions').upsert({
        user_id: userId,
        subscription_id: String(data.id),
        status: data.attributes.status,
        variant_id: String(data.attributes.variant_id),
        product_id: String(data.attributes.product_id),
        renews_at: data.attributes.renews_at,
        ends_at: data.attributes.ends_at,
        trial_ends_at: data.attributes.trial_ends_at,
        created_at: data.attributes.created_at,
        updated_at: data.attributes.updated_at,
    }, {
        onConflict: 'subscription_id'
    });

    if (error) {
        console.error('Error inserting subscription:', error);
        return error;
    }
    return null;
}

async function handleSubscriptionUpdated(supabase: any, data: any) {
    const { error } = await supabase.from('subscriptions').update({
        status: data.attributes.status,
        variant_id: data.attributes.variant_id,
        renews_at: data.attributes.renews_at,
        ends_at: data.attributes.ends_at,
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
    return error;
}

async function handleSubscriptionCancelled(supabase: any, data: any) {
    const { error } = await supabase.from('subscriptions').update({
        status: 'cancelled',
        ends_at: data.attributes.ends_at,
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
    return error;
}

async function handleSubscriptionResumed(supabase: any, data: any) {
    const { error } = await supabase.from('subscriptions').update({
        status: 'active',
        ends_at: null,
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
    return error;
}

async function handleSubscriptionExpired(supabase: any, data: any) {
    const { error } = await supabase.from('subscriptions').update({
        status: 'expired',
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
    return error;
}

async function handleSubscriptionPaused(supabase: any, data: any) {
    const { error } = await supabase.from('subscriptions').update({
        status: 'paused',
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
    return error;
}

async function handleSubscriptionUnpaused(supabase: any, data: any) {
    const { error } = await supabase.from('subscriptions').update({
        status: 'active',
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
    return error;
}

async function handleSubscriptionPaymentSuccess(supabase: any, data: any) {
    const { error } = await supabase.from('subscriptions').update({
        status: 'active',
        renews_at: data.attributes.renews_at,
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
    return error;
}

async function handleSubscriptionPaymentFailed(supabase: any, data: any) {
    const { error } = await supabase.from('subscriptions').update({
        status: 'past_due',
        updated_at: data.attributes.updated_at,
    }).eq('subscription_id', data.id);
    return error;
}
