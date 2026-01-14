import { createClient } from '@/lib/supabase/server';

export interface UserSubscription {
    id: string;
    subscription_id: string;
    status: string;
    variant_id: string;
    product_id: string;
    renews_at: string | null;
    ends_at: string | null;
    trial_ends_at: string | null;
    created_at: string;
    updated_at: string;
}

/**
 * Get the current user's active subscription
 */
export async function getUserSubscription(): Promise<UserSubscription | null> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['active', 'on_trial'])
        .order('created_at', { ascending: false })
        .maybeSingle();

    if (error || !data) {
        return null;
    }

    return data as UserSubscription;
}

/**
 * Check if the current user has an active subscription
 */
export async function hasActiveSubscription(): Promise<boolean> {
    const subscription = await getUserSubscription();
    return subscription !== null;
}

/**
 * Check if the user has a specific feature based on their subscription
 */
export async function hasFeature(feature: string): Promise<boolean> {
    const subscription = await getUserSubscription();

    if (!subscription) {
        return false;
    }

    // Define feature access based on variant/product IDs
    // You'll need to customize this based on your actual product structure
    const featureMap: Record<string, string[]> = {
        'unlimited_cards': ['pro_variant_id', 'lifetime_variant_id'],
        'ai_suggestions': ['pro_variant_id', 'lifetime_variant_id'],
        'advanced_analytics': ['pro_variant_id', 'lifetime_variant_id'],
        'custom_themes': ['pro_variant_id', 'lifetime_variant_id'],
        'priority_support': ['pro_variant_id', 'lifetime_variant_id'],
    };

    const allowedVariants = featureMap[feature] || [];
    return allowedVariants.includes(subscription.variant_id);
}

/**
 * Get all orders for the current user
 */
export async function getUserOrders() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error || !data) {
        return [];
    }

    return data;
}
