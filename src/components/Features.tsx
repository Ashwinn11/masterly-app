'use client';

import { cn } from "@/lib/utils";
import { Brain, FileText, LineChart, Upload } from "lucide-react";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const useAnimation = (path: string) => {
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    fetch(path)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, [path]);

  return data;
};

const FeatureRow = ({
  title, 
  description, 
  animationData,
  icon: Icon, 
  imageSide = "right",
  className,
}: {
  title: string;
  description: string;
  animationData: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  imageSide?: "left" | "right";
  className?: string;
}) => {
  return (
    <div className={cn("py-24 md:py-36 overflow-hidden relative", className)}>
      {/* Background paper effect for the section */}
      <div className="container mx-auto px-4 relative">
        <div className={cn(
          "flex flex-col gap-12 lg:gap-32 items-center relative",
          imageSide === "left" ? "lg:flex-row-reverse" : "lg:flex-row"
        )}>
          
          {/* Notebook Page Background */}
          <div className={cn(
            "absolute -inset-10 -z-10 bg-white border-crayon shadow-xl transform",
            imageSide === "right" ? "rotate-[-1deg]" : "rotate-[1deg]"
          )}>
            <div className="absolute inset-0 bg-notebook-paper opacity-30" />
            {/* Spiral binder holes */}
            <div className={cn(
              "absolute top-0 bottom-0 w-12 flex flex-col justify-around py-8",
              imageSide === "right" ? "left-4" : "right-4"
            )}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-background border-crayon-sm" />
              ))}
            </div>
          </div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: imageSide === "left" ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "spring" }}
            className="flex-1 text-center lg:text-left space-y-8 font-handwritten relative z-10"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="inline-flex p-6 rounded-3xl border-crayon bg-accent/20 shadow-lg mb-4"
            >
              <Icon className="h-12 w-12 text-primary" />
            </motion.div>
            <h3 className="text-5xl md:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
              {title}
            </h3>
            <p className="text-2xl md:text-3xl text-info/80 leading-relaxed max-w-lg mx-auto lg:mx-0 font-bold italic">
              {description}
            </p>
            
            {/* Scribble decoration */}
            <div className="pt-4 opacity-40">
               <svg width="150" height="20" viewBox="0 0 150 20" fill="none" className="text-secondary">
                 <path d="M5 15C30 5 60 5 145 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 5" />
               </svg>
            </div>
          </motion.div>

          {/* Animation Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: imageSide === "left" ? -5 : 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
            className="flex-1 w-full max-w-md lg:max-w-none relative z-10"
          >
            <div className="relative aspect-square w-full flex items-center justify-center p-8 bg-muted/20 border-crayon-sm rounded-[40px] transform hover:scale-105 transition-transform duration-500">
              {/* Washi tape on corners */}
              <div className="washi-tape w-20 h-8 top-[-10px] left-[-10px] rotate-[-45deg] bg-primary/30" />
              <div className="washi-tape w-20 h-8 bottom-[-10px] right-[-10px] rotate-[-45deg] bg-secondary/30 top-auto left-auto" />
              
              <motion.div className="w-full h-full">
                {animationData && (
                  <LottieAnimation
                    animationData={animationData}
                    className="w-full h-full drop-shadow-2xl"
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const Features = () => {
  const booksAnimation = useAnimation("/animations/Books-stack.json");
  const finishingStudiesAnimation = useAnimation("/animations/finish_study.json");
  const quizAnimation = useAnimation("/animations/quiz.json");
  const examAnimation = useAnimation("/animations/exam.json");

  return (
    <section className="bg-paper-texture relative py-20" id="features">
      {/* Decorative background scribbles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <svg className="absolute top-[10%] left-[5%] w-64 h-64 text-primary" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
        <svg className="absolute bottom-[10%] right-[5%] w-80 h-80 text-secondary" viewBox="0 0 100 100">
          <path d="M10,10 L90,90 M90,10 L10,90" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
      </div>

      <div className="container mx-auto px-4 mb-16 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black font-handwritten text-foreground mb-6"
        >
          Your <span className="hand-drawn-highlight">All-in-One</span> Study Toolkit
        </motion.h2>
        <p className="text-2xl font-handwritten italic text-info/70 max-w-2xl mx-auto">
          Everything you need to stop cramming and start mastering.
        </p>
      </div>

      <div className="space-y-24 md:space-y-48">
        <FeatureRow
          title="Upload anything, learn everything."
          description="Transform PDFs, lecture recordings, images, or notes into structured study sets instantly with AI."
          icon={Upload}
          animationData={booksAnimation}
          imageSide="right"
        />

        <FeatureRow
          title="5 Fun Ways to Master Topics"
          description="Ditch the monotony. Switch between MCQ, True/False, Match Pairs, Ordering, and Flashcards for a fun learning experience."
          icon={FileText}
          animationData={finishingStudiesAnimation}
          imageSide="left"
        />

        <FeatureRow
          title="Scientifically Proven Results"
          description="Powered by the FSRS Spaced Repetition algorithm. Our 'Play Mode' schedules your reviews at the optimal time for long-term memory."
          icon={Brain}
          animationData={quizAnimation}
          imageSide="right"
        />

        <FeatureRow
          title="Build a Learning Streak"
          description="Daily exam practice & detailed stats help you track your mastery. Stay consistent and watch your grades soar."
          icon={LineChart}
          animationData={examAnimation}
          imageSide="left"
        />
      </div>
    </section>
  );
};
