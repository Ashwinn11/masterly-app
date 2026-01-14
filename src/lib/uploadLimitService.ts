import { getSupabaseClient } from './supabase/client';

const FREE_UPLOAD_LIMIT = 3;

class UploadLimitService {
    /**
     * Get the current upload count for a user from profiles table
     */
    async getUserUploadCount(userId: string): Promise<number> {
        try {
            const supabase = getSupabaseClient();
            const { data, error } = await supabase
                .from('profiles')
                .select('upload_count')
                .eq('id', userId)
                .maybeSingle() as { data: { upload_count?: number } | null; error: any };

            if (error) {
                console.error('[UploadLimit] Error fetching upload count:', error);
                return 0;
            }

            return data?.upload_count || 0;
        } catch (error) {
            console.error('[UploadLimit] Error in getUserUploadCount:', error);
            return 0;
        }
    }

    /**
     * Increment the upload count for a user in profiles table
     */
    async incrementUploadCount(userId: string): Promise<boolean> {
        try {
            // If user is Pro, don't increment the free count
            const isPro = await this.hasActiveSubscription(userId);
            if (isPro) return true;

            const supabase = getSupabaseClient();
            // First, get the current count
            const currentCount = await this.getUserUploadCount(userId);

            const { error } = await (supabase as any)
                .from('profiles')
                .update({
                    upload_count: currentCount + 1,
                })
                .eq('id', userId);

            if (error) {
                console.error('[UploadLimit] Error incrementing upload count:', error);
                return false;
            }

            console.log(`[UploadLimit] Upload count incremented for user ${userId}: ${currentCount + 1}`);
            return true;
        } catch (error) {
            console.error('[UploadLimit] Error in incrementUploadCount:', error);
            return false;
        }
    }

    /**
     * Check if user has an active subscription
     */
    async hasActiveSubscription(userId: string): Promise<boolean> {
        try {
            const supabase = getSupabaseClient();
            const { data, error } = await supabase
                .from('subscriptions')
                .select('status, ends_at')
                .eq('user_id', userId)
                .or('status.in.(active,on_trial,past_due,paused),and(status.eq.cancelled,ends_at.gt.now())')
                .maybeSingle();

            if (error) {
                console.error('[UploadLimit] Error checking subscription:', error);
                return false;
            }

            return !!data;
        } catch (error) {
            console.error('[UploadLimit] Error in hasActiveSubscription:', error);
            return false;
        }
    }

    /**
     * Check if user has reached the free upload limit
     * Returns true if user can upload, false if limit reached
     */
    async canUserUpload(userId: string): Promise<boolean> {
        // If user is Pro, they can always upload
        const isPro = await this.hasActiveSubscription(userId);
        if (isPro) return true;

        const uploadCount = await this.getUserUploadCount(userId);
        return uploadCount < FREE_UPLOAD_LIMIT;
    }

    /**
     * Get remaining free uploads for a user
     */
    async getRemainingUploads(userId: string): Promise<number> {
        // If user is Pro, return a high number to represent unlimited
        const isPro = await this.hasActiveSubscription(userId);
        if (isPro) return 999;

        const uploadCount = await this.getUserUploadCount(userId);
        const remaining = Math.max(0, FREE_UPLOAD_LIMIT - uploadCount);
        return remaining;
    }

    /**
     * Reset upload count for a user (admin function or for testing)
     */
    async resetUploadCount(userId: string): Promise<boolean> {
        try {
            const supabase = getSupabaseClient();
            const { error } = await (supabase as any)
                .from('profiles')
                .update({
                    upload_count: 0,
                })
                .eq('id', userId);

            if (error) {
                console.error('[UploadLimit] Error resetting upload count:', error);
                return false;
            }

            console.log(`[UploadLimit] Upload count reset for user ${userId}`);
            return true;
        } catch (error) {
            console.error('[UploadLimit] Error in resetUploadCount:', error);
            return false;
        }
    }

    /**
     * Get the free upload limit constant
     */
    getFreeUploadLimit(): number {
        return FREE_UPLOAD_LIMIT;
    }
}

// Export singleton instance
export const uploadLimitService = new UploadLimitService();
