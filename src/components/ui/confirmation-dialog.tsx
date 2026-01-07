'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle, X, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'default';
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200" 
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className={cn(
        "relative w-full max-w-sm bg-card border-[3px] border-foreground rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200",
        variant === 'danger' && "border-secondary"
      )}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-info hover:text-foreground transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Icon */}
        <div className={cn(
          "w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-sm transform -rotate-3",
          variant === 'danger' ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
        )}>
          {variant === 'danger' ? (
            <AlertCircle className="h-10 w-10 stroke-[3px]" />
          ) : (
            <Info className="h-10 w-10 stroke-[3px]" />
          )}
        </div>

        {/* Text */}
        <h2 className={cn(
          "font-handwritten text-3xl font-black mb-3 leading-tight",
          variant === 'danger' ? "text-secondary" : "text-primary"
        )}>
          {title}
        </h2>
        
        <p className="font-handwritten text-lg text-info font-bold opacity-80 leading-snug mb-8 italic">
          {description}
        </p>

        {/* Actions */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={handleConfirm}
            className={cn(
              "w-full h-14 text-white font-handwritten text-xl font-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all",
              variant === 'danger' ? "bg-secondary" : "bg-primary"
            )}
          >
            {confirmText}
          </button>
          
          <button
            onClick={onClose}
            className="w-full h-12 text-info font-handwritten text-lg font-bold hover:text-foreground transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}