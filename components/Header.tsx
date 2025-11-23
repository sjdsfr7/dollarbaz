'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// --- Icons ---
const IconSearch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
      clipRule="evenodd"
    />
  </svg>
);

const IconMenu = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    {...props}
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const IconClose = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // --- REFINED NAVIGATION LINKS ---
  const navLinks = [
    { href: '#legacy', label: 'Legacy' },
    { href: '#features', label: 'Core Banking' },
    { href: '#trading', label: 'Trading' },
    { href: '#contact', label: 'Contact Us' },
  ];

  return (
    <>
      <header
        id="header"
        className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : 'shadow-sm border-b border-gray-200/50'
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <span className="gradient-logo text-2xl font-bold transition-transform duration-300 group-hover:scale-105">
                  Dollarbaz
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-poppins nav-link-animated text-gray-700 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search & Auth */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="rounded-full border border-gray-300 bg-gray-100 py-1.5 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-500 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-2.5">
                  <IconSearch className="h-4 w-4 text-gray-500" />
                </div>
              </div>

              {/* Link to template's auth pages */}
              <Link
                href="/auth/login"
                className="font-poppins cta-button rounded-full border border-brand-accent px-4 py-1.5 text-sm font-semibold text-brand-accent transition-all duration-300 hover:bg-brand-accent/10"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className="font-poppins cta-button rounded-full border border-brand-accent bg-brand-accent px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-brand-accent-dark hover:border-brand-accent-dark"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                id="mobile-menu-open-btn"
                type="button"
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-accent"
              >
                <span className="sr-only">Open main menu</span>
                <IconMenu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 flex transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="relative w-64 max-w-xs bg-white shadow-xl h-full flex flex-col">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              id="mobile-menu-close-btn"
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-accent"
            >
              <span className="sr-only">Close menu</span>
              <IconClose className="h-6 w-6" />
            </button>
          </div>

          <div className="px-4 pt-16 pb-4">
            <Link href="/" onClick={toggleMobileMenu} className="block mb-8">
              <span className="gradient-logo text-2xl font-bold">
                Dollarbaz
              </span>
            </Link>
          </div>

          <div className="space-y-1 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMobileMenu}
                className="font-poppins block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto p-4 space-y-2 border-t border-gray-100">
            <Link
              href="/auth/sign-up"
              onClick={toggleMobileMenu}
              className="font-poppins cta-button block w-full rounded-full bg-brand-accent px-4 py-2 text-center text-base font-semibold text-white shadow-sm hover:bg-brand-accent-dark"
            >
              Sign Up
            </Link>
            <Link
              href="/auth/login"
              onClick={toggleMobileMenu}
              className="font-poppins cta-button block w-full rounded-full border border-brand-accent px-4 py-2 text-center text-base font-semibold text-brand-accent hover:bg-brand-accent/10"
            >
              Sign In
            </Link>
          </div>
        </div>
        <div
          id="mobile-menu-overlay"
          className="flex-1 bg-black/30"
          onClick={toggleMobileMenu}
        ></div>
      </div>
    </>
  );
}
