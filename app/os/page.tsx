'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OSPage() {
  return (
    <main className="min-h-screen bg-brand-cream dark:bg-carbon-grey transition-colors duration-500">
      {/* Hero */}
      <section className="pt-32 pb-20 text-center container mx-auto max-w-6xl px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-teal/10 dark:bg-neon-blue/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-olive-med/20 text-brand-olive-med text-xs font-mono uppercase tracking-widest mb-6">
          Core Architecture v2.0
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-brand-olive-dark dark:text-white mb-6 tracking-tight leading-[1.1]">
          The Operating System for <br />
          <span className="text-brand-teal dark:text-neon-blue">
            All Your Money.
          </span>
        </h1>
        <p className="text-xl text-brand-olive-med dark:text-gray-400 max-w-2xl mx-auto mb-12">
          One global account, one trading wallet, one smart ledger, one AI
          brain. <br />
          Not a bank. Not an exchange. The OS that connects them.
        </p>

        {/* Layered Diagram (Abstract) */}
        <div className="relative max-w-4xl mx-auto mt-16 space-y-4">
          {/* Layers */}
          <LayerCard
            title="Global Banking Layer"
            icon="ph-bank"
            color="bg-brand-teal"
            anchor="#banking"
          />
          <LayerCard
            title="Trading & Investments Layer"
            icon="ph-trend-up"
            color="bg-brand-olive-dark dark:bg-electric-purple"
            anchor="#trading"
          />
          <LayerCard
            title="AI Brain Core"
            icon="ph-brain"
            color="bg-brand-sage dark:bg-neon-flame"
            anchor="#ai"
            isCore
          />
          <LayerCard
            title="Payments & Business Layer"
            icon="ph-arrows-left-right"
            color="bg-brand-olive-med"
            anchor="#payments"
          />

          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-teal via-brand-olive-dark to-brand-sage -z-10 opacity-20"></div>
        </div>
      </section>

      {/* Section 2: Global Banking */}
      <section
        id="banking"
        className="py-24 bg-white dark:bg-[#12181f] border-y border-brand-olive-med/5"
      >
        <div className="container mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal mb-6">
              <i className="ph-duotone ph-globe-hemisphere-west text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-brand-olive-dark dark:text-white mb-6">
              Global Banking Layer
            </h2>
            <ul className="space-y-4 text-lg text-brand-olive-med dark:text-gray-400">
              <li className="flex gap-3">
                <i className="ph-fill ph-check-circle text-brand-teal text-xl"></i>{' '}
                Multi-currency accounts & local IBANs
              </li>
              <li className="flex gap-3">
                <i className="ph-fill ph-check-circle text-brand-teal text-xl"></i>{' '}
                Cards with real-time spending analytics
              </li>
              <li className="flex gap-3">
                <i className="ph-fill ph-check-circle text-brand-teal text-xl"></i>{' '}
                Smart FX routing (Interbank rates)
              </li>
            </ul>
          </div>
          <div className="bg-brand-offwhite dark:bg-carbon-black p-8 rounded-3xl border border-brand-olive-med/10 h-80 flex items-center justify-center">
            <span className="text-brand-olive-med/40 font-mono">
              Flow Diagram: Paycheck → Pockets
            </span>
          </div>
        </div>
      </section>

      {/* Section 3: Trading */}
      <section
        id="trading"
        className="py-24 bg-brand-offwhite dark:bg-carbon-black"
      >
        <div className="container mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 bg-white dark:bg-[#12181f] p-8 rounded-3xl border border-brand-olive-med/10 h-80 flex items-center justify-center">
            <span className="text-brand-olive-med/40 font-mono">
              Unified Wallet Visual
            </span>
          </div>
          <div className="order-1 md:order-2">
            <div className="w-12 h-12 rounded-xl bg-brand-olive-dark/10 dark:bg-electric-purple/10 flex items-center justify-center text-brand-olive-dark dark:text-electric-purple mb-6">
              <i className="ph-duotone ph-chart-bar text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-brand-olive-dark dark:text-white mb-6">
              Trading & Investing
            </h2>
            <p className="text-lg text-brand-olive-med dark:text-gray-400 mb-6">
              One wallet, many assets. Dollarbaz keeps your trading balances
              unified with your operational cash, giving you a true net worth
              view instantly.
            </p>
            <div className="p-4 bg-brand-teal/5 rounded-lg border border-brand-teal/10 text-sm text-brand-olive-dark dark:text-gray-300">
              <strong>Unified Balance:</strong> Your stock profits can instantly
              cover your card spend. No transfers needed.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center bg-brand-olive-dark text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8">
            Ready to upgrade your stack?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button className="bg-brand-teal hover:bg-white hover:text-brand-teal text-lg px-8 py-6 rounded-full">
                Join Early Access
              </Button>
            </Link>
            <Link href="/ai-brain">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full"
              >
                Explore AI Brain
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

interface LayerCardProps {
  title: string;
  icon: string;
  color: string;
  anchor: string;
  isCore?: boolean;
}

function LayerCard({ title, icon, color, anchor, isCore }: LayerCardProps) {
  return (
    <Link
      href={anchor}
      className={`block p-6 rounded-2xl border transition-all hover:-translate-y-1 group relative overflow-hidden ${
        isCore
          ? 'bg-brand-olive-dark text-white border-transparent'
          : 'bg-white dark:bg-[#1a212b] border-brand-olive-med/10 dark:border-white/5 hover:border-brand-teal'
      }`}
    >
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${color}`}
          >
            <i className={`ph-duotone ${icon} text-xl`}></i>
          </div>
          <span
            className={`text-xl font-bold ${
              isCore ? 'text-white' : 'text-brand-olive-dark dark:text-white'
            }`}
          >
            {title}
          </span>
        </div>
        <i className="ph-bold ph-arrow-right opacity-0 group-hover:opacity-100 transition-opacity"></i>
      </div>
      {isCore && (
        <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/20 to-transparent opacity-30"></div>
      )}
    </Link>
  );
}
