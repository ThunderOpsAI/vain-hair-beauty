'use client';

import React, { useState, useRef } from 'react';
import { 
  SlidersHorizontal, 
  MoveHorizontal, 
  CheckCircle2, 
  Sparkles, 
  Scissors, 
  Heart, 
  ShieldCheck 
} from 'lucide-react';

interface TransformationSet {
  id: string;
  title: string;
  subtitle: string;
  beforeLabel: string;
  beforeDetails: string;
  beforeBg: string;
  afterLabel: string;
  afterDetails: string;
  afterBg: string;
  timeTaken: string;
  stylist: string;
  milestones: {
    step: string;
    title: string;
    desc: string;
  }[];
}

const TRANSFORMATIONS: TransformationSet[] = [
  {
    id: 'transformation-1',
    title: 'Brass to Clean Lived-In Vanilla Balayage & Face-Framing Moneypiece',
    subtitle: 'From harsh orange banding and yellow undertones to a sunlit vanilla melt that blends seamlessly with natural brunette roots.',
    beforeLabel: 'Phase 1: Uneven Warmth & Brass Banding',
    beforeDetails: 'Harsh yellow-orange warmth from old box highlights, uneven regrowth line, and dry over-processed ends.',
    beforeBg: 'radial-gradient(circle at 50% 40%, #8c5324 0%, #3e2111 60%, #1a0f08 100%)',
    afterLabel: 'Phase 2: Seamless Clean Vanilla Balayage',
    afterDetails: 'Micro-woven babylights, soft root shadow melt, Redken Shades EQ 09V + 09GI glaze, and K18 bond recovery.',
    afterBg: 'radial-gradient(circle at 50% 40%, #e8d0a9 0%, #876239 50%, #201711 100%)',
    timeTaken: '3.5 Hours',
    stylist: 'Prue & Color Team',
    milestones: [
      { step: '01', title: 'Color Consultation & Strand Test', desc: 'Porosity mapping & elasticity assessment prior to lightener.' },
      { step: '02', title: 'Gentle Lightening with Olaplex', desc: 'Slow, controlled clay balayage with bond reconstructor.' },
      { step: '03', title: 'Custom Acidic Toner', desc: 'Redken Shades EQ gloss melted over roots and moneypiece.' },
      { step: '04', title: 'Signature Wave & Finish', desc: 'K18 molecular mask and brushed-out beach wave finish.' },
    ],
  },
  {
    id: 'transformation-2',
    title: 'Frizzy Damaged Curls to Glass Hair Keratin & Precision French Bob',
    subtitle: 'From unmanageable humidity puffiness and broken ends to reflective, humidity-proof liquid glass hair with a jawline blunt outline.',
    beforeLabel: 'Phase 1: Chemical Dryness & Unruly Texture',
    beforeDetails: 'Severe environmental and heat dehydration, fuzzy flyaways, and bulky unshaped volume.',
    beforeBg: 'radial-gradient(circle at 50% 40%, #523b37 0%, #2e1e1c 60%, #150d0c 100%)',
    afterLabel: 'Phase 2: Glass Hair Cezanne Keratin & French Bob',
    afterDetails: 'Formaldehyde-free Cezanne infusion, weightless internal texturizing, razor-sharp perimeter, and mirror shine.',
    afterBg: 'radial-gradient(circle at 50% 40%, #d5b895 0%, #4a3423 50%, #140d08 100%)',
    timeTaken: '2.5 Hours',
    stylist: 'Senior Style Specialist',
    milestones: [
      { step: '01', title: 'Texture Diagnosis & Prep', desc: 'Deep chelating wash to strip mineral and silicon build-up.' },
      { step: '02', title: 'Cezanne Keratin Infusion', desc: 'Non-toxic glycolic smoothing deeply sealed into cuticles.' },
      { step: '03', title: 'Architectural French Cut', desc: 'Precision jawline perimeter cut with curtain fringe framing.' },
      { step: '04', title: 'Liquid Mirror Thermal Seal', desc: 'Ionic heat polish revealing ultra-soft zero-frizz bounce.' },
    ],
  },
  {
    id: 'transformation-3',
    title: 'Box-Dye Color Correction to Seamless Multi-Tonal Bronde',
    subtitle: 'Reversing years of heavy dark supermarket dye into a rich, multidimensional caramel and hazelnut bronde with restored softness.',
    beforeLabel: 'Phase 1: Over-Saturated Dark Banding',
    beforeDetails: 'Layered black-brown pigment build-up, patchy mid-lengths, and brittle bleached ends.',
    beforeBg: 'radial-gradient(circle at 50% 40%, #3a221a 0%, #1f120e 60%, #0d0604 100%)',
    afterLabel: 'Phase 2: Multi-Tonal Sunlit Bronde',
    afterDetails: 'Gentle pigment lifting, lowlight rediscovery, mocha gloss, and silky blowout bounce.',
    afterBg: 'radial-gradient(circle at 50% 40%, #caa17a 0%, #5e3b24 50%, #1c110a 100%)',
    timeTaken: '4.5 Hours',
    stylist: 'Prue (Lead Colorist)',
    milestones: [
      { step: '01', title: 'Pigment Extraction & Test', desc: 'Gentle color remover removing artificial dye molecules.' },
      { step: '02', title: 'Dimensional Lowlighting', desc: 'Restoring natural depth and neutral brunette shadows.' },
      { step: '03', title: 'Dual-Zone Shades EQ Melt', desc: 'Root shadow in mocha combined with champagne ribbons.' },
      { step: '04', title: 'Olaplex Re-Bonding & Style', desc: 'No. 2 bond sealer, thermal protectant, and volume blowout.' },
    ],
  },
];

export function BeforeAfterSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeSet = TRANSFORMATIONS[activeIdx];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="transformations" className="py-20 lg:py-28 bg-surface-950 relative overflow-hidden scroll-mt-20 border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-primary-950 text-primary-300 text-xs font-semibold tracking-widest uppercase border border-primary-500/30 mb-3">
            <SlidersHorizontal className="w-3.5 h-3.5 text-primary-400" />
            <span>Interactive Salon Transformation Slider</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white font-serif tracking-tight">
            Before &amp; After Transformations
          </h2>
          <p className="mt-3 text-base text-surface-300 font-light leading-relaxed">
            Drag the handle horizontally to reveal the precision chemistry, custom formulation, and lived-in artistry behind our Murphy Street transformations.
          </p>
        </div>

        {/* Set Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {TRANSFORMATIONS.map((set, idx) => (
            <button
              key={set.id}
              onClick={() => {
                setActiveIdx(idx);
                setSliderPos(50);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                activeIdx === idx
                  ? 'bg-gradient-to-r from-primary-400 via-primary-300 to-amber-200 text-surface-950 font-bold shadow-md shadow-primary-400/20'
                  : 'bg-surface-900 text-surface-300 border border-surface-800 hover:border-surface-700 hover:text-white'
              }`}
            >
              {set.title.split(' to ')[0]} &rarr; {set.title.split(' to ')[1]?.split('&')[0]}
            </button>
          ))}
        </div>

        {/* Main Comparison Card */}
        <div className="bg-surface-900 border border-surface-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-9">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-surface-800 gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-light text-white">
                {activeSet.title}
              </h3>
              <p className="text-xs sm:text-sm text-surface-400 font-light mt-1 max-w-2xl">
                {activeSet.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-primary-300 shrink-0">
              <span className="px-3 py-1 bg-surface-950 rounded-full border border-surface-800">
                Duration: {activeSet.timeTaken}
              </span>
              <span className="px-3 py-1 bg-surface-950 rounded-full border border-surface-800">
                Stylist: {activeSet.stylist}
              </span>
            </div>
          </div>

          {/* Interactive Split Slider Box */}
          <div 
            ref={containerRef}
            className="relative h-[360px] sm:h-[460px] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-surface-700/60 shadow-2xl"
            onMouseDown={() => { isDragging.current = true; }}
            onMouseUp={() => { isDragging.current = false; }}
            onMouseLeave={() => { isDragging.current = false; }}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* AFTER SLIDE (Full width background) */}
            <div 
              className="absolute inset-0 flex flex-col justify-between p-8"
              style={{ background: activeSet.afterBg }}
            >
              {/* Subtle Atelier Hair Strands Pattern */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 flex justify-end">
                <span className="px-3.5 py-1.5 rounded-full bg-surface-950/80 backdrop-blur-md text-primary-200 text-xs font-medium border border-primary-500/40 uppercase tracking-widest shadow-lg">
                  {activeSet.afterLabel}
                </span>
              </div>

              <div className="relative z-10 max-w-sm ml-auto text-right bg-surface-950/70 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl">
                <span className="text-[10px] text-primary-300 font-bold uppercase tracking-widest block">After Transformation</span>
                <p className="text-xs text-white font-light mt-1 leading-relaxed">
                  {activeSet.afterDetails}
                </p>
              </div>
            </div>

            {/* BEFORE SLIDE (Clipped overlay) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div 
                className="absolute inset-0 h-full flex flex-col justify-between p-8"
                style={{ 
                  background: activeSet.beforeBg,
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' 
                }}
              >
                <div className="relative z-10 flex justify-start">
                  <span className="px-3.5 py-1.5 rounded-full bg-surface-950/80 backdrop-blur-md text-amber-200 text-xs font-medium border border-amber-500/40 uppercase tracking-widest shadow-lg">
                    {activeSet.beforeLabel}
                  </span>
                </div>

                <div className="relative z-10 max-w-sm text-left bg-surface-950/70 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl">
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-widest block">Starting Condition</span>
                  <p className="text-xs text-surface-200 font-light mt-1 leading-relaxed">
                    {activeSet.beforeDetails}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider Line & Drag Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-surface-950 text-primary-300 shadow-2xl flex items-center justify-center border-2 border-primary-400">
                <MoveHorizontal className="w-5 h-5 text-primary-300" />
              </div>
            </div>

          </div>

          {/* 4 Technical Milestone Steps */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {activeSet.milestones.map((ms) => (
              <div 
                key={ms.step} 
                className="p-4 rounded-2xl bg-surface-950/80 border border-surface-800"
              >
                <span className="text-xs font-mono font-bold text-primary-400 block tracking-wider">
                  {ms.step}
                </span>
                <h4 className="font-serif text-white text-sm mt-1">
                  {ms.title}
                </h4>
                <p className="text-xs text-surface-400 font-light mt-1 leading-relaxed">
                  {ms.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
