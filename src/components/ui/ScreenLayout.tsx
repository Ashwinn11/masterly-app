import { SideNav } from '@/components/SideNav';
import Link from 'next/link';
import { 
  Star, 
  PenTool, 
  Palette, 
  Wind, 
  Eraser,
  Sparkles
} from 'lucide-react';

const DoodleBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      <Star className="absolute top-[10%] left-[5%] w-10 h-10 text-accent rotate-12" />
      <PenTool className="absolute top-[30%] right-[10%] w-12 h-12 text-info -rotate-12" />
      <Palette className="absolute bottom-[20%] right-[5%] w-16 h-16 text-secondary rotate-45" />
      <Wind className="absolute bottom-[10%] left-[10%] w-20 h-20 text-primary -rotate-12" />
      <Eraser className="absolute top-[60%] left-[20%] w-8 h-8 text-muted-foreground rotate-12" />
    </div>
  );
};

interface ScreenLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  hideSidebar?: boolean;
}

export function ScreenLayout({ 
  children, 
  title, 
  subtitle, 
  headerLeft, 
  headerRight,
  hideSidebar = false 
}: ScreenLayoutProps) {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center py-4 px-2 sm:px-4">
      <DoodleBackground />
      
      <div className="w-full max-w-[1700px] bg-background/80 backdrop-blur-sm border-[3px] border-foreground rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] flex flex-row overflow-hidden min-h-[700px] animate-fade-in relative">
        
        {/* Navigation / Binder Column */}
        {!hideSidebar ? (
          <div className="w-48 sm:w-56 flex flex-col border-r border-foreground/10 bg-muted/10 relative">
            <SideNav />
          </div>
        ) : (
          /* Small binder edge for fullscreen pages */
          <div className="w-6 border-r border-foreground/10 bg-background/30 flex flex-col justify-around py-8 items-center">
             {[...Array(6)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-card border-2 border-foreground/10 shadow-inner" />
              ))}
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col p-6 sm:p-10 relative overflow-y-auto">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              {headerLeft}
              {hideSidebar && !headerLeft && (
                 <Link href="/dashboard" className="flex items-center gap-2 group mr-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                  </Link>
              )}
              {(title || subtitle) && (
                <div>
                  {title && (
                    <h1 className="text-4xl sm:text-5xl font-black text-primary font-handwritten">
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="mt-1 text-info font-handwritten text-xl opacity-80">
                      {subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div>
              {headerRight}
            </div>
          </div>

          {(title || subtitle) && !headerLeft && (
             <div className="h-1 bg-primary/20 w-1/2 rounded-full mb-8" />
          )}
          
          <div className="flex-1 flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}