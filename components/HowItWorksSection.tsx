import AnimatedFadeIn from './ui/AnimatedFadeIn';

const steps = [
  {
    number: 1,
    title: 'Sign Up',
    description: 'Create your secure account in less than two minutes.',
  },
  {
    number: 2,
    title: 'Deposit Funds',
    description: 'Add funds easily via card, bank transfer, or crypto.',
  },
  {
    number: 3,
    title: 'Trade & Monitor',
    description:
      'Access global markets and monitor your portfolio in real-time.',
  },
  {
    number: 4,
    title: 'Grow Wealth',
    description:
      'Watch your investments grow with our powerful financial tools.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white/50 py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedFadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-brand-accent-dark to-brand-accent bg-clip-text text-transparent">
                Get Started in Minutes
              </span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              A simple, secure process to connect you to your finances.
            </p>
          </div>
        </AnimatedFadeIn>

        <AnimatedFadeIn>
          <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-4 lg:mt-24">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center"
              >
                <div className="font-poppins flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent text-lg font-semibold text-white shadow-md shadow-brand-accent/30">
                  {step.number}
                </div>
                <h3 className="font-poppins mt-5 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </AnimatedFadeIn>
      </div>
    </section>
  );
}
