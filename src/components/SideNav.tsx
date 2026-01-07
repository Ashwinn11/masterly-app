'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useConfirmationStore } from '@/lib/utils/confirmationUtils';
import { 
  LayoutDashboard, 
  BookOpen, 
  PlusCircle, 
  User, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function SideNav() {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const { openConfirmation } = useConfirmationStore();

  const handleSignOut = () => {
    openConfirmation({
      title: 'Sign Out?',
      message: 'Are you sure you want to leave? Your progress is saved!',
      confirmText: 'Sign Out',
      onConfirm: signOut
    });
  };

  const navItems = [
    { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Library', href: '/materials', icon: BookOpen },
    { name: 'Upload', href: '/materials/upload', icon: PlusCircle },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="flex flex-col gap-4 py-8 h-full">
      {/* Logo */}
      <div className="px-6 mb-8 relative">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform text-primary">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-primary font-handwritten tracking-tight text-foreground">
            Masterly
          </span>
        </Link>
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-card border-2 border-foreground/10 shadow-inner z-30" />
      </div>

      <div className="flex flex-col gap-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 font-handwritten text-xl font-bold transition-all",
                  "border-y-[2px] border-r-[3px] border-l-[8px] rounded-r-xl",
                  isActive 
                    ? "bg-primary text-primary-foreground border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] translate-x-2" 
                    : "bg-card text-foreground/70 border-foreground/10 hover:translate-x-1 hover:text-primary"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-primary")} />
                <span>{item.name}</span>
                {isActive && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-full" />
                )}
              </Link>
              {/* Binder Hole attached to button */}
              <div className={cn(
                "absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-card border-2 border-foreground/10 shadow-inner z-30 transition-all",
                isActive && "translate-x-2 border-foreground/20"
              )} />
            </div>
          );
        })}

        {/* Sign Out Button - Positioned after Profile */}
        <div className="relative group mt-4 pt-4 border-t border-foreground/5">
          <button
            onClick={handleSignOut}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 font-handwritten text-xl font-bold transition-all",
              "border-y-[2px] border-r-[3px] border-l-[8px] rounded-r-xl bg-card text-info/60 border-foreground/5 hover:text-secondary hover:border-secondary/20 hover:translate-x-1"
            )}
          >
            <LogOut className="w-5 h-5 text-secondary/60" />
            <span>Sign Out</span>
          </button>
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-card border-2 border-foreground/10 shadow-inner z-30" />
        </div>
      </div>
    </div>
  );
}
