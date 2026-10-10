import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { ApprovedReviews } from '@/components/ApprovedReviews';
import { ReviewSubmitForm } from '@/components/ReviewSubmitForm';
import { PreFooterCTAs } from '@/components/PreFooterCTAs';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';

export const metadata: Metadata = {
  title: 'Client Reviews & Testimonials | Vain Hair & Beauty Wangaratta',
  description: 'Read reviews and testimonials from Wangaratta locals, brides, and blonde enthusiasts who trust Vain Hair & Beauty on Murphy Street.',
  openGraph: {
    title: 'Client Reviews & Testimonials | Vain Hair and Beauty',
    description: 'Verified 5.0 star testimonials from salon clients, brides, and color transformation guests across North East Victoria.',
    type: 'website',
  },
};

export default function ReviewsPage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-primary-900/60 selection:text-white text-surface-200 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10">
        <ApprovedReviews />
        <ReviewSubmitForm />
        <PreFooterCTAs />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
