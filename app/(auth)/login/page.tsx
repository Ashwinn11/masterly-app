'use client';

import React from 'react';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Flame, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleTimeUpdate = () => {
        if (video.currentTime >= 2) {
          video.currentTime = 0; // Restart from beginning
        }
      };
      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-background relative overflow-hidden">
      {/* Global Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
         <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-primary rounded-full" />
         <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-secondary rounded-full" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(#2D2D2D_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05] pointer-events-none" />

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 font-handwritten text-xl font-black text-primary hover:translate-x-[-4px] transition-transform"
        >
          <div className="w-10 h-10 rounded-full border-[3px] border-foreground flex items-center justify-center bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
            <ArrowLeft className="w-6 h-6" />
          </div>
          <span>Back</span>
        </Link>
      </div>

      {/* Left Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="relative z-10 w-full max-w-xl flex flex-col items-center text-center -mt-16">
          
          {/* Lottie Animation with Glow */}
          <div className="relative mb-6 w-full max-w-lg">
             <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 animate-pulse-slow" />
             <LottieAnimation
               animationPath="/animations/Great_knowledge.json"
               className="w-full h-auto drop-shadow-2xl relative z-10"
             />
              
              {/* Floating Widgets */}
              <div className="absolute -right-4 top-10 bg-card border-[3px] border-foreground p-3 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] animate-float delay-700 flex items-center gap-3">
                <div className="bg-orange-500/20 p-2 rounded-lg">
                  <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                </div>
                <div className="text-left font-handwritten">
                  <div className="text-xs text-info font-bold uppercase">Daily Streak</div>
                  <div className="text-sm font-black text-foreground uppercase tracking-wider">12 Days</div>
                </div>
              </div>

              <div className="absolute -left-8 bottom-20 bg-card border-[3px] border-foreground p-3 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] animate-float delay-200 flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-lg">
                  <Trophy className="w-5 h-5 text-accent fill-accent" />
                </div>
                <div className="text-left font-handwritten">
                  <div className="text-xs text-info font-bold uppercase">Top 1%</div>
                  <div className="text-sm font-black text-foreground uppercase tracking-wider">Achiever</div>
                </div>
              </div>
          </div>

          <div className="space-y-4 font-handwritten">
            <h1 className="text-6xl font-black tracking-tight text-foreground leading-tight">
              Study less. <br/><span className="text-primary underline decoration-accent decoration-8 underline-offset-8">Learn more.</span>
            </h1>
            <p className="text-2xl text-info max-w-md mx-auto leading-tight italic pt-4">
              Study Smarter, Not Harder. Masterly AI turns your notes into tailored study sessions that adapt to your memory using the scientific FSRS algorithm.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 relative z-20">
        <div className="w-full max-w-md space-y-4 -mt-8">
          {/* Branding Text Above Card */}
          <div className="text-center space-y-2 animate-fade-in-up flex flex-col items-center mb-4">
            <div className="relative w-40 h-40 mb-1 rounded-[32px] overflow-hidden border-[4px] border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] bg-card">
              <video
                ref={videoRef}
                src="/icon-video.mp4"
                autoPlay
                muted
                playsInline
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="space-y-1 font-handwritten">
              <h2 className="text-5xl font-black text-primary tracking-tight">Masterly AI</h2>
              <p className="text-xl text-info font-bold italic opacity-80">Ready to master your next exam?</p>
            </div>
          </div>

          <div className="bg-card border-[3px] border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] rounded-[40px] p-8 lg:p-10 space-y-8 animate-fade-in-up delay-100">
            
            <div className="text-center space-y-2 font-handwritten">
              <h2 className="text-4xl font-black tracking-tight text-foreground">Welcome back</h2>
              <p className="text-xl text-info font-bold opacity-70">
                Sign in to continue your learning streak
              </p>
            </div>

            <div className="space-y-6">
              <GoogleSignInButton />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-foreground">
                    Secure access
                  </span>
                </div>
              </div>

              <p className="text-xs text-foreground text-center px-4 leading-relaxed opacity-80">
                By continuing, you agree to our{' '}
                <Link href="/terms" className="underline underline-offset-4 hover:text-primary transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
