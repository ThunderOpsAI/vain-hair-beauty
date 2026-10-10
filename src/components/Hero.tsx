'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Calendar, 
  Heart, 
  Award, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Scissors
} from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-surface-800/80">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(225,29,72,0.12),transparent_55%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-950/80 border border-primary-500/30 text-primary-300 text-xs uppercase tracking-widest"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary-400" />
              <span>Murphy Street&apos;s Premier Hair Sanctuary &bull; Wangaratta</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white font-serif leading-[1.08]"
            >
              Effortless Luxury. <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary-200 via-primary-300 to-amber-200">
                Lived-In Blondes &amp; Bridal Artistry.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-surface-300 max-w-xl font-light leading-relaxed"
            >
              Step into our Murphy Street salon. Whether you crave seamless multi-dimensional balayage, a precision restyle, or bespoke on-location bridal hair for your King Valley winery wedding, our Redken certified colorists craft hair that turns heads.
            </motion.p>

            {/* Accolades & Salon Highlights */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 pt-2 max-w-lg"
            >
              <div className="border border-surface-800/80 bg-surface-900/60 p-4 rounded-2xl text-center shadow-sm">
                <div className="text-primary-200 font-serif text-2xl">Redken</div>
                <div className="text-[10px] uppercase tracking-wider text-surface-400 mt-1">Certified Colorists</div>
              </div>
              <div className="border border-surface-800/80 bg-surface-900/60 p-4 rounded-2xl text-center shadow-sm">
                <div className="text-primary-200 font-serif text-2xl">K18 &bull; Oribe</div>
                <div className="text-[10px] uppercase tracking-wider text-surface-400 mt-1">Molecular Repair</div>
              </div>
              <div className="border border-surface-800/80 bg-surface-900/60 p-4 rounded-2xl text-center shadow-sm">
                <div className="text-primary-200 font-serif text-2xl">#1 Rated</div>
                <div className="text-[10px] uppercase tracking-wider text-surface-400 mt-1">King Valley Bridal</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4 items-center"
            >
              <Link
                href="/book"
                className="bg-gradient-to-r from-primary-400 via-primary-300 to-amber-200 hover:from-primary-300 hover:to-amber-100 text-surface-950 font-semibold px-7 py-3.5 rounded-full text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary-400/20 flex items-center gap-2 active:scale-98"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Seat 24/7</span>
              </Link>
              <Link
                href="/#estimator"
                className="border border-surface-700 hover:border-primary-400 text-surface-200 font-medium px-6 py-3.5 rounded-full text-xs uppercase tracking-widest transition-all flex items-center gap-2 bg-surface-900/50"
              >
                <span>Calculate Time &amp; Cost</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary-300" />
              </Link>
            </motion.div>
          </div>

          {/* Right Editorial Visual Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-gradient-to-b from-surface-900 to-surface-950 border border-surface-800 rounded-3xl p-7 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-5 border-b border-surface-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-950 border border-primary-500/40 flex items-center justify-center text-primary-300">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif tracking-wider text-white">The Vain Signature Experience</h3>
                    <p className="text-[11px] text-surface-400">Murphy Street, Wangaratta</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-[10px] uppercase tracking-widest bg-primary-950 text-primary-300 border border-primary-800/60 rounded-full font-semibold">
                  5.0 ★ Rated
                </span>
              </div>

              {/* Service Cards Showcase */}
              <div className="mt-6 space-y-3">
                <div className="p-3.5 rounded-2xl bg-surface-900/90 border border-surface-800 hover:border-primary-500/40 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-primary-400 font-semibold">Lived-In Color</span>
                      <h4 className="text-sm font-medium text-white mt-0.5">Custom Balayage &amp; Acidic Glaze</h4>
                      <p className="text-xs text-surface-400 mt-1">Soft grow-out with 3–6 months between maintenance sessions.</p>
                    </div>
                    <span className="text-xs font-semibold text-primary-200 shrink-0 ml-3">from $260</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface-900/90 border border-surface-800 hover:border-primary-500/40 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-primary-400 font-semibold">Bridal Artistry</span>
                      <h4 className="text-sm font-medium text-white mt-0.5">King Valley Winery Bridal Suites</h4>
                      <p className="text-xs text-surface-400 mt-1">Mobile styling kits at Brown Brothers, Lancemore, and private estates.</p>
                    </div>
                    <span className="text-xs font-semibold text-primary-200 shrink-0 ml-3">Packages</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface-900/90 border border-surface-800 hover:border-primary-500/40 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-primary-400 font-semibold">Hair Health</span>
                      <h4 className="text-sm font-medium text-white mt-0.5">K18 Peptide &amp; Cezanne Smoothing</h4>
                      <p className="text-xs text-surface-400 mt-1">Eliminate humidity frizz &amp; reverse structural chemical damage.</p>
                    </div>
                    <span className="text-xs font-semibold text-primary-200 shrink-0 ml-3">from $45</span>
                  </div>
                </div>
              </div>

              {/* Bottom Guarantee */}
              <div className="mt-6 pt-5 border-t border-surface-800/80 flex items-center justify-between text-xs text-surface-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary-400" />
                  <span>Free in-depth consultations</span>
                </div>
                <Link href="/book" className="text-primary-300 hover:underline font-medium flex items-center gap-1">
                  Book Online <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
