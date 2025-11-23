'use client';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-cream dark:bg-carbon-grey pt-32 pb-20 transition-colors">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-5xl font-bold text-brand-olive-dark dark:text-white mb-8 text-center">
          We’re building the OS for money.
        </h1>
        <p className="text-xl text-brand-olive-med dark:text-gray-400 text-center max-w-2xl mx-auto mb-20">
          Dollarbaz exists to unify and upgrade the world’s financial stack. No
          more fragmentation.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="bg-white dark:bg-[#12181f] p-8 rounded-3xl border border-brand-olive-med/10 dark:border-white/5">
            <h2 className="text-2xl font-bold mb-4 text-brand-olive-dark dark:text-white">
              Our Mission
            </h2>
            <p className="text-brand-olive-med dark:text-gray-400">
              To make money systems unified, intelligent, and borderless for
              everyone.
            </p>
          </div>
          <div className="bg-white dark:bg-[#12181f] p-8 rounded-3xl border border-brand-olive-med/10 dark:border-white/5">
            <h2 className="text-2xl font-bold mb-4 text-brand-olive-dark dark:text-white">
              Our Vision
            </h2>
            <p className="text-brand-olive-med dark:text-gray-400">
              A world where your Bank isn&rsquo;t a place you store money, but
              software that optimizes it.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-12 text-brand-olive-dark dark:text-white">
          Our Values
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            'Unified by Default',
            'Secure by Design',
            'Forward Thinking',
            'Explainable AI',
          ].map((val) => (
            <div
              key={val}
              className="p-6 bg-brand-offwhite dark:bg-[#0a0e12] rounded-xl border-l-4 border-brand-teal dark:border-neon-blue"
            >
              <h3 className="font-bold text-lg text-brand-olive-dark dark:text-white">
                {val}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
