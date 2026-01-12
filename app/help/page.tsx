'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Mail, Shield, FileText, ChevronRight, GraduationCap } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';

export default function HelpPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openEmail = () => {
    window.open('mailto:support@masterlyapp.in?subject=Masterly%20App%20Support', '_blank');
  };

  const helpfulLinks = [
    {
      title: 'Privacy Policy',
      icon: Shield,
      href: '/privacy',
    },
    {
      title: 'Terms of Service',
      icon: FileText,
      href: '/terms',
    },
  ];

  const commonIssues = [
    {
      title: 'How to create flashcards?',
      description:
        'Upload any material (PDF, text, image) and we\'ll automatically generate questions and flashcards for you.',
    },
    {
      title: 'How does the streak work?',
      description:
        'Answer questions in Play Mode daily to maintain your streak. Missing a day resets it!',
    },
    {
      title: 'What\'s the difference between Practice and Play?',
      description:
        'Practice mode lets you review materials without affecting your review schedule. Play Mode uses spaced repetition for long-term learning.',
    },
  ];

  return (
    <div className="min-h-screen bg-paper-texture py-12 px-4 relative overflow-hidden">
      {/* Global Background Elements */}
      <div className="absolute inset-0 bg-notebook-paper opacity-30 pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-8 rotate-[-0.5deg]">
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
              Help & <span className="hand-drawn-highlight">Support</span>
            </h1>
            <p className="text-2xl text-info font-handwritten font-bold mb-12 opacity-70 italic">
              We're here to help you make the most of Masterly AI
            </p>

            <div className="font-handwritten text-xl md:text-2xl text-foreground/80 space-y-12 leading-relaxed">
              {/* Contact Card */}
              <div className="bg-primary/5 p-10 border-crayon-sm border-dashed border-primary/20 rotate-[0.5deg]">
                <div className="w-20 h-20 bg-white border-crayon rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <Mail className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-4xl font-black text-foreground mb-4 text-center">
                  Need Help? We're Here!
                </h2>
                <p className="text-xl text-info font-bold italic mb-8 max-w-md mx-auto text-center">
                  We're happy to help you with any questions or issues you might have.
                </p>

                <a
                  href="mailto:support@masterlyapp.in?subject=Masterly%20App%20Support"
                  className="flex items-center justify-center gap-4 px-10 py-5 bg-primary text-white text-2xl font-black border-crayon shadow-xl hover:-translate-y-1 transition-transform"
                >
                  <Mail className="w-8 h-8" />
                  Contact Support
                </a>
              </div>

              {/* Helpful Links */}
              <section className="space-y-4">
                <h2 className="text-4xl font-black text-primary underline decoration-accent decoration-4 underline-offset-8">
                  Helpful Links
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {helpfulLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="bg-white border-crayon p-6 shadow-lg hover:-translate-y-1 transition-transform block"
                    >
                      <div className="flex items-center gap-4">
                        <link.icon className="w-8 h-8 text-primary" />
                        <span className="text-2xl font-bold text-info italic flex-1">
                          {link.title}
                        </span>
                        <ChevronRight className="w-8 h-8 text-accent" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section className="space-y-4">
                <h2 className="text-4xl font-black text-primary underline decoration-accent decoration-4 underline-offset-8">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {commonIssues.map((issue, index) => (
                    <div
                      key={index}
                      className={`p-6 bg-white border-crayon-sm shadow-sm ${index % 2 === 0 ? 'rotate-[-0.5deg]' : 'rotate-[0.5deg]'}`}
                    >
                      <h3 className="text-2xl font-black text-foreground mb-2">
                        {issue.title}
                      </h3>
                      <p className="text-xl text-info font-bold italic">
                        {issue.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="pt-16 border-t-4 border-dashed border-foreground/10">
                <p className="font-black text-2xl mb-6">Have more questions? Reach out at:</p>

                <a
                  href="mailto:support@masterlyapp.in"
                  className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-white text-2xl font-black border-crayon shadow-xl hover:-translate-y-1 transition-transform"
                >
                  <Mail className="w-8 h-8" />
                  support@masterlyapp.in
                </a>

                <div className="mt-20 p-10 bg-accent/10 border-crayon transform rotate-[-1deg] relative">
                  <div className="flex items-center gap-6 mb-4">
                    <GraduationCap className="w-12 h-12 text-primary" />
                    <span className="text-3xl font-black text-foreground">Thank you for using Masterly!</span>
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