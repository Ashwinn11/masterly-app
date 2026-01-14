import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSubscriptionDetails } from '@/lib/lemonsqueezy-service';

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();

        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const now = new Date().toISOString();
        // Get the user's active subscription from our database
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

        console.log(`[Portal] Fetching portal URL for sub_id: ${subscription.subscription_id}`);

        // Fetch the latest details from Lemon Squeezy to get the portal URL
        const lsSubscription = await getSubscriptionDetails(subscription.subscription_id);

        if (!lsSubscription) {
            return NextResponse.json({ error: 'Subscription not found in Lemon Squeezy' }, { status: 404 });
        }

        // In Test Mode, the 'customer_portal_update_subscription' URL is sometimes more reliable
        // than the generic portal URL for direct access without session issues.
        const portalUrl = lsSubscription.attributes.urls.customer_portal_update_subscription ||
            lsSubscription.attributes.urls.customer_portal;

        console.log(`[Portal] Redirecting to: ${portalUrl}`);

        return NextResponse.json({
            portalUrl,
            status: subscription.status,
            variantId: subscription.variant_id,
            renewsAt: subscription.renews_at,
            endsAt: subscription.ends_at
        });
    } catch (error: any) {
        console.error('Portal fetch error:', error);

        // Handle Lemon Squeezy "Not Found" specifically
        if (error.response?.status === 404 || error.message?.includes('Not Found')) {
            return NextResponse.json(
                { error: 'Subscription not found in Lemon Squeezy. This usually happens if the subscription was created in Test Mode but the API is running in Live Mode (or vice-versa).' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
