'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, CalendarCheck, Phone, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function PreFooterCTAs() {
  const salonPhone = '(03) 5721 8888';
  const cleanPhone = '0357218888';

  const handleCallTracking = () => {
    try {
      fetch('/api/leads/call-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent: 'prefooter_cta_call',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      }).catch((err) => console.error(err));
    } catch {
      // Best-effort
    }
  };

  return (
    <section className="py-20 relative z-10 border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-950 text-primary-300 text-xs font-semibold tracking-widest uppercase border border-primary-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary-400" />
            <span>Murphy Street Atelier &bull; Wangaratta</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white font-serif tracking-tight">
            Ready for Your Hair Transformation?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-surface-300 font-light leading-relaxed">
            Reserve your seat online with 24/7 instant confirmation, or call our Murphy Street front desk directly for personal coordination.
          </p>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Interactive Salon Estimator */}
          <Link href="/#estimator" className="group block">
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="h-full p-8 sm:p-10 rounded-3xl bg-surface-900 text-white border border-surface-800 shadow-2xl hover:border-primary-400/60 transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <Calculator className="w-32 h-32 text-primary-400" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-950 text-primary-300 border border-primary-500/30 text-xs font-semibold uppercase tracking-wider mb-4">
                  <Calculator className="w-3.5 h-3.5" />
                  Interactive Estimator
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-white group-hover:text-primary-200 transition-colors">
                  Estimate Salon Time &amp; Cost
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-surface-300 font-light leading-relaxed">
                  Select your hair length, lightening package, and K18/Olaplex care treatments to preview your chair time and investment range in seconds.
                </p>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary-300 group-hover:text-primary-200">
                <span>Launch Estimator Tool</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>
          </Link>

          {/* Card 2: Book Appointment & Bridal Inquiry */}
          <Link href="/book" className="group block">
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="h-full p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-primary-400 via-primary-300 to-amber-200 text-surface-950 shadow-2xl hover:shadow-primary-400/20 transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none text-surface-950">
                <CalendarCheck className="w-32 h-32" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-surface-950/15 text-surface-950 border border-surface-950/20 text-xs font-bold uppercase tracking-wider mb-4">
                  <CalendarCheck className="w-3.5 h-3.5 text-surface-950" />
                  Instant Online Booking
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-surface-950">
                  Book Salon Seat &amp; Bridal Party
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-surface-950/80 font-medium leading-relaxed">
                  24/7 instant online confirmation for cuts, colors, and treatments. Dedicated inquiry portal for King Valley and Milawa winery bridal suites.
                </p>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-surface-950 group-hover:translate-x-1 transition-transform">
                <span>Reserve Appointment Online</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </Link>

        </div>

        {/* Direct Call Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-surface-900 border border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-950 border border-primary-500/40 text-primary-300 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-serif text-white">Prefer to talk with our Murphy Street stylists directly?</h4>
              <p className="text-xs text-surface-400">We take calls during salon hours for custom inquiries &amp; same-day openings.</p>
            </div>
          </div>
          <a
            href={`tel:${cleanPhone}`}
            onClick={handleCallTracking}
            className="px-6 py-3 rounded-full bg-surface-950 hover:bg-surface-800 text-primary-200 border border-primary-500/40 font-semibold text-xs tracking-wider transition-colors shrink-0 flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 text-primary-400" />
            <span>Call: {salonPhone}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
