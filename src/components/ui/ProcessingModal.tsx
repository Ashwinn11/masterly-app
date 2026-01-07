'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProcessingModalProps {
  isOpen: boolean;
  message?: string;
  error?: string | null;
  onClose?: () => void;
}

export function ProcessingModal({ 
  isOpen, 
  message = "Processing...", 
  error,
  onClose 
}: ProcessingModalProps) {
  const isError = !!error;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={isError ? onClose : undefined}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={cn(
              "relative w-full max-w-sm bg-card border-[3px] rounded-[32px] p-8 flex flex-col items-center text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]",
              isError ? "border-secondary" : "border-foreground"
            )}
          >
            {/* Icon Section */}
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              {!isError ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute inset-0 text-primary opacity-20"
                  >
                    <Loader2 className="w-full h-full stroke-[3px]" />
                  </motion.div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.15, 1],
                      rotate: [-5, 5, -5]
                    }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="relative z-10 text-primary"
                  >
                    <Brain className="w-12 h-12 stroke-[2.5px] fill-primary/10" />
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.5, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-secondary"
                >
                  <AlertCircle className="w-20 h-20 stroke-[3px]" />
                </motion.div>
              )}
            </div>

            {/* Text Section */}
            <h3 className={cn(
              "font-handwritten text-3xl font-black mb-2",
              isError ? "text-secondary" : "text-primary"
            )}>
              {isError ? "Oops! Error" : message}
            </h3>
            
            <p className="font-handwritten text-lg text-info font-bold opacity-80 leading-tight mb-8 italic">
              {isError ? error : "Please wait while we work our magic ✨"}
            </p>

            {/* Progress/Action Section */}
            {!isError ? (
              <div className="w-full h-4 bg-muted/20 rounded-full border-2 border-foreground/10 overflow-hidden relative">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: ["10%", "40%", "70%", "90%"] }}
                  transition={{ duration: 15, ease: "linear" }}
                  className="h-full bg-accent"
                />
              </div>
            ) : (
              <button
                onClick={onClose}
                className="w-full h-14 bg-secondary text-white font-handwritten text-xl font-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all"
              >
                Dismiss
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
