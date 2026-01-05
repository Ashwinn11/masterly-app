'use client';

import { cn } from "@/lib/utils";
import { Brain, FileText, LineChart, Upload } from "lucide-react";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { motion } from "framer-motion";
import booksAnimation from "@/assets/animations/Books-stack.json";
import finishingStudiesAnimation from "@/assets/animations/finish_study.json";
import quizAnimation from "@/assets/animations/quiz.json";
import examAnimation from "@/assets/animations/exam.json";

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
            className="flex-1 text-center md:text-left space-y-8"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="inline-flex p-4 rounded-2xl-custom bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-sm mb-2"
            >
              <Icon className="h-10 w-10 text-primary" />
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
              {title}
            </h3>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
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
                <LottieAnimation 
                  animationData={animationData} 
                  className="w-full h-full drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const Features = () => {
  return (
    <section className="bg-background relative" id="features">
      <div className="space-y-0">
        <FeatureRow
          title="Everything you need, in one place."
          description="Upload PDFs, images, record lectures, or paste YouTube links. We handle it all."
          icon={Upload}
          animationData={booksAnimation}
          imageSide="right"
          bgColor="bg-transparent"
        />

        <FeatureRow
          title="Notes that write themselves."
          description="AI turns your chaos into structured, easy-to-read study guides instantly."
          icon={FileText}
          animationData={finishingStudiesAnimation}
          imageSide="left"
          bgColor="bg-white/5"
        />

        <FeatureRow
          title="Study like a scientist."
          description="Generate Flashcards & Quizzes instantly. Master topics with Spaced Repetition."
          icon={Brain}
          animationData={quizAnimation}
          imageSide="right"
          bgColor="bg-transparent"
        />

        <FeatureRow
          title="Watch your grades soar."
          description="Daily exam practice & detailed report cards to track your success."
          icon={LineChart}
          animationData={examAnimation}
          imageSide="left"
          bgColor="bg-white/5"
        />
      </div>
    </section>
  );
};
