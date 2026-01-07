/**
 * Authentication types
 */

export interface UserProfile {
  id: string;
  full_name?: string | null;
  avatar_url?: string | null;
  username?: string | null;
  updated_at?: string;
}

export interface UserStats {
  current_streak: number;
  longest_streak: number;
  total_recalls: number;
  due_count: number;
}
