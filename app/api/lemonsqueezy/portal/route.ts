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

        // Get the user's active subscription from our database
        const { data: subscription, error: subError } = await (supabase as any)
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .in('status', ['active', 'on_trial', 'past_due', 'paused'])
            .order('created_at', { ascending: false })
            .maybeSingle();

        if (subError || !subscription) {
            return NextResponse.json({ error: 'No active subscription found' }, { status: 404 });
        }

        // Fetch the latest details from Lemon Squeezy to get the portal URL
        const lsSubscription = await getSubscriptionDetails(subscription.subscription_id);

        if (!lsSubscription) {
            return NextResponse.json({ error: 'Subscription not found in Lemon Squeezy' }, { status: 404 });
        }

        const portalUrl = lsSubscription.attributes.urls.customer_portal;

        return NextResponse.json({
            portalUrl,
            status: subscription.status,
            variantId: subscription.variant_id,
            renewsAt: subscription.renews_at,
            endsAt: subscription.ends_at
        });
    } catch (error) {
        console.error('Portal fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
