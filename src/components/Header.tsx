'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Scissors, 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  Calendar, 
  SlidersHorizontal, 
  HeartHandshake, 
  Image as GalleryIcon,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const salonPhone = '(03) 5721 8888';
  const cleanPhone = '0357218888';

  const handlePhoneClick = () => {
    try {
      fetch('/api/leads/call-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent: 'header_call_button',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      }).catch((err) => console.error('Call click tracking error:', err));
    } catch {
      // Best-effort
    }
  };

  return (
    <>
      {/* Top Luxe Salon Announcement Strip */}
      <aside 
        aria-label="Salon Announcement" 
        className="bg-surface-950 border-b border-surface-800/80 px-4 py-2 text-center text-[11px] tracking-widest uppercase text-primary-200/90 flex items-center justify-center gap-2 relative z-50"
      >
        <Sparkles className="w-3.5 h-3.5 text-primary-400 shrink-0" />
        <span>Murphy Street Salon, Wangaratta &bull; 24/7 Online Booking Live</span>
        <span className="hidden md:inline">&bull; King Valley &amp; Milawa Bridal Bookings Open for 2026/27</span>
      </aside>

      {/* Main Sticky Navigation */}
      <header className="sticky top-0 z-40 bg-surface-950/90 backdrop-blur-md border-b border-surface-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-full border border-primary-400/40 bg-gradient-to-tr from-surface-900 to-surface-800 flex items-center justify-center text-primary-200 group-hover:border-primary-400 transition-colors shadow-sm">
              <Scissors className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <span className="text-2xl font-light tracking-[0.25em] text-white font-serif block leading-none">
                VAIN
              </span>
              <p className="text-[10px] tracking-widest uppercase text-primary-300 font-medium mt-1">
                Hair &amp; Beauty &bull; Murphy St
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest font-medium text-surface-300">
            <Link 
              href="/#services" 
              className="text-surface-300 hover:text-primary-300 transition-colors"
            >
              Services
            </Link>
            <Link 
              href="/#estimator" 
              className="flex items-center gap-1.5 text-surface-300 hover:text-primary-300 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-primary-400" />
              <span>Estimator</span>
            </Link>
            <Link 
              href="/#transformations" 
              className="text-surface-300 hover:text-primary-300 transition-colors"
            >
              Transformations
            </Link>
            <Link 
              href="/reviews" 
              className="text-surface-300 hover:text-primary-300 transition-colors"
            >
              Reviews
            </Link>
            <Link 
              href="/gallery" 
              className="text-surface-300 hover:text-primary-300 transition-colors"
            >
              Gallery
            </Link>
          </nav>

          {/* Call & Book CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${cleanPhone}`}
              onClick={handlePhoneClick}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-surface-700/80 bg-surface-900 text-surface-200 text-xs tracking-wider hover:border-primary-400/60 hover:text-primary-200 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-primary-400" />
              <span>{salonPhone}</span>
            </a>

            <Link
              href="/book"
              className="bg-gradient-to-r from-primary-400 via-primary-300 to-amber-200 text-surface-950 font-semibold px-4 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 hover:shadow-lg hover:shadow-primary-400/20 active:scale-98 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/book"
              className="bg-primary-300 text-surface-950 font-semibold px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider"
            >
              Book
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-surface-300 hover:text-white hover:bg-surface-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-28 left-0 right-0 z-40 bg-surface-950/95 backdrop-blur-xl border-b border-surface-800 px-6 py-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4 text-sm uppercase tracking-widest font-medium">
              <Link
                href="/#services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-surface-300 hover:text-primary-300 border-b border-surface-900"
              >
                Services Menu
              </Link>
              <Link
                href="/#estimator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-surface-300 hover:text-primary-300 border-b border-surface-900 flex items-center justify-between"
              >
                <span>Salon Service Estimator</span>
                <span className="text-[10px] bg-primary-950 text-primary-300 px-2 py-0.5 rounded-full border border-primary-800">Interactive</span>
              </Link>
              <Link
                href="/#transformations"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-surface-300 hover:text-primary-300 border-b border-surface-900"
              >
                Before &amp; After Transformations
              </Link>
              <Link
                href="/reviews"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-surface-300 hover:text-primary-300 border-b border-surface-900"
              >
                Client Reviews &amp; Testimonials
              </Link>
              <Link
                href="/gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-surface-300 hover:text-primary-300 border-b border-surface-900"
              >
                Lookbook Gallery
              </Link>
              <Link
                href="/book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-surface-300 hover:text-primary-300 border-b border-surface-900"
              >
                Bridal &amp; Event Consultations
              </Link>

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={`tel:${cleanPhone}`}
                  onClick={() => {
                    handlePhoneClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-full border border-surface-700 bg-surface-900 text-surface-200 text-xs font-semibold text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-primary-400" />
                  <span>Call Us: {salonPhone}</span>
                </a>
                <Link
                  href="/book"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-primary-400 via-primary-300 to-amber-200 text-surface-950 text-xs font-semibold uppercase tracking-wider text-center shadow-lg shadow-primary-400/20"
                >
                  Book Appointment 24/7
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
