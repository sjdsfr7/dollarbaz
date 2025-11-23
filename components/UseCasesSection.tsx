'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function UseCasesSection() {
  const [activeTab, setActiveTab] = useState('individual');

  return (
    <section
      id="cases"
      className="py-24 bg-brand-offwhite dark:bg-carbon-black border-t border-brand-olive-med/5 dark:border-white/5 transition-colors duration-500"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold text-center text-brand-olive-dark dark:text-white mb-12">
          Built for Everyone. <br />
          <span className="text-brand-teal dark:text-neon-blue">
            Powered by One OS.
          </span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['Individual', 'Traders', 'Business', 'Enterprise'].map((tab) => {
            const id = tab.toLowerCase();
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-8 py-3 rounded-full font-semibold text-sm transition-all border ${
                  isActive
                    ? 'bg-brand-teal text-white border-brand-teal dark:bg-neon-blue dark:text-carbon-black dark:border-neon-blue shadow-lg'
                    : 'border-brand-olive-med/20 text-brand-olive-med dark:border-white/20 dark:text-gray-400 hover:border-brand-teal hover:text-brand-teal dark:hover:border-neon-blue dark:hover:text-neon-blue'
                }`}
              >
                {tab === 'Individual' ? 'For Individuals' : tab}
              </button>
            );
          })}
        </div>

        <div className="bg-white dark:bg-[#1a212b] rounded-3xl p-8 md:p-16 shadow-[0_10px_40px_-10px_rgba(78,89,74,0.08)] dark:shadow-none border border-transparent dark:border-white/5 min-h-[400px] flex items-center transition-colors">
          {activeTab === 'individual' && (
            <UseCaseContent
              title="Total Personal Finance Freedom"
              features={[
                'Multi-currency spending & cards',
                'Wealth planning automation',
                'AI budgeting & Spend tracking',
              ]}
              icon="ph-image"
              uiLabel="Personal Dashboard UI"
            />
          )}
          {activeTab === 'traders' && (
            <UseCaseContent
              title="Professional Grade Trading"
              features={[
                'Unified wallet for Crypto & Stocks',
                'Auto-profit strategies',
                'Real-time portfolio intelligence',
              ]}
              icon="ph-chart-bar"
              uiLabel="Trading UI"
            />
          )}
          {activeTab === 'business' && (
            <UseCaseContent
              title="Automated Business Ops"
              features={[
                'Global Accounts & Payroll',
                'AI Cashflow Engine',
                'FX Hedging for Invoices',
              ]}
              icon="ph-files"
              uiLabel="Invoicing UI"
            />
          )}
          {activeTab === 'enterprise' && (
            <UseCaseContent
              title="The Future of Treasury"
              features={[
                'Programmatic Treasury Management',
                'Multi-entity banking structure',
                'Custom AI Risk Engines',
              ]}
              icon="ph-graph"
              uiLabel="Enterprise Graph UI"
            />
          )}
        </div>
      </div>
    </section>
  );
}

interface UseCaseContentProps {
  title: string;
  features: string[];
  icon: string;
  uiLabel: string;
}

function UseCaseContent({ title, features, icon, uiLabel }: UseCaseContentProps) {
  return (
    <div className="w-full grid md:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-2xl font-bold mb-6 text-brand-teal dark:text-neon-blue">
          {title}
        </h3>
        <ul className="space-y-4 text-brand-olive-med dark:text-titanium text-lg">
          {features.map((item, i) => (
            <li key={i} className="flex gap-3 items-center">
              <i className="ph-fill ph-check-circle text-brand-teal dark:text-neon-blue text-xl"></i>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-brand-offwhite dark:bg-carbon-black rounded-2xl h-64 flex items-center justify-center text-brand-olive-med/50 dark:text-gray-600 font-medium border-2 border-dashed border-brand-olive-med/20 dark:border-white/10">
        <i className={`ph-duotone ${icon} text-4xl mr-2`}></i> {uiLabel}
      </div>
    </div>
  );
}
