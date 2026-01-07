'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Question } from '@/types/question';
import { MCQ } from '@/components/questions/MCQ';
import { MatchPairs } from '@/components/questions/MatchPairs';
import { OrderSequence } from '@/components/questions/OrderSequence';
import { Flashcard } from '@/components/questions/Flashcard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function QuestionFeedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const materialId = searchParams.get('materialId');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  useEffect(() => {
    const loadQuestions = async () => {
      if (!materialId || !user?.id) return;

      setLoading(true);
      const supabase = getSupabaseClient();

      // Get questions for this material
      const { data, error } = await (supabase.rpc as any)('get_questions_for_material', {
        p_material_id: materialId,
        p_user_id: user.id,
      });

      if (error) {
        console.error('Error loading questions:', error);
      } else if (data) {
        setQuestions(data.map((q: any) => q.question_data));
      }

      setLoading(false);
    };

    loadQuestions();
  }, [materialId, user?.id]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentIndex]);

  const handleAnswer = async (correct: boolean, option?: number) => {
    if (showFeedback) return;

    const responseTime = Date.now() - questionStartTime;

    setIsCorrect(correct);
    if (option !== undefined) setSelectedOption(option);
    setShowFeedback(true);

    // Record answer (practice mode - don't update FSRS)
    if (user?.id && currentQuestion) {
      const supabase = getSupabaseClient();
      await (supabase.rpc as any)('record_answer', {
        p_user_id: user.id,
        p_question_id: currentQuestion.id,
        p_is_correct: correct,
        p_response_time_ms: responseTime,
        p_update_fsrs: false,
      });
    }

    // Auto-advance after delay
    setTimeout(handleNext, 1200);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(null);
    } else {
      router.push('/materials');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <XCircle className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <p className="text-lg text-muted-foreground mb-6">No questions found</p>
        <Button onClick={() => router.push('/materials')}>Back to Materials</Button>
      </div>
    );
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'mcq':
        return (
          <MCQ
            question={currentQuestion}
            onAnswer={(index) => handleAnswer(index === currentQuestion.correctAnswer, index)}
            selectedOption={selectedOption}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />
        );
      case 'true-false':
        return (
          <div className="space-y-4">
            <Button
              onClick={() => handleAnswer(true === currentQuestion.correctAnswer)}
              disabled={showFeedback}
              variant="outline"
              className={cn(
                "w-full h-20 text-xl font-semibold",
                showFeedback && true === currentQuestion.correctAnswer && "bg-green-500/20 border-green-500",
                showFeedback && selectedOption === 0 && !isCorrect && "bg-red-500/20 border-red-500"
              )}
            >
              True
            </Button>
            <Button
              onClick={() => handleAnswer(false === currentQuestion.correctAnswer)}
              disabled={showFeedback}
              variant="outline"
              className={cn(
                "w-full h-20 text-xl font-semibold",
                showFeedback && false === currentQuestion.correctAnswer && "bg-green-500/20 border-green-500",
                showFeedback && selectedOption === 1 && !isCorrect && "bg-red-500/20 border-red-500"
              )}
            >
              False
            </Button>
          </div>
        );
      case 'match-pairs':
        return (
          <MatchPairs
            question={currentQuestion}
            onComplete={(correct) => handleAnswer(correct, undefined)}
          />
        );
      case 'order-sequence':
        return (
          <OrderSequence
            question={currentQuestion}
            onComplete={(correct) => handleAnswer(correct)}
          />
        );
      case 'flashcard':
        return (
          <Flashcard
            question={currentQuestion}
            onComplete={(needsReview) => handleAnswer(!needsReview, undefined)}
          />
        );
      default:
        return <p className="text-muted-foreground">Question type not supported yet</p>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/materials')}
            >
              <X className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <Progress value={progress} className="h-3" />
            </div>
            <span className="text-sm font-medium text-muted-foreground min-w-[60px] text-right">
              {currentIndex + 1}/{questions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container max-w-3xl mx-auto px-4 py-8 flex flex-col justify-center">
        <div className="space-y-8 animate-fade-in">
          {/* Question Type Badge */}
          <div className="flex justify-center">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wide">
              {currentQuestion.type === 'mcq' && 'Multiple Choice'}
              {currentQuestion.type === 'true-false' && 'True or False'}
              {currentQuestion.type === 'flashcard' && 'Flashcard'}
              {currentQuestion.type === 'match-pairs' && 'Match Pairs'}
              {currentQuestion.type === 'order-sequence' && 'Order Sequence'}
            </span>
          </div>

          {/* Question Text */}
          {currentQuestion.type !== 'flashcard' && (
            <div className="relative">
              <div className="p-8 rounded-2xl border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                <h2 className="text-2xl font-semibold leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>
              {/* Speech bubble tail */}
              <div className="absolute -bottom-3 left-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-foreground" />
            </div>
          )}

          {/* Question Component */}
          <div className="mt-8">
            {renderQuestion()}
          </div>
        </div>
      </div>

      {/* Feedback Overlay */}
      {showFeedback && (
        <div className={cn(
          "fixed inset-0 flex items-center justify-center pointer-events-none z-50",
          "animate-in fade-in duration-200"
        )}>
          <div className={cn(
            "p-8 rounded-full shadow-2xl",
            isCorrect ? "bg-green-500" : "bg-red-500"
          )}>
            {isCorrect ? (
              <CheckCircle2 className="w-16 h-16 text-white" />
            ) : (
              <XCircle className="w-16 h-16 text-white" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
