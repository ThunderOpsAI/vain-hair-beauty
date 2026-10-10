'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Scissors, 
  Heart, 
  Clock, 
  ChevronRight, 
  Check, 
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CategoryKey = 'colour' | 'styling' | 'bridal' | 'treatments';

const CATEGORIES: { id: CategoryKey; label: string; description: string }[] = [
  {
    id: 'colour',
    label: 'Colour & Blonding',
    description: 'Signature lived-in balayage, babylights, and custom Redken Shades EQ acidic glazes crafted to grow out seamlessly.',
  },
  {
    id: 'styling',
    label: 'Cuts & Styling',
    description: 'Tailored precision dry and wet cuts, bouncy blowouts, and effortless lived-in texture designed for your face shape.',
  },
  {
    id: 'bridal',
    label: 'Bridal & Formal',
    description: 'Bespoke bridal hair suites for King Valley wineries, Milawa estates, and North East destination weddings.',
  },
  {
    id: 'treatments',
    label: 'Repair & Smoothing',
    description: 'Targeted molecular bond repair rituals and formaldehyde-free keratin smoothing for glassy, touchable shine.',
  },
];

const SERVICES_DATA = {
  colour: [
    {
      id: 'lived-in-blonde',
      name: 'Signature Lived-In Blonde Balayage',
      time: '3.0 – 3.5 hrs',
      price: 'from $260',
      badge: 'Most Requested',
      desc: 'Seamless dimensional root shadow, freehand balayage or foilayage, basin gloss toner, and signature bouncy wave finish.',
      included: ['Custom placement plan', 'Bond protecting additive', 'Acidic glaze gloss', 'Hot towel aromatherapy ritual'],
    },
    {
      id: 'full-foils',
      name: 'Full Head Custom Micro-Foils + Toner',
      time: '2.5 – 3.0 hrs',
      price: 'from $220',
      badge: 'Maximum Brightness',
      desc: 'Ultra-fine micro weaves from roots to ends for comprehensive brightness, hairline face-framing, and custom toner melt.',
      included: ['High-density placement', 'Toner glaze application', 'Moisture basin mask', 'Style finish'],
    },
    {
      id: 'half-foils',
      name: 'Half Head Dimensional Foils',
      time: '2.0 – 2.5 hrs',
      price: 'from $165',
      badge: 'Maintenance',
      desc: 'Crown, hairline, and parting refresh to maintain brightness between full lightening appointments.',
      included: ['Crown & hairline foils', 'Toner balance', 'Basin scalp massage'],
    },
    {
      id: 'gloss-toner',
      name: 'Illuminating Gloss & Root Shadow',
      time: '1.0 hr',
      price: '$85',
      badge: 'Quick Refresh',
      desc: 'Neutralize brassiness, enrich depth, and restore mirror shine between major color services.',
      included: ['Shades EQ acidic toner', 'Blowout style', 'UV heat protection'],
    },
    {
      id: 'color-correction',
      name: 'Complex Color Correction',
      time: '4.0+ hrs',
      price: 'By Consultation (from $350)',
      badge: 'Specialist',
      desc: 'Remedy uneven box color, banding, or compromised tones with gentle multi-phase pigment adjustment.',
      included: ['Detailed strand test', 'Continuous K18 bond protection', 'Custom corrective toner', 'Take-home care guide'],
    },
  ],
  styling: [
    {
      id: 'signature-cut',
      name: 'Signature Restyle Cut & Blowout',
      time: '60 mins',
      price: '$95',
      badge: 'Signature',
      desc: 'In-depth consultation, relaxing shampoo and scalp ritual, tailored precision cut, and salon-signature blowout styling.',
      included: ['Face-framing analysis', 'Relaxing basin massage', 'Luxury hot towel', 'Blowdry & irons finish'],
    },
    {
      id: 'luxury-blowout',
      name: 'Luxury Event Blowout & Waves',
      time: '45 mins',
      price: '$68',
      badge: 'Event Ready',
      desc: 'High-volume blowout with bouncy curtain bangs or beachy brushed-out Hollywood waves using Cloud Nine irons.',
      included: ['Pre-wash detox', 'Volumizing blowout', 'Long-lasting wave set'],
    },
    {
      id: 'fringe-trim',
      name: 'Fringe Maintenance & Reshape',
      time: '15 mins',
      price: '$25',
      badge: 'Quick Touchup',
      desc: 'Precision trim of curtain bangs, bottleneck bangs, or blunt fringes between full haircut appointments.',
      included: ['Dry precision trim', 'Styling tips'],
    },
    {
      id: 'mens-cut',
      name: 'Precision Barber Cut & Style',
      time: '30 mins',
      price: '$48',
      badge: 'Men',
      desc: 'Clean scissor-over-comb or clipper fade, textured crop, shampoo rinse, and matte styling paste.',
      included: ['Neck taper', 'Shampoo rinse', 'Styling product recommendation'],
    },
  ],
  bridal: [
    {
      id: 'bridal-trial',
      name: 'In-Salon Bridal Hair Preview & Consultation',
      time: '90 mins',
      price: '$140',
      badge: 'Essential',
      desc: 'Try out multiple bridal hair directions, test veil placement, and lock in the timeline for your wedding day.',
      included: ['Veil & accessory placement', 'Photo documentation', 'Custom hair care prep timeline'],
    },
    {
      id: 'wedding-day-bride',
      name: 'Bride Wedding Day Styling',
      time: '75 mins',
      price: '$180',
      badge: 'Bridal Suite',
      desc: 'Flawless Hollywood glamour waves, romantic textured updo, or sleek modern bun designed to withstand dancing and photos.',
      included: ['Padding & pins securement', 'Veil fitting on location', 'Emergency bridal touch-up kit'],
    },
    {
      id: 'bridesmaid',
      name: 'Bridesmaid Glam Styling',
      time: '60 mins',
      price: '$120',
      badge: 'Party',
      desc: 'Cohesive, elegant curls, textured half-up styles, or polished low buns tailored to complement the bridal theme.',
      included: ['Long-hold setting spray', 'Hair pins included'],
    },
    {
      id: 'flower-girl',
      name: 'Flower Girl Braids / Soft Curls',
      time: '30 mins',
      price: '$55',
      badge: 'Junior',
      desc: 'Gentle, age-appropriate soft waves, whimsical crown braids, or floral accessory placement for young wedding party members.',
      included: ['Ribbon/flower placement', 'Gentle detangling spray'],
    },
  ],
  treatments: [
    {
      id: 'k18-ritual',
      name: 'K18 Molecular Peptide Repair Treatment',
      time: '20 mins',
      price: '$45',
      badge: 'Patented Science',
      desc: 'Clinically proven bioactive peptide treatment that reconnects broken polypeptide keratin chains caused by bleach and heat.',
      included: ['K18 Chelating mist', 'K18 Leave-in hair mask', 'Restores elasticity & strength'],
    },
    {
      id: 'keratin-smooth',
      name: 'Cezanne Express Keratin Smoothing',
      time: '2.0 hrs',
      price: 'from $280',
      badge: 'Zero Formaldehyde',
      desc: '100% non-toxic, formaldehyde-free smoothing treatment that eliminates frizz, blocks humidity, and enhances liquid shine for up to 5 months.',
      included: ['Deep clarifier', 'Infusion iron seal', 'Sulfate-free take-home advice'],
    },
    {
      id: 'scalp-spa',
      name: 'Aromatherapy Detox Scalp Scrub & Massage',
      time: '30 mins',
      price: '$55',
      badge: 'Wellness',
      desc: 'Purifying scalp exfoliation with organic tea tree and peppermint oils, extended basin massage, and steam towel relaxation.',
      included: ['Sugar micro-scrub', 'Extended cranial massage', 'Hot steam towel wrap'],
    },
  ],
};

export function Services() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('colour');

  const currentCategoryInfo = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  const servicesList = SERVICES_DATA[activeCategory];

  return (
    <section id="services" className="py-20 lg:py-28 relative z-10 scroll-mt-20 border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-primary-950 border border-primary-500/30 text-primary-300 text-xs font-semibold tracking-widest uppercase mb-3">
            <Scissors className="w-3.5 h-3.5 text-primary-400" />
            <span>The Salon Menu</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif">
            Signature Services &amp; Guide Pricing
          </h2>
          <p className="mt-3 text-base text-surface-300 font-light max-w-xl mx-auto">
            Transparent, all-inclusive investment guides. Every color and haircut service includes a complimentary diagnostic consultation and custom home care prescription.
          </p>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-3 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-primary-400 via-primary-300 to-amber-200 text-surface-950 font-bold shadow-lg shadow-primary-400/20 scale-102'
                  : 'bg-surface-900 text-surface-300 border border-surface-800 hover:border-surface-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category Description Banner */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-primary-300/90 font-light italic">
            &ldquo;{currentCategoryInfo.description}&rdquo;
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {servicesList.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-surface-900/80 border border-surface-800 rounded-3xl p-6 sm:p-7 hover:border-primary-500/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold bg-surface-950 text-primary-300 border border-surface-800 rounded-full">
                      {service.badge}
                    </span>
                    <span className="text-xs font-mono text-surface-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary-400" />
                      {service.time}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif text-white group-hover:text-primary-200 transition-colors">
                    {service.name}
                  </h3>

                  <div className="text-xl font-light text-primary-300 font-serif my-2">
                    {service.price}
                  </div>

                  <p className="text-xs text-surface-300 font-light leading-relaxed mb-4">
                    {service.desc}
                  </p>

                  <div className="space-y-1.5 border-t border-surface-800/80 pt-4 mb-6">
                    <span className="text-[10px] uppercase tracking-widest text-surface-400 font-semibold block mb-1">
                      What&apos;s Included:
                    </span>
                    {service.included.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-surface-300 font-light">
                        <Check className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-surface-800/80">
                  <Link
                    href={`/book?service=${service.id}&category=${activeCategory}`}
                    className="w-full py-2.5 rounded-xl bg-surface-950 border border-surface-800 group-hover:border-primary-400/50 group-hover:bg-primary-950/40 text-xs font-semibold uppercase tracking-wider text-primary-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Reserve Treatment</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Booking Guarantee */}
        <div className="mt-14 p-6 rounded-2xl bg-surface-900/40 border border-surface-800 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-serif text-white">Need bespoke advice or a strand test?</h4>
            <p className="text-xs text-surface-400 mt-0.5">Complimentary 15-minute diagnostic color consultations available Tuesday–Saturday.</p>
          </div>
          <Link
            href="/book"
            className="px-5 py-2.5 rounded-full bg-primary-300 hover:bg-primary-200 text-surface-950 font-semibold text-xs uppercase tracking-wider shrink-0 transition-colors"
          >
            Book Free Consult
          </Link>
        </div>

      </div>
    </section>
  );
}
