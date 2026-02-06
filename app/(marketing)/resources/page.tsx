import Link from 'next/link';
import { glossaryPages } from '@/lib/seo/playbooks/glossary';
import { comparisonPages } from '@/lib/seo/playbooks/comparisons';
import { definitionPages } from '@/lib/seo/playbooks/definitions';
import { Metadata } from 'next';
import { ArrowRight, BookOpen, GitCompare, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Masterly Resources | Study Guides & Comparisons',
  description: 'Free study guides, flashcard app comparisons, and learning technique explainers to help you ace your exams.',
};

const Section = ({ title, icon: Icon, items }: { title: string, icon: any, items: any[] }) => (
    <section className="py-12">
        <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-accent/20 rounded-xl border-crayon-sm rotate-[-2deg]">
                <Icon className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black font-handwritten text-foreground">
                {title}
            </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((page) => (
                <Link key={page.slug} href={`/${page.slug}`} className="group block">
                    <article className="h-full p-6 bg-white border-crayon hover:scale-[1.02] transition-all hover:shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-muted/10 rounded-bl-full z-0 transition-colors group-hover:bg-primary/5" />
                        
                        <h3 className="text-xl font-bold font-handwritten text-foreground mb-3 relative z-10 group-hover:text-primary transition-colors">
                            {page.title}
                        </h3>
                        <p className="text-info/70 font-handwritten font-bold text-sm leading-relaxed mb-4 relative z-10 line-clamp-2">
                           {page.description}
                        </p>
                        
                        <div className="flex items-center gap-2 text-primary font-bold font-handwritten text-sm mt-auto relative z-10 opacity-60 group-hover:opacity-100 transition-opacity">
                            Read Guide <ArrowRight className="w-4 h-4" />
                        </div>
                    </article>
                </Link>
            ))}
        </div>
    </section>
);

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-paper-texture pt-32 pb-24 relative">
         <div className="absolute inset-0 bg-notebook-paper opacity-30 pointer-events-none" />

         <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20 max-w-3xl mx-auto">
                <span className="inline-block px-4 py-1 mb-6 border-crayon-sm bg-accent/20 text-primary font-bold rotate-[-2deg] font-handwritten">
                    📚 The Library
                </span>
                <h1 className="text-5xl md:text-7xl font-black font-handwritten text-foreground mb-6">
                    Study <span className="hand-drawn-highlight">Resources</span>
                </h1>
                <p className="text-2xl text-info/70 font-handwritten italic font-bold">
                    Everything you need to master your exams. Guides, comparisons, and techniques backed by science.
                </p>
            </div>

            <div className="space-y-12 max-w-6xl mx-auto">
                <Section title="Study Glossary" icon={BookOpen} items={glossaryPages} />
                <Section title="Learning Techniques" icon={Sparkles} items={definitionPages} />
                <Section title="App Comparisons" icon={GitCompare} items={comparisonPages} />
            </div>
         </div>
    </main>
  );
}
