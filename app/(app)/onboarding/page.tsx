'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { PartyPopper, Brain, Flame, ArrowRight, CheckCircle2, Star, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DecorativeBackground } from '@/components/DecorativeBackground';
import { markOnboardingCompleted } from '@/lib/onboarding';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface OnboardingStep {
  id: number;
  title: string;
  titleHighlight?: string; // Word to highlight in title
  description: string;
  descriptionHighlights?: string[]; // Phrases to highlight
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  socialProof?: string;
  badge?: string;
}

const STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: "You're Studying Wrong",
    titleHighlight: "Wrong",
    description: "Re-reading notes? Highlighting textbooks? You'll forget 80% by next week. Your brain needs active recall, not passive reading.",
    descriptionHighlights: ["80%", "active recall"],
    icon: <Brain className="w-16 h-16" />,
    color: "text-red-600",
    bgColor: "bg-red-50",
    socialProof: "Join 10,000+ students who stopped wasting time",
  },
  {
    id: 2,
    title: "The Real Problem",
    titleHighlight: "Problem",
    description: "Traditional studying is boring and ineffective. Your brain shuts down. You cram for hours but blank out on exams. Sound familiar?",
    descriptionHighlights: ["boring", "blank out"],
    icon: <Flame className="w-16 h-16" />,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    badge: "Most common student complaint",
  },
  {
    id: 3,
    title: "Here's the Solution",
    titleHighlight: "Solution",
    description: "Masterly turns studying into a game. 5 interactive modes make your brain work. Swipe, match, quiz—memories stick when learning is fun.",
    descriptionHighlights: ["game", "5 interactive modes", "fun"],
    icon: <Sparkles className="w-16 h-16" />,
    color: "text-green-600",
    bgColor: "bg-green-50",
    badge: "4.8★ Rating",
  },
  {
    id: 4,
    title: "Start Free Today",
    titleHighlight: "Free",
    description: "3 free uploads. No credit card. See results in 5 minutes. Most students upgrade after their first session.",
    descriptionHighlights: ["3 free uploads", "5 minutes"],
    icon: <Star className="w-16 h-16" />,
    color: "text-primary",
    bgColor: "bg-primary/10",
    socialProof: "Join 10,000+ students improving their grades",
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const router = useRouter();
  const { user, refreshProfile } = useAuth();

  const isLastStep = currentStep === STEPS.length - 1;

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // On last step, complete onboarding and go to dashboard
      await handleFinish();
    }
  };

  const handleFinish = async () => {
    if (!user) return;
    setIsFinishing(true);
    try {
      // Mark onboarding as completed in Supabase
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
            {/* Badge (if exists) */}
            {step.badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full border-2 border-foreground/20 bg-card shadow-sm"
              >
                <span className={cn("text-xs md:text-sm font-bold uppercase tracking-wider", step.color)}>
                  {step.badge}
                </span>
              </motion.div>
            )}

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
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">
                {step.titleHighlight ? (
                  <>
                    {step.title.split(step.titleHighlight).map((part, idx, arr) => (
                      <React.Fragment key={idx}>
                        <span className="text-foreground">{part}</span>
                        {idx < arr.length - 1 && (
                          <span className={step.color}>{step.titleHighlight}</span>
                        )}
                      </React.Fragment>
                    ))}
                  </>
                ) : (
                  <span className={step.color}>{step.title}</span>
                )}
                <div className={cn("h-1 w-2/3 mx-auto mt-2 rounded-full", step.bgColor.replace('/10', '/30'))} />
              </h1>
              
              <p className="text-lg md:text-xl font-medium leading-relaxed px-4">
                {step.descriptionHighlights && step.descriptionHighlights.length > 0 ? (
                  <>
                    {(() => {
                      let remaining = step.description;
                      const parts: { text: string; highlighted: boolean }[] = [];
                      
                      step.descriptionHighlights.forEach((highlight) => {
                        const index = remaining.toLowerCase().indexOf(highlight.toLowerCase());
                        if (index !== -1) {
                          if (index > 0) {
                            parts.push({ text: remaining.substring(0, index), highlighted: false });
                          }
                          parts.push({ text: remaining.substring(index, index + highlight.length), highlighted: true });
                          remaining = remaining.substring(index + highlight.length);
                        }
                      });
                      
                      if (remaining) {
                        parts.push({ text: remaining, highlighted: false });
                      }
                      
                      return parts.map((part, idx) => (
                        <span
                          key={idx}
                          className={part.highlighted ? "font-bold text-primary" : "text-muted-foreground"}
                        >
                          {part.text}
                        </span>
                      ));
                    })()}
                  </>
                ) : (
                  <span className="text-muted-foreground">{step.description}</span>
                )}
              </p>
            </div>

            {/* Social Proof */}
            {step.socialProof && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 text-sm md:text-base text-muted-foreground italic"
              >
                <Users className="w-4 h-4 text-primary" />
                <span>{step.socialProof}</span>
              </motion.div>
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
                {isFinishing ? (
                  <>Loading...</>
                ) : isLastStep ? (
                  <>Start Free <ArrowRight className="ml-2 w-5 h-5" /></>
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
                  Skip
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
