'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";
import { motion } from "framer-motion";

import { LottieAnimation } from "@/components/ui/LottieAnimation";
import thinkingAnimation from "@/assets/animations/Learning.json";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-20 pb-10 lg:pt-32 lg:pb-20">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />
      
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-duolingo-green/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column: Text & CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0"
          >
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance"
            >
              <span className="text-primary">Masterly AI</span> — The free, fun, and effective way to <span className="text-duolingo-green">master your studies.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-balance"
            >
              Ditch the boring textbooks. Masterly AI turns your notes into bite-sized lessons, quizzes, and flashcards instantly.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Button 
                size="lg" 
                className={cn(
                  "h-14 px-10 rounded-2xl-custom text-lg font-bold uppercase tracking-wide transition-all",
                  "bg-primary text-white shadow-3d hover:bg-primary/90 active:translate-y-[4px] active:shadow-none"
                )}
                asChild
              >
                <a href="/login">
                  Get Started
                </a>
              </Button>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://apps.apple.com/app/masterly-ai-flashcards-quiz/id6753760295"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-14"
                />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Image (Mascot) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            className="flex-1 w-full max-w-lg lg:max-w-xl relative"
          >
            <div className="relative aspect-square flex items-center justify-center">
              {/* Main Mascot Placeholder */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <LottieAnimation 
                  animationData={thinkingAnimation} 
                  className="w-full h-full drop-shadow-2xl"
                />
              </motion.div>
              
              {/* Floating Elements (Decorations) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="absolute top-10 right-0 hidden md:block"
              >
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [6, 8, 6] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl-custom shadow-card transform rotate-6"
                >
                  <span className="text-4xl">🅰️+</span>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                className="absolute bottom-10 left-0 hidden md:block"
              >
                <motion.div
                   animate={{ y: [0, -10, 0], rotate: [-6, -4, -6] }}
                   transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                   className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl-custom shadow-card transform -rotate-6"
                >
                 <Flame className="w-10 h-10 text-orange-500" />
               </motion.div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
