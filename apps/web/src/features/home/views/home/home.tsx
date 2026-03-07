import { CtaSection } from '@/features/home/components/cta-section';
import { FeaturesSection } from '@/features/home/components/features-section';
import { Footer } from '@/features/home/components/footer';
import { HeroSection } from '@/features/home/components/hero-section';
import { HowItWorksSection } from '@/features/home/components/how-it-works-section';
import { Navbar } from '@/features/home/components/navbar';
import { StatsSection } from '@/features/home/components/stats-section';
import { TalentSection } from '@/features/home/components/talent-section';

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
