'use client';

import React from 'react';

/**
 * Animated Transitioning Background for Vain Hair & Beauty
 * Subtle radiant gradient with salon editorial geometric accents.
 */
export function ScrollingBackground() {
  return (
    <>
      <style>{`
        @keyframes salonGlowShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes salonAuraPulse {
          0%, 100% { opacity: 0.14; transform: scale(1); }
          50% { opacity: 0.22; transform: scale(1.08); }
        }
        .bg-animate-salon-gradient {
          background-size: 200% 200%;
          animation: salonGlowShift 24s ease infinite;
        }
        .salon-aura {
          animation: salonAuraPulse 16s ease-in-out infinite;
        }
      `}</style>
      <div 
        className="absolute inset-0 -z-20 pointer-events-none w-full min-h-full bg-animate-salon-gradient overflow-hidden"
        style={{ 
          backgroundImage: 'radial-gradient(ellipse at 80% 10%, rgba(225, 29, 72, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 60%, rgba(212, 175, 55, 0.05) 0%, transparent 60%)',
        }}
      >
        {/* Soft Ambient Radiance Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-[140px] salon-aura" />
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary-400/5 blur-[120px] salon-aura" />
        
        {/* Subtle Diagonal Atelier Lines */}
        <svg className="w-full h-full fixed opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="salon-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path fill="none" stroke="currentColor" strokeWidth="0.8" d="M80 0 L0 80 M0 0 L80 80" />
              <circle cx="40" cy="40" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#salon-grid)" />
        </svg>
      </div>
    </>
  );
}
