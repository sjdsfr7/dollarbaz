import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LiveTicker from '@/components/LiveTicker';
import ProblemSection from '@/components/ProblemSection';
import OSLayerSection from '@/components/OSLayerSection';
import AIBrainSection from '@/components/AIBrainSection';
import UnifiedTimeline from '@/components/UnifiedTimeline';
import UseCasesSection from '@/components/UseCasesSection';
import FeaturesSection from '@/components/FeaturesSection';
import RoadmapSection from '@/components/RoadmapSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-brand-cream dark:bg-carbon-grey transition-colors duration-500">
      <Header />
      <HeroSection />
      <LiveTicker />
      <ProblemSection />
      <OSLayerSection />
      <AIBrainSection />
      <UnifiedTimeline />
      <UseCasesSection />
      <FeaturesSection />
      <RoadmapSection />
      <CTASection />
      <Footer />
    </main>
  );
}
