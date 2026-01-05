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
    answer: "We use the proven SM2 algorithm, which schedules flashcard reviews at scientifically optimal intervals based on your performance. Cards you struggle with appear more frequently, while mastered cards are reviewed just before you'd forget them.",
  },
  {
    question: "Is my study data secure and private?",
    answer: "Absolutely. All your uploads and study data are encrypted end-to-end. We never share your personal information or study materials with third parties.",
  },
  {
    question: "Can I use Masterly AI for multiple exams at once?",
    answer: "Yes! Exam Workspaces let you organize study materials by exam type (SAT, ACT, AP, etc.). Each workspace has its own progress tracking, dedicated exam report cards, and countdown timers.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Your Questions, Answered
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about studying smarter.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4 mb-20">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-2xl px-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
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
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5, type: "spring" }}
          viewport={{ once: true }}
          className="bg-primary rounded-[2.5rem] p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[url('/icon.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Grades?
            </h3>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Join 10,000+ students who are studying smarter with AI-powered learning.
            </p>
            
            <Button
              variant="secondary"
              size="lg"
              className="btn-pop bg-white text-primary hover:bg-gray-50 rounded-full px-8 h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
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
