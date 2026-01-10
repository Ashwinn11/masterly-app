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
    <div className="min-h-screen bg-paper-texture py-12 px-4 relative overflow-hidden">
      {/* Global Background Elements */}
      <div className="absolute inset-0 bg-notebook-paper opacity-30 pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-8 rotate-[1deg]">
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
              Privacy <span className="hand-drawn-highlight">Policy</span>
            </h1>
            <p className="text-2xl text-info font-handwritten font-bold mb-12 opacity-70 italic">Last Updated: January 7, 2026</p>
            
            <div className="font-handwritten text-xl md:text-2xl text-foreground/80 space-y-12 leading-relaxed">
              <p className="text-3xl font-black italic text-foreground bg-primary/5 p-10 border-crayon-sm border-dashed border-primary/20 rotate-[-1deg]">
                At Masterly, your privacy is our priority. We are committed to protecting your data while you learn.
              </p>

              <section className="space-y-4">
                <h2 className="text-4xl font-black text-primary underline decoration-accent decoration-4 underline-offset-8">1. Info We Collect</h2>
                <ul className="list-disc pl-8 space-y-4 mt-4 font-bold">
                  <li><span className="text-primary">Account:</span> Name and email from your login provider.</li>
                  <li><span className="text-primary">Content:</span> PDFs, images, and notes you upload.</li>
                  <li><span className="text-primary">Learning:</span> Quiz scores and study streaks.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-4xl font-black text-primary underline decoration-accent decoration-4 underline-offset-8">2. How We Use It</h2>
                <p>We use your information only to:</p>
                <ul className="list-disc pl-8 space-y-4 mt-4 font-bold">
                  <li>Personalize your learning experience.</li>
                  <li>Generate questions using AI from your notes.</li>
                  <li>Track progress across web and mobile apps.</li>
                </ul>
              </section>

              <section className="bg-info/5 p-10 border-crayon-sm border-dashed border-info/30 transform rotate-1">
                <h2 className="text-3xl font-black text-info mb-6 flex items-center gap-4">
                  <ShieldCheck className="w-10 h-10" />
                  Trusted Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xl">
                  <div className="p-6 bg-white border-crayon-sm shadow-sm rotate-[-1deg]">
                    <span className="font-black">OpenAI:</span> Question generation
                  </div>
                  <div className="p-6 bg-white border-crayon-sm shadow-sm rotate-[2deg]">
                    <span className="font-black">Google:</span> Transcription & OCR
                  </div>
                  <div className="p-6 bg-white border-crayon-sm shadow-sm rotate-[-2deg]">
                    <span className="font-black">Supabase:</span> Secure Database
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-4xl font-black text-primary underline decoration-accent decoration-4 underline-offset-8">3. Your Rights</h2>
                <p>You can always:</p>
                <ul className="list-disc pl-8 space-y-4 mt-4 font-bold">
                  <li>Download your data.</li>
                  <li>Correct your profile information.</li>
                  <li>Permanently delete your account and all data.</li>
                </ul>
              </section>

              <div className="pt-16 border-t-4 border-dashed border-foreground/10">
                <p className="font-black text-2xl mb-6 text-primary">Need help? Email us:</p>
                
                <a 
                  href="mailto:support@masterlyapp.in" 
                  className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-white text-2xl font-black border-crayon shadow-xl hover:-translate-y-1 transition-transform"
                >
                  <Mail className="w-8 h-8" />
                  support@masterlyapp.in
                </a>

                <p className="mt-20 text-info opacity-60 italic text-center font-black text-2xl">
                  Stay curious. Stay private. Happy studying! 📚
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
