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
    color: "bg-duolingo-green",
  },
  {
    name: "Michael R.",
    role: "Engineering Major",
    content: "The new Play Mode with FSRS is a game changer. It knows exactly when I'm about to forget a concept.",
    stars: 5,
    color: "bg-duolingo-macaw",
  },
  {
    name: "Jessica L.",
    role: "Law Student",
    content: "Better than Quizlet. Switching between flashcards, MCQs, and matching keeps me way more engaged.",
    stars: 5,
    color: "bg-duolingo-bee",
  },
  {
    name: "Alex K.",
    role: "High School Senior",
    content: "Used this for my AP exams and got 5s on all of them. Highly recommend!",
    stars: 5,
    color: "bg-duolingo-fox",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-background border-t-2 border-foreground/5 font-handwritten">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-balance tracking-tight">
            Loved by Students Everywhere
          </h2>
          <p className="text-2xl text-info font-bold max-w-2xl mx-auto italic opacity-80">
            Join thousands of students who are crushing their exams with Masterly AI.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reviews.map((review, i) => (
            <motion.div 
              key={i} 
              variants={item}
              whileHover={{ y: -8, rotate: i % 2 === 0 ? 1 : -1 }}
              className="p-8 rounded-[32px] bg-card border-[3px] border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-sm transform -rotate-3", review.color)}>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-black text-xl text-foreground">{review.name}</div>
                  <div className="text-sm font-bold text-info uppercase tracking-widest">{review.role}</div>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(review.stars)].map((_, j) => (
                  <Star key={j} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-xl text-foreground font-bold italic leading-tight">
                "{review.content}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
