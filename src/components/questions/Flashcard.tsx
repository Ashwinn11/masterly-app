'use client';

import { useState } from 'react';
import { FlashcardQuestion } from '@/types/question';
import { Hand } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlashcardProps {
  question: FlashcardQuestion;
  onComplete: (needsReview: boolean) => void;
}

export function Flashcard({ question, onComplete }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipTime, setFlipTime] = useState(Date.now());

  const flip = () => {
    setIsFlipped(!isFlipped);
    
    // Track time when flipped to back (showing answer)
    if (!isFlipped) {
      setFlipTime(Date.now());
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div 
        className="relative w-full max-w-2xl h-[400px] cursor-pointer perspective-1000"
        onClick={flip}
      >
        <div 
          className={cn(
            "relative w-full h-full transition-transform duration-500 transform-style-3d",
            isFlipped && "rotate-y-180"
          )}
        >
          {/* Front */}
          <div className={cn(
            "absolute w-full h-full backface-hidden",
            "bg-card border-[3px] border-foreground rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]",
            "flex flex-col items-center p-8 pt-12 pb-16 font-handwritten"
          )}>
            <div className="flex-1 w-full overflow-y-auto scrollbar-hide flex items-center justify-center">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center leading-relaxed">
                {question.question}
              </p>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-50 whitespace-nowrap">
              <Hand className="w-5 h-5" />
              <span className="text-sm">Tap to flip</span>
            </div>
          </div>

          {/* Back */}
          <div className={cn(
            "absolute w-full h-full backface-hidden rotate-y-180",
            "bg-card border-[3px] border-foreground rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]",
            "flex flex-col items-center p-8 py-12 font-handwritten"
          )}>
            <div className="flex-1 w-full overflow-y-auto scrollbar-hide flex items-center justify-center">
              <p className="text-3xl md:text-4xl lg:text-5xl font-black text-center text-primary leading-relaxed">
                {question.answer}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons outside the card, shown only when flipped */}
      <div className={cn(
        "w-full max-w-2xl px-8 flex gap-4 transition-all duration-300",
        isFlipped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete(true); // Study Again (needs review)
          }}
          className="flex-1 h-16 bg-secondary text-white rounded-2xl font-black text-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all flex items-center justify-center gap-2"
        >
          Study Again
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete(false); // Got it (no review)
          }}
          className="flex-1 h-16 bg-primary text-white rounded-2xl font-black text-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all flex items-center justify-center gap-2"
        >
          Got it!
        </button>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
