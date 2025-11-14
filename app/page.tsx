import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LiveTicker from '@/components/LiveTicker';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Page Content */}
      <div className="flex-grow">
        <HeroSection />
        <LiveTicker />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FaqSection />
      </div>

      <Footer />
    </div>
  );
}
