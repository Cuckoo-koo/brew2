import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Coffee, Clock, MapPin, Sparkles } from 'lucide-react';
import { CAFE_DETAILS } from '../data/cafeData';

interface HeroProps {
  onExploreMenu: () => void;
  onVisitUs: () => void;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  heroBanner?: string;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onVisitUs,
  title,
  subtitle,
  ctaText,
  heroBanner,
}) => {
  const { scrollY } = useScroll();
  // Smooth parallax offset across scroll
  const parallaxY = useTransform(scrollY, [0, 600], [0, 80]);

  // Framer Motion Staggered Animation Containers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
  };

  // Mobile-safe parallax check (disable or soften on coarse pointer devices)
  const [isTouch, setIsTouch] = React.useState(false);
  React.useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Welcome to The Daily Brew"
      className="relative min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-center overflow-hidden pt-6 pb-12 sm:pt-14 sm:pb-24 border-b border-[#D9B382]/20"
    >
      {/* Mobile-adapted ambient glow (subtle opacity and scaled blur on small devices) */}
      <div
        className="absolute top-0 right-0 -translate-y-8 translate-x-1/4 w-64 h-64 sm:w-[500px] sm:h-[500px] rounded-full bg-[#D9B382]/15 sm:bg-[#D9B382]/20 blur-2xl sm:blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-56 h-56 sm:w-[450px] sm:h-[450px] rounded-full bg-[#C67C4E]/10 sm:bg-[#C67C4E]/15 blur-2xl sm:blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Staggered Content Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto mb-10"
        >
          {/* Step 1: Editorial Kicker */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#6F4E37] uppercase mb-3.5"
          >
            <span>Artisanal Coffee & Kitchen</span>
            <span aria-hidden="true">·</span>
            <span>Chennai, India</span>
          </motion.div>

          {/* Step 2: Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E1E1E] tracking-tight leading-[1.15] mb-4 sm:mb-5"
          >
            {title ? (
              title
            ) : (
              <>
                Your Everyday{' '}
                <span className="text-[#6F4E37] underline decoration-[#D9B382]/60 decoration-wavy decoration-2 underline-offset-6 sm:underline-offset-8">
                  Coffee Destination.
                </span>
              </>
            )}
          </motion.h1>

          {/* Step 3: Value Proposition Description */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-lg text-[#1E1E1E]/80 font-normal leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0"
          >
            {subtitle || CAFE_DETAILS.description}
          </motion.p>

          {/* Step 4: Call To Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={onExploreMenu}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#6F4E37] hover:bg-[#5A3F2C] text-[#FFF8F0] font-semibold text-sm sm:text-base shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37] focus-visible:ring-offset-2"
            >
              <span>{ctaText || 'Explore Our Menu'}</span>
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              onClick={onVisitUs}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-[#D9B382] bg-white/80 hover:bg-white text-[#6F4E37] font-semibold text-sm sm:text-base transition-all duration-300 hover:border-[#6F4E37] hover:scale-[1.02] active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37]"
            >
              <MapPin className="w-4 h-4 text-[#C67C4E]" aria-hidden="true" />
              <span>Visit Us in Chennai</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Panoramic Cinematic Showcase with Parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-2 sm:mt-4"
        >
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#D9B382]/50 bg-[#1E1E1E] group">
            <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[3/1] min-h-[240px] max-h-[480px] overflow-hidden">
              <motion.div
                style={{ y: isTouch ? 0 : parallaxY }}
                className="w-full h-full sm:h-[120%] sm:-mt-[5%] will-change-transform"
              >
                <img
                  src={heroBanner || CAFE_DETAILS.heroBanner}
                  alt="The Daily Brew café showcase featuring steaming artisanal coffee and croissant"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

              {/* Status Tags */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-10 flex items-center justify-between pointer-events-none gap-2">
                <span className="bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold text-[#D9B382] uppercase tracking-wider border border-white/10 shrink-0">
                  Chennai Flagship
                </span>
                <span className="bg-white/95 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-[#6F4E37] shadow-sm shrink-0">
                  Open Daily · 7:30 AM
                </span>
              </div>

              {/* Bottom Card Tagline Banner */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 bg-black/65 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-white/15 text-white">
                <div>
                  <p className="font-heading font-bold text-xs sm:text-base text-white tracking-wide">
                    Good Coffee. Good Food. Good Moments.
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#D9B382] line-clamp-1 sm:line-clamp-none">
                    Freshly extracted espresso, flaky baked goods & warm hospitality.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <span className="text-xs font-medium text-white/80 hidden md:inline">
                    Starts from
                  </span>
                  <span className="bg-[#6F4E37] text-[#FFF8F0] font-mono font-bold text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-sm">
                    ₹100 - ₹180
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Trust Highlights */}
          <div className="mt-8 pt-6 border-t border-[#D9B382]/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#1E1E1E]/80 font-medium">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-xl bg-white/70 border border-[#D9B382]/30 shadow-xs hover:border-[#6F4E37]/40 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#FFF8F0] text-[#6F4E37] flex items-center justify-center shrink-0 border border-[#D9B382]/40">
                <Coffee className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-[#1E1E1E]">100% Arabica Beans</p>
                <p className="text-[11px] text-[#1E1E1E]/60">Roasted in micro-batches</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-xl bg-white/70 border border-[#D9B382]/30 shadow-xs hover:border-[#6F4E37]/40 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#FFF8F0] text-[#6F4E37] flex items-center justify-center shrink-0 border border-[#D9B382]/40">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-[#1E1E1E]">Baked Fresh Daily</p>
                <p className="text-[11px] text-[#1E1E1E]/60">Artisanal sourdough & brownies</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-xl bg-white/70 border border-[#D9B382]/30 shadow-xs hover:border-[#6F4E37]/40 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#FFF8F0] text-[#6F4E37] flex items-center justify-center shrink-0 border border-[#D9B382]/40">
                <Clock className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-[#1E1E1E]">Cozy Space in Chennai</p>
                <p className="text-[11px] text-[#1E1E1E]/60">Air-conditioned & Wi-Fi booths</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
