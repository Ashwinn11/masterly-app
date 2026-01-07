'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Star, TrendingUp, Award, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaseStudy {
  id: string;
  name: string;
  avatar: string;
  exam: string;
  before: {
    grade: string;
    hoursPerWeek: number;
    methods: string[];
  };
  after: {
    grade: string;
    hoursPerWeek: number;
    methods: string[];
  };
  timeframe: string;
  testimonial: string;
  featured?: boolean;
}

interface CaseStudiesProps {
  className?: string;
  examType?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'sarah-mcat',
    name: 'Sarah Chen',
    avatar: 'SC',
    exam: 'MCAT',
    before: {
      grade: '502 (48th percentile)',
      hoursPerWeek: 25,
      methods: ['Passive reading', 'Highlighting notes', 'Re-reading textbooks']
    },
    after: {
      grade: '518 (95th percentile)',
      hoursPerWeek: 12,
      methods: ['Active recall', 'Spaced repetition with Masterly', 'Practice questions']
    },
    timeframe: '3 months',
    testimonial: "Masterly transformed how I studied. I spent half the time but scored way higher. The spaced repetition algorithm knew exactly when I was about to forget concepts.",
    featured: true
  },
  {
    id: 'james-usmle',
    name: 'James Rodriguez',
    avatar: 'JR',
    exam: 'USMLE Step 1',
    before: {
      grade: 'Failed (below 200)',
      hoursPerWeek: 40,
      methods: ['Anki overload', 'Burnout from excessive studying', 'No clear plan']
    },
    after: {
      grade: '245 (85th percentile)',
      hoursPerWeek: 20,
      methods: ['FSRS with Masterly', 'Scheduled breaks', 'Focused recall sessions']
    },
    timeframe: '6 months',
    testimonial: "I was burning out studying 40+ hours a week. Masterly helped me study smarter, not harder. The algorithm optimized my review schedule and I finally passed.",
    featured: true
  },
  {
    id: 'emily-bar',
    name: 'Emily Watson',
    avatar: 'EW',
    exam: 'Bar Exam',
    before: {
      grade: 'Didn\'t pass',
      hoursPerWeek: 30,
      methods: ['Traditional outlines', 'Group study sessions', 'Last-minute cramming']
    },
    after: {
      grade: 'Passed (top 20%)',
      hoursPerWeek: 15,
      methods: ['Masterly case brief flashcards', 'Daily spaced practice', 'Exam simulator']
    },
    timeframe: '4 months',
    testimonial: "The case brief flashcards were a game-changer. I could review hundreds of cases efficiently and remembered every rule.",
  },
  {
    id: 'michael-gre',
    name: 'Michael Park',
    avatar: 'MP',
    exam: 'GRE',
    before: {
      grade: '158 (Quant: 152, Verbal: 164)',
      hoursPerWeek: 15,
      methods: ['Generic flashcards', 'Khan Academy videos', 'Practice tests only']
    },
    after: {
      grade: '168 (Quant: 168, Verbal: 168)',
      hoursPerWeek: 12,
      methods: ['AI-generated quant questions', 'Vocabulary building with Masterly', 'Weakness targeting']
    },
    timeframe: '2 months',
    testimonial: "Masterly identified my weak areas in quant and generated practice questions specifically for those topics. My score improved by 10 points!",
  },
  {
    id: 'lisa-anatomy',
    name: 'Lisa Nguyen',
    avatar: 'LN',
    exam: 'Anatomy Final',
    before: {
      grade: 'C+',
      hoursPerWeek: 10,
      methods: ['Reading textbooks', 'Looking at diagrams', 'Making basic notes']
    },
    after: {
      grade: 'A',
      hoursPerWeek: 8,
      methods: ['Image occlusion flashcards', 'Labeling exercises', 'Daily active recall']
    },
    timeframe: '6 weeks',
    testimonial: "The image occlusion feature is incredible. I could hide labels on diagrams and test myself. Went from C+ to A in just 6 weeks!",
    featured: true
  }
];

export function CaseStudies({ className, examType }: CaseStudiesProps) {
  // Filter case studies by exam type if specified
  const filteredStudies = examType
    ? caseStudies.filter(study => study.exam.toLowerCase().includes(examType.toLowerCase()))
    : caseStudies;

  const featuredStudies = filteredStudies.filter(s => s.featured);

  return (
    <div className={cn('w-full space-y-8', className)}>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-black mb-4 font-handwritten">
          Real Results from Real Students
        </h2>
        <p className="text-xl text-foreground/70">
          Join {caseStudies.length}+ students who transformed their grades with Masterly
        </p>
      </div>

      {/* Featured Case Study */}
      {featuredStudies.length > 0 && (
        <div className="p-8 rounded-[32px] border-[3px] border-primary bg-gradient-to-br from-primary/5 to-background shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-black flex-shrink-0">
              {featuredStudies[0].avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-black">{featuredStudies[0].name}</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground font-bold">
                  Featured Story
                </span>
              </div>
              <p className="text-foreground/70">
                {featuredStudies[0].exam} • {featuredStudies[0].timeframe} of preparation
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 rounded-xl bg-background/80 backdrop-blur">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-red-500" />
                <span className="text-sm font-bold">Before</span>
              </div>
              <p className="text-lg font-black">{featuredStudies[0].before.grade}</p>
              <p className="text-xs text-foreground/60">{featuredStudies[0].before.hoursPerWeek}h/week</p>
            </div>

            <div className="p-4 rounded-xl bg-background/80 backdrop-blur">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-green-500" />
                <span className="text-sm font-bold">After</span>
              </div>
              <p className="text-lg font-black">{featuredStudies[0].after.grade}</p>
              <p className="text-xs text-foreground/60">{featuredStudies[0].after.hoursPerWeek}h/week</p>
            </div>

            <div className="p-4 rounded-xl bg-background/80 backdrop-blur">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold">Improvement</span>
              </div>
              <p className="text-lg font-black">
                {featuredStudies[0].after.hoursPerWeek < featuredStudies[0].before.hoursPerWeek
                  ? `-${featuredStudies[0].before.hoursPerWeek - featuredStudies[0].after.hoursPerWeek}h/week`
                  : 'Optimized schedule'}
              </p>
              <p className="text-xs text-foreground/60">Same time, better results</p>
            </div>
          </div>

          <blockquote className="text-lg italic text-foreground/90 border-l-4 border-primary pl-4">
            "{featuredStudies[0].testimonial}"
          </blockquote>
        </div>
      )}

      {/* All Case Studies Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredStudies.slice(1).map((study) => (
          <Card
            key={study.id}
            className="p-6 border-[3px] border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 border-[2px] border-primary/20 flex items-center justify-center text-lg font-black flex-shrink-0">
                {study.avatar}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-black">{study.name}</h4>
                <p className="text-sm text-foreground/70">{study.exam} • {study.timeframe}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-xs text-foreground/60 mb-1">Before</p>
                <p className="text-base font-black">{study.before.grade}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <p className="text-xs text-foreground/60 mb-1">After</p>
                <p className="text-base font-black">{study.after.grade}</p>
              </div>
            </div>

            <p className="text-sm italic text-foreground/80">"{study.testimonial}"</p>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center p-8 rounded-[32px] border-[3px] border-primary bg-primary/5">
        <h3 className="text-2xl md:text-3xl font-black mb-4">
          Ready to Be Our Next Success Story?
        </h3>
        <p className="text-lg text-foreground/70 mb-6">
          Join students who improved their grades while studying less
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="text-4xl font-black text-primary">
            {caseStudies.length}+
          </div>
          <div className="text-left">
            <p className="text-sm text-foreground/60">Success stories</p>
            <p className="text-lg font-bold">Average grade improvement: 15%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
