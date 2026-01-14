'use client';

import { Paywall } from '@/components/Paywall';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  remainingUploads: number;
}

export function UploadLimitModal({ isOpen, onClose }: UploadLimitModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 md:p-8">
      {/* Overlay with blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Paywall Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 w-full max-w-6xl my-auto"
      >
        <div className="bg-card border-4 border-foreground rounded-[2.5rem] shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
          <Paywall 
            onClose={onClose}
            showCloseButton={true}
            title="Upload Limit Reached"
            subtitle="Study materials should be unlimited. Go Premium to keep going."
          />
        </div>
      </motion.div>
    </div>
  );
}

