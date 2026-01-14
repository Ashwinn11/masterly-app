import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { resumeUserSubscription } from '@/lib/lemonsqueezy-service';

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get the user's cancelled but still valid subscription from our database
        const now = new Date().toISOString();
        const { data: subscription, error: subError } = await (supabase as any)
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', 'cancelled')
            .gt('ends_at', now)
            .order('created_at', { ascending: false })
            .maybeSingle();

        if (subError || !subscription) {
            return NextResponse.json({ error: 'No resumable subscription found' }, { status: 404 });
        }

        // Resume the subscription in Lemon Squeezy
        const result = await resumeUserSubscription(subscription.subscription_id);

        if (!result) {
            return NextResponse.json({ error: 'Failed to resume subscription in Lemon Squeezy' }, { status: 500 });
        }

        // Fetch the fresh subscription details to get the updated renews_at date
        const { getSubscriptionDetails } = await import('@/lib/lemonsqueezy-service');
        const freshSubscription = await getSubscriptionDetails(subscription.subscription_id);

        // Update the status in our database with fresh data from LS
        const { error: updateError } = await (supabase as any)
            .from('subscriptions')
            .update({
                status: freshSubscription?.attributes?.status || 'active',
                renews_at: freshSubscription?.attributes?.renews_at || null,
                ends_at: null, // Clear ends_at as it's active again
                updated_at: new Date().toISOString()
            })
            .eq('id', subscription.id);

        if (updateError) {
            console.error('Error updating subscription status in DB:', updateError);
        }

        return NextResponse.json({
            success: true,
            message: 'Subscription resumed successfully'
        });
    } catch (error) {
        console.error('Resumption error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
