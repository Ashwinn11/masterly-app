'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Question } from '@/types/question';
import { MCQ } from '@/components/questions/MCQ';
import { MatchPairs } from '@/components/questions/MatchPairs';
import { OrderSequence } from '@/components/questions/OrderSequence';
import { Flashcard } from '@/components/questions/Flashcard';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import { BackButton } from '@/components/ui/BackButton';
import { Progress } from '@/components/ui/progress';
import { Loader2, CheckCircle2, XCircle, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PlayPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  useEffect(() => {
    const loadDueQuestions = async () => {
      if (!user?.id) return;

      setLoading(true);
      const supabase = getSupabaseClient();

      const { data, error } = await (supabase.rpc as any)('get_due_questions_for_play', {
        p_user_id: user.id,
        p_limit: 20,
      });

      if (error) {
        console.error('Error loading due questions:', error);
      } else if (data) {
        // Transform the data to match Question format
        const transformedQuestions = data.map((item: any) => ({
          ...item.question_data,
          individualQuestionId: item.individual_question_id,
          questionSetId: item.question_set_id,
          materialId: item.material_id,
          fsrs: {
            stability: item.stability,
            difficulty: item.difficulty,
            next_due_at: item.next_due_at,
          },
        }));
        setQuestions(transformedQuestions);
      }

      setLoading(false);
    };

    loadDueQuestions();
  }, [user?.id]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentIndex]);

  const handleAnswer = async (correct: boolean, option?: number) => {
    if (showFeedback) return;

    const responseTime = Date.now() - questionStartTime;

    setIsCorrect(correct);
    if (option !== undefined) setSelectedOption(option);
    setShowFeedback(true);

    if (user?.id && currentQuestion) {
      const supabase = getSupabaseClient();
      const individualQId = (currentQuestion as any).individualQuestionId;

      // Record answer with FSRS update enabled (p_update_fsrs defaults to true)
      await (supabase.rpc as any)('record_answer', {
        p_user_id: user.id,
        p_question_id: individualQId,
        p_is_correct: correct,
        p_response_time_ms: responseTime,
        p_update_fsrs: true, // Enable FSRS updates for play mode
      });
    }

    setTimeout(handleNext, 1200);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(null);
    } else {
      // All done! Redirect to dashboard
      router.push('/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-xl font-handwritten font-bold text-info">Loading review...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <ScreenLayout 
        headerLeft={<BackButton />}
        title="All Caught Up!"
      >
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center border-[3px] border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] transform -rotate-3">
              <PartyPopper className="w-16 h-16 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl font-black font-handwritten text-primary mb-4">
            You're all caught up!
          </h2>
          <p className="text-2xl font-handwritten text-info/70 mb-8 max-w-md">
            No questions are due for review right now. Come back later or upload more materials!
          </p>
          <BackButton />
        </div>
      </ScreenLayout>
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
          <div className="space-y-4 max-w-xl mx-auto w-full">
            <button
              onClick={() => handleAnswer(true === currentQuestion.correctAnswer, 0)}
              disabled={showFeedback}
              className={cn(
                "w-full h-24 text-3xl font-black font-handwritten rounded-2xl border-[3px] border-foreground transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]",
                !showFeedback && "hover:bg-muted hover:-translate-y-1 active:translate-y-0 active:shadow-none",
                showFeedback && true === currentQuestion.correctAnswer && "bg-green-500/20 border-green-600 text-green-700 shadow-none translate-y-1 translate-x-1",
                showFeedback && selectedOption === 0 && !isCorrect && "bg-red-500/20 border-red-600 text-red-700 shadow-none translate-y-1 translate-x-1"
              )}
            >
              True
            </button>
            <button
              onClick={() => handleAnswer(false === currentQuestion.correctAnswer, 1)}
              disabled={showFeedback}
              className={cn(
                "w-full h-24 text-3xl font-black font-handwritten rounded-2xl border-[3px] border-foreground transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]",
                !showFeedback && "hover:bg-muted hover:-translate-y-1 active:translate-y-0 active:shadow-none",
                showFeedback && false === currentQuestion.correctAnswer && "bg-green-500/20 border-green-600 text-green-700 shadow-none translate-y-1 translate-x-1",
                showFeedback && selectedOption === 1 && !isCorrect && "bg-red-500/20 border-red-600 text-red-700 shadow-none translate-y-1 translate-x-1"
              )}
            >
              False
            </button>
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
        return <p className="text-xl font-handwritten text-info">Question type not supported yet</p>;
    }
  };

  return (
    <ScreenLayout
      hideSidebar={true}
      headerLeft={<BackButton />}
      headerRight={
        <div className="flex items-center gap-4 min-w-[200px] sm:min-w-[300px]">
          <div className="flex-1">
            <Progress value={progress} className="h-4 border-2 border-foreground/10 bg-background" />
          </div>
          <span className="text-xl font-black font-handwritten text-info min-w-[60px] text-right">
            {currentIndex + 1}/{questions.length}
          </span>
        </div>
      }
    >
      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full py-8">
        <div className="space-y-10 animate-fade-in">
          {/* Question Text */}
          {currentQuestion.type !== 'flashcard' && (
            <div className="relative max-w-2xl mx-auto w-full">
              <div className="p-10 rounded-[40px] border-[3px] border-foreground bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] transform -rotate-1">
                <h2 className="text-3xl sm:text-4xl font-black font-handwritten leading-tight text-center">
                  {currentQuestion.question}
                </h2>
              </div>
              {/* Speech bubble tail */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-foreground" />
            </div>
          )}

          {/* Question Component */}
          <div className="mt-4">
            {renderQuestion()}
          </div>
        </div>
      </div>

      {/* Feedback Overlay */}
      {showFeedback && (
        <div className={cn(
          "fixed inset-0 flex items-center justify-center pointer-events-none z-50",
          "animate-in zoom-in duration-300"
        )}>
          <div className={cn(
            "p-4 sm:p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] border-[3px] border-foreground transition-all transform",
            isCorrect ? "bg-green-500 rotate-3" : "bg-red-500 -rotate-3"
          )}>
            {isCorrect ? (
              <CheckCircle2 className="w-12 h-12 sm:w-20 sm:h-20 text-white" />
            ) : (
              <XCircle className="w-12 h-12 sm:w-20 sm:h-20 text-white" />
            )}
          </div>
        </div>
      )}
    </ScreenLayout>
  );
}
