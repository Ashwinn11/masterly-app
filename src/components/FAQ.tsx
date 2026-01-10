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
    <section id="faq" className="py-24 bg-paper-texture font-handwritten relative">
       {/* Spiral binder visual on the left for the whole section */}
       <div className="absolute left-4 top-0 bottom-0 w-8 hidden lg:flex flex-col justify-around py-20 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-6 h-6 rounded-full border-2 border-foreground" />
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              Your <span className="hand-drawn-highlight">Questions</span>, Answered
            </h2>
            <p className="text-2xl text-info font-bold italic opacity-80">
              Everything you need to know about studying smarter.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-8 mb-24">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white px-8 border-crayon shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-rotate-1"
              >
                <AccordionTrigger className="text-left text-2xl md:text-3xl font-black hover:text-primary py-8 decoration-primary/20 hover:no-underline group">
                  <span className="group-hover:hand-drawn-highlight transition-all">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-info font-bold text-xl md:text-2xl leading-relaxed pb-8 opacity-90 italic border-t-2 border-dashed border-foreground/5 pt-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Secondary CTA - Designed like a 'Scrapbook Page' */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          className="relative p-12 md:p-20 bg-primary text-white border-crayon shadow-2xl overflow-hidden"
        >
          {/* Washi tape decor */}
          <div className="washi-tape bg-accent w-32 h-10 top-[-20px] left-[10%] rotate-[-5deg]" />
          <div className="washi-tape bg-secondary w-32 h-10 bottom-[-20px] right-[10%] rotate-[-175deg] top-auto" />
          
          <div className="absolute inset-0 bg-notebook-paper opacity-10 mix-blend-overlay"></div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-5xl md:text-7xl font-black mb-10 leading-tight">
              Ready to <br/><span className="text-accent italic underline decoration-wavy decoration-accent decoration-2 underline-offset-8">Ace</span> Your Exams?
            </h3>
            <p className="text-2xl md:text-3xl mb-14 text-white/90 max-w-2xl mx-auto font-bold italic leading-relaxed">
              Join 10,000+ students who are crushing their goals with AI-powered study sessions.
            </p>
            
            <Button
              variant="secondary"
              size="lg"
              className="bg-accent text-foreground hover:bg-accent/90 border-crayon rounded-full px-16 h-20 text-3xl font-black shadow-2xl hover:-translate-y-2 active:translate-y-0 transition-all font-handwritten"
              asChild
            >
              <a href="/login">
                Get Started Free!
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
