'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ArrowRight, MessageSquareQuote, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReviewItem {
  id: string;
  customerName: string;
  starRating: number;
  reviewText: string;
  serviceType: string | null;
  location?: string | null;
  createdAt: string;
}

export function ReviewsHighlight() {
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
        console.error('Failed to load reviews highlight:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading || reviews.length === 0) {
    return null;
  }

  const displayedReviews = reviews.slice(0, 4);

  return (
    <section className="py-20 lg:py-28 relative z-10 border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-primary-950 text-primary-300 text-xs font-semibold tracking-widest uppercase mb-3 border border-primary-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-primary-400" />
              <span>Verified Client Reputation</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-serif">
              Loved by Wangaratta &amp; the King Valley
            </h2>
            <p className="mt-2 text-base text-surface-300 font-light max-w-xl">
              From signature lived-in blondes to luxury winery bridal parties, read genuine testimonials from our Murphy Street guests.
            </p>
          </div>
          
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-primary-300 hover:text-primary-200 transition-colors group shrink-0"
          >
            <span>Read All Verified Testimonials</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedReviews.map((rev) => (
            <motion.div
              key={rev.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-surface-900 border border-surface-800 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-primary-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-primary-300">
                    {Array.from({ length: rev.starRating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary-400 text-primary-400" />
                    ))}
                  </div>
                  <MessageSquareQuote className="w-6 h-6 text-surface-700" />
                </div>

                {rev.serviceType && (
                  <span className="inline-block px-2.5 py-1 rounded-full bg-surface-950 text-primary-300 border border-surface-800 text-[10px] uppercase font-semibold tracking-wider mb-3">
                    {rev.serviceType}
                  </span>
                )}

                <p className="text-xs text-surface-300 font-light leading-relaxed italic line-clamp-5">
                  &ldquo;{rev.reviewText}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-serif font-medium text-white">{rev.customerName}</h4>
                  <span className="text-[10px] text-surface-400">{rev.location || 'Wangaratta'}</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-primary-950/80 border border-primary-500/30 flex items-center justify-center text-primary-300">
                  <Heart className="w-3.5 h-3.5 fill-primary-400/40" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
