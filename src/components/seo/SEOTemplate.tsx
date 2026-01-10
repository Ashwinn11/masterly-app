'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap, Brain, Files, Smartphone,
  Layers, CheckCircle, Image, RefreshCw,
  Layout, Cloud, Sparkles, Repeat,
  ShieldOff, Wand2, User, Activity,
  Calendar, BarChart, BrainCircuit,
  ArrowRight, BookOpen, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOPageData } from '@/lib/seo/content';
import { LottieAnimation } from '@/components/ui/LottieAnimation';
import { StructuredData, schemas } from './StructuredData';
import { Footer } from '@/components/Footer';
import { RelatedLinks } from './RelatedLinks';
import { generateInternalLinks } from '@/lib/seo/internal-linking';
import { StudyTimeCalculator } from './StudyTimeCalculator';
import { LearningStyleQuiz } from './LearningStyleQuiz';
import { CaseStudies } from './CaseStudies';

const iconMap: Record<string, any> = {
  Zap, Brain, Files, Smartphone,
  Layers, CheckCircle, Image, RefreshCw,
  Layout, Cloud, Sparkles, Repeat,
  ShieldOff, Wand2, User, Activity,
  Calendar, BarChart, BrainCircuit, BookOpen, FileText
};

interface SEOTemplateProps {
  data: SEOPageData;
}

import { Breadcrumbs } from './Breadcrumbs';
import { Star } from 'lucide-react';

const SEOTemplate = ({ data }: SEOTemplateProps) => {
  // Smart internal linking: Use algorithm to find related pages
  const relatedPages = generateInternalLinks(data.slug);

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: data.title, href: `/${data.slug}` }
  ];

  return (
    <>
      <StructuredData
        data={[
          schemas.product({
            name: data.title,
            description: data.description,
          }),
          schemas.faqPage(data.faqs),
          schemas.howTo({
            title: `How to use ${data.title}`,
            description: data.description,
            steps: data.steps.map(s => ({ name: s.title, text: s.description })),
          }),
          schemas.breadcrumb(breadcrumbItems.map(item => ({ name: item.name, url: item.href }))),
        ]}
      />

      <main className="min-h-screen bg-paper-texture selection:bg-primary/20 selection:text-primary pt-20 relative">
        <div className="absolute inset-0 bg-notebook-paper opacity-30 pointer-events-none" />
        
        <div className="container mx-auto px-4 pt-6 relative z-10">
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />
        </div>

        {/* Hero Section */}
        <section className="relative py-12 lg:py-24 overflow-hidden flex items-center justify-center">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 text-center lg:text-left space-y-10 max-w-2xl mx-auto lg:mx-0 font-handwritten"
              >
                <div className="inline-flex items-center gap-2 px-6 py-2 border-crayon-sm bg-accent/20 text-primary font-bold rotate-[-2deg]">
                  <Sparkles className="h-5 w-5" />
                  {data.subtitle}
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground leading-[1.1]">
                  {data.heroTitle}
                  <span className="block text-primary mt-2 hand-drawn-highlight">— Fast & Free.</span>
                </h1>

                <p className="text-3xl text-info leading-relaxed italic opacity-90">
                  {data.heroSubtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-6">
                  <Button
                    size="lg"
                    className="h-20 px-14 rounded-full text-3xl font-black font-handwritten uppercase tracking-wider transition-all border-crayon bg-primary text-white hover:scale-105 active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]"
                    asChild
                  >
                    <a href="/login" className="flex items-center gap-3">
                      Try Free Now <ArrowRight className="w-8 h-8" />
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 3 }}
                animate={{ opacity: 1, scale: 1, rotate: 2 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                className="flex-1 w-full max-w-lg lg:max-w-xl relative"
              >
                <div className="washi-tape bg-accent/40 w-32 h-10 top-[-20px] left-[10%] rotate-[-5deg]" />
                <div className="relative aspect-[4/5] flex flex-col p-6 bg-white border-crayon shadow-2xl transform hover:rotate-0 transition-transform duration-500">
                  <div className="flex-1 relative bg-muted/30 border-crayon-sm overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-notebook-paper opacity-20" />
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="w-full h-full p-8"
                    >
                      <LottieAnimation
                        animationPath="/animations/Learning.json"
                        className="w-full h-full drop-shadow-xl"
                      />
                    </motion.div>
                  </div>
                  <div className="pt-6 pb-2 text-center">
                    <p className="font-handwritten text-2xl font-bold text-foreground/80 italic">
                      "Study smarter with Masterly AI"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        {data.comparisonTable && (
          <section className="py-24 lg:py-40 relative">
            <div className="container mx-auto px-4 max-w-5xl relative z-10">
              <div className="text-center mb-20 font-handwritten">
                <h2 className="text-5xl md:text-7xl font-black text-foreground mb-6">
                  How we <span className="hand-drawn-highlight">compare</span>
                </h2>
                <p className="text-2xl text-info font-bold italic opacity-80">Modern tools for modern students.</p>
              </div>

              <div className="overflow-hidden bg-white border-crayon shadow-2xl rotate-1">
                <div className="absolute inset-0 bg-notebook-paper opacity-10" />
                <table className="w-full text-left border-collapse relative z-10">
                  <thead>
                    <tr className="bg-primary/5 border-b-4 border-foreground">
                      <th className="p-8 text-2xl md:text-3xl font-black font-handwritten">Feature</th>
                      <th className="p-8 text-2xl md:text-3xl font-black font-handwritten text-primary">Masterly AI</th>
                      <th className="p-8 text-2xl md:text-3xl font-black font-handwritten text-foreground/40">Others</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.comparisonTable.map((row, i) => (
                      <tr key={i} className={i !== data.comparisonTable!.length - 1 ? "border-b-2 border-dashed border-foreground/10" : ""}>
                        <td className="p-8 text-xl md:text-2xl font-bold font-handwritten">{row.feature}</td>
                        <td className="p-8 text-xl md:text-2xl font-black text-primary font-handwritten bg-primary/5">{row.masterly}</td>
                        <td className="p-8 text-xl md:text-2xl font-bold text-info font-handwritten italic">{row.competitor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-24 lg:py-40 bg-white/50 border-y-4 border-dashed border-foreground/5 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20 font-handwritten">
              <h2 className="text-5xl md:text-7xl font-black text-foreground mb-6">
                Why choose <span className="hand-drawn-highlight">Masterly?</span>
              </h2>
              <p className="text-2xl text-info font-bold italic opacity-80">Everything you need to study smarter.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {data.features.map((feature, index) => {
                const Icon = iconMap[feature.icon] || Brain;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-10 bg-white border-crayon shadow-xl hover:scale-105 transition-all rotate-1"
                  >
                    <div className="w-20 h-20 border-crayon-sm bg-accent/20 flex items-center justify-center mb-8 rotate-[-5deg]">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-3xl font-black text-foreground mb-4 font-handwritten">
                      {feature.title}
                    </h3>
                    <p className="text-xl text-info font-handwritten font-bold italic leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {data.testimonials && data.testimonials.length > 0 && (
          <section className="py-24 lg:py-40">
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-20 font-handwritten">
                <h2 className="text-5xl md:text-7xl font-black text-foreground mb-6">
                  What <span className="hand-drawn-highlight">students</span> say
                </h2>
                <p className="text-2xl text-info font-bold italic opacity-80">Join 10,000+ students acing their exams.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {data.testimonials.map((t, i) => (
                  <div key={i} className={cn(
                    "p-10 relative border-crayon shadow-xl transition-all hover:rotate-0",
                    i % 2 === 0 ? "bg-[#FEF9C3] rotate-[-2deg]" : "bg-[#DBEAFE] rotate-[2deg]"
                  )}>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary border-crayon-sm" />
                    <div className="flex gap-1 mb-6">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-2xl md:text-3xl text-foreground font-handwritten font-bold leading-tight italic mb-8">"{t.content}"</p>
                    <div className="pt-6 border-t border-foreground/10 font-handwritten">
                      <h4 className="text-2xl font-black">{t.name}</h4>
                      <p className="text-xl text-info font-bold">{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Steps Section */}
        <section className="py-24 lg:py-40 bg-white/30 border-t-4 border-dashed border-foreground/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20 font-handwritten">
              <h2 className="text-5xl md:text-7xl font-black text-foreground mb-6">
                How it <span className="hand-drawn-highlight">works</span>
              </h2>
              <p className="text-2xl text-info font-bold italic opacity-80">Three simple steps to mastery.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
              {data.steps.map((step, index) => (
                <div key={index} className="text-center group font-handwritten relative">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="text-8xl md:text-9xl font-black text-primary/10 group-hover:text-primary transition-colors mb-6"
                  >
                    {step.number}
                  </motion.div>
                  <h3 className="text-4xl font-black text-foreground mb-6">
                    {step.title}
                  </h3>
                  <p className="text-2xl text-info font-bold italic leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 lg:py-40 relative">
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-center mb-20 font-handwritten">
              Common <span className="hand-drawn-highlight">Questions</span>
            </h2>

            <div className="max-w-4xl mx-auto space-y-10">
              {data.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-10 bg-white border-crayon shadow-xl hover:-rotate-1 transition-all"
                >
                  <h3 className="text-3xl font-black text-foreground mb-6 font-handwritten">
                    {faq.question}
                  </h3>
                  <p className="text-2xl text-info font-handwritten font-bold italic leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 lg:py-40 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10 font-handwritten">
            <div className="max-w-5xl mx-auto p-12 md:p-24 bg-primary border-crayon shadow-2xl relative rotate-1">
              <div className="washi-tape bg-accent w-32 h-10 top-[-20px] left-[10%] rotate-[-5deg]" />
              <div className="absolute inset-0 bg-notebook-paper opacity-10 pointer-events-none" />
              
              <div className="relative z-10">
                <h2 className="text-5xl md:text-8xl font-black mb-10 text-white leading-tight">
                  {data.ctaTitle}
                </h2>
                <p className="text-3xl mb-16 italic text-white/90 font-bold leading-relaxed">
                  {data.ctaSubtitle}
                </p>
                <Button
                    size="lg"
                    className="h-24 px-16 rounded-full text-4xl font-black font-handwritten uppercase tracking-wider transition-all border-crayon bg-accent text-accent-foreground hover:scale-105 active:scale-95 shadow-2xl"
                    asChild
                  >
                  <a href="/login">
                    Start For Free!
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default SEOTemplate;
