'use client';

import { useAuth } from '@/hooks/useAuth';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import {
  Zap,
  Star,
  Play,
  Leaf,
  Plus,
  X
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabase/client';
import { useConfirmationStore } from '@/lib/utils/confirmationUtils';
import { Loader2 } from 'lucide-react';

function DashboardContent() {
  const { user, stats } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [dueCount, setDueCount] = useState<number>(0);
  const searchParams = useSearchParams();
  const { openConfirmation } = useConfirmationStore();

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
    
    // Refresh when window gets focus (user comes back to tab)
    window.addEventListener('focus', loadDueCount);
    return () => window.removeEventListener('focus', loadDueCount);
  }, [user?.id, searchParams]);
  
  // Handle billing success redirect
  useEffect(() => {
    if (searchParams?.get('billing_success') === 'true') {
      openConfirmation({
        title: '🎉 You are now Pro!',
        message: 'Welcome to Masterly Pro! All premium features have been unlocked for your account. Study materials are now unlimited.',
        confirmText: 'Awesome!',
        variant: 'default',
        onConfirm: () => {
          // Clean up URL
          window.history.replaceState({}, '', '/dashboard');
        }
      });
    }
  }, [searchParams, openConfirmation]);
  
  const [materials, setMaterials] = useState<any[]>([]);
  const [loadingMaterials, setLoadingMaterials] = useState(true);

  const loadMaterials = async () => {
    if (!user?.id) return;
    setLoadingMaterials(true);
    const supabase = getSupabaseClient();
    
    // Using a simple join to get counts
    const { data, error } = await supabase
      .from('materials')
      .select('*, questions(count)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMaterials(data.map(item => ({
        ...item,
        question_count: (item as any).questions?.[0]?.count || 0
      })));
    }
    setLoadingMaterials(false);
  };

  useEffect(() => {
    loadMaterials();
  }, [user?.id]);

  const handleDelete = async (materialId: string, title: string) => {
    if (!user?.id) return;

    openConfirmation({
      title: "Delete Stack?",
      message: `Are you sure you want to delete "${title}"? This will remove all associated recall cards.`,
      confirmText: "Delete",
      variant: "danger",
      onConfirm: async () => {
        const supabase = getSupabaseClient();
        const { error } = await (supabase.rpc as any)("delete_material", {
          p_material_id: materialId,
          p_user_id: user.id,
        });

        if (error) {
          console.error("Error deleting material:", error);
        } else {
          loadMaterials();
        }
      },
    });
  };

  const getRotation = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const rotations = [-1.5, -0.8, 0.8, 1.5, 2, -2];
    return rotations[Math.abs(hash) % rotations.length];
  };

  const stickyColors = [
    "bg-[#FEF9C3]", // Soft Yellow
    "bg-[#DBEAFE]", // Soft Blue
    "bg-[#DCFCE7]", // Soft Green
    "bg-[#FFEDD5]", // Soft Orange
  ];

  return (
    <ScreenLayout title="Study Hub">
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4">
        {/* Welcome Stats */}
        <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 mb-10">
          <div className="flex items-center gap-3 font-handwritten text-xl sm:text-2xl px-6 py-2 rounded-full border-2 border-foreground bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
            <Zap className="w-6 h-6 text-orange-500 fill-current" />
            <span className="font-black text-foreground">{stats?.current_streak || 0}</span>
            <span className="text-info opacity-70">Day Streak</span>
          </div>
          <div className="flex items-center gap-3 font-handwritten text-xl sm:text-2xl px-6 py-2 rounded-full border-2 border-foreground bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
            <Star className="w-6 h-6 text-accent fill-current" />
            <span className="font-black text-foreground">{stats?.total_recalls || 0}</span>
            <span className="text-info opacity-70">Total Recalls</span>
          </div>
        </div>

        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-black font-handwritten text-primary border-b-[4px] border-primary/20 pb-1">
              My Study Stacks
            </h2>
            <Link href="/materials/upload">
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-2xl border-[3px] border-foreground bg-primary text-primary-foreground font-handwritten font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all">
                <Plus className="w-6 h-6" />
                <span>New Stack</span>
              </button>
            </Link>
          </div>

          {loadingMaterials ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-square rounded-3xl border-crayon bg-muted/30 animate-pulse" />
              ))}
            </div>
          ) : materials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16 pt-4">
              {materials.map((material, index) => (
                <div key={material.id} className="relative group">
                  <Link 
                      href={`/play?materialId=${material.id}`}
                      className={cn(
                      "block p-8 aspect-square border-crayon shadow-xl transition-all duration-300 hover:scale-[1.03] hover:z-20 active:scale-95 relative overflow-hidden",
                      stickyColors[index % stickyColors.length],
                      )}
                      style={{ transform: `rotate(${getRotation(material.id)}deg)` }}
                  >
                      <div className="absolute inset-0 bg-notebook-paper opacity-10" />
                      
                      {/* Pushpin */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-secondary border-2 border-foreground/20 z-20 shadow-md" />
                      
                      <div className="h-full flex flex-col justify-between relative z-10">
                          <div className="space-y-4 pt-6">
                              <h3 className="text-2xl sm:text-3xl font-black font-handwritten line-clamp-3 leading-tight text-foreground">
                                  {material.title}
                              </h3>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-info font-handwritten text-xl font-bold italic opacity-70">
                                <Leaf className="w-5 h-5 opacity-40" />
                                <span>{material.question_count} cards</span>
                            </div>
                            
                            {/* Material specific due indicator could go here */}
                          </div>
                      </div>
                  </Link>

                  {/* Delete Button */}
                  <button
                      className="absolute -top-3 -right-3 p-2 bg-white border-crayon-sm text-secondary opacity-0 group-hover:opacity-100 hover:scale-110 transition-all z-30 shadow-xl active:scale-95 flex items-center justify-center"
                      onClick={(e) => {
                          e.preventDefault();
                          handleDelete(material.id, material.title);
                      }}
                      style={{ transform: `rotate(${index % 2 === 0 ? 10 : -10}deg)` }}
                      title="Delete Stack"
                  >
                      <X className="w-5 h-5 stroke-[3px]" />
                  </button>
                </div>
              ))}
            </div>
            ) : (
              <div className="py-20 text-center border-crayon border-dashed rounded-3xl bg-muted/20">
                <p className="font-handwritten text-2xl text-info/50">No materials yet.</p>
                <Link href="/materials/upload" className="text-primary font-bold hover:underline">Upload something to start →</Link>
              </div>
            )}
        </div>

        {/* Footer */}
        <div className="mt-16 pb-8 flex justify-end font-handwritten text-xl text-info/40 italic">
          {mounted && new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </ScreenLayout>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-24"><Loader2 className="w-12 h-12 animate-spin text-primary" /></div>}>
      <DashboardContent />
    </Suspense>
  );
}