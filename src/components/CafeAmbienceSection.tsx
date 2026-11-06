import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Armchair, Utensils, Wifi, Sparkles } from 'lucide-react';
import { CAFE_DETAILS } from '../data/cafeData';

export const CafeAmbienceSection: React.FC = () => {
  const ambienceFeatures = [
    {
      icon: Armchair,
      title: 'Comfortable Artisanal Seating',
      description: 'Handcrafted oak booths and cozy corners designed for long conversations, reading, or quiet remote work.',
    },
    {
      icon: Coffee,
      title: 'Micro-Batch Fresh Brewing',
      description: 'Poured right in front of you with freshly ground Arabica beans sourced directly from South Indian estates.',
    },
    {
      icon: Utensils,
      title: 'Gourmet Bites & Warm Pastries',
      description: 'From grilled artisanal sourdough sandwiches to rich Belgian brownies baked fresh throughout the day.',
    },
    {
      icon: Wifi,
      title: 'Remote-Friendly Atmosphere',
      description: 'Dedicated charging sockets at every booth and high-speed Wi-Fi in an air-conditioned Chennai haven.',
    },
  ];

  return (
    <section
      id="ambience"
      aria-label="The Daily Brew Atmosphere"
      className="py-20 md:py-28 bg-[#FFF8F0] border-b border-[#D9B382]/20 relative overflow-hidden"
    >
      {/* Mobile-adapted ambient atmospheric glow */}
      <div
        className="absolute top-1/3 -right-16 w-60 h-60 sm:w-96 sm:h-96 rounded-full bg-[#D9B382]/12 blur-2xl sm:blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -left-16 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-[#6F4E37]/8 blur-2xl sm:blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Fade-In Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#6F4E37] uppercase mb-2">
            <span>The Daily Brew Experience</span>
            <span aria-hidden="true">·</span>
            <span>Chennai Haven</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1E1E] tracking-tight mb-4">
            A Sanctuary of Warmth & Flavor
          </h2>
          <p className="text-[#1E1E1E]/75 text-base leading-relaxed">
            Step into our Chennai café where rich coffee aromas, soft natural lighting, and curated ambient playlists create your perfect everyday sanctuary.
          </p>
        </motion.div>

        {/* Split Layout: Ambience Imagery + Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Visual Ambience Showcase using provided high-res images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D9B382]/40 bg-[#1E1E1E]">
              <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden group">
                <img
                  src={CAFE_DETAILS.heroBanner}
                  alt="Cozy café ambiance with cappuccino and pastry on rustic wooden table"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                {/* Ambient Tag Overlay */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-[#D9B382] mb-2 border border-white/10">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4A056]" aria-hidden="true" />
                    <span>Chennai Flagship Café</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Crafted for Meaningful Moments
                  </h3>
                  <p className="text-xs text-white/80 mt-1 max-w-sm">
                    Whether you are unwinding with a book, meeting old friends, or building your next project over a pour-over.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Overlapping Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-4 rounded-2xl shadow-xl border border-[#D9B382]/50 max-w-[220px] hidden sm:block"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-[#6F4E37] mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6F4E37]" />
                <span>Relax, Recharge, Reconnect</span>
              </div>
              <p className="text-[11px] text-[#1E1E1E]/70 leading-relaxed">
                Quiet acoustic background and ambient booth lighting all day long.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Key Ambience Pillars */}
          <div className="lg:col-span-6 space-y-4">
            {ambienceFeatures.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="p-5 rounded-2xl bg-white border border-[#D9B382]/35 shadow-xs hover:shadow-md hover:border-[#6F4E37]/40 transition-all flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FFF8F0] text-[#6F4E37] flex items-center justify-center shrink-0 border border-[#D9B382]/40">
                    <IconComp className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#1E1E1E] mb-1">
                      {feat.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#1E1E1E]/70 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
