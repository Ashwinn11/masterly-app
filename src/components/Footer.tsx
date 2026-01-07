'use client';

import { Mail, Heart, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
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
      className="bg-primary text-white py-20 relative overflow-hidden font-handwritten"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="block group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-black tracking-tight">Masterly AI</h3>
              </div>
            </Link>
            <p className="text-white/90 max-w-sm text-2xl font-bold italic leading-tight">
              The free, fun, and effective way to learn anything. AI-powered flashcards, quizzes, and spaced repetition.
            </p>
            
            <div className="flex items-center gap-3 text-lg font-black text-white/80 uppercase tracking-widest">
              <span className="w-3 h-3 rounded-full bg-accent animate-pulse"></span>
              Systems Operational
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-black mb-8 text-2xl underline decoration-accent/50 decoration-4 underline-offset-8">Product</h4>
            <ul className="space-y-4 text-xl font-bold text-white/90 italic">
              <li>
                <Link href="/#features" className="hover:text-accent transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-accent transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-black mb-8 text-2xl underline decoration-accent/50 decoration-4 underline-offset-8">Legal</h4>
            <ul className="space-y-4 text-xl font-bold text-white/90 italic">
              <li>
                <Link href="/terms" className="hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black mb-8 text-2xl underline decoration-accent/50 decoration-4 underline-offset-8">Contact</h4>
            <a
              href="mailto:support@masterlyapp.in"
              className="flex items-center gap-2 text-white/90 hover:text-accent transition-colors text-xl font-bold italic underline decoration-2 underline-offset-4"
            >
              <Mail className="h-6 w-6" />
              support@masterlyapp.in
            </a>
            
            <div className="mt-10">
              <p className="text-lg font-black text-white/70 mb-4 uppercase tracking-tighter">Download the app</p>
              <a
                href="https://apps.apple.com/app/masterly-ai-flashcards-quiz/id6753760295"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:scale-105 transition-transform duration-300"
                aria-label="Download Masterly AI on the App Store"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-14"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-4 border-white/10 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-lg font-bold text-white/70 italic">
            <p>© 2026 Masterly AI. Built for students.</p>
            <p className="text-center md:text-right flex items-center gap-2">
              Made with <Heart className="w-6 h-6 text-secondary fill-secondary" aria-hidden="true" /> for students everywhere.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

