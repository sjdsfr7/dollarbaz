import AnimatedFadeIn from './ui/AnimatedFadeIn';

// Define SVG icons as components
const IconWallet = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3.75 3.75 0 0 1-3.75-3.75V5.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 6 21h9a2.25 2.25 0 0 0 2.25-2.25V15m3 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);
const IconChartBar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625C9.75 8.004 10.254 7.5 10.875 7.5h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 9.75 19.875V8.625ZM16.5 4.125C16.5 3.504 17.004 3 17.625 3h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 16.5 19.875V4.125Z"
    />
  </svg>
);
const IconPie = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
    />
  </svg>
);

const features = [
  {
    icon: IconWallet,
    title: 'Multi-Currency Wallets',
    description: 'Store and manage your funds across global currencies.',
    id: 'features', // For anchor link
  },
  {
    icon: IconChartBar,
    title: 'Trading Access',
    description: 'Trade Forex, Crypto, and Indices in real-time.',
    id: 'trading', // For anchor link
  },
  {
    icon: IconPie,
    title: 'Financial Dashboard',
    description: 'Track your portfolio and financial health in one place.',
    id: 'dashboard-feature',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features-section" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedFadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-brand-accent-dark to-brand-accent bg-clip-text text-transparent">
                A New Era of Financial Control
              </span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              All your financial tools, unified in one powerful dashboard.
            </p>
          </div>
        </AnimatedFadeIn>

        <AnimatedFadeIn>
          <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 md:grid-cols-3 lg:mt-24">
            {features.map((feature) => (
              <div
                key={feature.title}
                id={feature.id} // Apply id for anchor links
                className="feature-card rounded-2xl border border-gray-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-brand-accent/30 hover:shadow-brand-accent/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg text-brand-accent">
                  <feature.icon className="h-10 w-10" />
                </div>
                <h3 className="font-poppins mt-6 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </AnimatedFadeIn>
      </div>
    </section>
  );
}
