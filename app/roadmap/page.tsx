'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-brand-cream dark:bg-carbon-grey pt-32 pb-20 transition-colors duration-500">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-brand-olive-dark dark:text-white mb-6">
            The Path Forward.
          </h1>
          <p className="text-xl text-brand-olive-med dark:text-gray-400">
            We’re building the financial OS step by step. Transparently.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-brand-olive-med/10 dark:border-white/10 ml-4 md:ml-10 space-y-16">
          {/* Phase 1 */}
          <RoadmapItem
            phase="Phase 1"
            title="Global Accounts & Base AI"
            status="Live"
            color="bg-green-500"
            items={[
              'Multi-currency accounts',
              'Basic AI insights',
              'Unified Ledger v1',
              'Waitlist Access',
            ]}
          />

          {/* Phase 2 */}
          <RoadmapItem
            phase="Phase 2"
            title="Multi-Agent System & Payments"
            status="In Progress"
            color="bg-yellow-500"
            items={[
              'Full AI Agent Suite',
              'Unified Timeline v2',
              'Global Bill Pay',
              'B2B Invoicing',
            ]}
          />

          {/* Phase 3 */}
          <RoadmapItem
            phase="Phase 3"
            title="Strategy Marketplace & Enterprise"
            status="Planned"
            color="bg-brand-olive-med dark:bg-gray-600"
            items={[
              'Strategy Builder UI',
              'Marketplace for AI Rules',
              'Multi-entity Treasury',
              'API Access',
            ]}
          />
        </div>

        {/* Philosophy */}
        <div className="mt-24 bg-white dark:bg-[#12181f] p-8 rounded-2xl border border-brand-olive-med/10 dark:border-white/10">
          <h3 className="text-xl font-bold text-brand-olive-dark dark:text-white mb-2">
            Our Philosophy
          </h3>
          <p className="text-brand-olive-med dark:text-gray-400">
            We ship in small, reliable slices. Features are flagged as Beta
            until they are rock solid. We prioritize security and stability over
            feature bloat.
          </p>
        </div>

        <div className="text-center mt-16">
          <Link href="/auth/sign-up">
            <Button className="bg-brand-teal dark:bg-neon-blue dark:text-black hover:bg-brand-olive-dark px-8 rounded-full">
              Join the Journey
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

interface RoadmapItemProps {
  phase: string;
  title: string;
  status: string;
  color: string;
  items: string[];
}

function RoadmapItem({ phase, title, status, color, items }: RoadmapItemProps) {
  return (
    <div className="relative pl-8 md:pl-12">
      <div
        className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-brand-cream dark:border-carbon-grey ${color}`}
      ></div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-olive-med dark:text-gray-500">
          {phase}
        </span>
        <span
          className={`px-2 py-0.5 text-[10px] rounded-full bg-brand-offwhite dark:bg-white/10 uppercase font-bold ${color.replace(
            'bg-',
            'text-',
          )}`}
        >
          {status}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-brand-olive-dark dark:text-white mb-4">
        {title}
      </h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-brand-olive-med dark:text-gray-400"
          >
            <i className="ph-bold ph-check text-brand-teal dark:text-neon-blue"></i>{' '}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
