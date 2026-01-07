'use client';

import { MCQQuestion } from '@/types/question';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MCQProps {
  question: MCQQuestion;
  onAnswer: (index: number) => void;
  selectedOption: number | null;
  showFeedback: boolean;
  isCorrect: boolean | null;
}

export function MCQ({ question, onAnswer, selectedOption, showFeedback, isCorrect }: MCQProps) {
  return (
    <div className="space-y-4">
      {question.options.map((option, index) => {
        const isSelected = selectedOption === index;
        const isCorrectOption = index === question.correctAnswer;
        const showAsCorrect = showFeedback && isCorrectOption;
        const showAsWrong = showFeedback && isSelected && !isCorrect;

        return (
          <button
            key={index}
            onClick={() => !showFeedback && onAnswer(index)}
            disabled={showFeedback}
            className={cn(
              "w-full justify-start text-left h-auto py-4 px-6 text-base font-bold transition-all font-handwritten",
              "bg-card border-[3px] border-foreground rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]",
              showAsCorrect && "bg-green-500/20 border-green-600 text-green-700 shadow-none translate-x-[2px] translate-y-[2px]",
              showAsWrong && "bg-red-500/20 border-red-600 text-red-700 shadow-none translate-x-[2px] translate-y-[2px]",
              !showFeedback && "hover:bg-muted hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
            )}
          >
            <span className="mr-3 font-black">{String.fromCharCode(65 + index)}.</span>
            {option}
          </button>
        );
      })}
    </div>
  );
}
