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
  bgColor = "bg-background"
}: {
  title: string;
  description: string;
  animationData: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  imageSide?: "left" | "right";
  className?: string;
  bgColor?: string;
}) => {
  return (
    <div className={cn("py-20 md:py-32 group overflow-hidden", bgColor, className)}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "flex flex-col gap-12 md:gap-24 items-center",
          imageSide === "left" ? "md:flex-row-reverse" : "md:flex-row"
        )}>
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: imageSide === "left" ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
            className="flex-1 text-center md:text-left space-y-8 font-handwritten"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="inline-flex p-5 rounded-2xl border-[3px] border-foreground bg-primary/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] mb-2"
            >
              <Icon className="h-10 w-10 text-primary" />
            </motion.div>
            <h3 className="text-5xl md:text-6xl font-black text-foreground tracking-tight leading-tight">
              {title}
            </h3>
            <p className="text-2xl md:text-3xl text-info leading-tight max-w-lg mx-auto md:mx-0 font-bold opacity-80 italic">
              {description}
            </p>
          </motion.div>

          {/* Animation Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: imageSide === "left" ? -50 : 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", bounce: 0.3 }}
            className="flex-1 w-full max-w-md md:max-w-none"
          >
            <div className="relative aspect-square md:aspect-[4/3] w-full flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full h-full"
              >
                <>
                  {animationData && (
                    <LottieAnimation
                      animationData={animationData}
                      className="w-full h-full drop-shadow-2xl"
                    />
                  )}
                </>
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
    <section className="bg-background relative" id="features">
      <div className="space-y-0">
        <FeatureRow
          title="Upload anything, learn everything."
          description="Transform PDFs, lecture recordings, images, or notes into structured study sets instantly with AI."
          icon={Upload}
          animationData={booksAnimation}
          imageSide="right"
          bgColor="bg-background"
        />

        <FeatureRow
          title="5 Fun Ways to Master Topics"
          description="Ditch the monotony. Switch between MCQ, True/False, Match Pairs, Ordering, and Flashcards for a fun learning experience."
          icon={FileText}
          animationData={finishingStudiesAnimation}
          imageSide="left"
          bgColor="bg-background"
        />

        <FeatureRow
          title="Scientifically Proven Results"
          description="Powered by the FSRS Spaced Repetition algorithm. Our 'Play Mode' schedules your reviews at the optimal time for long-term memory."
          icon={Brain}
          animationData={quizAnimation}
          imageSide="right"
          bgColor="bg-background"
        />

        <FeatureRow
          title="Build a Learning Streak"
          description="Daily exam practice & detailed stats help you track your mastery. Stay consistent and watch your grades soar."
          icon={LineChart}
          animationData={examAnimation}
          imageSide="left"
          bgColor="bg-background"
        />
      </div>
    </section>
  );
};
