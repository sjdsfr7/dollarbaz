'use client';

export default function OSLayerSection() {
  return (
    <section
      id="os"
      className="py-24 bg-brand-offwhite dark:bg-carbon-black transition-colors duration-500"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-olive-dark dark:text-white mb-4">
            The OS Layer for{' '}
            <span className="text-brand-teal dark:text-neon-blue">
              All Your Money
            </span>
          </h2>
          <p className="text-lg text-brand-olive-med dark:text-gray-400">
            Not a bank. Not an exchange. Not a super app. <br />A unified
            operating system.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <OSCard
            title="Global Banking"
            desc="Accounts, Cards, Multi-currency & Smart FX."
            icon="ph-globe-hemisphere-west"
            theme="teal"
          />
          <OSCard
            title="Trading Layer"
            desc="Stocks, ETFs, Crypto, RWAs & Strategies."
            icon="ph-trend-up"
            theme="olive"
          />
          <OSCard
            title="AI Brain Core"
            desc="Orchestrator for Risk, Yield, Income & Spend."
            icon="ph-brain"
            theme="core"
          />
          <OSCard
            title="Payments Layer"
            desc="Invoices, Payroll, On-chain & Global transfers."
            icon="ph-arrows-left-right"
            theme="sage"
          />
        </div>
      </div>
    </section>
  );
}

interface OSCardProps {
  title: string;
  desc: string;
  icon: string;
  theme: 'teal' | 'olive' | 'sage' | 'core';
}

function OSCard({ title, desc, icon, theme }: OSCardProps) {
  const themes: Record<OSCardProps['theme'], string> = {
    teal: 'text-brand-teal dark:text-neon-blue bg-brand-teal/10 dark:bg-neon-blue/10',
    olive:
      'text-brand-olive-dark dark:text-electric-purple bg-brand-olive-dark/10 dark:bg-electric-purple/10',
    sage: 'text-brand-sage dark:text-neon-flame bg-brand-sage/10 dark:bg-neon-flame/10',
    core: 'text-white bg-white/20',
  };

  const isCore = theme === 'core';

  return (
    <div
      className={`p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
        isCore
          ? 'bg-brand-teal dark:bg-gradient-to-br dark:from-neon-blue dark:to-electric-purple shadow-lg dark:shadow-neon-blue hover:scale-105 border-transparent'
          : 'bg-white dark:bg-[#1a212b] border border-gray-100 dark:border-white/5 hover:border-brand-teal dark:hover:border-neon-blue shadow-sm'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${themes[theme]}`}
      >
        <i className={`ph-duotone ${icon} text-3xl`}></i>
      </div>
      <h3
        className={`font-bold text-lg mb-2 ${
          isCore ? 'text-white' : 'text-brand-olive-dark dark:text-titanium'
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm ${
          isCore ? 'text-white/90' : 'text-brand-olive-med dark:text-gray-500'
        }`}
      >
        {desc}
      </p>
    </div>
  );
}
