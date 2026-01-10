'use client';

import * as React from 'react';
import { Flame, CheckCircle, AlertCircle, Info, X, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Toast types for different use cases
export type ToastType = 'success' | 'error' | 'info' | 'streak' | 'completion';

export interface ToastProps {
  id: string;
  type?: ToastType;
  title: string;
  message?: string;
  duration?: number;
  position?: 'top' | 'bottom' | 'center';
}

interface ToastContextType {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function useToastContext() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
}

// Helper function to show toast with default options
export function toast(props: Omit<ToastProps, 'id'>) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('toast', { detail: props }));
  }
}

// Convenience functions for common toast types
toast.success = (title: string, message?: string) =>
  toast({ type: 'success', title, message });

toast.error = (title: string, message?: string) =>
  toast({ type: 'error', title, message });

toast.info = (title: string, message?: string) =>
  toast({ type: 'info', title, message });

toast.streak = (days: number, message?: string) =>
  toast({
    type: 'streak',
    title: `${days} Day${days > 1 ? 's' : ''} Streak!`,
    message: message || "You're on fire! Keep it up!",
    position: 'top',
    duration: 4000,
  });

toast.completion = (title?: string, message?: string) =>
  toast({
    type: 'completion',
    title: title || 'Session Complete!',
    message: message || "Great job! You've finished all questions for now.",
    position: 'center',
    duration: 4000,
  });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  React.useEffect(() => {
    const handleToast = (event: Event) => {
      const customEvent = event as CustomEvent<Omit<ToastProps, 'id'>>;
      const newToast: ToastProps = {
        ...customEvent.detail,
        id: Math.random().toString(36).substring(2, 9),
        duration: customEvent.detail.duration ?? 3000,
      };
      setToasts((prev) => [...prev, newToast]);

      // Auto-remove after duration
      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
        }, newToast.duration);
      }
    };

    window.addEventListener('toast', handleToast);
    return () => window.removeEventListener('toast', handleToast);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Group toasts by position
  const topToasts = toasts.filter((t) => !t.position || t.position === 'top');
  const centerToasts = toasts.filter((t) => t.position === 'center');
  const bottomToasts = toasts.filter((t) => t.position === 'bottom');

  return (
    <ToastContext.Provider value={{ toasts, addToast: toast, removeToast }}>
      {children}

      {/* Top toasts container */}
      <AnimatePresence mode="popLayout">
        {topToasts.length > 0 && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none max-w-md w-full px-4">
            {topToasts.map((toastItem) => (
              <ToastItem key={toastItem.id} toast={toastItem} onRemove={removeToast} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Center toasts container */}
      <AnimatePresence mode="popLayout">
        {centerToasts.length > 0 && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
            <div className="flex flex-col gap-2 max-w-md w-full">
              {centerToasts.map((toastItem) => (
                <ToastItem key={toastItem.id} toast={toastItem} onRemove={removeToast} />
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom toasts container */}
      <AnimatePresence mode="popLayout">
        {bottomToasts.length > 0 && (
          <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-[100] flex flex-col-reverse gap-2 pointer-events-none max-w-sm">
            {bottomToasts.map((toastItem) => (
              <ToastItem key={toastItem.id} toast={toastItem} onRemove={removeToast} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

interface ToastItemProps {
  toast: ToastProps;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const typeStyles: Record<ToastType, { bg: string; border: string; icon: React.ReactNode; iconBg: string; text: string; iconColor: string }> = {
    success: {
      bg: 'bg-success',
      border: 'border-success',
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      iconBg: 'bg-white/20',
      text: 'text-white',
      iconColor: 'text-white',
    },
    error: {
      bg: 'bg-destructive',
      border: 'border-destructive',
      icon: <AlertCircle className="w-6 h-6 text-white" />,
      iconBg: 'bg-white/20',
      text: 'text-white',
      iconColor: 'text-white',
    },
    info: {
      bg: 'bg-info',
      border: 'border-info',
      icon: <Info className="w-6 h-6 text-white" />,
      iconBg: 'bg-white/20',
      text: 'text-white',
      iconColor: 'text-white',
    },
    streak: {
      bg: 'bg-[#FDFBF7]',
      border: 'border-foreground',
      icon: <Flame className="w-7 h-7 text-accent" />,
      iconBg: 'bg-accent/10',
      text: 'text-foreground',
      iconColor: 'text-accent',
    },
    completion: {
      bg: 'bg-primary',
      border: 'border-foreground',
      icon: <Trophy className="w-7 h-7 text-accent" />,
      iconBg: 'bg-white/20',
      text: 'text-white',
      iconColor: 'text-accent',
    },
  };

  const style = typeStyles[toast.type || 'info'];
  const isSpecial = toast.type === 'streak' || toast.type === 'completion';
  const isCompletion = toast.type === 'completion';

  const variants = {
    initial: { opacity: 0, scale: 0.8, y: toast.position === 'center' ? 0 : -20, rotate: isSpecial ? -2 : 0 },
    animate: { opacity: 1, scale: 1, y: 0, rotate: isSpecial ? -1 : 0 },
    exit: { opacity: 0, scale: 0.8, y: toast.position === 'center' ? 0 : -20 },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(
        'pointer-events-auto relative min-w-[280px] max-w-sm mx-auto',
        'border-[3px] rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)]',
        'overflow-hidden',
        style.bg,
        style.border
      )}
    >
      {/* Close button */}
      <button
        onClick={() => onRemove(toast.id)}
        className={cn(
          'absolute top-2 right-2 p-1 rounded-lg transition-colors',
          'hover:bg-black/5'
        )}
      >
        <X className={cn(
          'w-4 h-4',
          isCompletion ? 'text-white/60' : isSpecial ? 'text-foreground/40' : 'text-white/80'
        )} />
      </button>

      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <div className={cn(
          'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center',
          style.iconBg
        )}>
          {style.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={cn(
            'font-handwritten font-bold text-base leading-tight',
            style.text
          )}>
            {toast.title}
          </p>
          {toast.message && (
            <p className={cn(
              'font-handwritten text-sm mt-1',
              style.text,
              'opacity-80'
            )}>
              {toast.message}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
