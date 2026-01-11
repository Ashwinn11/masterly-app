import { getSupabaseClient } from './supabase/client';

/**
 * Check if the user has completed onboarding by querying the database.
 */
export const hasCompletedOnboarding = async (userId: string): Promise<boolean> => {
    try {
        const supabase = getSupabaseClient() as any;
        const { data, error } = await supabase
            .from('profiles')
            .select('onboarding_completed')
            .eq('id', userId)
            .maybeSingle();

        if (error) {
            console.error('[Onboarding] Failed to fetch completion from DB:', error);
            return false;
        }

        return !!(data?.onboarding_completed);
    } catch (error) {
        console.error('[Onboarding] Unexpected error checking completion:', error);
        return false;
    }
};

/**
 * Mark onboarding as completed in the database.
 */
export const markOnboardingCompleted = async (userId: string): Promise<void> => {
    try {
        const supabase = getSupabaseClient() as any;
        const { error } = await supabase
            .from('profiles')
            .update({ onboarding_completed: true })
            .eq('id', userId);

        if (error) {
            console.error('[Onboarding] Failed to save completion to DB:', error);
        }
    } catch (error) {
        console.error('[Onboarding] Unexpected error saving completion:', error);
    }
};
