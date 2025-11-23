'use client';

export default function UnifiedTimeline() {
  return (
    <section className="py-24 bg-brand-cream dark:bg-carbon-grey relative z-10 transition-colors duration-500">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-olive-dark dark:text-white mb-4">
            Clarity Through Unification.
          </h2>
          <p className="text-lg text-brand-olive-med dark:text-gray-400">
            One timeline. One balance. One wallet.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-[#1a212b] rounded-2xl shadow-[0_10px_40px_-10px_rgba(78,89,74,0.08)] dark:shadow-none border border-brand-olive-med/10 dark:border-white/5 overflow-hidden transition-colors">
          <div className="bg-brand-offwhite dark:bg-[#232b36] px-6 py-4 border-b border-brand-olive-med/10 dark:border-white/5 flex justify-between items-center">
            <div className="font-bold text-brand-olive-dark dark:text-white flex items-center gap-2">
              <i className="ph-duotone ph-list-dashes"></i> Unified Timeline
            </div>
            <div className="text-sm text-brand-olive-med dark:text-gray-400">
              Today
            </div>
          </div>

          <div className="divide-y divide-brand-olive-med/5 dark:divide-white/5">
            <TimelineItem
              icon="ph-chart-pie-slice"
              title="Bought AAPL Stock"
              sub="Investment Strategy A"
              amount="-$250.00"
              source="USD Wallet"
              theme="olive"
            />
            <TimelineItem
              icon="ph-briefcase"
              title="Client Payment Received"
              sub="Invoice #4029"
              amount="+$4,200.00"
              source="Business EUR"
              theme="teal"
              isPositive
            />
            <TimelineItem
              icon="ph-coffee"
              title="Starbucks Coffee"
              sub="Personal Spend"
              amount="-$5.40"
              source="Metal Card"
              theme="sage"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type TimelineItemProps = {
  icon: string;
  title: string;
  sub: string;
  amount: string;
  source: string;
  theme: 'olive' | 'teal' | 'sage';
  isPositive?: boolean;
};

function TimelineItem({
  icon,
  title,
  sub,
  amount,
  source,
  theme,
  isPositive,
}: TimelineItemProps) {
  const themes: Record<TimelineItemProps['theme'], string> = {
    olive:
      'bg-brand-olive-dark/10 text-brand-olive-dark dark:bg-electric-purple/20 dark:text-electric-purple group-hover:bg-brand-olive-dark group-hover:text-white',
    teal: 'bg-brand-teal/10 text-brand-teal dark:bg-neon-blue/20 dark:text-neon-blue group-hover:bg-brand-teal group-hover:text-white',
    sage: 'bg-brand-sage/10 text-brand-sage dark:bg-neon-flame/20 dark:text-neon-flame group-hover:bg-brand-sage group-hover:text-white',
  };

  return (
    <div className="p-6 flex items-center gap-5 hover:bg-brand-offwhite/50 dark:hover:bg-white/5 transition-colors group cursor-default">
      <div
        className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${themes[theme]}`}
      >
        <i className={`ph-duotone ${icon} text-2xl`}></i>
      </div>
      <div className="flex-1">
        <div className="font-bold text-brand-olive-dark dark:text-white text-lg">
          {title}
        </div>
        <div className="text-xs text-brand-olive-med dark:text-gray-500 font-medium">
          {sub}
        </div>
      </div>
      <div className="text-right">
        <div
          className={`font-bold ${
            isPositive
              ? 'text-brand-teal dark:text-neon-blue'
              : 'text-brand-olive-dark dark:text-white'
          }`}
        >
          {amount}
        </div>
        <div className="text-xs text-brand-olive-med dark:text-gray-500">
          {source}
        </div>
      </div>
    </div>
  );
}
