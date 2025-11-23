'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function UseCasesPage() {
  const [activeTab, setActiveTab] = useState('individuals');

  return (
    <main className="min-h-screen bg-brand-offwhite dark:bg-carbon-grey pt-32 pb-20 transition-colors duration-500">
      <div className="container mx-auto max-w-6xl px-4 text-center mb-16">
        <h1 className="text-5xl font-bold text-brand-olive-dark dark:text-white mb-6">
          One OS. Many Ways to Use It.
        </h1>
        <p className="text-xl text-brand-olive-med dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Individuals, traders, businesses, and enterprises – all powered by one
          financial OS.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['Individuals', 'Active Traders', 'Businesses', 'Enterprise'].map(
            (tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(tab.toLowerCase().replace(' ', '-'))
                }
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                  activeTab === tab.toLowerCase().replace(' ', '-')
                    ? 'bg-brand-teal text-white shadow-lg dark:bg-neon-blue dark:text-black'
                    : 'bg-white dark:bg-white/5 text-brand-olive-med dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto max-w-5xl px-4">
        <div className="bg-white dark:bg-[#12181f] rounded-3xl p-10 md:p-16 border border-brand-olive-med/10 dark:border-white/10 shadow-xl min-h-[500px] transition-all">
          {activeTab === 'individuals' && (
            <UseCaseContent
              title="Total Personal Finance Freedom"
              desc="Live globally, spend locally. The OS handles the complexity."
              features={[
                'Get paid in USD, spend in EUR/THB automatically.',
                'AI sets weekly safe-to-spend budgets.',
                'Auto-invest spare change into diversified ETFs.',
              ]}
              persona="Digital Nomad"
            />
          )}

          {activeTab === 'active-traders' && (
            <UseCaseContent
              title="Unified Wallet for Serious Traders"
              desc="Stop moving money between 5 exchanges. Trade from one pool."
              features={[
                'Instant liquidity between Stock profits and Card spend.',
                'AI profit-sweeping rules (e.g. Move 50% of gains to Vault).',
                'Real-time P&L view across Crypto, Fiat, and Equities.',
              ]}
              persona="Day Trader"
            />
          )}

          {activeTab === 'businesses' && (
            <UseCaseContent
              title="Automated Ops & Global Payouts"
              desc="Run your agency or startup without banking borders."
              features={[
                'Instant invoice generation & reconciliation.',
                'Programmatic payroll to 100+ countries.',
                'Cashflow forecasting via AI Brain.',
              ]}
              persona="Agency Owner"
            />
          )}

          {activeTab === 'enterprise' && (
            <UseCaseContent
              title="The Future of Treasury"
              desc="Embedded finance and multi-entity orchestration."
              features={[
                'Multi-entity ledger consolidation.',
                'Custom AI risk engines & policy enforcement.',
                'Programmatic liquidity management via API.',
              ]}
              persona="CFO / Treasury"
            />
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-24">
        <Link href="/auth/sign-up">
          <Button
            size="lg"
            className="rounded-full px-10 bg-brand-olive-dark dark:bg-white dark:text-black"
          >
            Start your journey
          </Button>
        </Link>
      </div>
    </main>
  );
}

interface UseCaseContentProps {
  title: string;
  desc: string;
  features: string[];
  persona: string;
}

function UseCaseContent({ title, desc, features, persona }: UseCaseContentProps) {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <div className="inline-block px-3 py-1 bg-brand-offwhite dark:bg-white/10 rounded text-xs font-mono mb-6 text-brand-olive-med dark:text-gray-300 uppercase">
          Persona: {persona}
        </div>
        <h2 className="text-3xl font-bold text-brand-olive-dark dark:text-white mb-4">
          {title}
        </h2>
        <p className="text-xl text-brand-olive-med dark:text-gray-400 mb-8">
          {desc}
        </p>
        <ul className="space-y-4">
          {features.map((f: string, i: number) => (
            <li
              key={i}
              className="flex gap-3 items-start text-brand-olive-dark dark:text-gray-200"
            >
              <i className="ph-fill ph-check-circle text-brand-teal dark:text-neon-blue text-xl mt-0.5"></i>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-brand-offwhite dark:bg-black/30 rounded-2xl h-80 flex items-center justify-center border-2 border-dashed border-brand-olive-med/20 dark:border-white/10">
        <span className="text-brand-olive-med/40 dark:text-gray-600 font-mono">
          {title} UI Mockup
        </span>
      </div>
    </div>
  );
}
