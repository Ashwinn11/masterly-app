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
          <Button
            key={index}
            onClick={() => !showFeedback && onAnswer(index)}
            disabled={showFeedback}
            variant="outline"
            className={cn(
              "w-full justify-start text-left h-auto py-4 px-6 text-base font-medium transition-all",
              showAsCorrect && "bg-green-500/20 border-green-500 text-green-700 dark:text-green-400",
              showAsWrong && "bg-red-500/20 border-red-500 text-red-700 dark:text-red-400",
              !showFeedback && "hover:bg-primary/10 hover:border-primary"
            )}
          >
            <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
            {option}
          </Button>
        );
      })}
    </div>
  );
}
