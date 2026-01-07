'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Image as ImageIcon, 
  Mic, 
  Plus,
  Trash2,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { getSupabaseClient } from '@/lib/supabase/client';

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
  pdf: 'text-red-500',
  image: 'text-blue-500',
  audio: 'text-purple-500',
  text: 'text-green-500',
};

export default function MaterialsPage() {
  const { user } = useAuth();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMaterials = async () => {
    if (!user?.id) return;

    setLoading(true);
    const supabase = getSupabaseClient();
    
    console.log('[Materials] Loading for user:', user.id);
    
    // Fetch all materials for the user
    const { data: materialsData, error: materialsError } = await (supabase
      .from('materials') as any)
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    console.log('[Materials] Materials query result:', { materialsData, materialsError });

    if (materialsError) {
      console.error('Error loading materials:', materialsError);
      setLoading(false);
      return;
    }

    if (materialsData && materialsData.length > 0) {
      // For each material, get its question count
      const materialsWithCounts = await Promise.all(
        materialsData.map(async (material: any) => {
          const { data: questionSets } = await supabase
            .from('questions')
            .select('question_count')
            .eq('material_id', material.id)
            .eq('user_id', user.id);

          const questionCount = questionSets?.[0]?.question_count || 0;

          return {
            id: material.id,
            title: material.title || 'Untitled',
            file_type: material.file_type || 'text',
            created_at: material.created_at,
            question_count: questionCount,
          };
        })
      );

      console.log('[Materials] Materials with counts:', materialsWithCounts);
      setMaterials(materialsWithCounts);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMaterials();
  }, [user?.id]);

  const handleDelete = async (materialId: string) => {
    if (!user?.id) return;
    
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
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">My Stacks</h1>
        <p className="text-muted-foreground text-lg">Tap a card to start recall</p>
      </div>

      {/* Upload Button */}
      <Button className="gap-2" asChild>
        <Link href="/materials/upload">
          <Plus className="w-4 h-4" />
          Upload Material
        </Link>
      </Button>

      {/* Materials Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6 h-40" />
            </Card>
          ))}
        </div>
      ) : materials.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <BookOpen className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <p className="text-lg text-muted-foreground">
            No materials yet. Upload your first one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {materials.map((material, index) => {
            const Icon = iconMap[material.file_type];
            const colorClass = colorMap[material.file_type];
            
            return (
              <div key={material.id} className="relative group">
                <Link href={`/questions?materialId=${material.id}`}>
                  <Card 
                    className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                    style={{ transform: `rotate(${(index % 3 - 1) * 0.5}deg)` }}
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                      <div className={`p-3 rounded-full bg-background ${colorClass}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold line-clamp-2">{material.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {material.question_count} q's
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(material.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
