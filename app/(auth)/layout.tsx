import { DecorativeBackground } from '@/components/DecorativeBackground';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DecorativeBackground />
      <div className="min-h-screen relative">
        <div className="absolute inset-0 bg-background/90" />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  );
}
