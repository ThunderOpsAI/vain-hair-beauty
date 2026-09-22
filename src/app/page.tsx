"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Calendar,
  Heart,
  Clock,
  MapPin,
  Phone,
  Gift,
  CheckCircle2,
  ChevronRight,
  Star,
  Scissors,
  Coffee,
  Instagram,
  Smile,
} from "lucide-react";

export default function VainHairBeautyPage() {
  const [activeCategory, setActiveCategory] = useState<"styling" | "colour" | "bridal" | "treatments">("styling");
  const [selectedService, setSelectedService] = useState<string>("signature-cut");
  const [bookingStep, setBookingStep] = useState<"form" | "confirmed">("form");

  // Bridal inquiry state
  const [bridalForm, setBridalForm] = useState({
    brideName: "",
    email: "",
    phone: "",
    weddingDate: "",
    venue: "King Valley Winery",
    partySize: "4",
    notes: "",
  });
  const [bridalSubmitted, setBridalSubmitted] = useState(false);

  const services = {
    styling: [
      { id: "signature-cut", name: "Signature Restyle Cut & Blowout", time: "60 mins", price: "$95" },
      { id: "luxury-blowout", name: "Luxury Event Blowout & Waves", time: "45 mins", price: "$68" },
      { id: "fringe-trim", name: "Fringe Maintenance & Reshape", time: "15 mins", price: "$25" },
      { id: "mens-cut", name: "Precision Barber Cut & Style", time: "30 mins", price: "$48" },
    ],
    colour: [
      { id: "lived-in-blonde", name: "Signature Lived-In Blonde Balayage", time: "180 mins", price: "from $260" },
      { id: "full-foils", name: "Full Head Custom Micro-Foils + Toner", time: "150 mins", price: "from $220" },
      { id: "half-foils", name: "Half Head Dimensional Foils", time: "120 mins", price: "from $165" },
      { id: "gloss-toner", name: "Illuminating Gloss & Root Shadow", time: "60 mins", price: "$85" },
    ],
    bridal: [
      { id: "bridal-trial", name: "In-Salon Bridal Hair Preview & Consultation", time: "90 mins", price: "$140" },
      { id: "wedding-day-bride", name: "Bride Wedding Day Styling (Updo/Hollywood Waves)", time: "75 mins", price: "$180" },
      { id: "bridesmaid", name: "Bridesmaid Glam Styling", time: "60 mins", price: "$120" },
      { id: "flower-girl", name: "Flower Girl Braids / Soft Curls", time: "30 mins", price: "$55" },
    ],
    treatments: [
      { id: "k18-ritual", name: "K18 Molecular Peptide Repair Treatment", time: "20 mins", price: "$45" },
      { id: "keratin-smooth", name: "Cezanne Express Keratin Smoothing", time: "120 mins", price: "from $280" },
      { id: "scalp-spa", name: "Aromatherapy Detox Scalp Scrub & Massage", time: "30 mins", price: "$55" },
    ],
  };

  const lookbook = [
    { title: "Sun-Kissed Vanilla Melt", category: "Lived-In Blonde", stylist: "Prue", tag: "Balayage" },
    { title: "Romantic King Valley Bridal Updo", category: "Bridal", stylist: "Senior Stylist", tag: "Weddings" },
    { title: "Dimensional Glossy Hazelnut Brunette", category: "Colour Gloss", stylist: "Prue", tag: "Brunettes" },
    { title: "Structured Blunt Bob with Curtain Bangs", category: "Precision Cut", stylist: "Style Team", tag: "Styling" },
    { title: "Vintage Hollywood Glamour Waves", category: "Formal Event", stylist: "Senior Stylist", tag: "Events" },
    { title: "Creamy Platinum Foil Work + K18", category: "Blonde Transformation", stylist: "Prue", tag: "Blondes" },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-stone-150 selection:bg-rose-900/60 selection:text-white">
      {/* Top Banner */}
      <aside aria-label="Salon Announcement" className="bg-[#1f191b] border-b border-rose-900/30 px-4 py-2 text-center text-xs tracking-widest uppercase text-rose-200/90 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-rose-300" />
        <span>Murphy Street Salon, Wangaratta &bull; 24/7 Online Booking Now Live</span>
        <span className="hidden md:inline">&bull; King Valley &amp; Milawa Bridal Bookings Open for 2026/27</span>
      </aside>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0d0d0f]/90 backdrop-blur-md border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-rose-400/40 bg-gradient-to-tr from-rose-950 to-stone-900 flex items-center justify-center text-rose-200">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <span className="text-2xl font-light tracking-[0.25em] text-white font-serif">
                VAIN
              </span>
              <p className="text-[10px] tracking-widest uppercase text-rose-300/80 font-medium">
                Hair &amp; Beauty &bull; Murphy St
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest text-stone-300">
            <a href="#services" className="hover:text-rose-300 transition-colors">
              Menu &amp; Booking
            </a>
            <a href="#bridal" className="hover:text-rose-300 transition-colors">
              Bridal Suites
            </a>
            <a href="#lookbook" className="hover:text-rose-300 transition-colors">
              Lookbook
            </a>
            <a href="#vouchers" className="hover:text-rose-300 transition-colors">
              Gift Cards
            </a>
            <a href="#salon" className="hover:text-rose-300 transition-colors">
              The Salon
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#services"
              className="bg-gradient-to-r from-rose-300 via-rose-200 to-amber-200 text-stone-950 font-semibold px-4 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 hover:shadow-lg hover:shadow-rose-400/20"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 border-b border-stone-800">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(225,29,72,0.12),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-[11px] uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                Murphy Street&apos;s Boutique Hair Sanctuary
              </div>

              <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white font-serif leading-[1.1]">
                Effortless Luxury. <br />
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-rose-300 to-amber-200">
                  Lived-In Blondes &amp; Bridal Artistry.
                </span>
              </h1>

              <p className="text-base text-stone-300 max-w-xl font-light leading-relaxed">
                Step into our Murphy Street sanctuary. Whether you desire seamless dimensional balayage, a transformative restyle, or bespoke on-location styling for your King Valley winery wedding, we craft hair that radiates confidence.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2 max-w-md">
                <div className="border border-stone-800/80 bg-stone-900/60 p-3.5 rounded-xl text-center">
                  <div className="text-rose-200 font-serif text-xl">24/7</div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 mt-1">Instant Online Booking</div>
                </div>
                <div className="border border-stone-800/80 bg-stone-900/60 p-3.5 rounded-xl text-center">
                  <div className="text-rose-200 font-serif text-xl">Oribe</div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 mt-1">&amp; K18 Hair Rituals</div>
                </div>
                <div className="border border-stone-800/80 bg-stone-900/60 p-3.5 rounded-xl text-center">
                  <div className="text-rose-200 font-serif text-xl">#1</div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 mt-1">King Valley Bridal Team</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#services"
                  className="bg-rose-200 hover:bg-rose-100 text-stone-950 font-medium px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-all shadow-lg shadow-rose-200/10 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book Your Seat 24/7
                </a>
                <a
                  href="#bridal"
                  className="border border-stone-700 hover:border-rose-400 text-stone-300 font-medium px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 text-rose-300" />
                  Bridal Party Inquiry
                </a>
              </div>
            </div>

            {/* Right Card: Instant 24/7 Booking Engine Preview */}
            <div id="services" className="lg:col-span-5">
              <div className="bg-[#121114] border border-rose-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                <div className="flex items-center justify-between pb-5 border-b border-stone-800">
                  <div>
                    <h2 className="text-lg font-serif tracking-wider text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-300" />
                      Reserve Your Service
                    </h2>
                    <p className="text-[11px] text-stone-400">
                      Select treatment &bull; Murphy Street, Wangaratta
                    </p>
                  </div>
                  <span className="px-3 py-1 text-[10px] uppercase tracking-widest bg-rose-950/80 text-rose-300 border border-rose-800/60 rounded-full font-semibold">
                    Instant Confirm
                  </span>
                </div>

                {bookingStep === "confirmed" ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-rose-950 border border-rose-400/50 text-rose-200 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-serif text-white">Booking Request Received!</h3>
                    <p className="text-xs text-stone-300 max-w-sm mx-auto leading-relaxed">
                      Thank you for choosing Vain. We have sent an SMS confirmation to your mobile with Murphy Street parking directions.
                    </p>
                    <button
                      type="button"
                      onClick={() => setBookingStep("form")}
                      className="text-xs text-rose-300 underline tracking-wider uppercase pt-2"
                    >
                      Book another treatment
                    </button>
                  </div>
                ) : (
                  <div className="mt-5 space-y-5">
                    {/* Category tabs */}
                    <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-stone-900/80 border border-stone-800 text-[11px]">
                      {(["styling", "colour", "bridal", "treatments"] as const).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`py-2 px-1 rounded-lg capitalize font-medium transition-all ${
                            activeCategory === cat
                              ? "bg-rose-200 text-stone-950 font-semibold shadow-sm"
                              : "text-stone-400 hover:text-stone-200"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Service options */}
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {services[activeCategory].map((s) => (
                        <label
                          key={s.id}
                          className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            selectedService === s.id
                              ? "bg-rose-950/40 border-rose-400/70 text-white"
                              : "bg-stone-900/50 border-stone-800/80 text-stone-300 hover:border-stone-700"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="service"
                              checked={selectedService === s.id}
                              onChange={() => setSelectedService(s.id)}
                              className="accent-rose-400"
                            />
                            <div>
                              <div className="font-medium text-white">{s.name}</div>
                              <div className="text-[10px] text-stone-500">{s.time}</div>
                            </div>
                          </div>
                          <span className="font-semibold text-rose-200">{s.price}</span>
                        </label>
                      ))}
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-rose-400"
                        />
                        <input
                          type="tel"
                          placeholder="Mobile 04xx xxx xxx"
                          className="bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-rose-400"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setBookingStep("confirmed")}
                        className="w-full py-3 bg-gradient-to-r from-rose-200 via-rose-300 to-amber-200 text-stone-950 font-semibold rounded-xl text-xs uppercase tracking-widest transition-all shadow-md shadow-rose-300/10"
                      >
                        Confirm Booking &bull; 24/7 Instant
                      </button>
                      <p className="text-[10px] text-center text-stone-500">
                        Prefer phone? Call our Murphy St salon: (03) 5721 0000
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bridal & Formal Inquiry Funnel */}
      <section id="bridal" className="py-20 bg-stone-950 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs uppercase tracking-widest text-rose-300 font-semibold">
                Destination Winery &amp; Local Weddings
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-white font-serif">
                Bridal Parties &amp; Winery Suites
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed font-light">
                We specialize in complete bridal party styling on location throughout North East Victoria. From Brown Brothers and Lancemore Milawa to Pizzini Wines and secluded King Valley estates, our senior team brings luxury hair to your bridal prep suite.
              </p>
              <ul className="space-y-2.5 text-xs text-stone-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-300" />
                  Pre-wedding bridal trial and veil placement styling
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-300" />
                  On-location mobile travel kit with emergency touch-up kit
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-300" />
                  Bridesmaids, mothers of the bride, and flower girl packages
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#121114] border border-stone-800 rounded-3xl p-6 sm:p-8">
                {bridalSubmitted ? (
                  <div className="text-center py-10 space-y-3">
                    <Heart className="w-10 h-10 text-rose-300 mx-auto fill-rose-300" />
                    <h3 className="text-2xl font-serif text-white">Congratulations!</h3>
                    <p className="text-xs text-stone-300 max-w-md mx-auto">
                      Thank you <span className="text-rose-200 font-medium">{bridalForm.brideName}</span>. Prue and the bridal coordination team will review your date ({bridalForm.weddingDate || "upcoming"}) and email through a customized bridal quote.
                    </p>
                    <button
                      type="button"
                      onClick={() => setBridalSubmitted(false)}
                      className="text-xs text-rose-300 underline tracking-wider pt-2 uppercase"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBridalSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="border-b border-stone-800 pb-3">
                      <h3 className="text-lg font-serif text-white">Check Your Wedding Date</h3>
                      <p className="text-xs text-stone-400">Direct coordination with Prue at Vain Hair &amp; Beauty</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                          Bride&apos;s Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Jessica Palmer"
                          value={bridalForm.brideName}
                          onChange={(e) => setBridalForm({ ...bridalForm, brideName: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="04xx xxx xxx"
                          value={bridalForm.phone}
                          onChange={(e) => setBridalForm({ ...bridalForm, phone: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                          Wedding Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={bridalForm.weddingDate}
                          onChange={(e) => setBridalForm({ ...bridalForm, weddingDate: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                          Location / Venue
                        </label>
                        <select
                          value={bridalForm.venue}
                          onChange={(e) => setBridalForm({ ...bridalForm, venue: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                        >
                          <option>In-Salon (Murphy St, Wangaratta)</option>
                          <option>Milawa (Brown Brothers / Lancemore)</option>
                          <option>King Valley / Oxley Vineyard</option>
                          <option>Beechworth Heritage Venue</option>
                          <option>Private Estate</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                          Bridal Party Size
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="15"
                          value={bridalForm.partySize}
                          onChange={(e) => setBridalForm({ ...bridalForm, partySize: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                        Any specific styles or bridal vision?
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Tell us about your dress neckline, veil, or hair goals..."
                        value={bridalForm.notes}
                        onChange={(e) => setBridalForm({ ...bridalForm, notes: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-rose-400 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-rose-200 via-rose-300 to-amber-200 text-stone-950 font-semibold rounded-xl text-xs uppercase tracking-widest transition-all"
                    >
                      Request Bridal Package Availability
                    </button>
                    <p className="text-[10px] text-center text-stone-500">
                      Direct Email: pruesiperki@bigpond.com &bull; We reply within 24 hours
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook Showcase */}
      <section id="lookbook" className="py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-rose-300 font-semibold">
              The Vain Aesthetic
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white font-serif mt-1">
              Murphy Street Lookbook
            </h2>
            <p className="text-xs text-stone-400 mt-2">
              Follow along on Instagram @vainhairandbeauty for daily transformations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lookbook.map((item, idx) => (
              <div
                key={idx}
                className="group bg-[#121114] border border-stone-800 rounded-2xl overflow-hidden hover:border-rose-400/40 transition-all duration-300"
              >
                <div className="h-60 bg-gradient-to-tr from-stone-900 via-rose-950/20 to-stone-900 p-6 flex flex-col justify-between border-b border-stone-800/80">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 bg-stone-900/90 text-rose-200 rounded-full border border-stone-800">
                      {item.tag}
                    </span>
                    <Instagram className="w-4 h-4 text-stone-500 group-hover:text-rose-300 transition-colors" />
                  </div>
                  <div>
                    <span className="text-xs text-rose-300/80 uppercase tracking-wider">{item.category}</span>
                    <h3 className="text-lg font-serif text-white mt-1 group-hover:text-rose-100 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between text-xs text-stone-400">
                  <span>Stylist: {item.stylist}</span>
                  <a href="#services" className="text-rose-300 font-medium hover:underline flex items-center gap-1">
                    Book This Look <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Gift Vouchers */}
      <section id="vouchers" className="py-16 bg-[#121114] border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Gift className="w-10 h-10 text-rose-300 mx-auto" />
          <h2 className="text-3xl font-light text-white font-serif">
            Give the Gift of Beautiful Hair
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto font-light">
            Instant digital gift vouchers delivered straight to your recipient&apos;s email or print at home. Redeemable for all cut, colour, treatment, and retail product purchases at our Murphy Street salon.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {["$50", "$100", "$150", "$250", "Custom Value"].map((val) => (
              <button
                key={val}
                className="px-5 py-2.5 rounded-full border border-stone-700 bg-stone-900 text-xs font-semibold text-rose-200 hover:border-rose-300 transition-colors"
              >
                {val} Voucher
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Salon Details & Footer */}
      <footer id="salon" className="bg-[#09080a] py-16 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div>
            <span className="text-lg font-serif tracking-widest text-white block mb-3">
              VAIN HAIR &amp; BEAUTY
            </span>
            <p className="text-stone-400 leading-relaxed font-light">
              Murphy Street, Wangaratta VIC 3677. <br />
              Wangaratta&apos;s bespoke hair salon dedicated to healthy, effortless lived-in hair.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium uppercase tracking-wider text-xs mb-3">
              Direct Contact
            </h4>
            <p className="mb-2">
              Email:{" "}
              <a href="mailto:pruesiperki@bigpond.com" className="text-rose-300 hover:underline">
                pruesiperki@bigpond.com
              </a>
            </p>
            <p className="mb-2">
              Phone:{" "}
              <a href="tel:0357210000" className="text-rose-300 hover:underline">
                (03) 5721 0000
              </a>
            </p>
            <p className="text-stone-500">Walk-ins welcome pending stylist availability</p>
          </div>

          <div>
            <h4 className="text-white font-medium uppercase tracking-wider text-xs mb-3">
              Salon Hours
            </h4>
            <ul className="space-y-1.5 font-light">
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
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium uppercase tracking-wider text-xs mb-3">
              Salon Amenities
            </h4>
            <ul className="space-y-1.5 font-light">
              <li className="flex items-center gap-2">
                <Coffee className="w-3.5 h-3.5 text-rose-300" /> Barista coffee &amp; local King Valley prosecco
              </li>
              <li className="flex items-center gap-2">
                <Smile className="w-3.5 h-3.5 text-rose-300" /> Silent appointment options available
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-300" /> Easy Murphy Street &amp; rear parking
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-900 text-center text-stone-600">
          &copy; {new Date().getFullYear()} Vain Hair and Beauty (Murphy St, Wangaratta). All rights reserved.
        </div>
      </footer>
    </div>
  );
}
