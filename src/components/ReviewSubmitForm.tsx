'use client';

import { useState } from 'react';
import { Star, CheckCircle2, AlertCircle, Loader2, Send, Sparkles } from 'lucide-react';

const SERVICE_TYPES = [
  'Signature Lived-In Blonde Balayage',
  'Full Head Custom Micro-Foils',
  'Precision Restyle Cut & Blowout',
  'Complex Color Correction',
  'Cezanne Keratin Smoothing',
  'Bridal Party Hair Styling',
  'K18 Peptide Repair Ritual',
  'Other Salon Service',
];

export function ReviewSubmitForm() {
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('');
  const [starRating, setStarRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [serviceType, setServiceType] = useState('Signature Lived-In Blonde Balayage');
  const [reviewText, setReviewText] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (customerName.trim().length < 2) {
      setError('Please provide your name (at least 2 characters).');
      return;
    }

    if (reviewText.trim().length < 10) {
      setError('Please provide a review with at least 10 characters.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          location: location.trim() || 'Wangaratta, VIC',
          starRating,
          serviceType: serviceType || undefined,
          reviewText: reviewText.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setSubmitted(true);
      setCustomerName('');
      setLocation('');
      setStarRating(5);
      setServiceType('Signature Lived-In Blonde Balayage');
      setReviewText('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="leave-review" className="py-20 relative z-10 scroll-mt-24 border-b border-surface-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-900 border border-surface-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
          
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 py-1 px-4 rounded-full bg-primary-950 text-primary-300 text-xs font-semibold tracking-widest uppercase mb-3 border border-primary-500/30">
              <Sparkles className="w-3.5 h-3.5 text-primary-400" />
              <span>Share Your Transformation Story</span>
            </span>
            <h2 className="text-3xl font-light text-white font-serif">
              Leave a Review for Vain Hair &amp; Beauty
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-surface-400 font-light max-w-md mx-auto">
              Your feedback inspires our colorists and helps local North East Victoria clients discover their dream hair.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-surface-950 border border-primary-500/40 rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary-950 border border-primary-400 text-primary-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-white">Thank You for Your Kind Words!</h3>
              <p className="text-xs text-surface-300 max-w-md mx-auto leading-relaxed">
                Your review has been successfully submitted and verified. We look forward to pampering you again on Murphy Street!
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full border border-surface-700 hover:border-primary-400 text-xs text-primary-200 uppercase tracking-wider transition-colors"
              >
                Write Another Review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Star Rating Interactive Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-surface-300 mb-2 font-medium">
                  Your Overall Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setStarRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-surface-600 hover:text-primary-400 transition-colors focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          (hoverRating || starRating) >= star
                            ? 'fill-primary-400 text-primary-400'
                            : 'text-surface-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono text-primary-300 ml-2">
                    {hoverRating || starRating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Name and Location */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jessica M."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                    Location / Suburb
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Wangaratta, Milawa, Beechworth"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-400 transition-colors"
                  />
                </div>
              </div>

              {/* Service Type Selection */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                  Service Experienced
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary-400 transition-colors cursor-pointer"
                >
                  {SERVICE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-surface-400 mb-1">
                  Your Review &amp; Experience *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your consultation, the result, stylist attention, or atmosphere..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full bg-surface-950 border border-surface-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-400 transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-primary-400 via-primary-300 to-amber-200 text-surface-950 font-semibold rounded-full text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary-400/20 hover:from-primary-300 hover:to-amber-100 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing Review...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Verified Review</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
