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
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <BackButton className="mb-8" />
        
        <div className="bg-card border-[3px] border-foreground rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] p-8 md:p-16 animate-fade-in-up">
          <h1 className="text-5xl font-black mb-4 text-primary font-handwritten">Terms of Service</h1>
          <p className="text-xl text-info font-handwritten font-bold mb-10 opacity-70 italic">Last Updated: January 7, 2026</p>
          
          <div className="font-handwritten text-xl text-foreground/80 space-y-8 leading-relaxed">
            <p className="text-2xl font-bold italic text-foreground">
              Welcome to Masterly. By using our learning application, you agree to these Terms of Service.
            </p>

            <section>
              <h2 className="text-3xl font-black text-primary mb-4 underline decoration-accent decoration-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Masterly, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our application.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-black text-primary mb-4 underline decoration-accent decoration-4">2. Description of Service</h2>
              <p>Masterly is a learning application that provides:</p>
              <ul className="list-disc pl-8 space-y-3 mt-4">
                <li>Spaced repetition learning tools</li>
                <li>Question generation from study materials</li>
                <li>Progress tracking and analytics</li>
                <li>Flashcard creation and review</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-black text-primary mb-4 underline decoration-accent decoration-4">3. User Responsibilities</h2>
              <p>As a user, you agree to:</p>
              <ul className="list-disc pl-8 space-y-3 mt-4">
                <li>Provide accurate account information</li>
                <li>Maintain the security of your account</li>
                <li>Not use the service for any illegal purpose</li>
                <li>Not upload content that violates intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-black text-primary mb-4 underline decoration-accent decoration-4">4. Content & IP</h2>
              <ul className="list-disc pl-8 space-y-3 mt-4">
                <li>You retain ownership of content you upload</li>
                <li>You grant us license to process your content for learning purposes</li>
                <li>The application&apos;s design and algorithms are our proprietary property</li>
              </ul>
            </section>

            <section className="bg-secondary/5 p-6 rounded-3xl border-2 border-dashed border-secondary/20">
              <h2 className="text-2xl font-black text-secondary mb-2">Important Disclaimer</h2>
              <p className="uppercase text-lg font-bold">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE UNINTERRUPTED OR ERROR-FREE OPERATION.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-black text-primary mb-4 underline decoration-accent decoration-4">5. Indian Governing Law</h2>
              <p>
                These terms shall be governed by the laws of India. Any disputes shall be resolved in the competent courts of India.
              </p>
            </section>

            <div className="pt-10 border-t-2 border-foreground/5">
              <p className="font-bold mb-4">Questions? Reach out at:</p>
              
              <a 
                href="mailto:support@masterlyapp.in" 
                className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-white font-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-transform"
              >
                <Mail className="w-5 h-5" />
                support@masterlyapp.in
              </a>

              <div className="mt-12 p-8 bg-accent/10 rounded-[32px] border-[3px] border-accent/20 transform rotate-1">
                <div className="flex items-center gap-4 mb-3">
                  <GraduationCap className="w-8 h-8 text-primary" />
                  <span className="text-2xl font-black text-foreground">Thank you for choosing Masterly!</span>
                </div>
                <p className="text-xl italic text-info font-bold">Happy learning! 🎓</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
