'use client';

import { Hero } from "@/components/Hero";
import { DemoSection } from "@/components/landing/DemoSection";
import { SocialProof } from "@/components/SocialProof";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen selection:bg-primary/20 selection:text-primary bg-paper-texture">
      <Hero />
      <DemoSection />
      <SocialProof />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
