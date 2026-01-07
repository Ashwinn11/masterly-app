'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BackButton } from '@/components/ui/BackButton';
import { Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <BackButton className="mb-8" />
        
        <div className="bg-card border-[3px] border-foreground rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] p-8 md:p-16 animate-fade-in-up">
          <h1 className="text-5xl font-black mb-4 text-primary font-handwritten">Privacy Policy</h1>
          <p className="text-xl text-info font-handwritten font-bold mb-10 opacity-70 italic">Last Updated: January 7, 2026</p>
          
          <div className="font-handwritten text-xl text-foreground/80 space-y-8 leading-relaxed">
            <p className="text-2xl font-bold italic text-foreground bg-primary/5 p-6 rounded-3xl border-2 border-dashed border-primary/10">
              At Masterly, your privacy is our priority. We are committed to protecting your data while you learn.
            </p>

            <section>
              <h2 className="text-3xl font-black text-primary mb-4 underline decoration-accent decoration-4">1. Info We Collect</h2>
              <ul className="list-disc pl-8 space-y-3 mt-4">
                <li><span className="font-bold">Account:</span> Name and email from your login provider.</li>
                <li><span className="font-bold">Content:</span> PDFs, images, and notes you upload.</li>
                <li><span className="font-bold">Learning:</span> Quiz scores and study streaks.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-black text-primary mb-4 underline decoration-accent decoration-4">2. How We Use It</h2>
              <p>We use your information only to:</p>
              <ul className="list-disc pl-8 space-y-3 mt-4">
                <li>Personalize your learning experience.</li>
                <li>Generate questions using AI from your notes.</li>
                <li>Track progress across web and mobile apps.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-black text-primary mb-4 underline decoration-accent decoration-4">3. Data Safety</h2>
              <p>
                Your data is stored securely on <span className="font-bold text-info">Supabase</span> servers. We never sell your personal information to third parties. Your uploaded materials are private and accessible only to you.
              </p>
            </section>

            <section className="bg-info/5 p-8 rounded-[32px] border-[3px] border-info/10">
              <h2 className="text-2xl font-black text-info mb-4 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8" />
                Third-Party Trusted Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                <div className="p-4 bg-card rounded-2xl border-2 border-foreground/5">
                  <span className="font-bold">OpenAI:</span> Question generation
                </div>
                <div className="p-4 bg-card rounded-2xl border-2 border-foreground/5">
                  <span className="font-bold">Google:</span> Transcription & OCR
                </div>
                <div className="p-4 bg-card rounded-2xl border-2 border-foreground/5">
                  <span className="font-bold">Supabase:</span> Secure Database
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-3xl font-black text-primary mb-4 underline decoration-accent decoration-4">4. Your Rights</h2>
              <p>You can always:</p>
              <ul className="list-disc pl-8 space-y-3 mt-4">
                <li>Download your data.</li>
                <li>Correct your profile information.</li>
                <li>Permanently delete your account and all data.</li>
              </ul>
            </section>

            <div className="pt-10 border-t-2 border-foreground/5">
              <p className="font-bold mb-4 text-primary">Need help? Email us:</p>
              
              <a 
                href="mailto:support@masterlyapp.in" 
                className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-white font-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-transform"
              >
                <Mail className="w-5 h-5" />
                support@masterlyapp.in
              </a>

              <p className="mt-12 text-info opacity-60 italic text-center font-bold">
                Stay curious. Stay private. Happy studying! 📚
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
