'use client';

import { cn } from "@/lib/utils";
import { Brain, FileText, LineChart, Upload, Zap, Layers, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import React from 'react';

// Lazy load Lottie animations for better performance
const LottieAnimation = dynamic(
  () => import("@/components/ui/LottieAnimation").then((mod) => mod.LottieAnimation),
  { 
    ssr: false,
    loading: () => <div className="h-full w-full bg-muted/20 animate-pulse rounded-3xl" />
  }
);

// Helper for fetching animation data
const useAnimation = (path: string) => {
  const [data, setData] = React.useState<unknown>(null);
  React.useEffect(() => {
    fetch(path)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Failed to load animation:", err));
  }, [path]);
  return data;
};

const FeatureList = ({ items }: { items: { icon: any; text: string }[] }) => (
  <ul className="space-y-4 pt-4">
    {items.map((item, i) => (
      <motion.li 
        key={i}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + (i * 0.1) }}
        className="flex items-center gap-3"
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <item.icon className="w-4 h-4 text-primary" />
        </div>
        <span className="text-xl text-info/90 font-handwritten font-bold opacity-80">{item.text}</span>
      </motion.li>
    ))}
  </ul>
);

const FeatureRow = ({
  title, 
  description, 
  animationData,
  imageSide = "right",
  className,
  children
}: {
  title: string;
  description: string;
  animationData: any;
  imageSide?: "left" | "right";
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("py-24 overflow-hidden relative", className)}>
      <div className="container mx-auto px-4 relative">
        <div className={cn(
          "flex flex-col gap-12 lg:gap-24 items-center relative",
          imageSide === "left" ? "lg:flex-row-reverse" : "lg:flex-row"
        )}>
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: imageSide === "left" ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "spring" }}
            className="flex-1 text-center lg:text-left space-y-6 font-handwritten relative z-10"
          >
            <h3 className="text-5xl md:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
              {title}
            </h3>
            <p className="text-2xl md:text-3xl text-info/70 leading-relaxed max-w-lg mx-auto lg:mx-0 font-bold italic">
              {description}
            </p>
            
            {/* Detailed Feature List */}
            {children}

          </motion.div>

          {/* Animation Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: imageSide === "left" ? -2 : 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
            className="flex-1 w-full max-w-lg lg:max-w-xl relative z-10"
          >
             {/* Paper Stack Effect */}
            <div className={cn(
                "absolute -inset-4 bg-white border-crayon shadow-lg transform",
                 imageSide === "left" ? "rotate-2" : "-rotate-2"
            )} />
            
            <div className="relative aspect-square w-full flex items-center justify-center p-8 bg-muted/10 border-crayon-sm transform hover:scale-105 transition-transform duration-500 bg-white shadow-xl">
               {/* Washi tape */}
               <div className={cn("washi-tape w-32 h-10 bg-primary/20", imageSide === "left" ? "top-[-15px] right-[10%] rotate-3" : "top-[-15px] left-[10%] -rotate-3")} />

              <motion.div className="w-full h-full relative z-10">
                {animationData ? (
                  <LottieAnimation
                    animationData={animationData}
                    className="w-full h-full drop-shadow-xl"
                  />
                ) : null}
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
  const quizAnimation = useAnimation("/animations/quiz.json");

  return (
    <section className="bg-paper-texture relative py-20" id="features">
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
         {/* Background pattern */}
         <div className="absolute inset-0 bg-notebook-paper opacity-50" />
      </div>

      <div className="container mx-auto px-4 mb-8 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black font-handwritten text-foreground mb-6"
        >
          How It <span className="hand-drawn-highlight">Works</span>
        </motion.h2>
      </div>

      <div className="space-y-12">
        {/* Step 1: Input / Creation (Consolidated) */}
        <FeatureRow
          title="1. Effortless Creation"
          description="Stop wasting time making flashcards. Let our AI handle the heavy lifting while you focus on learning."
          animationData={booksAnimation}
          imageSide="right"
        >
            <FeatureList items={[
                { icon: Upload, text: "Upload PDFs, lecture slides, images, or audio." },
                { icon: Zap, text: "AI instantly generates flashcards & quizzes." },
                { icon: Brain, text: "Scientific FSRS algorithm prepares your schedule." },
            ]} />
        </FeatureRow>

        {/* Step 2: Output / Mastery (Consolidated) */}
        <FeatureRow
          title="2. Addictive Mastery"
          description="Turn studying into a game. Track your progress, earn streaks, and never forget a concept again."
          animationData={quizAnimation}
          imageSide="left"
        >
            <FeatureList items={[
                { icon: Layers, text: "5 Fun Modes: Match, MCQ, True/False & more." },
                { icon: Trophy, text: "Build daily streaks and track mastery stats." },
                { icon: LineChart, text: "Review only what you're about to forget." },
            ]} />
        </FeatureRow>
      </div>
    </section>
  );
};
