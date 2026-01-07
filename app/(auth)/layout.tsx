import { DecorativeBackground } from '@/components/DecorativeBackground';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DecorativeBackground />
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
}
