import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Navigation } from 'lucide-react';
import { CAFE_DETAILS } from '../data/cafeData';

import { addInquiry } from '../lib/cmsDataService';

export const ContactSection: React.FC<{ email?: string; phone?: string; location?: string }> = ({
  email,
  phone,
  location,
}) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    addInquiry({
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      notes: formState.notes,
    });
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', phone: '', notes: '' });
    }, 300);
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Location"
      className="py-20 md:py-28 bg-[#FFF8F0] border-b border-[#D9B382]/20 relative overflow-hidden"
    >
      {/* Mobile-adapted ambient atmospheric glow */}
      <div
        className="absolute top-10 right-0 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-[#D9B382]/12 blur-2xl sm:blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-0 w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-[#C67C4E]/8 blur-2xl sm:blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#6F4E37] uppercase mb-2">
            <span>Connect & Visit</span>
            <span aria-hidden="true">·</span>
            <span>We'd Love to Host You</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1E1E] tracking-tight mb-4">
            Visit Our Café in Chennai
          </h2>
          <p className="text-[#1E1E1E]/70 text-base leading-relaxed">
            Have a question, catering request, or looking for a table? Reach out to our team or drop by for a fresh cup.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone Card (Clickable) */}
            <a
              href={`tel:${CAFE_DETAILS.contact.phone.replace(/\s+/g, '')}`}
              className="group block p-6 rounded-2xl bg-white border border-[#D9B382]/40 hover:border-[#6F4E37] transition-all shadow-xs hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37]"
              aria-label={`Call us at ${CAFE_DETAILS.contact.phone}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FFF8F0] text-[#6F4E37] group-hover:bg-[#6F4E37] group-hover:text-white transition-colors flex items-center justify-center shrink-0 border border-[#D9B382]/30">
                  <Phone className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1E1E1E]/50 block mb-1">
                    Direct Phone Support
                  </span>
                  <span className="text-lg font-bold text-[#1E1E1E] group-hover:text-[#6F4E37] transition-colors block font-mono">
                    {CAFE_DETAILS.contact.phone}
                  </span>
                  <span className="text-xs text-[#1E1E1E]/60 mt-1 block">
                    Available during operating hours for reservations & orders
                  </span>
                </div>
              </div>
            </a>

            {/* Email Card (Clickable) */}
            <a
              href={`mailto:${CAFE_DETAILS.contact.email}`}
              className="group block p-6 rounded-2xl bg-white border border-[#D9B382]/40 hover:border-[#6F4E37] transition-all shadow-xs hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37]"
              aria-label={`Send email to ${CAFE_DETAILS.contact.email}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FFF8F0] text-[#6F4E37] group-hover:bg-[#6F4E37] group-hover:text-white transition-colors flex items-center justify-center shrink-0 border border-[#D9B382]/30">
                  <Mail className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1E1E1E]/50 block mb-1">
                    General Inquiries
                  </span>
                  <span className="text-lg font-bold text-[#1E1E1E] group-hover:text-[#6F4E37] transition-colors block">
                    {CAFE_DETAILS.contact.email}
                  </span>
                  <span className="text-xs text-[#1E1E1E]/60 mt-1 block">
                    We typically respond within 2-4 hours
                  </span>
                </div>
              </div>
            </a>

            {/* Location & Hours Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#D9B382]/40 shadow-xs">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#FFF8F0] text-[#6F4E37] flex items-center justify-center shrink-0 border border-[#D9B382]/30">
                  <MapPin className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1E1E1E]/50 block mb-1">
                    Café Location
                  </span>
                  <span className="text-lg font-bold text-[#1E1E1E] block">
                    Chennai
                  </span>
                </div>
              </div>

              {/* Operating Hours Block */}
              <div className="pt-4 border-t border-[#D9B382]/20 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#6F4E37] font-semibold mb-1">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>Opening Hours</span>
                </div>
                {CAFE_DETAILS.contact.hours.map((h, i) => (
                  <div key={i} className="flex justify-between text-[#1E1E1E]/80">
                    <span>{h.days}</span>
                    <span className="font-medium font-mono">{h.time}</span>
                  </div>
                ))}
              </div>

              {/* Quick Map Action Button */}
              <a
                href="https://maps.google.com/?q=Chennai+Cafe"
                target="_blank"
                rel="noreferrer"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#FFF8F0] hover:bg-[#D9B382]/20 text-[#6F4E37] text-xs font-semibold transition-colors border border-[#D9B382]/50"
              >
                <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry / Table Reservation Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#D9B382]/40 p-6 sm:p-8 shadow-xs">
              <h3 className="text-xl font-bold text-[#1E1E1E] font-heading mb-2">
                Send Us a Note or Reserve a Table
              </h3>
              <p className="text-xs sm:text-sm text-[#1E1E1E]/70 mb-6">
                Planning a study group, team breakfast, or have special dietary needs? Drop us a quick message below.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#FFF8F0] text-[#6F4E37] rounded-full flex items-center justify-center mx-auto border border-[#D9B382]/40">
                    <CheckCircle2 className="w-8 h-8 text-[#6F4E37]" aria-hidden="true" />
                  </div>
                  <h4 className="text-xl font-bold text-[#1E1E1E]">Thank You!</h4>
                  <p className="text-sm text-[#1E1E1E]/70 max-w-sm mx-auto">
                    Your note has been received by our Chennai barista team. We'll get back to you shortly!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2 text-xs font-semibold text-[#6F4E37] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-[#1E1E1E] mb-1"
                      >
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="Enter your name"
                        className="w-full px-4 py-2.5 rounded-lg border border-[#D9B382]/50 bg-[#FFF8F0]/30 text-sm text-[#1E1E1E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold text-[#1E1E1E] mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        placeholder="+91 98765 00000"
                        className="w-full px-4 py-2.5 rounded-lg border border-[#D9B382]/50 bg-[#FFF8F0]/30 text-sm text-[#1E1E1E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#1E1E1E] mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#D9B382]/50 bg-[#FFF8F0]/30 text-sm text-[#1E1E1E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-notes"
                      className="block text-xs font-semibold text-[#1E1E1E] mb-1"
                    >
                      Message / Seating Preferences
                    </label>
                    <textarea
                      id="contact-notes"
                      rows={4}
                      value={formState.notes}
                      onChange={(e) =>
                        setFormState({ ...formState, notes: e.target.value })
                      }
                      placeholder="Let us know what time you plan to visit, table size, or special requests..."
                      className="w-full px-4 py-2.5 rounded-lg border border-[#D9B382]/50 bg-[#FFF8F0]/30 text-sm text-[#1E1E1E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] focus:bg-white transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#6F4E37] hover:bg-[#5A3F2C] text-[#FFF8F0] font-semibold text-sm transition-all shadow-sm active:scale-98 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37]"
                  >
                    {loading ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
