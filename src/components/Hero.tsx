'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Flame, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { LottieAnimation } from "@/components/ui/LottieAnimation";

export const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-paper-texture pt-24 pb-16 lg:pt-32 lg:pb-24">
      
      {/* Background Notebook Lines */}
      <div className="absolute inset-0 bg-notebook-paper opacity-40 pointer-events-none" />
      
      {/* Decorative scattered elements */}
      <div className="absolute top-20 right-[10%] w-32 h-32 bg-accent/10 rounded-full blur-3xl opacity-50 animate-blob" />
      <div className="absolute bottom-20 left-[5%] w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-50 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: Text & CTA */}
          <motion.div 
            initial={{ opacity: 0, rotate: -1 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left space-y-10 max-w-2xl mx-auto lg:mx-0"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-block px-4 py-1 border-crayon-sm bg-accent/20 text-primary font-bold rotate-[-2deg]"
              >
                ✨ New: AI-Powered Flashcards
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground text-balance font-handwritten leading-[1.1]"
              >
                Master anything with <span className="hand-drawn-highlight text-primary">Masterly AI</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-2xl md:text-3xl text-info leading-relaxed text-balance font-handwritten italic opacity-90"
              >
                Ditch the boring notes. Turn your PDFs and audio into <span className="underline decoration-secondary decoration-wavy decoration-2 underline-offset-4">interactive games</span> that actually help you remember.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-6"
            >
              {/* Hand-drawn arrow annotation */}
              <div className="absolute -top-12 -right-8 hidden xl:block">
                <motion.div
                  animate={{ x: [0, 5, 0], y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="relative"
                >
                  <svg width="100" height="60" viewBox="0 0 100 60" fill="none" className="text-secondary rotate-[15deg]">
                    <path d="M10 10C30 15 50 30 80 50M80 50L70 55M80 50L85 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="absolute -top-4 -right-16 font-handwritten text-secondary font-bold rotate-[10deg] text-xl">
                    Try it free!
                  </span>
                </motion.div>
              </div>

              <Button 
                size="lg" 
                className={cn(
                  "h-20 px-14 rounded-full text-3xl font-black font-handwritten uppercase tracking-wider transition-all border-crayon bg-primary text-white hover:scale-105 active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]"
                )}
                asChild
              >
                <a href="/login" className="flex items-center gap-3">
                  Start Studying <ArrowRight className="w-8 h-8" />
                </a>
              </Button>
              
              <div className="flex flex-col items-center gap-2">
                <motion.a
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://apps.apple.com/app/masterly-ai-flashcards-quiz/id6753760295"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-crayon-sm p-1 bg-white"
                >
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="h-12"
                  />
                </motion.a>
                <span className="text-sm font-handwritten font-bold text-info/60">4.9/5 stars on App Store</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Image (The "Polaroid" Frame) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            className="flex-1 w-full max-w-lg lg:max-w-xl relative"
          >
            {/* Washi Tape */}
            <div className="washi-tape" />
            <div className="washi-tape bg-accent/40 rotate-[175deg] bottom-[-15px] top-auto left-[30%]" />

            <div className="relative aspect-[4/5] flex flex-col p-6 bg-white border-crayon shadow-2xl transform hover:rotate-0 transition-transform duration-500">
              {/* Main Mascot Area */}
              <div className="flex-1 relative bg-muted/30 border-crayon-sm overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-notebook-paper opacity-20" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="w-full h-full p-6"
                >
                  <LottieAnimation
                    animationPath="/animations/Learning.json"
                    className="w-full h-full drop-shadow-xl"
                  />
                </motion.div>
              </div>
              
              {/* Caption Area */}
              <div className="pt-6 pb-2 text-center">
                <p className="font-handwritten text-2xl font-bold text-foreground/80 leading-tight">
                  "Masterly helped me ace my finals!"
                  <br />
                  <span className="text-primary text-lg">- Sarah, Med Student</span>
                </p>
              </div>
              
              {/* Floating "Sticker" Elements */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute -top-8 -right-8 animate-wiggle"
              >
                <div className="bg-accent border-crayon-sm p-4 rotate-12 shadow-lg">
                  <span className="text-4xl">🅰️+</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -bottom-6 -left-10 animate-wiggle animation-delay-500"
              >
                <div className="bg-secondary text-white border-crayon-sm p-3 -rotate-12 shadow-lg flex items-center gap-2">
                 <Flame className="w-8 h-8" />
                 <span className="font-handwritten font-bold text-xl">15 Day Streak!</span>
               </div>
              </motion.div>
            </div>

            {/* Scribble background decoration */}
            <svg className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10 text-primary pointer-events-none" viewBox="0 0 200 200">
              <path d="M20,100 C20,20 180,20 180,100 C180,180 20,180 20,100 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
