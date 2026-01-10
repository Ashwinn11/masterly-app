'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BackButton } from '@/components/ui/BackButton';
import { Mail, GraduationCap } from 'lucide-react';

export default function TermsPage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-paper-texture py-12 px-4 relative overflow-hidden">
      {/* Global Background Elements */}
      <div className="absolute inset-0 bg-notebook-paper opacity-30 pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-8 rotate-[-1deg]">
          <BackButton />
        </div>
        
        <div className="bg-white border-crayon shadow-2xl p-8 md:p-16 animate-fade-in-up relative overflow-hidden">
          {/* Spiral binder holes on the left */}
          <div className="absolute top-0 bottom-0 left-4 w-8 flex flex-col justify-around py-12 opacity-20 hidden md:flex">
             {[...Array(15)].map((_, i) => (
               <div key={i} className="w-6 h-6 rounded-full border-2 border-foreground" />
             ))}
          </div>

          <div className="md:pl-12">
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-primary font-handwritten tracking-tight">
              Terms of <span className="hand-drawn-highlight">Service</span>
            </h1>
            <p className="text-2xl text-info font-handwritten font-bold mb-12 opacity-70 italic">Last Updated: January 7, 2026</p>
            
            <div className="font-handwritten text-xl md:text-2xl text-foreground/80 space-y-12 leading-relaxed">
              <p className="text-3xl font-black italic text-foreground border-l-8 border-accent pl-6 py-2 rotate-[-0.5deg]">
                Welcome to Masterly. By using our learning application, you agree to these Terms of Service.
              </p>

              <section className="space-y-4">
                <h2 className="text-4xl font-black text-primary underline decoration-accent decoration-4 underline-offset-8">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using Masterly, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our application.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-4xl font-black text-primary underline decoration-accent decoration-4 underline-offset-8">2. Description of Service</h2>
                <p>Masterly is a learning application that provides:</p>
                <ul className="list-disc pl-8 space-y-4 mt-4 font-bold">
                  <li>Spaced repetition learning tools</li>
                  <li>Question generation from study materials</li>
                  <li>Progress tracking and analytics</li>
                  <li>Flashcard creation and review</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-4xl font-black text-primary underline decoration-accent decoration-4 underline-offset-8">3. User Responsibilities</h2>
                <p>As a user, you agree to:</p>
                <ul className="list-disc pl-8 space-y-4 mt-4 font-bold">
                  <li>Provide accurate account information</li>
                  <li>Maintain the security of your account</li>
                  <li>Not use the service for any illegal purpose</li>
                  <li>Not upload content that violates intellectual property rights</li>
                </ul>
              </section>

              <section className="bg-secondary/5 p-10 border-crayon-sm border-dashed border-secondary/30 transform rotate-1">
                <h2 className="text-3xl font-black text-secondary mb-4">Important Disclaimer</h2>
                <p className="uppercase text-xl font-black leading-tight">
                  THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE UNINTERRUPTED OR ERROR-FREE OPERATION.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-4xl font-black text-primary underline decoration-accent decoration-4 underline-offset-8">4. Indian Governing Law</h2>
                <p>
                  These terms shall be governed by the laws of India. Any disputes shall be resolved in the competent courts of India.
                </p>
              </section>

              <div className="pt-16 border-t-4 border-dashed border-foreground/10">
                <p className="font-black text-2xl mb-6">Questions? Reach out at:</p>
                
                <a 
                  href="mailto:support@masterlyapp.in" 
                  className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-white text-2xl font-black border-crayon shadow-xl hover:-translate-y-1 transition-transform"
                >
                  <Mail className="w-8 h-8" />
                  support@masterlyapp.in
                </a>

                <div className="mt-20 p-10 bg-accent/10 border-crayon transform rotate-[-1deg] relative">
                  <div className="washi-tape bg-primary/20 w-32 h-8 top-[-15px] left-[10%] rotate-3" />
                  <div className="flex items-center gap-6 mb-4">
                    <GraduationCap className="w-12 h-12 text-primary" />
                    <span className="text-3xl font-black text-foreground">Thank you for choosing Masterly!</span>
                  </div>
                  <p className="text-2xl italic text-info font-bold">Happy learning! 🎓</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
