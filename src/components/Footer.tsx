'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Scissors, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Clock, 
  Coffee, 
  Smile, 
  ShieldAlert,
  Heart
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const salonPhone = '(03) 5721 8888';
  const cleanPhone = '0357218888';

  return (
    <footer id="salon" className="bg-surface-950 text-surface-400 text-xs border-t border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Salon Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-primary-500/40 bg-surface-900 flex items-center justify-center text-primary-300">
                <Scissors className="w-3.5 h-3.5" />
              </div>
              <span className="text-xl font-light tracking-[0.25em] text-white font-serif">
                VAIN
              </span>
            </div>
            <p className="text-surface-300 leading-relaxed font-light">
              Murphy Street, Wangaratta VIC 3677. <br />
              Wangaratta&apos;s luxury hair sanctuary dedicated to effortless lived-in blondes, healthy hair integrity, and destination winery bridal artistry.
            </p>
            <div className="pt-1 flex items-center gap-3">
              <a
                href="https://instagram.com/vainhairandbeauty"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-surface-900 border border-surface-800 hover:border-primary-400 flex items-center justify-center text-surface-400 hover:text-primary-300 transition-colors"
                aria-label="Follow Vain Hair and Beauty on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <span className="text-[11px] text-surface-400">@vainhairandbeauty</span>
            </div>
          </div>

          {/* Column 2: Direct Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-white font-serif tracking-wider uppercase text-xs">
              Salon Contact
            </h4>
            <ul className="space-y-2.5 font-light">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                <span>Murphy Street, Wangaratta VIC 3677 (Ample street &amp; rear parking)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-primary-300 transition-colors">
                  {salonPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="mailto:pruesiperki@bigpond.com" className="hover:text-primary-300 transition-colors">
                  pruesiperki@bigpond.com
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <Link 
                href="/book" 
                className="text-[11px] text-primary-300 hover:underline uppercase tracking-wider font-semibold"
              >
                Book Appointment Online 24/7 &rarr;
              </Link>
            </div>
          </div>

          {/* Column 3: Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-serif tracking-wider uppercase text-xs flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-primary-400" />
              <span>Salon Hours</span>
            </h4>
            <ul className="space-y-2 font-light text-[11px]">
              <li className="flex justify-between">
                <span>Tuesday - Wednesday:</span>
                <span className="text-white">9:00 AM – 5:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Thursday (Late Night):</span>
                <span className="text-white">9:00 AM – 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Friday:</span>
                <span className="text-white">9:00 AM – 5:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-white">8:30 AM – 2:00 PM</span>
              </li>
              <li className="flex justify-between text-surface-500">
                <span>Sunday - Monday:</span>
                <span>Closed (Bridal on request)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Cancellation Policy & Amenities */}
          <div className="space-y-3">
            <h4 className="text-white font-serif tracking-wider uppercase text-xs flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-primary-400" />
              <span>Salon Policies</span>
            </h4>
            <p className="text-[11px] leading-relaxed font-light text-surface-300">
              <strong className="text-white">48-Hour Notice Policy:</strong> We kindly request at least 48 hours notice for any rescheduling or cancellations on color transformations and bridal packages to allow waitlisted clients chair availability.
            </p>

            <div className="pt-2 space-y-1.5 text-[11px] font-light">
              <div className="flex items-center gap-2">
                <Coffee className="w-3 h-3 text-primary-400" />
                <span>Complimentary barista coffee &amp; local King Valley prosecco</span>
              </div>
              <div className="flex items-center gap-2">
                <Smile className="w-3 h-3 text-primary-400" />
                <span>Silent appointment options available on request</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-surface-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-surface-500">
          <p>
            &copy; {currentYear} Vain Hair and Beauty (Murphy St, Wangaratta). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/#services" className="hover:text-surface-300 transition-colors">Services</Link>
            <Link href="/#estimator" className="hover:text-surface-300 transition-colors">Estimator</Link>
            <Link href="/gallery" className="hover:text-surface-300 transition-colors">Lookbook</Link>
            <Link href="/reviews" className="hover:text-surface-300 transition-colors">Reviews</Link>
            <Link href="/book" className="hover:text-surface-300 transition-colors">Book Online</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
