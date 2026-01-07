'use client';

import { useAuth } from '@/contexts/AuthContext';
import { DecorativeBackground } from '@/components/DecorativeBackground';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DecorativeBackground />
      <div className="min-h-screen relative">
        <div className="absolute inset-0 bg-background/90" />
        <main className="w-full mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8 relative z-10">
          {children}
        </main>
      </div>
    </>
  );
}