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
                .single() as { data: { upload_count?: number } | null; error: any };

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
     * Check if user has reached the free upload limit
     * Returns true if user can upload, false if limit reached
     * For web, we don't check subscription status yet (no paywall integration)
     */
    async canUserUpload(userId: string): Promise<boolean> {
        const uploadCount = await this.getUserUploadCount(userId);
        return uploadCount < FREE_UPLOAD_LIMIT;
    }

    /**
     * Get remaining free uploads for a user
     */
    async getRemainingUploads(userId: string): Promise<number> {
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
