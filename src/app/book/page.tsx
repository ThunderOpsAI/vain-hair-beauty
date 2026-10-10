import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { BookingForm } from '@/components/BookingForm';
import { SalonServiceEstimator } from '@/components/SalonServiceEstimator';
import { PreFooterCTAs } from '@/components/PreFooterCTAs';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';

export const metadata: Metadata = {
  title: 'Book Appointment & Bridal Consultation | Vain Hair & Beauty Wangaratta',
  description: 'Book your hair appointment online 24/7 or submit your King Valley & Milawa winery wedding bridal party inquiry. Murphy Street salon, Wangaratta.',
  openGraph: {
    title: 'Book Hair Appointment | Vain Hair and Beauty Wangaratta',
    description: 'Instant online booking for lived-in blonding, balayage, precision cuts, and bridal hair packages in Wangaratta.',
    type: 'website',
  },
};

export default function BookPage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-primary-900/60 selection:text-white text-surface-200 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10 pt-4">
        <BookingForm />
        <div className="border-t border-surface-800">
          <SalonServiceEstimator />
        </div>
        <PreFooterCTAs />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
