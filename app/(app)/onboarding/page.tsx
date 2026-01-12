'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { PartyPopper, Brain, Flame, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DecorativeBackground } from '@/components/DecorativeBackground';
import { markOnboardingCompleted } from '@/lib/onboarding';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'Join 10,000+ Students',
    description: "Tired of forgetting what you studied? Turn any PDF, photo, or note into smart flashcards in seconds.",
    icon: <PartyPopper className="w-16 h-16" />,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 2,
    title: 'Stop Wasting Time',
    description: 'Study smarter, not harder. Our AI shows you exactly what you\'re about to forget - right before you forget it.',
    icon: <Brain className="w-16 h-16" />,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    id: 3,
    title: 'Never Cram Again',
    description: 'Just 5 minutes a day keeps exam panic away. Build a streak and watch your grades soar.',
    icon: <Flame className="w-16 h-16" />,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const router = useRouter();
  const { user, refreshProfile } = useAuth();

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      await handleFinish();
    }
  };

  const handleFinish = async () => {
    if (!user) return;
    setIsFinishing(true);
    try {
      await markOnboardingCompleted(user.id);
      await refreshProfile();
      router.push('/dashboard');
    } catch (error) {
      console.error('[Onboarding] Failed to finish:', error);
      router.push('/dashboard');
    } finally {
      setIsFinishing(false);
    }
  };

  const step = STEPS[currentStep];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-background overflow-hidden">
      <DecorativeBackground />
      
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20, rotate: 1 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -20, rotate: -1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            {/* Icon Container */}
            <div 
              className={cn(
                "w-32 h-32 rounded-full flex items-center justify-center border-[3px] border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-colors duration-500",
                step.bgColor,
                step.color
              )}
              style={{ transform: currentStep % 2 === 0 ? 'rotate(-3deg)' : 'rotate(3deg)' }}
            >
              {step.icon}
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h1 className={cn("text-4xl md:text-5xl font-black tracking-tight", step.color)}>
                {step.title}
                <div className={cn("h-1.5 w-2/3 mx-auto mt-2 rounded-full", step.bgColor.replace('/10', '/30'))} />
              </h1>
              <p className="text-xl md:text-2xl font-medium text-muted-foreground leading-relaxed px-4 italic">
                "{step.description}"
              </p>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-2 py-4">
              {STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "transition-all duration-300 rounded-full",
                    idx === currentStep 
                      ? "w-8 h-3 bg-foreground" 
                      : "w-3 h-3 bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-4 pt-4">
              <Button
                onClick={handleNext}
                size="lg"
                disabled={isFinishing}
                className="w-full text-xl py-8 rounded-3xl border-[3px] border-foreground"
              >
                {currentStep === STEPS.length - 1 ? (
                  <>Get Started <ArrowRight className="ml-2 w-6 h-6" /></>
                ) : (
                  <>Next <ArrowRight className="ml-2 w-6 h-6" /></>
                )}
              </Button>
              
              {currentStep < STEPS.length - 1 && (
                <button
                  onClick={handleFinish}
                  disabled={isFinishing}
                  className="text-muted-foreground font-bold hover:text-foreground transition-colors py-2"
                >
                  Skip for now
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hand-drawn style decorative elements */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-20 hidden md:block">
        <Star className="w-12 h-12 text-accent rotate-12" />
      </div>
      <div className="absolute bottom-10 right-10 pointer-events-none opacity-20 hidden md:block">
        <CheckCircle2 className="w-16 h-16 text-primary -rotate-12" />
      </div>
    </div>
  );
}
