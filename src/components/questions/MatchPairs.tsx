'use client';

import { useState, useEffect } from 'react';
import { MatchPairsQuestion } from '@/types/question';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, X, Eye, RotateCcw } from 'lucide-react';

// Color palette for matched pairs (matching iOS)
const MATCH_COLORS = [
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#FF9800', // Orange
  '#9C27B0', // Purple
];

interface ItemPosition {
  id: string;
  text: string;
}

interface Match {
  leftId: string;
  leftText: string;
  rightId: string;
  rightText: string;
  color: string;
  isCorrect: boolean;
}

interface MatchPairsProps {
  question: MatchPairsQuestion;
  onComplete: (correct: boolean) => void;
}

export function MatchPairs({ question, onComplete }: MatchPairsProps) {
  const [leftItems, setLeftItems] = useState<ItemPosition[]>([]);
  const [rightItems, setRightItems] = useState<ItemPosition[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showCorrectModal, setShowCorrectModal] = useState(false);

  useEffect(() => {
    // Shuffle both left and right arrays independently for active recall challenge
    const left = question.pairs.map((p, i) => ({
      id: `left-${i}`,
      text: p.left,
    })).sort(() => Math.random() - 0.5);

    const right = question.pairs.map((p, i) => ({
      id: `right-${i}`,
      text: p.right,
    })).sort(() => Math.random() - 0.5);

    setLeftItems(left);
    setRightItems(right);
  }, [question]);

  const handleLeftPress = (id: string) => {
    if (showResults) return;
    if (matches.find((m) => m.leftId === id)) return;
    setSelectedLeft(id === selectedLeft ? null : id);
  };

  const handleRightPress = (rightId: string) => {
    if (!selectedLeft) return;
    if (matches.find((m) => m.rightId === rightId)) return;
    if (showResults) return;

    const leftIndex = parseInt(selectedLeft.split('-')[1]);
    const selectedItem = leftItems.find((l) => l.id === selectedLeft);
    const rightItem = rightItems.find((r) => r.id === rightId);

    const isCorrect = rightItem?.text === question.pairs[leftIndex].right;
    const matchColor = MATCH_COLORS[matches.length % MATCH_COLORS.length];

    // Add match regardless of correctness
    const newMatch: Match = {
      leftId: selectedLeft,
      leftText: selectedItem?.text || '',
      rightId: rightId,
      rightText: rightItem?.text || '',
      color: matchColor,
      isCorrect,
    };

    const newMatches = [...matches, newMatch];
    setMatches(newMatches);
    setSelectedLeft(null);

    // Check if all pairs are matched
    if (newMatches.length === question.pairs.length) {
      const allCorrect = newMatches.every((m) => m.isCorrect);

      if (allCorrect) {
        // Show correct results briefly then auto-complete
        setShowResults(true);
        setTimeout(() => {
          onComplete(true);
        }, 800);
      } else {
        // Some wrong, show results and buttons
        setShowResults(true);
      }
    }
  };

  const handleShowPair = () => {
    setShowCorrectModal(true);
  };

  const handleModalClose = () => {
    setShowCorrectModal(false);
    // After modal closes, auto-advance with feedback overlay
    setTimeout(() => {
      onComplete(false);
    }, 500);
  };

  const handleTryAgain = () => {
    setMatches([]);
    setShowResults(false);
  };

  const getItemColor = (itemId: string, isLeft: boolean) => {
    const match = matches.find((m) =>
      isLeft ? m.leftId === itemId : m.rightId === itemId
    );
    return match?.color;
  };

  const getMatchError = (itemId: string, isLeft: boolean) => {
    if (!showResults) return false;
    const match = matches.find((m) =>
      isLeft ? m.leftId === itemId : m.rightId === itemId
    );
    return match && !match.isCorrect;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex gap-4 md:gap-8 w-full max-w-4xl">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-3">
          {leftItems.map((item) => {
            const matchColor = getItemColor(item.id, true);
            const isMatched = !!matchColor;
            const isSelected = selectedLeft === item.id;
            const hasError = getMatchError(item.id, true);

            return (
              <button
                key={item.id}
                onClick={() => handleLeftPress(item.id)}
                disabled={!!isMatched}
                className={cn(
                  "min-h-[60px] px-4 py-3 rounded-xl border-2 border-dashed border-foreground",
                  "flex items-center justify-center gap-2 transition-all",
                  "bg-card text-foreground font-medium",
                  isSelected && "border-primary bg-primary/10 border-solid scale-105 shadow-lg",
                  isMatched && "border-solid",
                  hasError && "border-red-500 bg-red-500/20 border-[3px]",
                  !isMatched && !isSelected && "hover:bg-muted"
                )}
                style={isMatched ? { 
                  backgroundColor: matchColor + '40', 
                  borderColor: matchColor 
                } : undefined}
              >
                {isMatched && (
                  hasError ? (
                    <X className="w-5 h-5 text-foreground" />
                  ) : (
                    <Check className="w-5 h-5 text-white" />
                  )
                )}
                <span className={cn(
                  "text-center leading-tight",
                  isMatched && !hasError && "text-white font-bold"
                )}>
                  {item.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-3">
          {rightItems.map((item) => {
            const matchColor = getItemColor(item.id, false);
            const isMatched = !!matchColor;
            const hasError = getMatchError(item.id, false);

            return (
              <button
                key={item.id}
                onClick={() => handleRightPress(item.id)}
                disabled={!!isMatched}
                className={cn(
                  "min-h-[60px] px-4 py-3 rounded-xl border-2 border-foreground",
                  "flex items-center justify-center gap-2 transition-all",
                  "bg-card text-foreground font-medium",
                  isMatched && "border-solid",
                  hasError && "border-red-500 bg-red-500/20 border-[3px]",
                  !isMatched && "hover:bg-muted"
                )}
                style={isMatched ? { 
                  backgroundColor: matchColor + '40', 
                  borderColor: matchColor 
                } : undefined}
              >
                {isMatched && (
                  hasError ? (
                    <X className="w-5 h-5 text-foreground" />
                  ) : (
                    <Check className="w-5 h-5 text-white" />
                  )
                )}
                <span className={cn(
                  "text-center leading-tight",
                  isMatched && !hasError && "text-white font-bold"
                )}>
                  {item.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      {showResults && !matches.every((m) => m.isCorrect) && (
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            onClick={handleShowPair}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            Show Pair
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

      {/* Correct Pair Modal */}
      {showCorrectModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleModalClose}
        >
          <div 
            className="bg-card rounded-2xl p-6 max-w-md w-full border-2 border-primary"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-primary">Correct Pairs</h3>
              <button onClick={handleModalClose}>
                <X className="w-6 h-6" />
              </button>
            </div>
            {matches
              .filter((m) => !m.isCorrect)
              .map((match, idx) => {
                const correctRightText = question.pairs.find(
                  (p) => p.left === match.leftText
                )?.right;

                return (
                  <div key={idx} className="flex items-center gap-3 py-2">
                    <div 
                      className="flex-1 p-2 rounded-lg text-center text-sm font-medium"
                      style={{ backgroundColor: match.color + '40' }}
                    >
                      {match.leftText}
                    </div>
                    <X className="w-5 h-5 text-red-500" />
                    <div className="flex-1 p-2 rounded-lg bg-primary text-primary-foreground text-center text-sm font-medium">
                      {correctRightText}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
