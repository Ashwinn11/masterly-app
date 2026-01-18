'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { PartyPopper, Brain, Flame, ArrowRight, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DecorativeBackground } from '@/components/DecorativeBackground';
import { Paywall } from '@/components/Paywall';
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
    title: "Studying Harder, Not Smarter?",
    description: "You're spending hours making flashcards, re-reading notes, and cramming... but still forgetting everything by exam day.",
    icon: <Brain className="w-16 h-16" />,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    id: 2,
    title: "The Real Cost of Forgetting",
    description: "Every hour you study without a system, you lose 80% within a week. That's your time, your grades, and your future slipping away.",
    icon: <Flame className="w-16 h-16" />,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    id: 3,
    title: "What If You Never Forgot?",
    description: "Imagine: Upload your notes once. Play 5 minutes daily. Remember everything forever. Top grades without the stress.",
    icon: <Sparkles className="w-16 h-16" />,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: 4,
    title: "10,000+ Students Already Winning",
    description: "They stopped wasting time. They started using science-backed spaced repetition. Now they ace exams while you're still cramming.",
    icon: <Star className="w-16 h-16" />,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const router = useRouter();
  const { user, refreshProfile } = useAuth();

  const isLastStep = currentStep === STEPS.length - 1;

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // On last step, show paywall
      setShowPaywall(true);
    }
  };

  const handleFinish = async (purchased: boolean = false, shouldRedirect: boolean = true) => {
    if (!user) return;
    setIsFinishing(true);
    try {
      // Mark onboarding as completed in Supabase
      await markOnboardingCompleted(user.id);
      await refreshProfile();
      
      // Only redirect if explicitly told to (e.g., when closing paywall without purchase)
      if (shouldRedirect) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('[Onboarding] Failed to finish:', error);
      if (shouldRedirect) {
        router.push('/dashboard');
      }
    } finally {
      setIsFinishing(false);
    }
  };

  const step = STEPS[currentStep];

  // If on last step and paywall is shown, render paywall
  if (showPaywall) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-background overflow-hidden">
        <DecorativeBackground />
        <Paywall
          onClose={() => handleFinish(false, true)}
          onSubscribe={() => handleFinish(true, false)}
          showCloseButton={true}
          title="Unlock Masterly Pro"
          subtitle="Join 10,000+ students mastering their studies"
        />
      </div>
    );
  }

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
                "w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center border-[3px] border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-colors duration-500",
                step.bgColor,
                step.color
              )}
              style={{ transform: currentStep % 2 === 0 ? 'rotate(-3deg)' : 'rotate(3deg)' }}
            >
              <div className="scale-75 md:scale-90">
                {step.icon}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2 md:space-y-4">
              <h1 className={cn("text-3xl md:text-5xl font-black tracking-tight", step.color)}>
                {step.title}
                <div className={cn("h-1 w-2/3 mx-auto mt-2 rounded-full", step.bgColor.replace('/10', '/30'))} />
              </h1>
              <p className="text-lg md:text-xl font-medium text-muted-foreground leading-relaxed px-4 italic">
                "{step.description}"
              </p>
            </div>

            {/* Pain Points for the Last Step (Step 4) */}
            {currentStep === 3 && (
              <div className="w-full max-w-md mx-auto space-y-2 pt-2 text-left">
                {[
                  { icon: <CheckCircle2 className="w-5 h-5 text-red-500" />, text: "Exam in 2 days, hit upload limit" },
                  { icon: <CheckCircle2 className="w-5 h-5 text-orange-500" />, text: "Wasting hours making flashcards manually" },
                  { icon: <CheckCircle2 className="w-5 h-5 text-red-500" />, text: "Forgetting 80% within a week" },
                  { icon: <CheckCircle2 className="w-5 h-5 text-orange-500" />, text: "Studying harder but grades aren't improving" },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (idx * 0.1) }}
                    className="flex items-center gap-3 bg-card p-2 md:p-3 rounded-xl border-2 border-foreground/5 shadow-sm"
                  >
                    {item.icon}
                    <span className="text-base md:text-lg font-bold">{item.text}</span>
                  </motion.div>
                ))}
                
                {/* Highlighted Discount Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -4, 0]
                  }}
                  transition={{ 
                    delay: 1,
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  className="flex flex-col items-center pt-2"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-1.5 rounded-full font-black text-sm uppercase tracking-widest shadow-lg flex items-center gap-2 border-2 border-white/20">
                    <Sparkles className="w-4 h-4 fill-current" />
                    Limited Time: 25% OFF
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase font-black mt-1 tracking-tighter opacity-70">
                    Introductory Offer Applied Automatically
                  </p>
                </motion.div>
              </div>
            )}

            {/* Pagination Dots */}
            <div className="flex gap-2 py-2">
              {STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "transition-all duration-300 rounded-full",
                    idx === currentStep 
                      ? "w-8 h-2.5 bg-foreground" 
                      : "w-2.5 h-2.5 bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-3 pt-2">
              <Button
                onClick={handleNext}
                size="lg"
                disabled={isFinishing}
                className="w-full text-lg py-7 rounded-2xl border-[3px] border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all"
              >
                {isLastStep ? (
                  <>Unlock Masterly Pro <Star className="ml-2 w-5 h-5" /></>
                ) : (
                  <>Next <ArrowRight className="ml-2 w-5 h-5" /></>
                )}
              </Button>
              
              {!isLastStep && (
                <button
                  onClick={() => setCurrentStep(STEPS.length - 1)}
                  disabled={isFinishing}
                  className="text-muted-foreground font-bold hover:text-foreground transition-colors py-1 text-sm uppercase tracking-wider"
                >
                  Skip to PRO
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
