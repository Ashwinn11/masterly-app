'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, TrendingUp, Target, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudyTimeCalculatorProps {
  className?: string;
  examType?: string;
}

export function StudyTimeCalculator({ className, examType = 'your exam' }: StudyTimeCalculatorProps) {
  const [examDate, setExamDate] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [currentKnowledge, setCurrentKnowledge] = useState(50);
  const [targetScore, setTargetScore] = useState(90);
  const [result, setResult] = useState<{
    totalHours: number;
    daysRemaining: number;
    dailyHoursNeeded: number;
    startDate: string;
    feasible: boolean;
  } | null>(null);

  const calculateStudyTime = () => {
    if (!examDate) return;

    const exam = new Date(examDate);
    const today = new Date();
    const daysRemaining = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysRemaining <= 0) {
      alert('Please select a future date');
      return;
    }

    // Calculate study hours needed based on knowledge gap
    const knowledgeGap = targetScore - currentKnowledge;
    const baseHours = Math.max(100, knowledgeGap * 10); // 10 hours per percentage point
    const totalHours = Math.round(baseHours);

    const dailyHoursNeeded = Math.round((totalHours / daysRemaining) * 10) / 10;
    const feasible = dailyHoursNeeded <= 12;

    setResult({
      totalHours,
      daysRemaining,
      dailyHoursNeeded,
      startDate: today.toLocaleDateString(),
      feasible,
    });
  };

  return (
    <div className={cn('w-full', className)}>
      <Card className="p-8 border-[3px] border-foreground bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border-[2px] border-primary/20 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-black">Study Time Calculator</h3>
              <p className="text-foreground/70 text-sm font-handwritten italic">
                Plan your {examType} prep with science-backed scheduling
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Target Exam Date</label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-xl border-[2px] border-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Current Knowledge Level: {currentKnowledge}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={currentKnowledge}
                onChange={(e) => setCurrentKnowledge(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-foreground/60 mt-1">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Target Score: {targetScore}%</label>
              <input
                type="range"
                min="60"
                max="100"
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-foreground/60 mt-1">
                <span>Passing</span>
                <span>Perfect</span>
              </div>
            </div>

            <Button
              onClick={calculateStudyTime}
              className="w-full h-14 rounded-xl text-lg font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
            >
              Calculate Study Plan
            </Button>
          </div>

          {result && (
            <div className="mt-6 p-6 rounded-2xl bg-primary/5 border-[2px] border-primary/20">
              <h4 className="text-xl font-black mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Your Personalized Study Plan
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-background">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold text-foreground/60">Total Hours</span>
                  </div>
                  <p className="text-2xl font-black">{result.totalHours}h</p>
                </div>

                <div className="p-4 rounded-xl bg-background">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold text-foreground/60">Days Left</span>
                  </div>
                  <p className="text-2xl font-black">{result.daysRemaining}</p>
                </div>

                <div className="col-span-2 p-4 rounded-xl bg-background">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold text-foreground/60">Daily Study Time</span>
                    </div>
                    {result.feasible ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-bold">
                        ✓ Achievable
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold">
                        ⚠ Intense
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-black">{result.dailyHoursNeeded}h/day</p>
                </div>
              </div>

              {!result.feasible && (
                <p className="text-sm text-foreground/70 mt-4 italic">
                  💡 Tip: Consider starting earlier or adjusting your target score for a more balanced schedule.
                </p>
              )}

              <div className="mt-6 pt-6 border-t-[2px] border-foreground/10">
                <Button className="w-full" asChild>
                  <a href="/login">
                    Create Your Study Plan with Masterly AI →
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
