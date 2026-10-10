import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Gallery } from '@/components/Gallery';
import { BeforeAfterSection } from '@/components/BeforeAfterSection';
import { PreFooterCTAs } from '@/components/PreFooterCTAs';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';

export const metadata: Metadata = {
  title: 'Salon Lookbook & Hair Transformations | Vain Hair & Beauty Wangaratta',
  description: 'Browse our portfolio of lived-in balayage, precision bob haircuts, Cezanne keratin smoothing, and King Valley winery bridal hair on Murphy Street.',
  openGraph: {
    title: 'Lookbook & Transformations | Vain Hair and Beauty Wangaratta',
    description: 'Explore finished balayage blondes, french bobs, and bridal hair transformations across Wangaratta and Milawa.',
    type: 'website',
  },
};

export default function GalleryPage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-primary-900/60 selection:text-white text-surface-200 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10 pt-4">
        <Gallery />
        <BeforeAfterSection />
        <PreFooterCTAs />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
