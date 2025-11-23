'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden bg-hero-light dark:bg-hero-dark transition-colors duration-500"
    >
      {/* Hero Glow */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-glow dark:bg-radial-glow-dark blur-[100px] -z-10 pointer-events-none opacity-60 dark:opacity-40" />
      <style jsx>{`
        .bg-radial-glow {
          background: radial-gradient(
            circle,
            rgba(39, 134, 100, 0.12) 0%,
            rgba(78, 89, 74, 0.08) 40%,
            transparent 70%
          );
        }
        .bg-radial-glow-dark {
          background: radial-gradient(
            circle,
            rgba(77, 227, 255, 0.15) 0%,
            rgba(171, 114, 255, 0.1) 40%,
            transparent 70%
          );
        }
      `}</style>

      <div className="container mx-auto max-w-7xl px-4 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-carbon-black/50 border border-brand-teal/20 dark:border-neon-blue/50 text-brand-teal dark:text-neon-blue text-xs font-bold uppercase tracking-widest mb-8 shadow-sm dark:shadow-[0_0_15px_rgba(77,227,255,0.3)] animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal dark:bg-neon-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal dark:bg-neon-blue"></span>
          </span>
          Financial OS 2.0
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-olive-dark dark:text-white mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both delay-100">
          Your Money.
          <br />
          <span className="bg-gradient-to-r from-brand-teal to-brand-sage dark:from-neon-blue dark:to-neon-flame bg-clip-text text-transparent transition-all duration-500">
            Unbound.
          </span>
        </h1>

        <p className="mt-4 text-xl text-brand-olive-med dark:text-gray-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both delay-200">
          Dollarbaz unifies your banking, trading, payments, wealth, and
          financial intelligence into one AI-native operating system.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both delay-300">
          <Link href="/auth/sign-up">
            <Button className="h-auto px-8 py-4 rounded-full bg-brand-teal dark:bg-neon-blue text-white dark:text-carbon-black font-bold text-lg shadow-lg hover:bg-brand-olive-dark dark:hover:bg-white dark:hover:text-neon-blue dark:shadow-[0_0_20px_rgba(77,227,255,0.4)] transition-all hover:-translate-y-1">
              Join Early Access <i className="ph-bold ph-arrow-right ml-2"></i>
            </Button>
          </Link>
          <Link href="/ai-brain">
            <Button
              variant="outline"
              className="h-auto px-8 py-4 rounded-full bg-white dark:bg-white/5 text-brand-olive-dark dark:text-titanium border-brand-olive-med/20 dark:border-white/10 font-bold text-lg hover:border-brand-teal hover:text-brand-teal dark:hover:border-neon-blue dark:hover:text-neon-blue transition-all gap-2"
            >
              <i className="ph-duotone ph-play-circle text-2xl"></i> See the AI
              Brain
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
