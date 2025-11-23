'use client';

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-brand-cream dark:bg-carbon-grey pt-32 pb-20 transition-colors">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-teal/30 text-brand-teal dark:text-neon-blue text-xs font-mono mb-6">
            <i className="ph-fill ph-lock-key"></i> BANK-GRADE SECURITY
          </div>
          <h1 className="text-5xl font-bold text-brand-olive-dark dark:text-white mb-6">
            Security at Dollarbaz.
          </h1>
          <p className="text-xl text-brand-olive-med dark:text-gray-400">
            We treat security as our primary feature.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <SecurityBlock
            title="Encryption"
            desc="All data is encrypted in transit (TLS 1.3) and at rest (AES-256)."
            icon="ph-lock"
          />
          <SecurityBlock
            title="MPC Custody"
            desc="Assets are secured using Multi-Party Computation technology."
            icon="ph-vault"
          />
          <SecurityBlock
            title="Regulated Partners"
            desc="We work with licensed EMIs and brokers for all money movement."
            icon="ph-bank"
          />
          <SecurityBlock
            title="24/7 Monitoring"
            desc="Automated systems watch for anomalies and fraud attempts."
            icon="ph-eye"
          />
        </div>
      </div>
    </main>
  );
}

interface SecurityBlockProps {
  title: string;
  desc: string;
  icon: string;
}

function SecurityBlock({ title, desc, icon }: SecurityBlockProps) {
  return (
    <div className="bg-white dark:bg-[#12181f] p-8 rounded-2xl border border-brand-olive-med/10 dark:border-white/5">
      <div className="w-12 h-12 rounded-full bg-brand-offwhite dark:bg-white/5 flex items-center justify-center text-2xl text-brand-teal dark:text-neon-blue mb-4">
        <i className={`ph-duotone ${icon}`}></i>
      </div>
      <h3 className="text-xl font-bold text-brand-olive-dark dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-brand-olive-med dark:text-gray-400">{desc}</p>
    </div>
  );
}
