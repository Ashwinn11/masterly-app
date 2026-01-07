'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  BookOpen, 
  Upload,
  Zap,
  Star,
  ArrowRight,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, stats } = useAuth();
  
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 
                    user?.user_metadata?.name?.split(' ')[0] || 
                    user?.email?.split('@')[0] || 
                    'there';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome & Stats Summary Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/10 to-background border border-primary/20 p-8 sm:p-12">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-50%] right-[-20%] w-[60%] h-[200%] bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-50%] left-[-10%] w-[40%] h-[150%] bg-secondary/10 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-primary/20 backdrop-blur">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">Welcome Back</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Hey, <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{firstName}</span>! 👋
            </h1>
            
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur border border-white/20 flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500 fill-current" />
                <span className="font-bold text-lg">{stats?.current_streak || 0}</span>
                <span className="text-sm text-muted-foreground font-medium">Day Streak</span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur border border-white/20 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-bold text-lg">{stats?.total_recalls || 0}</span>
                <span className="text-sm text-muted-foreground font-medium">Total Recalls</span>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Recall Card */}
        <Card className="border-primary/30 shadow-lg shadow-primary/5 bg-gradient-to-br from-primary/5 to-background flex flex-col justify-center text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-1">Daily Recall</h3>
          <p className="text-muted-foreground mb-6">
            {stats?.due_count || 0} questions due
          </p>
          <Button className="w-full gap-2 bg-primary hover:bg-primary/90 shadow-md" asChild>
            <Link href="/materials">
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Materials Library */}
        <Link href="/materials">
          <Card className="border-primary/30 hover:shadow-lg transition-all cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary mb-2">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Library</span>
              </div>
              <CardTitle className="text-xl">My Materials</CardTitle>
              <CardDescription>
                View and practice your uploaded study materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full gap-2" variant="outline">
                Open Library
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        {/* Upload New Material */}
        <Link href="/materials/upload">
          <Card className="border-secondary/30 hover:shadow-lg transition-all cursor-pointer h-full bg-gradient-to-br from-secondary/5 to-background">
            <CardHeader>
              <div className="flex items-center gap-2 text-secondary mb-2">
                <Upload className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Upload</span>
              </div>
              <CardTitle className="text-xl">Add Material</CardTitle>
              <CardDescription>
                Upload PDFs, images, audio, or paste text to create flashcards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full gap-2 bg-secondary hover:bg-secondary/90">
                Upload Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Sync Status */}
      <div className="flex flex-col items-center justify-center pt-4">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-green-500/10 border border-green-500/20">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-tighter">
            Synced with iOS App
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Your data is synchronized across all devices</p>
      </div>
    </div>
  );
}
