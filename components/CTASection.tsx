'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 bg-brand-olive-dark dark:bg-carbon-black text-white text-center px-6 relative overflow-hidden transition-colors duration-500">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Join the Rebellion.
        </h2>
        <p className="text-xl text-white/70 mb-10">
          Dollarbaz is for the ones who refuse to be limited by borders,
          currencies, or outdated systems.
        </p>
        <Link
          href="/auth/sign-up"
          className="inline-block px-10 py-5 rounded-full bg-brand-teal dark:bg-neon-blue text-white dark:text-carbon-black font-bold text-lg shadow-lg hover:bg-white hover:text-brand-olive-dark dark:hover:bg-white dark:hover:text-neon-blue dark:shadow-neon-blue transition-all hover:-translate-y-1"
        >
          Join Early Access
        </Link>
      </div>
    </section>
  );
}
