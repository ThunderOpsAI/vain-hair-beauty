import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { SalonServiceEstimator } from '@/components/SalonServiceEstimator';
import { BeforeAfterSection } from '@/components/BeforeAfterSection';
import { ReviewsHighlight } from '@/components/ReviewsHighlight';
import { PreFooterCTAs } from '@/components/PreFooterCTAs';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';

export default function HomePage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-primary-900/60 selection:text-white text-surface-200 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Services />
        <SalonServiceEstimator />
        <BeforeAfterSection />
        <ReviewsHighlight />
        <PreFooterCTAs />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
