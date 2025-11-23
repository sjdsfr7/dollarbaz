'use client';

import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 bg-brand-cream dark:bg-[#0a0e12] transition-colors duration-500 relative overflow-hidden">
      {/* Background: Subtle Gradient + Grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Light Mode Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cream via-[#f4f7f4] to-brand-offwhite dark:opacity-0 transition-opacity duration-500" />
        {/* Dark Mode Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#12181f] via-[#0f1419] to-black opacity-0 dark:opacity-100 transition-opacity duration-500" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(currentColor 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        ></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 relative z-10">
        {/* LEFT: Brand Panel (Hidden on mobile, visible on large screens) */}
        <div className="hidden lg:flex flex-col justify-between p-8 relative">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-8 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-olive-dark to-brand-teal dark:from-neon-blue dark:to-electric-purple flex items-center justify-center text-white font-bold font-poppins text-2xl shadow-lg transition-transform group-hover:scale-105">
                D
              </div>
              <span className="font-poppins font-bold text-2xl text-brand-olive-dark dark:text-white tracking-tight">
                Dollarbaz
              </span>
            </Link>

            <h1 className="text-4xl font-bold text-brand-olive-dark dark:text-white leading-tight mb-6">
              The unified financial OS for your money.
            </h1>

            <ul className="space-y-4 text-lg text-brand-olive-med dark:text-gray-400">
              <li className="flex items-center gap-3">
                <i className="ph-fill ph-check-circle text-brand-teal dark:text-neon-blue text-xl"></i>{' '}
                Multi-currency accounts
              </li>
              <li className="flex items-center gap-3">
                <i className="ph-fill ph-check-circle text-brand-teal dark:text-neon-blue text-xl"></i>{' '}
                Unified trading wallet
              </li>
              <li className="flex items-center gap-3">
                <i className="ph-fill ph-check-circle text-brand-teal dark:text-neon-blue text-xl"></i>{' '}
                AI Money Brain
              </li>
              <li className="flex items-center gap-3">
                <i className="ph-fill ph-check-circle text-brand-teal dark:text-neon-blue text-xl"></i>{' '}
                Business ready
              </li>
            </ul>
          </div>

          {/* System Status Footer */}
          <div className="flex items-center gap-2 text-xs font-mono text-brand-olive-med/60 dark:text-gray-600 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-brand-teal dark:bg-neon-blue animate-pulse"></span>
            System Status: Online · v0.1.0
          </div>
        </div>

        {/* RIGHT: Auth Card Container */}
        <div className="flex flex-col justify-center">
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-teal dark:bg-neon-blue flex items-center justify-center text-white font-bold">
                D
              </div>
              <span className="font-bold text-xl text-brand-olive-dark dark:text-white">
                Dollarbaz
              </span>
            </Link>
            <ThemeSwitcher />
          </div>

          {/* The actual page content (Login/Signup forms) goes here */}
          <div className="relative">
            {/* Theme Switcher Desktop Position */}
            <div className="hidden lg:block absolute -top-12 right-0">
              <ThemeSwitcher />
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
