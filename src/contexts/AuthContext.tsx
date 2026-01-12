'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { UserProfile, UserStats } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  fullName: string | null;
  stats: UserStats | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Export the context so it can be used by the useAuth hook
export { AuthContext };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to fetch user profile and stats
  const fetchUserProfile = async (userId: string) => {
    try {
      const supabase = getSupabaseClient();

      // Fetch profile and stats in parallel
      const [profileRes, statsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single<UserProfile>(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        supabase.rpc('get_user_stats', { p_user_id: userId } as any)
      ]);

      if (profileRes.error) {
        console.error('Error fetching profile:', profileRes.error);
      } else {
        setProfile(profileRes.data);
      }

      if (statsRes.error) {
        console.error('Error fetching stats:', statsRes.error);
      } else {
        setStats((statsRes.data as UserStats) || null);
      }
    } catch (error) {
      console.error('Unexpected error fetching auth data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = useCallback(async (userId?: string) => {
    const id = userId || user?.id;
    if (!id) {
      setLoading(false);
      return;
    }
    await fetchUserProfile(id);
  }, [user?.id]);

  useEffect(() => {
    const supabase = getSupabaseClient();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        // We set loading back to true if a new user is signing in
        // to ensure we get their profile before showing the UI
        setLoading(true);
        fetchUserProfile(session.user.id);
      } else {
        setProfile(null);
        setStats(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      },
    });

    if (error) {
      throw error;
    }
  };


  const signOut = async () => {
    setLoading(true);
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
    setUser(null);
    setProfile(null);
    setStats(null);
    setLoading(false);
    // Use window.location for immediate redirect to landing page
    // This bypasses Next.js routing and middleware
    window.location.href = '/';
  };

  const deleteAccount = async () => {
    setLoading(true);
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.functions.invoke('delete-account');
      if (error) throw error;

      await signOut();
    } catch (error) {
      console.error('Error deleting account:', error);
      setLoading(false);
      throw error;
    }
  };

  const fullName = profile?.full_name ||
                   user?.user_metadata?.full_name ||
                   user?.user_metadata?.name ||
                   user?.email?.split('@')[0];

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        fullName,
        stats,
        session,
        loading,
        signInWithGoogle,
        signOut,
        refreshProfile,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
