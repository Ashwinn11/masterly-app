'use client';

import { Mail, Heart, Sparkles, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { motion } from "framer-motion";

export const Footer = () => {
  const { user } = useAuth();

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-paper-texture py-24 relative overflow-hidden font-handwritten border-t-4 border-foreground/10"
    >
      {/* Background scribbles */}
      <div className="absolute inset-0 bg-notebook-paper opacity-20 pointer-events-none" />
      <div className="absolute top-10 right-10 opacity-10 rotate-12">
        <Sparkles className="w-32 h-32 text-primary" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-5 gap-16 lg:gap-24 mb-20">
          {/* Brand */}
          <div className="md:col-span-2 space-y-8">
            <Link href="/" className="block group">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 border-crayon bg-white p-2 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <img src="/icon.png" alt="Masterly AI" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-5xl font-black tracking-tight text-primary">Masterly AI</h3>
              </div>
            </Link>
            <p className="text-info font-bold text-2xl italic leading-relaxed max-w-sm">
              The free, fun, and <span className="hand-drawn-highlight">effective</span> way to learn anything. AI-powered flashcards, quizzes, and spaced repetition.
            </p>
            
            <div className="flex items-center gap-4 text-xl font-black text-foreground/40 uppercase tracking-[0.2em]">
              <span className="w-4 h-4 rounded-full bg-success animate-wiggle"></span>
              Systems Operational
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-8">
            <h4 className="font-black text-3xl text-foreground relative inline-block">
              Product
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-accent rotate-[-1deg]" />
            </h4>
            <ul className="space-y-6 text-2xl font-bold text-info italic">
              <li>
                <Link href="/#features" className="hover:text-primary hover:translate-x-2 transition-all inline-block">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-primary hover:translate-x-2 transition-all inline-block">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-primary hover:translate-x-2 transition-all inline-block">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-8">
             <h4 className="font-black text-3xl text-foreground relative inline-block">
              Legal
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-secondary rotate-[1deg]" />
            </h4>
            <ul className="space-y-6 text-2xl font-bold text-info italic">
              <li>
                <Link href="/help" className="hover:text-primary hover:translate-x-2 transition-all inline-block">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary hover:translate-x-2 transition-all inline-block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary hover:translate-x-2 transition-all inline-block">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="font-black text-3xl text-foreground relative inline-block">
              Contact
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary rotate-[-2deg]" />
            </h4>
            <a
              href="mailto:support@masterlyapp.in"
              className="flex items-center gap-3 text-info hover:text-primary transition-colors text-2xl font-bold italic underline decoration-wavy decoration-accent decoration-2 underline-offset-8"
            >
              <Mail className="h-7 w-7" />
              support@masterlyapp.in
            </a>
            
            <div className="pt-6">
              <p className="text-lg font-black text-foreground/40 mb-6 uppercase tracking-widest">Download the app</p>
              <a
                href="https://apps.apple.com/app/masterly-ai-flashcards-quiz/id6753760295"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-crayon-sm p-1 bg-white hover:scale-105 transition-transform shadow-xl"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-12"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t-2 border-dashed border-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-xl font-bold text-info/60 italic">
            <p>© 2026 Masterly AI. Built with pencils & pixels.</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2">
                Made with <Heart className="w-6 h-6 text-secondary fill-secondary animate-pulse" /> for students.
              </p>
              <div className="w-8 h-8 rotate-12 opacity-40">
                <Star className="w-full h-full text-accent fill-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

