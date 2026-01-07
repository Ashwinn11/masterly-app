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

      <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary pt-20">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />
        </div>

        {/* Hero Section */}
        <section className="relative py-8 lg:py-16 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0 font-handwritten"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-2">
                  <Sparkles className="h-4 w-4" />
                  {data.subtitle}
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground text-balance">
                  {data.heroTitle}
                  <span className="block text-primary mt-2 italic">— Fast & Free.</span>
                </h1>

                <p className="text-2xl text-foreground/70 leading-tight text-balance italic">
                  {data.heroSubtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                  <Button
                    size="lg"
                    className="h-16 px-12 rounded-2xl text-2xl font-black uppercase tracking-wider transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]"
                    asChild
                  >
                    <a href="/login">
                      Try Free Now <ArrowRight className="ml-2 h-6 w-6" />
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                className="flex-1 w-full max-w-lg lg:max-w-xl relative"
              >
                <div className="relative aspect-square flex items-center justify-center bg-card border-[3px] border-foreground rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-full h-full p-8"
                  >
                    <LottieAnimation
                      animationPath="/animations/Learning.json"
                      className="w-full h-full drop-shadow-2xl"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        {data.comparisonTable && (
          <section className="py-16 lg:py-32 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-16 font-handwritten">
                <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
                  How we compare
                </h2>
                <p className="text-2xl text-foreground/70 italic">Modern tools for modern students.</p>
              </div>

              <div className="overflow-hidden rounded-[32px] border-[3px] border-foreground bg-card shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-primary/5 border-b-[3px] border-foreground">
                      <th className="p-6 text-xl font-black font-handwritten">Feature</th>
                      <th className="p-6 text-xl font-black font-handwritten text-primary">Masterly AI</th>
                      <th className="p-6 text-xl font-black font-handwritten text-foreground/50">Others</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.comparisonTable.map((row, i) => (
                      <tr key={i} className={i !== data.comparisonTable!.length - 1 ? "border-b-[2px] border-foreground/10" : ""}>
                        <td className="p-6 text-lg font-bold font-handwritten">{row.feature}</td>
                        <td className="p-6 text-lg font-black text-primary font-handwritten bg-primary/5">{row.masterly}</td>
                        <td className="p-6 text-lg font-medium text-foreground/70 font-handwritten italic">{row.competitor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-16 lg:py-32 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 font-handwritten">
              <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
                Why choose Masterly?
              </h2>
              <p className="text-2xl text-foreground/70 italic">Everything you need to study smarter.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.features.map((feature, index) => {
                const Icon = iconMap[feature.icon] || Brain;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-8 rounded-3xl bg-background border-[3px] border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border-[2px] border-primary/20 flex items-center justify-center mb-6">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground mb-3 font-handwritten">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-foreground/70 font-handwritten italic leading-snug">
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
          <section className="py-16 lg:py-32 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16 font-handwritten">
                <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
                  What students say
                </h2>
                <p className="text-2xl text-foreground/70 italic">Join 10,000+ students acing their exams.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {data.testimonials.map((t, i) => (
                  <div key={i} className="p-8 rounded-[32px] border-[3px] border-foreground bg-card shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] font-handwritten">
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-2xl text-foreground leading-tight italic mb-6">"{t.content}"</p>
                    <div>
                      <h4 className="text-xl font-black">{t.name}</h4>
                      <p className="text-lg text-foreground/60">{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Steps Section */}
        <section className="py-16 lg:py-32 bg-background">
          <div className="container mx-auto px-4 border-t-[3px] border-foreground pt-16 lg:pt-32">
            <div className="text-center mb-16 font-handwritten">
              <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
                How it works
              </h2>
              <p className="text-2xl text-foreground/70 italic">Three simple steps to mastery.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {data.steps.map((step, index) => (
                <div key={index} className="text-center group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-7xl font-black text-primary/10 group-hover:text-primary transition-colors mb-4 font-handwritten"
                  >
                    {step.number}
                  </motion.div>
                  <h3 className="text-3xl font-black text-foreground mb-4 font-handwritten">
                    {step.title}
                  </h3>
                  <p className="text-xl text-foreground/70 font-handwritten italic">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-32 bg-primary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-16 font-handwritten">
              Common Questions
            </h2>

            <div className="max-w-3xl mx-auto space-y-8">
              {data.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-[32px] bg-background border-[3px] border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  <h3 className="text-2xl font-black text-foreground mb-4 font-handwritten">
                    {faq.question}
                  </h3>
                  <p className="text-xl text-foreground/70 font-handwritten italic leading-snug">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Tools Section */}
        <section className="py-16 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 font-handwritten">
              <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
                Plan Your Study Strategy
              </h2>
              <p className="text-2xl text-foreground/70 italic">
                Use science-backed tools to optimize your learning
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <StudyTimeCalculator examType={data.title.toLowerCase()} />
              <LearningStyleQuiz />
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-16 lg:py-32 bg-background">
          <div className="container mx-auto px-4">
            <CaseStudies examType={data.title.includes('Medical') ? 'USMLE' : data.title.includes('Law') ? 'Bar' : undefined} />
          </div>
        </section>

        {/* Related Links Section - Smart Internal Linking */}
        {relatedPages.length > 0 && (
          <section className="py-16 lg:py-32 bg-background">
            <div className="container mx-auto px-4">
              <RelatedLinks
                links={relatedPages}
                title="More Study Tools"
                className="font-handwritten"
                variant="card"
              />
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

          <div className="container mx-auto px-4 text-center relative z-10 font-handwritten">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              {data.ctaTitle}
            </h2>
            <p className="text-2xl mb-12 italic text-primary-foreground/90">
              {data.ctaSubtitle}
            </p>
            <Button
                size="lg"
                variant="secondary"
                className="h-20 px-16 rounded-[24px] text-3xl font-black uppercase tracking-wider transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] bg-accent text-accent-foreground hover:bg-accent/90"
                asChild
              >
              <a href="/login">
                Start For Free
              </a>
            </Button>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default SEOTemplate;
