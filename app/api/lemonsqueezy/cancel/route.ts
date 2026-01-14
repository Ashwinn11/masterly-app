import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cancelUserSubscription } from '@/lib/lemonsqueezy-service';

export async function POST(request: NextRequest) {
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

        // Cancel the subscription in Lemon Squeezy
        const result = await cancelUserSubscription(subscription.subscription_id);

        if (!result) {
            return NextResponse.json({ error: 'Failed to cancel subscription in Lemon Squeezy' }, { status: 500 });
        }

        // Update the status in our database
        // Important: We set ends_at to the current renews_at date so they keep access
        const { error: updateError } = await (supabase as any)
            .from('subscriptions')
            .update({
                status: 'cancelled',
                ends_at: subscription.renews_at,
                updated_at: new Date().toISOString()
            })
            .eq('id', subscription.id);

        if (updateError) {
            console.error('Error updating subscription status in DB:', updateError);
            // We don't return error here because it's already cancelled in LS
            // The webhook will eventually sync it anyway
        }

        return NextResponse.json({
            success: true,
            message: 'Subscription cancelled successfully'
        });
    } catch (error) {
        console.error('Cancellation error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
