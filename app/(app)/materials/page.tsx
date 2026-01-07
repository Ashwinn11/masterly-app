'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import { 
  FileText, 
  Image as ImageIcon, 
  Mic, 
  Plus,
  BookOpen,
  X
} from 'lucide-react';
import Link from 'next/link';
import { getSupabaseClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import { useConfirmationStore } from '@/lib/utils/confirmationUtils';
import { toast } from 'sonner';

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
  pdf: '#A44231', // Red
  image: '#2196F3', // Blue
  audio: '#9C27B0', // Purple
  text: '#2D4F1E', // Green
};

const Tape = ({ index }: { index: number }) => {
  const rotation = index % 2 === 0 ? 'rotate-[2deg]' : 'rotate-[-1.5deg]';
  return (
    <div 
      className={cn(
        "absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-4 bg-foreground/20 rounded-sm z-20 backdrop-blur-[2px]",
        rotation
      )} 
    />
  );
};

export default function MaterialsPage() {
  const { user } = useAuth();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const { openConfirmation } = useConfirmationStore();

  const loadMaterials = async () => {
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
  };

  useEffect(() => {
    loadMaterials();
  }, [user?.id]);

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
          toast.error('Failed to delete material');
        } else {
          toast.success('Material deleted');
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
    const rotations = [-1, -0.5, 0.5, 1, 1.5, -1.5];
    return rotations[Math.abs(hash) % rotations.length];
  };

  return (
    <ScreenLayout title="My Stacks" subtitle="Tap a card to start recall">
      {/* Materials Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pt-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : materials.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <BookOpen className="w-20 h-20 text-muted-foreground/30 mb-4" />
          <p className="text-2xl font-handwritten text-info/50 max-w-xs">
            No materials yet. Upload your first one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pt-6">
          {materials.map((material, index) => {
            const Icon = iconMap[material.file_type];
            const color = colorMap[material.file_type];
            const rotation = getRotation(material.id);
            
            return (
              <div 
                key={material.id} 
                className="relative group"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <Link href={`/questions?materialId=${material.id}`}>
                  <Card className="relative overflow-visible hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 cursor-pointer border-[3px] border-foreground rounded-2xl h-full min-h-[160px] flex items-center justify-center bg-card">
                    <Tape index={index} />
                    
                    <CardContent className="p-8 flex flex-col items-center text-center space-y-4 w-full">
                      <div 
                        className="p-4 rounded-full"
                        style={{ backgroundColor: color + '15' }}
                      >
                        <Icon className="w-8 h-8" style={{ color }} />
                      </div>
                      
                      <div className="space-y-1 w-full">
                        <h3 className="text-xl font-black font-handwritten line-clamp-2 text-foreground leading-tight">
                          {material.title}
                        </h3>
                        <p className="text-info font-handwritten text-lg font-bold">
                          {material.question_count} q's
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                
                <button
                  className="absolute top-2 right-2 p-1 bg-card border-2 border-foreground rounded-full opacity-0 group-hover:opacity-60 hover:opacity-100 transition-all z-10 shadow-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(material.id, material.title);
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </ScreenLayout>
  );
}