'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What types of files can I upload?",
    answer: "Masterly AI supports documents (PDF, Word, PowerPoint), images (JPG, PNG), audio files (MP3, M4A), and youtube links. You can upload materials in any language, and our AI will process them into study-ready content.",
  },
  {
    question: "How accurate are the AI-generated study materials?",
    answer: "We use our Always Works™ validation system, which includes multiple AI accuracy checks, content verification, and user feedback loops. Every flashcard, quiz, and summary goes through rigorous validation before reaching you.",
  },
  {
    question: "How does the spaced repetition scheduling work?",
    answer: "We use the cutting-edge FSRS algorithm, which is significantly more accurate than traditional SM2 systems. It calculates the optimal review time for each card based on your memory, ensuring you retain knowledge in the shortest amount of study time.",
  },
  {
    question: "What makes Masterly AI different from other flashcard apps?",
    answer: "Unlike basic flashcard apps, we offer 5 distinct learning modes: Multiple Choice, True/False, Match Pairs, Ordering, and classic Flashcards. Combined with our FSRS-powered 'Play Mode', it's the most comprehensive study toolkit ever built.",
  },
  {
    question: "Is my study data secure and private?",
    answer: "Absolutely. All your uploads and study data are encrypted end-to-end. We never share your personal information or study materials with third parties.",
  },
  {
    question: "Can I use Masterly AI on multiple devices?",
    answer: "Yes! Masterly AI is available on both Web and iOS. Your progress, streaks, and study materials stay perfectly in sync across all your devices so you can learn anywhere.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-background font-handwritten">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">
              Your Questions, Answered
            </h2>
            <p className="text-2xl text-info font-bold italic opacity-80">
              Everything you need to know about studying smarter.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-6 mb-20">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-[24px] px-8 border-[3px] border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] transition-all duration-200"
              >
                <AccordionTrigger className="text-left text-2xl font-black hover:text-primary py-8 decoration-primary/20 decoration-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-info font-bold text-xl leading-snug pb-8 opacity-90 italic">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Secondary CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02, rotate: 0.5 }}
          transition={{ duration: 0.5, type: "spring" }}
          viewport={{ once: true }}
          className="bg-primary rounded-[3rem] border-[4px] border-foreground p-10 md:p-16 text-center text-white shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[url('/icon.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="relative z-10">
            <h3 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Ready to Transform <br/>Your Grades?
            </h3>
            <p className="text-2xl mb-12 text-white/90 max-w-2xl mx-auto font-bold italic">
              Join 10,000+ students who are studying smarter with AI-powered learning.
            </p>
            
            <Button
              variant="secondary"
              size="lg"
              className="bg-accent text-foreground hover:bg-accent/90 rounded-2xl px-12 h-16 text-2xl font-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-none"
              asChild
            >
              <a href="/login">
                Get Started Free
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
