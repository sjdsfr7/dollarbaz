import Link from 'next/link';
import AnimatedFadeIn from './ui/AnimatedFadeIn';

export default function HeroSection() {
  return (
    <AnimatedFadeIn>
      <section
        id="home"
        className="hero-glow relative pt-24 pb-20 sm:pt-32 sm:pb-24"
      >
        <div className="hero-content container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-poppins text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="bg-gradient-to-r from-brand-accent-dark to-brand-accent bg-clip-text text-transparent">
                Empower Your Financial
              </span>{' '}
              Future with Dollarbaz
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Seamless Integration of Core Banking & Trading. Your all-in-one
              platform for global finance.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth/sign-up"
                className="font-poppins cta-button rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-accent/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-accent/40"
              >
                Get Started
              </Link>
              <Link
                href="#features"
                className="font-poppins cta-button rounded-full px-6 py-3 text-sm font-semibold leading-6 text-gray-700 ring-1 ring-gray-400 transition-all duration-300 hover:ring-gray-500"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AnimatedFadeIn>
  );
}
