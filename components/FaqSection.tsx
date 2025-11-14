import AnimatedFadeIn from './ui/AnimatedFadeIn';
import FaqAccordion from './ui/FaqAccordion';

const faqData = [
  {
    question: 'Is Dollarbaz secure?',
    answer:
      'Yes. Security is our highest priority. We use bank-level 256-bit encryption, cold storage for crypto assets, and multi-factor authentication to ensure your funds and data are always protected.',
  },
  {
    question: 'What assets can I trade?',
    answer:
      "Dollarbaz provides access to a wide range of markets, including major and minor Forex pairs, the world's largest cryptocurrencies (like Bitcoin and Ethereum), and major global indices.",
  },
  {
    question: 'What are the fees?',
    answer:
      'We believe in transparent pricing. We offer competitive, low-cost trading fees and zero hidden account management fees. All deposit and withdrawal fees are clearly listed in your dashboard.',
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="bg-white/50 py-24 sm:py-32">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AnimatedFadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-brand-accent-dark to-brand-accent bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
          </div>
        </AnimatedFadeIn>

        <AnimatedFadeIn>
          <div id="faq-container" className="mt-16 space-y-4">
            <FaqAccordion items={faqData} />
          </div>
        </AnimatedFadeIn>
      </div>
    </section>
  );
}
