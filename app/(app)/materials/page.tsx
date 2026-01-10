'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import { 
  FileText, 
  Image as ImageIcon, 
  Mic, 
  Plus,
  BookOpen,
  X,
  FileQuestion
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getSupabaseClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import { useConfirmationStore } from '@/lib/utils/confirmationUtils';

interface Material {
  id: string;
  title: string;
  file_type: 'pdf' | 'image' | 'audio' | 'text';
  created_at: string;
  question_count?: number;
}

const iconMap = {
  pdf: FileText,
  image: ImageIcon,
  audio: Mic,
  text: FileText,
};

const colorMap = {
  pdf: 'text-secondary',
  image: 'text-accent-foreground',
  audio: 'text-primary',
  text: 'text-success',
};

const stickyColors = [
  'bg-[#FEF9C3]', // Soft Yellow
  'bg-[#DBEAFE]', // Soft Blue
  'bg-[#DCFCE7]', // Soft Green
  'bg-[#FFEDD5]', // Soft Orange
];

const MaterialTape = ({ type, index }: { type: string, index: number }) => {
  const tapes = [
    'bg-primary/30',
    'bg-secondary/30',
    'bg-accent/40',
    'bg-success/30'
  ];
  const tapeColor = tapes[index % tapes.length];
  
  return (
    <div 
      className={cn(
        "washi-tape w-24 h-8",
        tapeColor
      )} 
    />
  );
};

export default function MaterialsPage() {
  const { user } = useAuth();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const { openConfirmation } = useConfirmationStore();

  const loadMaterials = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    const supabase = getSupabaseClient();

    const { data: materialsData, error: materialsError } = await (supabase
      .from('materials') as any)
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (materialsError) {
      console.error('Error loading materials:', materialsError);
      setLoading(false);
      return;
    }

    if (materialsData) {
      const materialsWithCounts = await Promise.all(
        materialsData.map(async (material: any) => {
          const { data: questionSets } = await supabase
            .from('questions')
            .select('question_count')
            .eq('material_id', material.id)
            .eq('user_id', user.id);

          const questionCount = (questionSets as any)?.[0]?.question_count || 0;

          return {
            id: material.id,
            title: material.title || 'Untitled',
            file_type: material.file_type || 'text',
            created_at: material.created_at,
            question_count: questionCount,
          };
        })
      );

      setMaterials(materialsWithCounts);
    }

    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    loadMaterials();
  }, [loadMaterials]);

  const handleDelete = async (materialId: string, title: string) => {
    if (!user?.id) return;
    
    openConfirmation({
      title: 'Delete Material?',
      message: `Are you sure you want to delete "${title}"? This will remove all associated questions.`,
      confirmText: 'Delete',
      variant: 'danger',
      onConfirm: async () => {
        const supabase = getSupabaseClient();
        const { error } = await (supabase.rpc as any)('delete_material', {
          p_material_id: materialId,
          p_user_id: user.id
        });

        if (error) {
          console.error('Error deleting material:', error);
        } else {
          loadMaterials();
        }
      }
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

  return (
    <div className="min-h-screen bg-paper-texture">
      <ScreenLayout 
        title="My Study Stacks" 
        subtitle="Tap a card to start your recall session"
      >
        {/* Materials Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 border-crayon bg-white/50 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : materials.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
            <div className="p-8 border-crayon bg-white rotate-[-3deg]">
              <BookOpen className="w-24 h-24 text-primary/30" />
            </div>
            <p className="text-3xl font-handwritten text-info font-black max-w-sm">
              Your library is empty. Let's add some magic!
            </p>
            <Button size="lg" className="border-crayon h-16 px-8 text-xl font-handwritten font-black" asChild>
              <Link href="/materials/upload">
                <Plus className="mr-2 h-6 w-6" /> Upload First Material
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 pt-10">
            {materials.map((material, index) => {
              const Icon = iconMap[material.file_type];
              const colorClasses = colorMap[material.file_type];
              const rotation = getRotation(material.id);
              const stickyBg = stickyColors[index % stickyColors.length];

              return (
                <motion.div
                  key={material.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    scale: 1.05, 
                    zIndex: 50, 
                    rotate: 0,
                    transition: { type: "spring", stiffness: 400, damping: 20 }
                  }}
                  className="relative group cursor-pointer"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {/* Pushpin (Top Center) */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-secondary shadow-lg border-[2px] border-foreground/20 z-30" />
                  
                  {/* Washi Tape (Top Right) */}
                  <div className="absolute -top-4 right-4 z-20">
                     <div className={cn(
                       "washi-tape w-20 h-8 opacity-60 transform rotate-[15deg]",
                       index % 4 === 0 ? "bg-primary/40" : "",
                       index % 4 === 1 ? "bg-accent/50" : "",
                       index % 4 === 2 ? "bg-secondary/40" : "",
                       index % 4 === 3 ? "bg-success/40" : ""
                     )} />
                  </div>

                  <Link href={`/questions?materialId=${material.id}`} className="block h-full">
                    <div className={cn(
                      "relative aspect-square border-crayon p-8 flex flex-col justify-between transition-all duration-300 shadow-xl",
                      stickyBg
                    )}>
                      {/* Notebook Paper Lines Overlay */}
                      <div className="absolute inset-0 bg-notebook-paper opacity-20 pointer-events-none" />
                      
                      {/* Content Area */}
                      <div className="flex flex-col items-center text-center space-y-6 pt-4 relative z-10">
                        <div className={cn(
                          "w-16 h-16 rounded-2xl border-crayon-sm bg-white/60 flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-sm",
                          colorClasses
                        )}>
                          <Icon className="w-8 h-8" />
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="text-2xl font-black font-handwritten line-clamp-2 text-foreground leading-tight px-2">
                            {material.title}
                          </h3>
                          <div className="inline-flex items-center gap-2 text-info font-handwritten text-lg font-bold italic opacity-80">
                            <FileQuestion className="w-5 h-5" />
                            <span>{material.question_count} Cards</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer Info */}
                      <div className="pt-6 border-t border-foreground/5 relative z-10 flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                          <span className="font-handwritten text-sm font-bold text-info uppercase tracking-widest">Active</span>
                        </div>
                        <span className="font-handwritten text-sm font-bold text-info opacity-40">#{material.id.slice(0, 4)}</span>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Delete Button (Sticker Style) */}
                  <button
                    className="absolute -top-3 -right-3 p-2 bg-white border-crayon-sm text-secondary opacity-0 group-hover:opacity-100 hover:scale-110 transition-all z-40 shadow-xl active:scale-95 flex items-center justify-center group/del"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(material.id, material.title);
                    }}
                    title="Remove Stack"
                  >
                    <X className="w-5 h-5 stroke-[3px]" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </ScreenLayout>
    </div>
  );
}