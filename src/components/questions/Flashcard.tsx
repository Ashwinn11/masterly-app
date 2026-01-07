'use client';

import { useState } from 'react';
import { FlashcardQuestion } from '@/types/question';
import { Star, Hand } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlashcardProps {
  question: FlashcardQuestion;
  onComplete: (needsReview: boolean) => void;
}

export function Flashcard({ question, onComplete }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [flipTime, setFlipTime] = useState(Date.now());

  const flip = () => {
    setIsFlipped(!isFlipped);
    
    // Track time when flipped to back (showing answer)
    if (!isFlipped) {
      setFlipTime(Date.now());
    }
  };

  const handleStar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const starred = !isStarred;
    setIsStarred(starred);

    // When starred, mark for review in FSRS
    if (starred) {
      const responseTime = Date.now() - flipTime;
      onComplete(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px]">
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
            "bg-card border-2 border-foreground rounded-3xl shadow-lg",
            "flex flex-col items-center justify-center p-8"
          )}>
            <p className="text-3xl md:text-4xl font-bold text-center leading-relaxed">
              {question.question}
            </p>
            <div className="absolute bottom-8 flex items-center gap-2 opacity-50">
              <Hand className="w-5 h-5" />
              <span className="text-sm">Tap to flip</span>
            </div>
          </div>

          {/* Back */}
          <div className={cn(
            "absolute w-full h-full backface-hidden rotate-y-180",
            "bg-card border-2 border-foreground rounded-3xl shadow-lg",
            "flex flex-col items-center justify-center p-8"
          )}>
            <p className="text-4xl md:text-5xl font-bold text-center text-primary leading-relaxed">
              {question.answer}
            </p>
            <button
              onClick={handleStar}
              className="absolute bottom-8 flex items-center gap-2 hover:scale-110 transition-transform"
            >
              <Star 
                className={cn(
                  "w-8 h-8",
                  isStarred ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                )} 
              />
              <span className="text-sm text-muted-foreground">Mark for review</span>
            </button>
          </div>
        </div>
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
