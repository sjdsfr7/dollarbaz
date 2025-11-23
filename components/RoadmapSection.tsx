'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="py-24 bg-brand-offwhite dark:bg-carbon-black border-t border-brand-olive-med/5 dark:border-white/5 transition-colors duration-500"
    >
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-olive-dark dark:text-white">
            The Path Forward
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-brand-olive-med/20 dark:bg-white/10"></div>

          {/* Phase 1 */}
          <RoadmapItem
            phase="Phase 1"
            title="Global Accounts & Base AI"
            desc="Multi-currency accounts, Basic AI insights, Trading Wallet"
            align="left"
            active
          />

          {/* Phase 2 */}
          <RoadmapItem
            phase="Phase 2"
            title="Multi-Agent System & Payments"
            desc="Full AI Agent Suite, Unified Timeline v2, B2B Invoicing"
            align="right"
          />

          {/* Phase 3 */}
          <RoadmapItem
            phase="Phase 3"
            title="Strategy Marketplace & Enterprise"
            desc="Strategy Builder UI, Marketplace, API Access"
            align="left"
          />
        </div>

        {/* Trust */}
        <div className="mt-24 flex flex-wrap justify-center gap-12 md:gap-20 opacity-60 dark:opacity-40 grayscale dark:grayscale-0 transition-opacity">
          <TrustBadge icon="ph-bank" text="Regulated EMI" />
          <TrustBadge icon="ph-lock-key" text="MPC Custody" />
          <TrustBadge icon="ph-shield-check" text="SOC2 Type II" />
        </div>
      </div>
    </section>
  );
}

interface RoadmapItemProps {
  phase: string;
  title: string;
  desc: string;
  align: 'left' | 'right';
  active?: boolean;
}

interface TrustBadgeProps {
  icon: string;
  text: string;
}

function RoadmapItem({ phase, title, desc, align, active }: RoadmapItemProps) {
  const isLeft = align === 'left';
  return (
    <div className="relative flex items-center justify-between mb-16">
      <div
        className={`w-5/12 ${
          isLeft ? 'text-right pr-8' : 'order-last pl-8 text-left'
        }`}
      >
        <h4
          className={`font-bold text-xl ${
            active
              ? 'text-brand-olive-dark dark:text-neon-blue'
              : 'text-brand-olive-med/70 dark:text-gray-300'
          }`}
        >
          {phase}
        </h4>
        <h5 className="mt-1 font-semibold text-brand-olive-med dark:text-gray-400">
          {title}
        </h5>
        <p className="text-brand-olive-med dark:text-gray-500 text-sm">
          {desc}
        </p>
      </div>
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 z-10 ${
          active
            ? 'bg-brand-teal dark:bg-neon-blue border-white dark:border-carbon-black shadow-sm dark:shadow-neon-blue'
            : 'bg-white dark:bg-carbon-black border-brand-olive-med/30 dark:border-white/20'
        }`}
      ></div>
      <div className="w-5/12"></div>
    </div>
  );
}

function TrustBadge({ icon, text }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-3 font-bold text-lg text-brand-olive-med dark:text-gray-400">
      <i className={`ph-duotone ${icon} text-3xl`}></i> {text}
    </div>
  );
}
