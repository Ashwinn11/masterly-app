'use client';

import React from 'react';
import { InteractiveFlashcardDemo } from './InteractiveFlashcardDemo';
import { motion } from 'framer-motion';

export const DemoSection = () => {
  return (
    <section className="py-24 bg-white/50 border-y-4 border-dashed border-foreground/5 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="inline-block px-4 py-1 mb-4 border-crayon-sm bg-white text-info font-bold rotate-[-1deg] font-handwritten">
                    Try it yourself! 👇
                </span>
                <h2 className="text-5xl md:text-6xl font-black font-handwritten text-foreground mb-4">
                    See <span className="hand-drawn-highlight">Masterly</span> in Action
                </h2>
                <p className="text-xl text-info/70 font-handwritten italic max-w-2xl mx-auto">
                    Experience the smooth animations and focus-driven design without signing up.
                </p>
            </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
             <InteractiveFlashcardDemo />
        </div>
      </div>
    </section>
  );
};
