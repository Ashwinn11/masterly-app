'use client';

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Sarah M.",
    role: "Pre-med Student",
    content: "The AI study sets save me hours every week. I love how it turns my PDFs into interactive quizzes instantly.",
    stars: 5,
    color: "bg-[#FEF9C3]", // Soft Yellow
    rotate: "rotate-[-2deg]",
  },
  {
    name: "Michael R.",
    role: "Engineering Major",
    content: "The new Play Mode with FSRS is a game changer. It knows exactly when I'm about to forget a concept.",
    stars: 5,
    color: "bg-[#DBEAFE]", // Soft Blue
    rotate: "rotate-[3deg]",
  },
  {
    name: "Jessica L.",
    role: "Law Student",
    content: "Better than Quizlet. Switching between flashcards, MCQs, and matching keeps me way more engaged.",
    stars: 5,
    color: "bg-[#DCFCE7]", // Soft Green
    rotate: "rotate-[-1deg]",
  },
  {
    name: "Alex K.",
    role: "High School Senior",
    content: "Used this for my AP exams and got 5s on all of them. Highly recommend!",
    stars: 5,
    color: "bg-[#FFEDD5]", // Soft Orange
    rotate: "rotate-[2deg]",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-paper-texture relative overflow-hidden">
      {/* Background scribbles */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg className="absolute top-10 left-[10%] w-24 h-24 text-primary" viewBox="0 0 100 100">
           <path d="M10,10 Q50,0 90,10 Q100,50 90,90 Q50,100 10,90 Q0,50 10,10" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black font-handwritten text-foreground mb-6"
          >
            Student <span className="hand-drawn-highlight">Wall of Fame</span>
          </motion.h2>
          <p className="text-2xl font-handwritten italic text-info font-bold opacity-80">
            Join 10,000+ students studying smarter, not harder.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 50, rotate: 0 }}
              className={cn(
                "p-8 relative aspect-square flex flex-col justify-between border-crayon shadow-xl transition-all duration-300",
                review.color,
                review.rotate
              )}
            >
              {/* Pushpin effect */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary shadow-inner border-crayon-sm z-20" />
              
              <div className="space-y-4 pt-4">
                <div className="flex gap-1">
                  {[...Array(review.stars)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl font-handwritten font-bold text-foreground leading-tight italic">
                  "{review.content}"
                </p>
              </div>

              <div className="pt-6 border-t border-foreground/10">
                <div className="font-black text-xl font-handwritten">{review.name}</div>
                <div className="text-sm font-handwritten font-bold text-info uppercase tracking-wider">{review.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Decoration */}
        <div className="mt-20 text-center">
           <motion.div
             animate={{ rotate: [0, 5, -5, 0] }}
             transition={{ repeat: Infinity, duration: 5 }}
             className="inline-block border-crayon bg-white p-4 font-handwritten font-black text-3xl shadow-lg"
           >
             Ready to join them? 🚀
           </motion.div>
        </div>
      </div>
    </section>
  );
};
