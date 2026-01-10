'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageIndicatorProps {
  current: number;
  total: number;
  className?: string;
}

export const PageIndicator = ({ current, total, className }: PageIndicatorProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative group">
        {/* The "Book" Icon Background */}
        <div className="relative bg-card border-[3px] border-foreground rounded-lg px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transform -rotate-1 transition-all group-hover:rotate-0 group-hover:scale-105">
          {/* Binder Rings */}
          <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-around py-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-4 h-2 bg-foreground rounded-full border border-background shadow-sm" />
            ))}
          </div>
          
          <div className="flex items-center gap-2 ml-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <div className="text-2xl font-black font-handwritten text-foreground flex items-center gap-1.5">
              <span>Page</span>
              <div className="relative min-w-[20px] flex justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current}
                    initial={{ y: 10, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -10, opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-primary inline-block"
                  >
                    {current}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span>of {total}</span>
            </div>
          </div>
        </div>
        
        {/* Subtle decorative "pages" underneath */}
        <div className="absolute -bottom-1 -right-1 w-full h-full bg-foreground/5 border-[3px] border-foreground rounded-lg -z-10 transform rotate-1" />
      </div>
    </div>
  );
};
