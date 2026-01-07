'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  className?: string;
  onClick?: () => void;
}

export function BackButton({ className, onClick }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-1 font-handwritten text-xl font-black text-primary hover:translate-x-[-4px] transition-transform",
        className
      )}
    >
      <div className="w-10 h-10 rounded-full border-[3px] border-foreground flex items-center justify-center bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-1 active:translate-x-1">
        <ChevronLeft className="w-6 h-6" />
      </div>
      <span className="ml-1">Back</span>
    </button>
  );
}
