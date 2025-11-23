'use client';

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-brand-cream dark:bg-carbon-grey transition-colors duration-500">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold text-center text-brand-olive-dark dark:text-white mb-16">
          What You Can Do With Dollarbaz
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {/* BANKING */}
          <FeatureCard
            category="Banking"
            title="Local IBANs"
            desc="Get local account details in 10+ currencies instantly."
          />
          <FeatureCard
            category="Banking"
            title="Smart FX"
            desc="Exchange at interbank rates with zero hidden markup."
          />

          {/* TRADING */}
          <FeatureCard
            category="Trading"
            title="Unified Wallet"
            desc="Hold stocks, crypto, and cash side-by-side."
            color="text-brand-olive-dark dark:text-electric-purple"
          />
          <FeatureCard
            category="Trading"
            title="Auto-Invest"
            desc="Set recurring buys or round-up spare change."
            color="text-brand-olive-dark dark:text-electric-purple"
          />

          {/* AI BRAIN - Special Dark Cards */}
          <div className="p-6 rounded-xl bg-brand-olive-dark dark:bg-[#0a0e12] border border-brand-olive-dark dark:border-neon-blue/30 group hover:scale-[1.02] transition-transform">
            <div className="text-brand-teal dark:text-neon-blue font-bold mb-4 uppercase text-xs tracking-wider">
              AI Brain
            </div>
            <h4 className="font-bold text-lg mb-2 text-white">Smart Plans</h4>
            <p className="text-sm text-gray-400">
              Dynamic financial roadmaps that adapt to your life.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-brand-olive-dark dark:bg-[#0a0e12] border border-brand-olive-dark dark:border-neon-blue/30 group hover:scale-[1.02] transition-transform">
            <div className="text-brand-teal dark:text-neon-blue font-bold mb-4 uppercase text-xs tracking-wider">
              AI Brain
            </div>
            <h4 className="font-bold text-lg mb-2 text-white">Command Bar</h4>
            <p className="text-sm text-gray-400">
              Control your money with natural language.
            </p>
          </div>

          {/* BUSINESS */}
          <FeatureCard
            category="Business"
            title="Global Payroll"
            desc="Pay your remote team in one click, any currency."
            color="text-brand-sage dark:text-neon-flame"
          />
          <FeatureCard
            category="Business"
            title="On-Chain Settlement"
            desc="Instant B2B transfers using stablecoin rails."
            color="text-brand-sage dark:text-neon-flame"
          />
        </div>
      </div>
    </section>
  );
}

// Reusable White Card with Green Hover
interface FeatureCardProps {
  category: string;
  title: string;
  desc: string;
  color?: string;
}
function FeatureCard({ category, title, desc, color }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-[#1a212b] border border-transparent dark:border-white/5 hover:border-brand-teal dark:hover:border-neon-blue shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(39,134,100,0.15)] dark:hover:shadow-[0_0_20px_rgba(77,227,255,0.1)] transition-all duration-300 group">
      <div
        className={`${
          color || 'text-brand-teal dark:text-neon-blue'
        } font-bold mb-4 uppercase text-xs tracking-wider`}
      >
        {category}
      </div>
      <h4 className="font-bold text-lg mb-2 text-brand-olive-dark dark:text-white">
        {title}
      </h4>
      <p className="text-sm text-brand-olive-med dark:text-gray-400">{desc}</p>
    </div>
  );
}
