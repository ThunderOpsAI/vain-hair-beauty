'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Instagram, 
  ChevronRight, 
  Scissors, 
  Heart, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  'All',
  'Lived-In Blondes',
  'Precision Cuts',
  'Color Transformations',
  'Bridal Artistry',
  'Keratin & Gloss'
] as const;

type Category = typeof categories[number];

const LOOKBOOK_ITEMS = [
  {
    id: 1,
    title: 'Sun-Kissed Vanilla Melt',
    category: 'Lived-In Blondes',
    tag: 'Signature Balayage',
    stylist: 'Prue',
    palette: 'from-amber-950/40 via-stone-900 to-surface-950',
    accentColor: '#e0c59e',
    desc: 'Dimensional babylights seamlessly blended with natural brunette regrowth, glazed with Redken Shades EQ 09V pearl.',
    formula: 'Redken Flash Lift 20 Vol + K18 mist, toned with 09V + 09GI + Clear',
  },
  {
    id: 2,
    title: 'Romantic King Valley Bridal Updo',
    category: 'Bridal Artistry',
    tag: 'Winery Wedding',
    stylist: 'Senior Bridal Team',
    palette: 'from-rose-950/40 via-stone-900 to-surface-950',
    accentColor: '#f3c1cb',
    desc: 'Soft textured low chignon with romantic face-framing tendrils crafted for a Brown Brothers Milawa autumn wedding.',
    formula: 'Prep with Oribe Dry Texturizing Spray & Cloud Nine wave irons',
  },
  {
    id: '3',
    title: 'Dimensional Glossy Hazelnut Brunette',
    category: 'Color Transformations',
    tag: 'Mocha Gloss',
    stylist: 'Prue',
    palette: 'from-orange-950/40 via-stone-900 to-surface-950',
    accentColor: '#c9966f',
    desc: 'Reversed brassy over-lightened foils into a rich multi-tonal chocolate brunette with high-refraction mirror shine.',
    formula: 'Dual-zone lowlights in 06NB + 07NW, glossed with 08GG Gold Glow',
  },
  {
    id: 4,
    title: 'Structured Blunt Bob with Curtain Bangs',
    category: 'Precision Cuts',
    tag: 'French Bob',
    stylist: 'Style Team',
    palette: 'from-purple-950/40 via-stone-900 to-surface-950',
    accentColor: '#cfb9d9',
    desc: 'Weightless interior de-bulking with razor-sharp perimeter outline and soft cheekbone curtain fringe.',
    formula: 'Wet cut with Matsuzaki scissors, finished with Dyson Supersonic & round brush',
  },
  {
    id: 5,
    title: 'Vintage Hollywood Glamour Waves',
    category: 'Bridal Artistry',
    tag: 'Formal Event',
    stylist: 'Senior Stylist',
    palette: 'from-amber-950/40 via-stone-900 to-surface-950',
    accentColor: '#f0d39e',
    desc: 'Sculpted high-gloss S-wave pattern set with hot rollers and brushed out for Lancemore Milawa evening reception.',
    formula: 'Oribe Royal Blowout Heat Styling Spray + firm setting pins',
  },
  {
    id: 6,
    title: 'Creamy Platinum Foil Work + K18',
    category: 'Lived-In Blondes',
    tag: 'Micro-Foils',
    stylist: 'Prue',
    palette: 'from-stone-900 via-rose-950/30 to-surface-950',
    accentColor: '#fae8c8',
    desc: 'Maximum back-to-back hairline foils delivering crisp clean Nordic blonde while preserving full tensile strength.',
    formula: 'Redken Pro-Oxide 10 Vol with Olaplex No. 1, completed with K18 leave-in',
  },
  {
    id: 7,
    title: 'Liquid Glass Cezanne Smoothing',
    category: 'Keratin & Gloss',
    tag: 'Zero Formaldehyde',
    stylist: 'Treatment Specialist',
    palette: 'from-emerald-950/40 via-stone-900 to-surface-950',
    accentColor: '#9fd3b4',
    desc: '100% non-toxic Cezanne keratin treatment eliminating unruly humidity puffiness and sealing cuticle reflectivity.',
    formula: 'Cezanne Perfect Finish Infusion sealed at 210°C with titanium irons',
  },
  {
    id: 8,
    title: 'Sunlit Bronde & Face-Framing Moneypiece',
    category: 'Color Transformations',
    tag: 'Bronde Melt',
    stylist: 'Prue',
    palette: 'from-amber-950/40 via-stone-900 to-surface-950',
    accentColor: '#d8b284',
    desc: 'Bright pops of light around the eyes combined with rich depth through the nape for low-maintenance elegance.',
    formula: 'Face-framing triangle babylights with 07N root tap',
  },
  {
    id: 9,
    title: 'Luxe Bouncy Butterfly Cut Blowout',
    category: 'Precision Cuts',
    tag: 'Cascading Layers',
    stylist: 'Style Team',
    palette: 'from-rose-950/30 via-stone-900 to-surface-950',
    accentColor: '#f7c8d2',
    desc: 'Airy, voluminous 90s-inspired cascading layers with seamless interior graduation and rounded ends.',
    formula: 'Layered elevation cut, thermal velcro roller set for 20 minutes',
  },
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedItem, setSelectedItem] = useState<typeof LOOKBOOK_ITEMS[0] | null>(null);

  const filteredItems = selectedCategory === 'All'
    ? LOOKBOOK_ITEMS
    : LOOKBOOK_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-20 lg:py-28 relative z-10 border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-primary-950 text-primary-300 text-xs font-semibold tracking-widest uppercase mb-3 border border-primary-500/30">
            <Sparkles className="w-3.5 h-3.5 text-primary-400" />
            <span>Murphy Street Lookbook</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-light text-white font-serif tracking-tight">
            The Vain Salon Portfolio
          </h1>
          <p className="mt-3 text-base text-surface-300 font-light leading-relaxed">
            Explore our curated gallery of lived-in blondes, precision architectural cuts, bridal suites, and healthy color transformations.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-primary-300">
            <Instagram className="w-4 h-4" />
            <span>Daily transformations on Instagram @vainhairandbeauty</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-primary-400 via-primary-300 to-amber-200 text-surface-950 font-bold shadow-lg shadow-primary-400/20 scale-102'
                  : 'bg-surface-900 text-surface-300 border border-surface-800 hover:border-surface-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-surface-900 border border-surface-800 rounded-3xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 shadow-sm hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Visual Editorial Header Card */}
                <div 
                  className={`h-64 p-6 bg-gradient-to-tr ${item.palette} border-b border-surface-800 flex flex-col justify-between relative overflow-hidden`}
                >
                  {/* Subtle hair texture mesh */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-widest font-semibold px-3 py-1 bg-surface-950/90 text-primary-200 rounded-full border border-surface-800">
                      {item.tag}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="w-8 h-8 rounded-full bg-surface-950/80 border border-surface-800 flex items-center justify-center text-surface-400 hover:text-white transition-colors cursor-pointer"
                      title="Inspect formula & details"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-primary-300" />
                    </button>
                  </div>

                  <div className="relative z-10">
                    <span className="text-[11px] text-primary-300/90 uppercase tracking-widest font-mono">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-serif text-white mt-1 group-hover:text-primary-100 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Details & Specs */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-surface-300 font-light leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>

                  <div className="pt-2 border-t border-surface-800 flex items-center justify-between text-xs text-surface-400">
                    <span>Stylist: <strong className="text-white font-normal">{item.stylist}</strong></span>
                    <Link
                      href={`/book?look=${encodeURIComponent(item.title)}`}
                      className="text-primary-300 hover:text-primary-200 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Book Look</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-900 border border-surface-700 rounded-3xl max-w-lg w-full p-8 relative shadow-2xl space-y-5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs uppercase tracking-widest text-primary-400 font-mono">
                    {selectedItem.category} &bull; {selectedItem.tag}
                  </span>
                  <h3 className="text-2xl font-serif text-white mt-1">
                    {selectedItem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1 rounded-full text-surface-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-surface-200 font-light leading-relaxed">
                {selectedItem.desc}
              </p>

              <div className="p-4 rounded-2xl bg-surface-950 border border-surface-800 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-primary-300 font-semibold block">
                  Color Formula &amp; Technique Notes:
                </span>
                <p className="text-xs font-mono text-surface-300">
                  {selectedItem.formula}
                </p>
                <div className="text-[11px] text-surface-500 pt-1">
                  Stylist: {selectedItem.stylist} &bull; Murphy Street Salon
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <Link
                  href={`/book?look=${encodeURIComponent(selectedItem.title)}`}
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 py-3 bg-gradient-to-r from-primary-400 via-primary-300 to-amber-200 text-surface-950 font-semibold rounded-full text-xs uppercase tracking-wider text-center shadow-lg"
                >
                  Book Appointment For This Look
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-3 border border-surface-700 rounded-full text-xs text-surface-300 hover:text-white uppercase"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
