'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import { BackButton } from '@/components/ui/BackButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useConfirmationStore } from '@/lib/utils/confirmationUtils';
import { 
  User, 
  Mail, 
  Settings, 
  Smartphone,
  Sparkles,
  Zap,
  Star,
  FileText,
  Shield,
  HelpCircle,
  Trash2,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, fullName, stats, deleteAccount } = useAuth() as any;
  const { openConfirmation } = useConfirmationStore();
  
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 
                    user?.user_metadata?.name?.split(' ')[0] || 
                    'User';
                   
  const email = user?.email;
  const avatarUrl = user?.user_metadata?.avatar_url;

  const handleDeleteAccount = () => {
    openConfirmation({
      title: 'Delete Account?',
      message: 'This will permanently delete all your data and progress. This action cannot be undone.',
      onConfirm: async () => {
        try {
          await deleteAccount();
        } catch (error) {
          console.error('Failed to delete account:', error);
        }
      }
    });
  };

  return (
    <ScreenLayout title="Profile" subtitle="Your progress & settings">
      <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">
        {/* Profile Header Card */}
        <Card className="border-[3px] border-foreground rounded-[32px] bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
          <div className="h-24 bg-primary/10 border-b-[3px] border-foreground/5" />
          <CardContent className="relative pt-0 pb-8 px-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-10 mb-6">
              <Avatar className="w-24 h-24 border-[3px] border-foreground shadow-xl rounded-2xl overflow-hidden">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="bg-primary text-3xl font-black font-handwritten text-white">
                  {firstName[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left space-y-1 font-handwritten">
                <h1 className="text-4xl font-black text-primary leading-tight">{fullName || firstName}</h1>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-info text-xl opacity-70">
                  <Mail className="w-5 h-5" />
                  <span>{email}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl border-[3px] border-foreground bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transform -rotate-1">
            <div className="text-orange-500 font-black font-handwritten text-xl flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 fill-current" />
              Current Streak
            </div>
            <div className="text-5xl font-black font-handwritten">{stats?.current_streak || 0}</div>
            <p className="font-handwritten text-lg text-info opacity-60 mt-1">Days of learning!</p>
          </div>

          <div className="p-6 rounded-3xl border-[3px] border-foreground bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transform rotate-1">
            <div className="text-accent font-black font-handwritten text-xl flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 fill-current" />
              Total Recalls
            </div>
            <div className="text-5xl font-black font-handwritten">{stats?.total_recalls || 0}</div>
            <p className="font-handwritten text-lg text-info opacity-60 mt-1">Questions mastered</p>
          </div>
        </div>

        {/* Settings & Links */}
        <div className="grid gap-8 md:grid-cols-2 pt-4">
          <Card className="border-[3px] border-foreground rounded-[32px] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)]">
            <CardHeader>
              <CardTitle className="text-3xl font-black font-handwritten flex items-center gap-3">
                <Settings className="w-6 h-6 text-primary" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 font-handwritten">
              <div className="flex items-center justify-between p-5 rounded-2xl border-[2px] border-foreground/10 bg-background/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-foreground">Device Sync</h4>
                    <p className="text-lg opacity-60 italic">Manage iOS devices</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/20 text-sm font-bold">
                  Connected
                </div>
              </div>

              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center justify-between p-5 rounded-2xl border-[2px] border-secondary/20 bg-secondary/5 text-secondary hover:bg-secondary/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-secondary/10">
                    <Trash2 className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-black">Delete Account</h4>
                    <p className="text-lg opacity-70 italic">Permanently remove data</p>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>

          <Card className="border-[3px] border-foreground rounded-[32px] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)]">
            <CardHeader>
              <CardTitle className="text-3xl font-black font-handwritten flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-primary" />
                Support & Legal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 font-handwritten">
              <Link href="/terms" className="flex items-center justify-between p-5 rounded-2xl border-[2px] border-foreground/10 bg-background/50 hover:bg-muted/50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black">Terms of Service</h4>
                </div>
                <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link href="/privacy" className="flex items-center justify-between p-5 rounded-2xl border-[2px] border-foreground/10 bg-background/50 hover:bg-muted/50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-info/10 text-info">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black">Privacy Policy</h4>
                </div>
                <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <a href="mailto:support@masterly.ai" className="flex items-center justify-between p-5 rounded-2xl border-[2px] border-foreground/10 bg-background/50 hover:bg-muted/50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black">Get Support</h4>
                </div>
                <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScreenLayout>
  );
}
