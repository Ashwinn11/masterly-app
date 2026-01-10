'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Question } from '@/types/question';
import { MCQ } from '@/components/questions/MCQ';
import { MatchPairs } from '@/components/questions/MatchPairs';
import { OrderSequence } from '@/components/questions/OrderSequence';
import { Flashcard } from '@/components/questions/Flashcard';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import { BackButton } from '@/components/ui/BackButton';
import { PageIndicator } from '@/components/questions/PageIndicator';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

function QuestionFeedPageContent() {
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

  useEffect(() => {
    const loadQuestions = async () => {
      if (!user?.id) return;

      setLoading(true);
      const supabase = getSupabaseClient();

      // If materialId is provided, get questions for that material.
      // Otherwise, get all due questions for the user (Daily Recall).
      let result;
      if (materialId) {
        result = await (supabase.rpc as any)('get_questions_for_material', {
          p_material_id: materialId,
          p_user_id: user.id,
        });
      } else {
        result = await (supabase.rpc as any)('get_due_questions', {
          p_user_id: user.id,
        });
      }

      if (result.error) {
        console.error('Error loading questions:', result.error);
      } else if (result.data) {
        // Map questions and include the individual_question_id for record_answer
        const transformedQuestions = result.data.map((q: any) => ({
          ...q.question_data,
          individualQuestionId: q.individual_question_id
        }));
        setQuestions(transformedQuestions);
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

    if (user?.id && currentQuestion) {
      const individualQId = (currentQuestion as any).individualQuestionId;
      
      if (individualQId) {
        const supabase = getSupabaseClient();
        await (supabase.rpc as any)('record_answer', {
          p_user_id: user.id,
          p_question_id: individualQId,
          p_is_correct: correct,
          p_response_time_ms: responseTime,
          p_update_fsrs: false,
        });
      }
    }

    setTimeout(handleNext, 400);
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-xl font-handwritten font-bold text-info">Loading questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <ScreenLayout 
        headerLeft={<BackButton />}
        title="Oops!"
      >
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <XCircle className="w-20 h-20 text-muted-foreground/30 mb-4" />
          <p className="text-2xl font-handwritten text-info/70 mb-8">No questions found for this stack.</p>
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
        <PageIndicator 
          current={currentIndex + 1} 
          total={questions.length} 
        />
      }
      showLines={true}
    >
      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full py-8">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-10"
          >
            {/* Question Type Badge */}
            <div className="flex justify-center">
              <span className="px-6 py-2 rounded-2xl bg-primary/10 text-primary text-xl font-black font-handwritten uppercase tracking-widest border-2 border-primary/20 rotate-1 shadow-sm">
                {currentQuestion.type === 'mcq' && 'Multiple Choice'}
                {currentQuestion.type === 'true-false' && 'True or False'}
                {currentQuestion.type === 'flashcard' && 'Flashcard'}
                {currentQuestion.type === 'match-pairs' && 'Match Pairs'}
                {currentQuestion.type === 'order-sequence' && 'Order Sequence'}
              </span>
            </div>

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
          </motion.div>
        </AnimatePresence>
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

export default function QuestionFeedPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-xl font-handwritten font-bold text-info">Loading questions...</p>
      </div>
    }>
      <QuestionFeedPageContent />
    </Suspense>
  );
}