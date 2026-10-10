'use client';

import { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, ThumbsUp, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReviewItem {
  id: string;
  customerName: string;
  location?: string | null;
  starRating: number;
  reviewText: string;
  serviceType: string | null;
  createdAt: string;
}

export function ApprovedReviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (data.reviews && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      })
      .catch((err) => {
        console.error('Failed to load approved reviews:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const averageRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.starRating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <section className="pt-32 pb-16 relative z-10 border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-primary-950 text-primary-300 text-xs font-semibold tracking-widest uppercase mb-4 border border-primary-500/30">
            <ThumbsUp className="w-3.5 h-3.5 text-primary-400" />
            <span>Verified Salon Guest Feedback</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-light text-white font-serif tracking-tight">
            Client Reviews &amp; Testimonials
          </h1>
          <p className="mt-4 text-base sm:text-lg text-surface-300 font-light leading-relaxed">
            Real experiences from brides, blonde devotees, and regulars across Wangaratta, Milawa, Beechworth, and the King Valley.
          </p>

          {reviews.length > 0 && (
            <div className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-surface-900 rounded-full border border-surface-800 shadow-md">
              <div className="flex items-center gap-1 text-primary-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary-400 text-primary-400" />
                ))}
              </div>
              <span className="text-base font-serif text-white">{averageRating} / 5.0 Rating</span>
              <span className="text-xs text-surface-400 font-light">({reviews.length} Verified Reviews)</span>
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-20 text-center text-surface-400 text-xs uppercase tracking-widest">
            Loading verified reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-surface-900 border border-surface-800 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-sm">
            <MessageSquareQuote className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">Be the First to Review</h3>
            <p className="text-xs text-surface-400 font-light mb-6">
              If you have visited our Murphy Street salon, we would adore featuring your transformation feedback!
            </p>
            <a
              href="#leave-review"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-300 text-surface-950 font-semibold text-xs uppercase tracking-wider hover:bg-primary-200 transition-colors"
            >
              Share Your Experience
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <motion.div
                key={rev.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-surface-900/90 border border-surface-800 rounded-3xl p-7 shadow-sm hover:border-primary-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-primary-300">
                      {Array.from({ length: rev.starRating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary-400 text-primary-400" />
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-surface-400 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary-400" />
                      Verified
                    </span>
                  </div>

                  {rev.serviceType && (
                    <span className="inline-block px-3 py-1 rounded-full bg-surface-950 text-primary-300 border border-surface-800 text-[10px] font-semibold uppercase tracking-wider mb-3">
                      {rev.serviceType}
                    </span>
                  )}

                  <p className="text-xs sm:text-sm text-surface-200 font-light leading-relaxed italic mb-6">
                    &ldquo;{rev.reviewText}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-800 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-serif font-medium text-white">{rev.customerName}</h4>
                    <p className="text-[10px] text-surface-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-primary-400" />
                      {rev.location || 'Wangaratta, VIC'}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-950/80 border border-primary-500/30 flex items-center justify-center text-primary-300">
                    <Heart className="w-4 h-4 fill-primary-400/40" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
