import { CtaSection } from '@/features/components/cta-section';
import { FeaturesSection } from '@/features/components/features-section';
import { Footer } from '@/features/components/footer';
import { HeroSection } from '@/features/components/hero-section';
import { HowItWorksSection } from '@/features/components/how-it-works-section';
import { Navbar } from '@/features/components/navbar';
import { StatsSection } from '@/features/components/stats-section';
import { TalentSection } from '@/features/components/talent-section';

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TalentSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
