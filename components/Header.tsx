'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [supabase]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-brand-cream/90 dark:bg-carbon-grey/90 backdrop-blur-md shadow-sm border-brand-olive-med/10 dark:border-neon-blue/10'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-olive-dark to-brand-teal dark:from-neon-blue dark:to-neon-purple flex items-center justify-center text-white font-bold font-poppins text-xl shadow-lg group-hover:scale-105 transition-transform dark:shadow-neon-blue/50">
            D
          </div>
          <span className="font-poppins font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-brand-olive-dark to-brand-teal dark:from-titanium dark:to-neon-blue">
            Dollarbaz
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {['The OS', 'AI Brain', 'Use Cases', 'Roadmap'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              className="relative text-sm font-medium text-brand-olive-dark hover:text-brand-teal dark:text-titanium dark:hover:text-neon-blue transition-colors group"
            >
              {item}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-brand-teal dark:bg-neon-blue transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeSwitcher />

          {user ? (
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border-brand-teal text-brand-teal hover:bg-brand-teal/10 dark:border-neon-blue dark:text-neon-blue dark:hover:bg-neon-blue/10 rounded-full"
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-semibold text-brand-teal hover:bg-brand-teal/5 dark:text-neon-blue dark:hover:bg-neon-blue/10 px-4 py-2 rounded-full transition-colors"
              >
                Sign In
              </Link>
              <Link href="/auth/sign-up">
                <Button className="rounded-full bg-brand-teal text-white hover:bg-brand-olive-dark dark:bg-neon-blue dark:text-carbon-black dark:hover:bg-white dark:hover:text-neon-blue dark:shadow-[0_0_15px_rgba(77,227,255,0.4)] transition-all">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-brand-olive-dark dark:text-titanium p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i
            className={`ph-duotone ${
              mobileMenuOpen ? 'ph-x' : 'ph-list'
            } text-3xl`}
          ></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-cream dark:bg-carbon-grey pt-24 px-6 md:hidden">
          <div className="flex flex-col space-y-6 text-center">
            {['The OS', 'AI Brain', 'Use Cases', 'Roadmap'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="text-xl font-bold text-brand-olive-dark dark:text-titanium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="flex justify-center pt-4">
              <ThemeSwitcher />
            </div>
            <Link href="/auth/sign-up" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-4 px-6 py-6 rounded-full bg-brand-teal dark:bg-neon-blue dark:text-carbon-black text-white font-bold shadow-lg text-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
