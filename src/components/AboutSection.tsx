import React from 'react';
import { CAFE_DETAILS } from '../data/cafeData';
import { Heart, Coffee, Users, ShieldCheck, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  story?: string;
  extended?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ story, extended }) => {
  const brandPillars = [
    {
      icon: Coffee,
      title: 'Artisan Roast Mastery',
      description: 'Carefully roasted in small batches to preserve nuanced aromas, floral notes, and body.',
    },
    {
      icon: Users,
      title: 'Warm Welcoming Space',
      description: 'Designed thoughtfully with ergonomic seating, abundant natural light, and relaxed ambiance.',
    },
    {
      icon: ShieldCheck,
      title: 'Ethical Direct Sourcing',
      description: 'Partnering directly with regional coffee farmers across South India for equitable trade.',
    },
  ];

  return (
    <section
      id="about"
      aria-label="About The Daily Brew"
      className="py-20 md:py-28 bg-[#FFF8F0] border-b border-[#D9B382]/20 relative overflow-hidden"
    >
      {/* Mobile-adapted ambient atmospheric glow */}
      <div
        className="absolute top-1/4 -right-16 w-60 h-60 sm:w-96 sm:h-96 rounded-full bg-[#D9B382]/12 blur-2xl sm:blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -left-16 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-[#C67C4E]/10 blur-2xl sm:blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Brand Composition */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Supporting Graphic Composition */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#2A1810] via-[#4F3324] to-[#7B543D] p-1 shadow-2xl">
                <div className="h-[420px] rounded-[22px] bg-[#2A1810] p-8 flex flex-col justify-between text-[#FFF8F0] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#D9B382]/10 rounded-full blur-2xl pointer-events-none select-none" />

                  {/* Top emblem */}
                  <div className="flex items-center justify-between text-xs text-[#D9B382]">
                    <span className="font-semibold uppercase tracking-wider">Est. Chennai</span>
                    <Heart className="w-4 h-4 text-[#C67C4E] fill-[#C67C4E]" aria-hidden="true" />
                  </div>

                  {/* Center Narrative Statement with Official Logo */}
                  <div className="my-auto space-y-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/20 shadow-md bg-[#FFF8F0] p-1">
                      <img
                        src={CAFE_DETAILS.logo}
                        alt="The Daily Brew Brand Mark"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-3xl sm:text-4xl font-heading font-extrabold text-[#FFF8F0] block leading-tight">
                      Craft, <br />
                      Comfort & <br />
                      Community.
                    </span>
                    <p className="text-xs sm:text-sm text-[#D9B382]/90 leading-relaxed font-light">
                      "We treat coffee not merely as fuel, but as an intimate moment of pause in a busy world."
                    </p>
                  </div>

                  {/* Bottom Stats Card Strip */}
                  <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-[#D9B382] font-semibold text-base font-mono">100%</p>
                      <p className="text-[11px] text-white/70">Arabica Beans</p>
                    </div>
                    <div>
                      <p className="text-[#D9B382] font-semibold text-base font-mono">365</p>
                      <p className="text-[11px] text-white/70">Days a Year</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative side accent tag */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-[#D9B382]/40 hidden sm:block max-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#6F4E37]" aria-hidden="true" />
                  <span className="text-xs font-bold text-[#1E1E1E]">Fresh Roasts</span>
                </div>
                <p className="text-[11px] text-[#1E1E1E]/60">Brewed at exact 93°C extraction for peak flavor.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Storytelling Layout & Brand Pillars */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#6F4E37] uppercase mb-3">
              <span>Our Brand Philosophy</span>
              <span aria-hidden="true">·</span>
              <span>About Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1E1E] tracking-tight leading-tight mb-6">
              Every great day starts with a good cup of coffee.
            </h2>

            {/* Content strictly honoring the provided prompt */}
            <blockquote className="text-lg sm:text-xl font-medium text-[#6F4E37] leading-relaxed mb-6 bg-white/70 p-5 rounded-2xl border border-[#D9B382]/30 shadow-xs">
              "{story || CAFE_DETAILS.aboutStory}"
            </blockquote>

            <p className="text-sm sm:text-base text-[#1E1E1E]/75 leading-relaxed mb-8">
              {extended || CAFE_DETAILS.aboutExtended}
            </p>

            {/* 3 Brand Pillars */}
            <div className="space-y-4 pt-2">
              {brandPillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#D9B382]/30 hover:border-[#6F4E37]/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#FFF8F0] text-[#6F4E37] flex items-center justify-center shrink-0 border border-[#D9B382]/30">
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1E1E1E] font-heading mb-0.5">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-[#1E1E1E]/70 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
