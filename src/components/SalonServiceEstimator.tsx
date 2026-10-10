'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Scissors,
  Check
} from 'lucide-react';
import Link from 'next/link';

interface LengthOption {
  id: string;
  label: string;
  sublabel: string;
  timeMultiplier: number;
  priceMultiplier: number;
}

interface ServiceOption {
  id: string;
  name: string;
  category: string;
  basePriceMin: number;
  basePriceMax: number;
  baseTimeHours: number;
  description: string;
  defaultIncludes: string[];
}

interface AddOnOption {
  id: string;
  name: string;
  price: number;
  timeMins: number;
  desc: string;
}

const HAIR_LENGTHS: LengthOption[] = [
  {
    id: 'short',
    label: 'Short / Pixie',
    sublabel: 'Above the jawline & cropped cuts',
    timeMultiplier: 0.85,
    priceMultiplier: 0.88,
  },
  {
    id: 'medium',
    label: 'Medium / Shoulder',
    sublabel: 'Collarbone length & lob styles',
    timeMultiplier: 1.0,
    priceMultiplier: 1.0,
  },
  {
    id: 'long',
    label: 'Long (Mid-Back)',
    sublabel: 'Standard long hair reaching bra strap',
    timeMultiplier: 1.2,
    priceMultiplier: 1.15,
  },
  {
    id: 'extra-long',
    label: 'Extra-Long / Thick',
    sublabel: 'Past mid-back or ultra-dense hair requiring extra product',
    timeMultiplier: 1.35,
    priceMultiplier: 1.3,
  },
];

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'balayage',
    name: 'Signature Balayage & Glaze',
    category: 'Colour',
    basePriceMin: 260,
    basePriceMax: 310,
    baseTimeHours: 3.0,
    description: 'Custom lived-in root shadow, freehand lightening, acidic Shades EQ gloss, and styling.',
    defaultIncludes: ['Diagnostic color consultation', 'Redken acidic gloss glaze', 'Basin scalp massage', 'Signature wave finish'],
  },
  {
    id: 'micro-foils',
    name: 'Full Head Micro-Foils',
    category: 'Colour',
    basePriceMin: 220,
    basePriceMax: 270,
    baseTimeHours: 2.75,
    description: 'High-density micro weaves from crown to nape for maximum uniform blonde brightness.',
    defaultIncludes: ['Fine hairline baby-foiling', 'Custom toner melt', 'Basin conditioning mask', 'Blowdry finish'],
  },
  {
    id: 'precision-cut',
    name: 'Precision Cut & Blowout',
    category: 'Styling',
    basePriceMin: 95,
    basePriceMax: 110,
    baseTimeHours: 1.0,
    description: 'Custom restyle or structural shape maintenance with luxury wash and bouncy blowout.',
    defaultIncludes: ['Hair & face architecture analysis', 'Relaxing aromatherapy wash', 'Hot towel ritual', 'Irons / blowout finish'],
  },
  {
    id: 'color-correction',
    name: 'Complex Color Correction',
    category: 'Colour',
    basePriceMin: 350,
    basePriceMax: 450,
    baseTimeHours: 4.0,
    description: 'Mending box-dye banding, over-saturation, and uneven pigments safely with strand tests.',
    defaultIncludes: ['Strand porosity test', 'Gentle multi-phase lightening', 'Equalizing acidic gloss', 'Bond protection additive'],
  },
  {
    id: 'keratin-treatment',
    name: 'Keratin Smoothing Treatment',
    category: 'Treatments',
    basePriceMin: 280,
    basePriceMax: 340,
    baseTimeHours: 2.5,
    description: '100% formaldehyde-free Cezanne smoothing for frizz-free glass hair up to 5 months.',
    defaultIncludes: ['Deep clarifying wash', 'Cezanne protein infusion', 'Flat-iron sealing', 'Maintenance product plan'],
  },
  {
    id: 'bridal-package',
    name: 'Bridal Styling Package',
    category: 'Bridal',
    basePriceMin: 180,
    basePriceMax: 240,
    baseTimeHours: 1.5,
    description: 'Wedding day styling with Hollywood waves, textured chignons, and veil placement.',
    defaultIncludes: ['Veil & hairpin anchoring', 'Long-lasting structural hold', 'Emergency bridal touch-up kit', 'Sparkling King Valley prosecco'],
  },
];

const ADDONS: AddOnOption[] = [
  {
    id: 'olaplex',
    name: 'Olaplex No. 1 & 2 Bond Builder',
    price: 45,
    timeMins: 15,
    desc: 'Rebuilds disulfide bonds during lightening for resilient integrity.',
  },
  {
    id: 'k18',
    name: 'K18 Molecular Peptide Repair',
    price: 45,
    timeMins: 15,
    desc: 'Patented peptide that restores core elasticity in 4 minutes.',
  },
  {
    id: 'scalp-scrub',
    name: 'Scalp Treatment & Head Spa',
    price: 55,
    timeMins: 25,
    desc: 'Aromatherapy tea tree micro-scrub and relaxing hot towel.',
  },
  {
    id: 'toner-gloss',
    name: 'Extra Toner Gloss / Glaze',
    price: 65,
    timeMins: 20,
    desc: 'Dual-zone root shadow and brightening pearl ends.',
  },
];

export function SalonServiceEstimator() {
  const [selectedLength, setSelectedLength] = useState<string>('medium');
  const [selectedService, setSelectedService] = useState<string>('balayage');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['k18']);

  const currentLengthObj = HAIR_LENGTHS.find((l) => l.id === selectedLength) || HAIR_LENGTHS[1];
  const currentServiceObj = SERVICE_OPTIONS.find((s) => s.id === selectedService) || SERVICE_OPTIONS[0];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Calculations
  const addonCost = selectedAddons.reduce((sum, id) => {
    const item = ADDONS.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const addonTimeMinutes = selectedAddons.reduce((sum, id) => {
    const item = ADDONS.find((a) => a.id === id);
    return sum + (item ? item.timeMins : 0);
  }, 0);

  const calculatedMinPrice = Math.round(
    (currentServiceObj.basePriceMin * currentLengthObj.priceMultiplier + addonCost) / 5
  ) * 5;

  const calculatedMaxPrice = Math.round(
    (currentServiceObj.basePriceMax * currentLengthObj.priceMultiplier + addonCost) / 5
  ) * 5;

  const rawTotalHours = currentServiceObj.baseTimeHours * currentLengthObj.timeMultiplier + addonTimeMinutes / 60;
  const formattedTimeHoursMin = (Math.floor(rawTotalHours * 2) / 2).toFixed(1);
  const formattedTimeHoursMax = (Math.ceil(rawTotalHours * 2 + 0.5) / 2).toFixed(1);

  const bookingUrl = `/book?service=${currentServiceObj.id}&length=${currentLengthObj.id}&addons=${selectedAddons.join(',')}&estMin=${calculatedMinPrice}&estMax=${calculatedMaxPrice}`;

  return (
    <section id="estimator" className="py-20 lg:py-28 relative z-10 scroll-mt-20 border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 py-1 px-4 rounded-full bg-primary-950 border border-primary-500/30 text-primary-300 text-xs font-semibold tracking-widest uppercase mb-3">
            <Calculator className="w-3.5 h-3.5 text-primary-400" />
            <span>Salon Service Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif">
            Calculate Your Time &amp; Investment
          </h2>
          <p className="mt-3 text-base text-surface-300 font-light max-w-xl mx-auto">
            Choose your hair length, treatment, and restorative add-ons to preview appointment duration and tailored price ranges before booking.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-surface-900 border border-surface-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Interactive Inputs (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 bg-surface-950/50">
            
            {/* Step 1: Hair Length */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-surface-800 pb-2">
                <h3 className="text-base font-serif tracking-wider text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary-950 border border-primary-500/40 text-primary-300 text-xs flex items-center justify-center font-sans font-bold">1</span>
                  <span>Current Hair Length &amp; Density</span>
                </h3>
                <span className="text-xs text-primary-300/80 uppercase tracking-wider font-mono">
                  {currentLengthObj.label}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HAIR_LENGTHS.map((len) => (
                  <button
                    key={len.id}
                    type="button"
                    onClick={() => setSelectedLength(len.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedLength === len.id
                        ? 'bg-surface-900 text-white border-primary-400 shadow-md ring-1 ring-primary-400/30'
                        : 'bg-surface-950/60 text-surface-300 border-surface-800 hover:border-surface-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-white">{len.label}</span>
                      {selectedLength === len.id && (
                        <CheckCircle2 className="w-4 h-4 text-primary-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-surface-400 mt-1 leading-snug">
                      {len.sublabel}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Service Type */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-surface-800 pb-2">
                <h3 className="text-base font-serif tracking-wider text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary-950 border border-primary-500/40 text-primary-300 text-xs flex items-center justify-center font-sans font-bold">2</span>
                  <span>Primary Salon Service</span>
                </h3>
                <span className="text-xs text-primary-300/80 uppercase tracking-wider font-mono">
                  {currentServiceObj.category}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_OPTIONS.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedService(srv.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedService === srv.id
                        ? 'bg-surface-900 text-white border-primary-400 shadow-md ring-1 ring-primary-400/30'
                        : 'bg-surface-950/60 text-surface-300 border-surface-800 hover:border-surface-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-white">{srv.name}</span>
                      {selectedService === srv.id && (
                        <CheckCircle2 className="w-4 h-4 text-primary-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-surface-400 mt-1 line-clamp-2">
                      {srv.description}
                    </p>
                    <div className="mt-2 text-xs font-serif text-primary-200">
                      base from ${srv.basePriceMin}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-on Bond Builders & Treatments */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-surface-800 pb-2">
                <h3 className="text-base font-serif tracking-wider text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary-950 border border-primary-500/40 text-primary-300 text-xs flex items-center justify-center font-sans font-bold">3</span>
                  <span>Bond Protection &amp; Care Add-Ons</span>
                </h3>
                <span className="text-xs text-surface-400">
                  {selectedAddons.length} selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'bg-surface-900 border-primary-400/80 text-white'
                          : 'bg-surface-950/50 border-surface-800 text-surface-300 hover:border-surface-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 w-4 h-4 rounded text-primary-500 accent-primary-400 cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-xs text-white">{addon.name}</span>
                          <span className="text-xs font-mono text-primary-300">+${addon.price}</span>
                        </div>
                        <p className="text-[11px] text-surface-400 mt-0.5 leading-tight">
                          {addon.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Output Summary & Booking (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-surface-950 text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-surface-800">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-surface-800">
                <span className="text-xs uppercase font-serif tracking-widest text-primary-300">
                  Treatment Estimate
                </span>
                <span className="text-[11px] bg-primary-950 text-primary-200 border border-primary-500/30 px-3 py-0.5 rounded-full font-medium">
                  Murphy St Standard
                </span>
              </div>

              {/* Live Metric Cards */}
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-surface-900/90 border border-surface-800 rounded-2xl p-4">
                  <span className="block text-xs text-surface-400 font-light">Estimated Salon Time</span>
                  <div className="text-2xl sm:text-3xl font-light text-white font-serif mt-1 flex items-baseline gap-1">
                    <span>{formattedTimeHoursMin}–{formattedTimeHoursMax}</span>
                    <span className="text-sm font-sans text-primary-300 font-normal">hrs</span>
                  </div>
                  <span className="text-[10px] text-surface-400 mt-1 block">Includes wash &amp; blowdry</span>
                </div>

                <div className="bg-surface-900/90 border border-surface-800 rounded-2xl p-4">
                  <span className="block text-xs text-surface-400 font-light">Length Allocation</span>
                  <div className="text-lg font-serif text-white mt-1 truncate">
                    {currentLengthObj.label}
                  </div>
                  <span className="text-[10px] text-surface-400 mt-1 block">Adjusted formula</span>
                </div>
              </div>

              {/* Price Range Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-900 via-surface-900 to-surface-950 border border-primary-500/40 shadow-xl my-6">
                <span className="block text-[11px] text-primary-300 uppercase tracking-widest font-semibold">
                  Estimated Investment Range (inc. GST)
                </span>
                <div className="text-3xl sm:text-4xl font-light text-white font-serif mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-200 via-primary-300 to-amber-200">
                  ${calculatedMinPrice} – ${calculatedMaxPrice}
                </div>
                <p className="text-[11px] text-surface-400 mt-2 leading-relaxed">
                  *Transparent guide pricing. Exact investment confirmed in your complimentary consultation prior to color bowl mixing.
                </p>
              </div>

              {/* What's Included */}
              <div className="bg-surface-900/50 p-4 rounded-2xl border border-surface-800 space-y-2 mb-6">
                <span className="text-xs uppercase tracking-wider text-surface-300 font-semibold block">
                  What&apos;s Included In This Session:
                </span>
                <ul className="space-y-1.5 text-xs text-surface-300 font-light">
                  {currentServiceObj.defaultIncludes.map((inc, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                  {selectedAddons.map((addId) => {
                    const addonObj = ADDONS.find((a) => a.id === addId);
                    return addonObj ? (
                      <li key={addId} className="flex items-center gap-2 text-primary-200">
                        <Sparkles className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                        <span>Add-on: {addonObj.name}</span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-surface-800">
              <Link
                href={bookingUrl}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-primary-400 via-primary-300 to-amber-200 hover:from-primary-300 hover:to-amber-100 text-surface-950 font-semibold text-xs uppercase tracking-widest shadow-lg shadow-primary-400/20 transition-all active:scale-98"
              >
                <span>Book Consultation With These Specs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="tel:0357218888"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-surface-900 hover:bg-surface-800 text-surface-300 font-medium text-xs border border-surface-800 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-primary-400" />
                <span>Call Salon Desk: (03) 5721 8888</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
