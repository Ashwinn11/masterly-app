'use client';

import { useState, useEffect } from 'react';
import { OrderSequenceQuestion } from '@/types/question';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, X, Eye, RotateCcw } from 'lucide-react';

interface OrderSequenceProps {
  question: OrderSequenceQuestion;
  onComplete: (isCorrect: boolean) => void;
}

export function OrderSequence({ question, onComplete }: OrderSequenceProps) {
  const [items, setItems] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showCorrectOrderModal, setShowCorrectOrderModal] = useState(false);

  useEffect(() => {
    // Shuffle items
    setItems([...question.items].sort(() => Math.random() - 0.5));
  }, [question]);

  const handlePress = (item: string) => {
    if (showFeedback) return;
    if (selectedOrder.includes(item)) {
      setSelectedOrder(selectedOrder.filter(i => i !== item));
      return;
    }

    const newOrder = [...selectedOrder, item];
    setSelectedOrder(newOrder);

    if (newOrder.length === question.items.length) {
      // Check if correct
      const correct = newOrder.every((val, index) => val === question.correctOrder[index]);
      setIsCorrect(correct);
      setShowFeedback(true);

      // If correct, auto-advance after showing feedback
      if (correct) {
        setTimeout(() => {
          onComplete(true);
        }, 800);
      }
    }
  };

  const handleShowAnswer = () => {
    setShowCorrectOrderModal(true);
  };

  const handleModalClose = () => {
    setShowCorrectOrderModal(false);
    // After modal closes, auto-advance
    setTimeout(() => {
      onComplete(false);
    }, 500);
  };

  const handleTryAgain = () => {
    setSelectedOrder([]);
    setShowFeedback(false);
    setIsCorrect(null);
  };

  // Check if this specific position in the sequence is correct
  const isPositionCorrect = (item: string): boolean => {
    const selectedIndex = selectedOrder.indexOf(item);
    if (selectedIndex === -1) return false;
    return item === question.correctOrder[selectedIndex];
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex flex-wrap gap-3 justify-center">
        {items.map((item, index) => {
          const selectedIndex = selectedOrder.indexOf(item);
          const isSelected = selectedIndex !== -1;
          const positionCorrect = isPositionCorrect(item);

          return (
            <button
              key={index}
              onClick={() => handlePress(item)}
              disabled={showFeedback}
              className={cn(
                "min-w-[90px] px-4 py-3 rounded-2xl border-[3px] border-foreground",
                "flex items-center justify-center gap-2 transition-all font-handwritten",
                "bg-card text-foreground font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]",
                isSelected && !showFeedback && "border-primary border-solid bg-primary/10 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] -translate-y-1",
                showFeedback && isSelected && positionCorrect && "bg-primary border-primary border-solid text-primary-foreground",
                showFeedback && isSelected && !positionCorrect && "bg-red-500 border-red-500 border-solid text-white shadow-none",
                !isSelected && !showFeedback && "hover:bg-muted hover:-translate-y-0.5"
              )}
            >
              {isSelected && (
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                  !showFeedback && "bg-primary text-primary-foreground",
                  showFeedback && "bg-white text-foreground"
                )}>
                  {selectedIndex + 1}
                </div>
              )}
              <span className="leading-tight">{item}</span>
              {showFeedback && isSelected && (
                positionCorrect ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <X className="w-5 h-5" />
                )
              )}
            </button>
          );
        })}
      </div>

      {selectedOrder.length > 0 && !showFeedback && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedOrder([])}
          className="text-red-500 underline"
        >
          Reset
        </Button>
      )}

      {showFeedback && !isCorrect && (
        <div className="flex gap-3 mt-2">
          <Button
            variant="outline"
            onClick={handleShowAnswer}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            Show Answer
          </Button>

          <Button
            variant="outline"
            onClick={handleTryAgain}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      )}

      {/* Correct Order Modal */}
      {showCorrectOrderModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleModalClose}
        >
          <div 
            className="bg-card rounded-2xl p-6 max-w-md w-full border-2 border-primary"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-primary">Correct Order</h3>
              <button onClick={handleModalClose}>
                <X className="w-6 h-6" />
              </button>
            </div>
            {question.correctOrder.map((item, index) => (
              <div key={index} className="flex items-center gap-3 py-2">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="flex-1 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
