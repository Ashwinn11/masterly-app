import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { updateUserSubscription, getSubscriptionDetails } from '@/lib/lemonsqueezy-service';

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get the new variant ID from request body
        const { variantId } = await request.json();

        if (!variantId) {
            return NextResponse.json({ error: 'Variant ID is required' }, { status: 400 });
        }

        // Get the user's active subscription from our database
        const now = new Date().toISOString();
        const { data: subscription, error: subError } = await (supabase as any)
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .or(`status.in.(active,on_trial,past_due,paused),and(status.eq.cancelled,ends_at.gt.${now})`)
            .order('created_at', { ascending: false })
            .maybeSingle();

        if (subError || !subscription) {
            return NextResponse.json({ error: 'No active subscription found' }, { status: 404 });
        }

        // Check if they're trying to "upgrade" to their current plan
        if (subscription.variant_id === variantId) {
            return NextResponse.json({ error: 'You are already on this plan' }, { status: 400 });
        }

        console.log(`[Update Plan] Changing subscription ${subscription.subscription_id} from variant ${subscription.variant_id} to ${variantId}`);

        // Determine if this is an upgrade or downgrade based on price
        // For upgrades, we want to invoice immediately
        // For downgrades, let it happen at next renewal
        const isUpgrade = true; // We'll invoice immediately for all changes to ensure proper proration

        // Update the subscription in Lemon Squeezy with invoice_immediately
        const result = await updateUserSubscription(subscription.subscription_id, variantId, isUpgrade);

        if (!result) {
            return NextResponse.json({ error: 'Failed to update subscription in Lemon Squeezy' }, { status: 500 });
        }

        // Fetch fresh subscription details to get updated info
        const freshSubscription = await getSubscriptionDetails(subscription.subscription_id);

        // Update the subscription in our database
        const { error: updateError } = await (supabase as any)
            .from('subscriptions')
            .update({
                variant_id: variantId,
                status: freshSubscription?.attributes?.status || 'active',
                renews_at: freshSubscription?.attributes?.renews_at || null,
                updated_at: new Date().toISOString()
            })
            .eq('id', subscription.id);

        if (updateError) {
            console.error('Error updating subscription in DB:', updateError);
        }

        console.log(`[Update Plan] Successfully updated to variant ${variantId}`);

        return NextResponse.json({
            success: true,
            message: 'Subscription updated successfully',
            subscription: freshSubscription
        });
    } catch (error) {
        console.error('Update subscription error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
