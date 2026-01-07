'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface LearningStyleQuizProps {
  className?: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "When learning something new, I prefer to:",
    options: [
      "Read about it first",
      "See diagrams and charts",
      "Listen to explanations",
      "Try it myself hands-on"
    ]
  },
  {
    id: 2,
    question: "I remember information best when I:",
    options: [
      "Make notes and summaries",
      "Use flashcards with images",
      "Discuss it with someone",
      "Practice with real problems"
    ]
  },
  {
    id: 3,
    question: "My ideal study session includes:",
    options: [
      "Textbooks and articles",
      "Videos and animations",
      "Podcasts and audio",
      "Experiments and projects"
    ]
  },
  {
    id: 4,
    question: "When I'm stuck on a concept, I:",
    options: [
      "Re-read the material",
      "Look for visual explanations",
      "Ask someone to explain",
      "Take a break and try again later"
    ]
  },
  {
    id: 5,
    question: "I learn best when the material is:",
    options: [
      "Well-written and organized",
      "Colorful and visually appealing",
      "Presented clearly and slowly",
      "Interactive and practical"
    ]
  }
];

export function LearningStyleQuiz({ className }: LearningStyleQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{
    style: string;
    description: string;
    tips: string[];
  } | null>(null);

  const styles = [
    {
      name: "Visual Learner",
      icon: "👁️",
      description: "You learn best through images, diagrams, and spatial understanding",
      tips: [
        "Use color-coded flashcards",
        "Create mind maps and diagrams",
        "Watch video tutorials",
        "Use images and charts in your notes"
      ]
    },
    {
      name: "Auditory Learner",
      icon: "🎧",
      description: "You learn best through listening and speaking",
      tips: [
        "Record lectures and listen again",
        "Study with a partner and discuss concepts",
        "Use mnemonics and rhymes",
        "Explain concepts out loud"
      ]
    },
    {
      name: "Read/Write Learner",
      icon: "📚",
      description: "You learn best through reading and writing",
      tips: [
        "Take detailed notes",
        "Rewrite concepts in your own words",
        "Create lists and outlines",
        "Read textbooks thoroughly"
      ]
    },
    {
      name: "Kinesthetic Learner",
      icon: "✋",
      description: "You learn best through doing and moving",
      tips: [
        "Use hands-on activities",
        "Take breaks to move around",
        "Practice with real problems",
        "Build models or use manipulatives"
      ]
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: number[]) => {
    // Count answer frequencies (0=Visual, 1=Auditory, 2=Read/Write, 3=Kinesthetic)
    const counts = [0, 0, 0, 0];
    finalAnswers.forEach((answer) => counts[answer]++);

    const maxIndex = counts.indexOf(Math.max(...counts));
    const learningStyle = styles[maxIndex];

    setResult({
      style: learningStyle.name,
      description: learningStyle.description,
      tips: learningStyle.tips
    });
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const progress = ((currentQuestion + (result ? questions.length : 0)) / questions.length) * 100;

  return (
    <div className={cn('w-full', className)}>
      <Card className="p-8 border-[3px] border-foreground bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="space-y-6">
          {!result ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border-[2px] border-primary/20 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">Discover Your Learning Style</h3>
                  <p className="text-foreground/70 text-sm font-handwritten italic">
                    Answer 5 quick questions to optimize your study approach
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden border-[2px] border-foreground/20">
                  <div
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="min-h-[200px]">
                <p className="text-xl font-bold mb-6">{questions[currentQuestion].question}</p>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      variant="outline"
                      className="w-full h-auto p-4 text-left justify-start border-[2px] border-foreground/20 hover:border-primary hover:bg-primary/5 transition-all text-base font-handwritten"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-[3px] border-primary text-4xl mb-4">
                  {result?.style.split(' ')[0] === 'Visual' && '👁️'}
                  {result?.style.split(' ')[0] === 'Auditory' && '🎧'}
                  {result?.style.split(' ')[0] === 'Read/Write' && '📚'}
                  {result?.style.split(' ')[0] === 'Kinesthetic' && '✋'}
                </div>
                <h3 className="text-3xl font-black mb-2">{result?.style}</h3>
                <p className="text-lg text-foreground/70">{result?.description}</p>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-black flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Study Tips for You
                </h4>
                {result?.tips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border-[2px] border-primary/20"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-base font-handwritten italic">{tip}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Button className="w-full h-14 rounded-xl text-lg font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]" asChild>
                  <a href="/login">
                    Create Personalized Flashcards
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="w-full h-12 rounded-xl"
                >
                  Retake Quiz
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
