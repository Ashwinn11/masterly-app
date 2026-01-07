"use client";

import { motion } from "framer-motion";

const universities = [
  "Stanford", "MIT", "Harvard", "Berkeley", "UCLA", "NYU", "Oxford", "Cambridge", "Yale", "Princeton"
];

export const SocialProof = () => {
  return (
    <section className="py-10 border-b border-border/50 bg-background overflow-hidden font-handwritten">
      <div className="container mx-auto px-4 text-center mb-8">
        <p className="text-lg font-black text-info uppercase tracking-widest opacity-80">
          Trusted by students at
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <motion.div 
          className="flex gap-12 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-25%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 20, 
            repeatType: "loop" 
          }}
        >
           {/* We need enough content to loop smoothly. */}
           {[...universities, ...universities, ...universities, ...universities].map((uni, i) => (
            <span 
              key={i} 
              className="text-3xl font-black text-info/30 hover:text-primary transition-colors duration-300 cursor-default select-none mx-6"
            >
              {uni}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};