'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Settings, 
  Shield, 
  LogOut, 
  Smartphone,
  Sparkles
} from 'lucide-react';

export default function ProfilePage() {
  const { user, profile, stats, signOut } = useAuth();
  
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 
                    user?.user_metadata?.name?.split(' ')[0] || 
                    'User';
  
  const fullName = profile?.full_name || 
                   user?.user_metadata?.full_name || 
                   user?.user_metadata?.name || 
                   user?.email?.split('@')[0];
                   
  const email = user?.email;
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Profile Header Card */}
      <Card className="border-primary/20 bg-card/50 backdrop-blur overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/30 to-secondary/30" />
        <CardContent className="relative pt-0 pb-8 px-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-12 mb-6">
            <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-white">
                {firstName[0]}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center sm:text-left space-y-1">
              <h1 className="text-3xl font-bold">{fullName}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </div>
            </div>
            
            {stats && stats.current_streak > 0 && (
              <Badge variant="secondary" className="px-4 py-1 text-sm gap-1 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20">
                <Sparkles className="w-3 h-3 fill-current" />
                {stats.current_streak} Day Streak
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-orange-500/5 to-primary/5 border-primary/10">
              <CardHeader className="pb-2">
                <CardDescription className="text-orange-500 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-current" />
                  Current Streak
                </CardDescription>
                <CardTitle className="text-4xl font-bold">{stats?.current_streak || 0}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Days of learning in a row!</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/5 to-secondary/5 border-secondary/10">
              <CardHeader className="pb-2">
                <CardDescription className="text-blue-500 font-medium flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Total Recalls
                </CardDescription>
                <CardTitle className="text-4xl font-bold">{stats?.total_recalls || 0}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Questions mastered so far</p>
              </CardContent>
            </Card>
          </div>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Account Settings
              </CardTitle>
              <CardDescription>
                Manage your account preferences and sync settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border bg-background/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Personal Information</h4>
                    <p className="text-xs text-muted-foreground">Update your name and profile details</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border bg-background/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Device Sync</h4>
                    <p className="text-xs text-muted-foreground">Manage your connected iOS devices</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/5">
                  Connected
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="text-lg">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/5"
                onClick={signOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Need to delete your account? <br/>
                Please use the Masterly iOS app.
              </p>
            </CardContent>
          </Card>
          
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-bold">Masterly Web v2.0</h4>
            <p className="text-xs text-muted-foreground">
              We&apos;re currently revamping the web experience to match our premium iOS app. 
              Stay tuned for more updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
