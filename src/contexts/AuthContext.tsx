'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  profile: any | null;
  fullName: string | null;
  stats: {
    current_streak: number;
    longest_streak: number;
    total_recalls: number;
    due_count: number;
  } | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [stats, setStats] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshProfile = async (userId?: string) => {
    const id = userId || user?.id;
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      const supabase = getSupabaseClient();
      
      // Fetch profile and stats in parallel
      const [profileRes, statsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', id).single(),
        (supabase.rpc as any)('get_user_stats', { p_user_id: id })
      ]);

      if (profileRes.error) {
        console.error('Error fetching profile:', profileRes.error);
      } else {
        setProfile(profileRes.data);
      }

      if (statsRes.error) {
        console.error('Error fetching stats:', statsRes.error);
      } else {
        setStats(statsRes.data);
      }
    } catch (error) {
      console.error('Unexpected error fetching auth data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const supabase = getSupabaseClient();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        refreshProfile(session.user.id);
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
        refreshProfile(session.user.id);
      } else {
        setProfile(null);
        setStats(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [user?.id]);

  const signInWithGoogle = async () => {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
