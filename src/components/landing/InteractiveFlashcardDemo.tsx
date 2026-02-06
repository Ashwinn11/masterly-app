'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RefreshCcw, Check, X, ThumbsUp, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample data for the demo
const DEMO_CARDS = [
  {
    question: "What is Spaced Repetition?",
    answer: "A learning technique where reviews are spaced at increasing intervals to exploit the psychological spacing effect.",
    color: "bg-[#FEF9C3]" // Yellow
  },
  {
    question: "What is the capital of France?",
    answer: "Paris",
    color: "bg-[#DBEAFE]" // Blue
  },
  {
    question: "Define 'Metacognition'",
    answer: "Thinking about thinking. Awareness and understanding of one's own thought processes.",
    color: "bg-[#DCFCE7]" // Green
  },
  {
    question: "What is Active Recall?",
    answer: "The principle that active stimulation of memory during the learning process improves memory retention.",
    color: "bg-[#FFEDD5]" // Orange
  }
];

export const InteractiveFlashcardDemo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0); // For slide animation

  const currentCard = DEMO_CARDS[currentIndex % DEMO_CARDS.length];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setDirection(1);
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % DEMO_CARDS.length);
        setDirection(0);
    }, 200); // Wait for exit animation
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 perspective-1000">
      <div className="relative aspect-[3/2] w-full group cursor-pointer" onClick={handleFlip}>
        {/* Card Container */}
        <motion.div
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            className="w-full h-full relative preserve-3d"
        >
            {/* Front of Card */}
            <div className={cn(
                "absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 text-center",
                "bg-white border-2 border-primary/10 rounded-3xl shadow-xl",
                "after:absolute after:inset-0 after:bg-paper-texture after:opacity-50 after:rounded-3xl",
                currentCard.color // Use dynamic color for subtle variety
            )}>
                 <div className="washi-tape bg-primary/20 w-32 h-8 top-[-10px] left-[50%] -translate-x-1/2 rotate-[-2deg]" />
                
                <h3 className="text-xl font-handwritten font-bold text-info/60 mb-4 uppercase tracking-wider">Question</h3>
                <p className="text-3xl md:text-4xl font-black text-foreground font-handwritten leading-tight">
                    {currentCard.question}
                </p>
                <div className="absolute bottom-6 right-6 text-info/40 text-sm font-handwritten">
                    Tap to flip ↻
                </div>
            </div>

            {/* Back of Card */}
            <div className={cn(
                "absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 text-center rotate-y-180",
                "bg-white border-2 border-secondary/20 rounded-3xl shadow-xl",
                "after:absolute after:inset-0 after:bg-paper-texture after:opacity-50 after:rounded-3xl"
            )}>
                <div className="washi-tape bg-secondary/20 w-32 h-8 bottom-[-10px] left-[50%] -translate-x-1/2 rotate-[2deg]" />

                <h3 className="text-xl font-handwritten font-bold text-secondary mb-4 uppercase tracking-wider">Answer</h3>
                <p className="text-2xl md:text-3xl font-bold text-foreground font-handwritten leading-relaxed">
                    {currentCard.answer}
                </p>
            </div>
        </motion.div>
      </div>

      {/* Controls - Only show when flipped or always show for demo? 
          Better to show them always but disable if not flipped to teach UI 
      */}
      <div className="mt-8 flex justify-center gap-4">
          <AnimatePresence mode='wait'>
            {isFlipped ? (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex gap-4 w-full justify-center"
                >
                    <Button variant="outline" onClick={handleNext} className="border-red-200 hover:bg-red-50 hover:text-red-600 flex-1 h-14 rounded-2xl font-handwritten font-bold text-lg">
                        <X className="mr-2 h-5 w-5" /> Forgot
                    </Button>
                    <Button variant="outline" onClick={handleNext} className="border-yellow-200 hover:bg-yellow-50 hover:text-yellow-600 flex-1 h-14 rounded-2xl font-handwritten font-bold text-lg">
                        <Brain className="mr-2 h-5 w-5" /> Hard
                    </Button>
                    <Button variant="outline" onClick={handleNext} className="border-green-200 hover:bg-green-50 hover:text-green-600 flex-1 h-14 rounded-2xl font-handwritten font-bold text-lg">
                         <ThumbsUp className="mr-2 h-5 w-5" /> Easy
                    </Button>
                </motion.div>
            ) : (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-info/60 font-handwritten text-xl italic"
                >
                    Thinking... (Click card to reveal)
                </motion.p>
            )}
          </AnimatePresence>
      </div>

      {/* CSS for 3D Flip */}
      <style jsx global>{`
        .perspective-1000 {
            perspective: 1000px;
        }
        .preserve-3d {
            transform-style: preserve-3d;
        }
        .backface-hidden {
            backface-visibility: hidden;
        }
        .rotate-y-180 {
            transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
