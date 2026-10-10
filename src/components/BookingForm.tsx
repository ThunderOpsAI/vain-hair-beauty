'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Calendar, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Phone, 
  MapPin, 
  Clock, 
  Scissors,
  Check
} from 'lucide-react';
import Link from 'next/link';

function BookingFormInner() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'salon' | 'bridal'>('salon');

  // Salon Booking State
  const [salonForm, setSalonForm] = useState({
    name: '',
    phone: '',
    service: 'Signature Restyle Cut & Blowout',
    category: 'styling',
    hairLength: 'Medium / Shoulder',
    preferredDay: 'Tuesday - Saturday',
    notes: '',
  });
  const [salonLoading, setSalonLoading] = useState(false);
  const [salonSubmitted, setSalonSubmitted] = useState(false);
  const [salonError, setSalonError] = useState<string | null>(null);

  // Bridal Inquiry State
  const [bridalForm, setBridalForm] = useState({
    brideName: '',
    email: '',
    phone: '',
    weddingDate: '',
    venue: 'Milawa (Brown Brothers / Lancemore)',
    partySize: '4',
    notes: '',
  });
  const [bridalLoading, setBridalLoading] = useState(false);
  const [bridalSubmitted, setBridalSubmitted] = useState(false);
  const [bridalError, setBridalError] = useState<string | null>(null);

  // Read pre-filled params from Estimator or Lookbook
  useEffect(() => {
    if (!searchParams) return;
    const serviceParam = searchParams.get('service');
    const categoryParam = searchParams.get('category');
    const lengthParam = searchParams.get('length');
    const lookParam = searchParams.get('look');

    if (serviceParam) {
      const serviceNames: Record<string, string> = {
        'balayage': 'Signature Balayage & Glaze',
        'micro-foils': 'Full Head Micro-Foils',
        'precision-cut': 'Precision Cut & Blowout',
        'color-correction': 'Complex Color Correction',
        'keratin-treatment': 'Keratin Smoothing Treatment',
        'bridal-package': 'Bridal Styling Package',
        'signature-cut': 'Signature Restyle Cut & Blowout',
        'luxury-blowout': 'Luxury Event Blowout & Waves',
      };
      setSalonForm((prev) => ({
        ...prev,
        service: serviceNames[serviceParam] || serviceParam,
        category: categoryParam || prev.category,
      }));
    }

    if (lengthParam) {
      const lengthLabels: Record<string, string> = {
        'short': 'Short / Pixie',
        'medium': 'Medium / Shoulder',
        'long': 'Long (Mid-Back)',
        'extra-long': 'Extra-Long / Thick',
      };
      setSalonForm((prev) => ({
        ...prev,
        hairLength: lengthLabels[lengthParam] || lengthParam,
      }));
    }

    if (lookParam) {
      setSalonForm((prev) => ({
        ...prev,
        service: `Lookbook Style: ${lookParam}`,
        notes: `Inquiring about ${lookParam} lookbook portfolio styling.`,
      }));
    }
  }, [searchParams]);

  const handleSalonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalonError(null);

    if (!salonForm.name.trim() || !salonForm.phone.trim()) {
      setSalonError('Please enter your full name and mobile number.');
      return;
    }

    setSalonLoading(true);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: salonForm.name.trim(),
          phone: salonForm.phone.trim(),
          service: salonForm.service,
          category: salonForm.category,
          hairLength: salonForm.hairLength,
          notes: salonForm.notes ? `${salonForm.preferredDay} | ${salonForm.notes}` : salonForm.preferredDay,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSalonSubmitted(true);
      } else {
        setSalonError(data.error || 'Failed to confirm booking. Please try again or call the desk.');
      }
    } catch (err: any) {
      setSalonError(err?.message || 'A network error occurred. Please try again.');
    } finally {
      setSalonLoading(false);
    }
  };

  const handleBridalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBridalError(null);

    if (!bridalForm.brideName.trim() || !bridalForm.phone.trim()) {
      setBridalError('Bride name and contact phone number are required.');
      return;
    }

    setBridalLoading(true);
    try {
      const res = await fetch('/api/bridal-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bridalForm),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBridalSubmitted(true);
      } else {
        setBridalError(data.error || 'Failed to submit bridal inquiry. Please try again.');
      }
    } catch (err: any) {
      setBridalError(err?.message || 'A network error occurred. Please try again.');
    } finally {
      setBridalLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 py-1 px-4 rounded-full bg-primary-950 text-primary-300 text-xs font-semibold tracking-widest uppercase mb-3 border border-primary-500/30">
          <Calendar className="w-3.5 h-3.5 text-primary-400" />
          <span>Murphy Street Concierge</span>
        </span>
        <h1 className="text-4xl sm:text-6xl font-light text-white font-serif tracking-tight">
          Reserve Your Appointment
        </h1>
        <p className="mt-3 text-sm sm:text-base text-surface-300 font-light leading-relaxed">
          Book your salon chair 24/7 or request custom coordination for your King Valley winery bridal party.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="p-1.5 rounded-full bg-surface-900 border border-surface-800 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('salon')}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'salon'
                ? 'bg-gradient-to-r from-primary-400 via-primary-300 to-amber-200 text-surface-950 shadow-md'
                : 'text-surface-400 hover:text-white'
            }`}
          >
            Salon Appointment (24/7 Instant)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bridal')}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'bridal'
                ? 'bg-gradient-to-r from-primary-400 via-primary-300 to-amber-200 text-surface-950 shadow-md'
                : 'text-surface-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Bridal &amp; Winery Suites</span>
          </button>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-surface-900 border border-surface-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
        
        {activeTab === 'salon' ? (
          salonSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary-950 border border-primary-400 text-primary-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white">Appointment Request Confirmed!</h2>
              <p className="text-xs sm:text-sm text-surface-300 max-w-md mx-auto leading-relaxed">
                Thank you <strong className="text-white font-medium">{salonForm.name}</strong>. We have logged your request for <strong className="text-primary-200 font-medium">{salonForm.service}</strong>. An SMS confirmation will be sent to <span className="font-mono text-white">{salonForm.phone}</span> with Murphy Street parking directions.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setSalonSubmitted(false)}
                  className="px-6 py-2.5 rounded-full border border-surface-700 hover:border-primary-400 text-xs text-primary-200 uppercase tracking-wider"
                >
                  Book Another Appointment
                </button>
                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-full bg-primary-300 text-surface-950 font-semibold text-xs uppercase tracking-wider"
                >
                  Back to Homepage
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSalonSubmit} className="space-y-6">
              <div className="border-b border-surface-800 pb-4">
                <h3 className="text-lg font-serif text-white flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-primary-400" />
                  <span>Murphy Street In-Salon Booking</span>
                </h3>
                <p className="text-xs text-surface-400 mt-0.5">
                  Complimentary diagnostic consultation and hot towel wash ritual included.
                </p>
              </div>

              {/* Name & Mobile */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jessica Palmer"
                    value={salonForm.name}
                    onChange={(e) => setSalonForm({ ...salonForm, name: e.target.value })}
                    className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                    Mobile Phone * (For SMS Confirmation)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="04xx xxx xxx"
                    value={salonForm.phone}
                    onChange={(e) => setSalonForm({ ...salonForm, phone: e.target.value })}
                    className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-400"
                  />
                </div>
              </div>

              {/* Service & Hair Length */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                    Requested Service
                  </label>
                  <input
                    type="text"
                    value={salonForm.service}
                    onChange={(e) => setSalonForm({ ...salonForm, service: e.target.value })}
                    placeholder="e.g. Signature Balayage & Glaze"
                    className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                    Approximate Hair Length
                  </label>
                  <select
                    value={salonForm.hairLength}
                    onChange={(e) => setSalonForm({ ...salonForm, hairLength: e.target.value })}
                    className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary-400 cursor-pointer"
                  >
                    <option>Short / Pixie (Above chin)</option>
                    <option>Medium / Shoulder (Collarbone)</option>
                    <option>Long (Mid-Back)</option>
                    <option>Extra-Long / Thick</option>
                  </select>
                </div>
              </div>

              {/* Preferred Window */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                  Preferred Day &amp; Time Window
                </label>
                <select
                  value={salonForm.preferredDay}
                  onChange={(e) => setSalonForm({ ...salonForm, preferredDay: e.target.value })}
                  className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary-400 cursor-pointer"
                >
                  <option>Tuesday Morning (9:00 AM – 1:00 PM)</option>
                  <option>Tuesday Afternoon (1:00 PM – 5:30 PM)</option>
                  <option>Wednesday (Full Day)</option>
                  <option>Thursday Late Night (5:00 PM – 8:00 PM)</option>
                  <option>Friday (Full Day)</option>
                  <option>Saturday Morning (8:30 AM – 2:00 PM)</option>
                  <option>First Available Slot</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                  Special Notes or Hair Goals
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details on your current color, box-dye history, silent appointment preference, or event timing..."
                  value={salonForm.notes}
                  onChange={(e) => setSalonForm({ ...salonForm, notes: e.target.value })}
                  className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-400 resize-none"
                />
              </div>

              {salonError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{salonError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={salonLoading}
                className="w-full py-4 bg-gradient-to-r from-primary-400 via-primary-300 to-amber-200 text-surface-950 font-semibold rounded-full text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary-400/20 hover:from-primary-300 hover:to-amber-100 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {salonLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming Booking...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Booking &bull; 24/7 Instant</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-surface-500">
                Prefer phone? Call our Murphy St salon desk: <a href="tel:0357218888" className="text-primary-300 underline">(03) 5721 8888</a>
              </p>
            </form>
          )
        ) : (
          bridalSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary-950 border border-primary-400 text-primary-300 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 fill-primary-400/40" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white">Congratulations &amp; Thank You!</h2>
              <p className="text-xs sm:text-sm text-surface-300 max-w-md mx-auto leading-relaxed">
                Thank you <strong className="text-white font-medium">{bridalForm.brideName}</strong>. Prue and our senior bridal team have received your details for <strong className="text-primary-200 font-medium">{bridalForm.weddingDate || 'your wedding day'}</strong> at <strong className="text-white">{bridalForm.venue}</strong>. We will review availability and email through a customized party proposal within 24 hours.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setBridalSubmitted(false)}
                  className="px-6 py-2.5 rounded-full border border-surface-700 hover:border-primary-400 text-xs text-primary-200 uppercase tracking-wider"
                >
                  Submit Another Inquiry
                </button>
                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-full bg-primary-300 text-surface-950 font-semibold text-xs uppercase tracking-wider"
                >
                  Back to Homepage
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBridalSubmit} className="space-y-6">
              <div className="border-b border-surface-800 pb-4">
                <h3 className="text-lg font-serif text-white flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary-400" />
                  <span>King Valley &amp; Winery Bridal Inquiry</span>
                </h3>
                <p className="text-xs text-surface-400 mt-0.5">
                  Direct mobile coordination with Prue at Vain Hair &amp; Beauty for 2026/27 weddings.
                </p>
              </div>

              {/* Bride Name & Contact */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                    Bride&apos;s Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jessica Palmer"
                    value={bridalForm.brideName}
                    onChange={(e) => setBridalForm({ ...bridalForm, brideName: e.target.value })}
                    className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="04xx xxx xxx"
                    value={bridalForm.phone}
                    onChange={(e) => setBridalForm({ ...bridalForm, phone: e.target.value })}
                    className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="bride@example.com"
                    value={bridalForm.email}
                    onChange={(e) => setBridalForm({ ...bridalForm, email: e.target.value })}
                    className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-400"
                  />
                </div>
              </div>

              {/* Date, Venue, Size */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                    Wedding Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={bridalForm.weddingDate}
                    onChange={(e) => setBridalForm({ ...bridalForm, weddingDate: e.target.value })}
                    className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                    Prep Location / Venue
                  </label>
                  <select
                    value={bridalForm.venue}
                    onChange={(e) => setBridalForm({ ...bridalForm, venue: e.target.value })}
                    className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary-400 cursor-pointer"
                  >
                    <option>Milawa (Brown Brothers / Lancemore)</option>
                    <option>King Valley / Oxley Vineyard Estate</option>
                    <option>Beechworth Historic Venue</option>
                    <option>In-Salon (Murphy St, Wangaratta)</option>
                    <option>Private Residence / AirBnB</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                    Bridal Party Size
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={bridalForm.partySize}
                    onChange={(e) => setBridalForm({ ...bridalForm, partySize: e.target.value })}
                    className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary-400"
                  />
                </div>
              </div>

              {/* Vision Notes */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                  Bridal Vision or Specific Styles
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about dress necklines, veil types, Hollywood waves, textured buns, or timeline requirements..."
                  value={bridalForm.notes}
                  onChange={(e) => setBridalForm({ ...bridalForm, notes: e.target.value })}
                  className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-400 resize-none"
                />
              </div>

              {bridalError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{bridalError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={bridalLoading}
                className="w-full py-4 bg-gradient-to-r from-primary-400 via-primary-300 to-amber-200 text-surface-950 font-semibold rounded-full text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary-400/20 hover:from-primary-300 hover:to-amber-100 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {bridalLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Bridal Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4" />
                    <span>Request Bridal Availability &amp; Custom Quote</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-surface-500">
                Direct Bridal Email: <a href="mailto:pruesiperki@bigpond.com" className="text-primary-300 underline">pruesiperki@bigpond.com</a> &bull; Response within 24 hours
              </p>
            </form>
          )
        )}

      </div>

    </div>
  );
}

export function BookingForm() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center text-surface-400 text-xs uppercase tracking-widest">
        Loading booking concierge...
      </div>
    }>
      <BookingFormInner />
    </Suspense>
  );
}
