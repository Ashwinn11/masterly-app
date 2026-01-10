'use client';

import { useAuth } from '@/hooks/useAuth';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import {
  Zap,
  Star,
  Play,
  Leaf
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';

export default function DashboardPage() {
  const { user, stats } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [dueCount, setDueCount] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadDueCount = async () => {
      if (user?.id) {
        const supabase = getSupabaseClient();
        const { data, error } = await (supabase.rpc as any)('get_due_question_count', {
          p_user_id: user.id
        });
        if (!error && data !== null) {
          setDueCount(data);
        }
      }
    };
    loadDueCount();
  }, [user?.id]);
  
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 
                    user?.user_metadata?.name?.split(' ')[0] || 
                    user?.email?.split('@')[0] || 
                    'there';

  return (
    <ScreenLayout title="Daily Recall">
      <div className="flex-1 flex flex-col">
        {/* Welcome Stats */}
        <div className="flex flex-wrap gap-6 mb-12">
          <div className="flex items-center gap-3 font-handwritten text-2xl">
            <Zap className="w-6 h-6 text-orange-500 fill-current" />
            <span className="font-black text-foreground">{stats?.current_streak || 0}</span>
            <span className="text-info opacity-70">Day Streak</span>
          </div>
          <div className="flex items-center gap-3 font-handwritten text-2xl">
            <Star className="w-6 h-6 text-accent fill-current" />
            <span className="font-black text-foreground">{stats?.total_recalls || 0}</span>
            <span className="text-info opacity-70">Total Recalls</span>
          </div>
        </div>

        {/* Main Play Section */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-12 pb-12">
          {/* Play Sticker Button */}
          <div className="relative group scale-110 sm:scale-125">
            <Link href="/play">
              <button 
                className={cn(
                  "w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-accent border-[3px] border-foreground border-dashed p-2",
                  "shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] transform -rotate-3 transition-all",
                  "hover:scale-105 hover:rotate-0 active:scale-95 active:shadow-none active:translate-y-1"
                )}
              >
                <div className="w-full h-full rounded-full bg-primary flex flex-col items-center justify-center text-primary-foreground space-y-1">
                  <Play className="w-16 h-16 sm:w-20 sm:h-20 fill-current ml-2" />
                  <span className="text-3xl sm:text-4xl font-black font-handwritten tracking-wider">PLAY</span>
                </div>
              </button>
            </Link>
            
            {/* Due Badge */}
            {dueCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground border-[3px] border-foreground rounded-2xl px-4 py-1 font-black font-handwritten shadow-md rotate-12 z-10">
                {dueCount}
              </div>
            )}
          </div>

          {/* Motivational Quote */}
          <div className="max-w-sm text-center space-y-4">
            <p className="font-handwritten text-2xl sm:text-3xl text-info leading-tight italic">
              "No pressure, just a quick game to keep those memories fresh."
            </p>
            <div className="flex justify-center">
              <Leaf className="w-8 h-8 text-primary opacity-40" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 flex justify-end font-handwritten text-xl text-info/60 italic">
          {mounted && new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </ScreenLayout>
  );
}