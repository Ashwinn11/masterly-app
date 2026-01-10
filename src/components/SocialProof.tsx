"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const universities = [
  { name: "Stanford", color: "text-primary border-primary" },
  { name: "MIT", color: "text-secondary border-secondary" },
  { name: "Harvard", color: "text-info border-info" },
  { name: "Berkeley", color: "text-accent border-accent" },
  { name: "UCLA", color: "text-primary border-primary" },
  { name: "NYU", color: "text-secondary border-secondary" },
  { name: "Oxford", color: "text-info border-info" },
  { name: "Cambridge", color: "text-accent border-accent" },
  { name: "Yale", color: "text-primary border-primary" },
  { name: "Princeton", color: "text-secondary border-secondary" }
];

export const SocialProof = () => {
  return (
    <section className="py-16 bg-paper-texture border-y-2 border-foreground/5 overflow-hidden font-handwritten">
      <div className="container mx-auto px-4 text-center mb-12">
        <p className="text-xl font-black text-foreground/40 uppercase tracking-[0.2em]">
          Trusted by students at
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <motion.div 
          className="flex gap-12 items-center whitespace-nowrap py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 30, 
          }}
        >
           {/* We need enough content to loop smoothly. */}
           {[...universities, ...universities].map((uni, i) => (
            <div 
              key={i} 
              className={cn(
                "inline-block px-8 py-3 border-crayon-sm transform transition-all duration-300 hover:scale-110 cursor-default",
                i % 2 === 0 ? "rotate-2" : "-rotate-2",
                uni.color,
                "bg-white/50 backdrop-blur-sm"
              )}
            >
              <span className="text-3xl font-black uppercase tracking-wider">
                {uni.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Decorative pencil scribble underline */}
      <div className="container mx-auto px-4 mt-8 flex justify-center opacity-20">
        <svg width="300" height="20" viewBox="0 0 300 20" fill="none" className="text-foreground">
          <path d="M5 10 Q75 15 150 10 Q225 5 295 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  );
};