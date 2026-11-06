import React from 'react';
import { motion } from 'motion/react';
import { Coffee, ArrowLeft, Home, Compass } from 'lucide-react';
import { CAFE_DETAILS } from '../data/cafeData';

interface NotFoundPageProps {
  onReturnHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onReturnHome }) => {
  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#1E1E1E] flex flex-col items-center justify-center p-6 relative overflow-hidden font-body selection:bg-[#D9B382]/30 selection:text-[#6F4E37]">
      {/* Background ambient warm illumination */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-[#D9B382]/20 blur-2xl sm:blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-[#C67C4E]/15 blur-2xl sm:blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="max-w-md w-full text-center relative z-10 bg-white/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-[#D9B382]/50 shadow-2xl">
        {/* Brand Logo & Coffee Bean Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto w-24 h-24 rounded-3xl overflow-hidden border border-[#D9B382]/60 shadow-md bg-white p-2 mb-6"
        >
          <img
            src={CAFE_DETAILS.logo}
            alt="The Daily Brew"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* 404 Themed Code & Humorous Headline */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#C67C4E] uppercase block mb-1">
            Error 404 · Spilled Cup
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1E1E1E] tracking-tight mb-3">
            Looks like this coffee order got lost.
          </h1>
          <p className="text-sm text-[#1E1E1E]/75 leading-relaxed mb-8">
            The table or cup you're looking for doesn't exist or has already been cleared from the counter. Let's get you back to the fresh roast.
          </p>
        </motion.div>

        {/* Action Buttons to Return Home */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={onReturnHome}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#6F4E37] hover:bg-[#5A3F2C] text-[#FFF8F0] font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37]"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Return to Café Home</span>
          </button>
        </motion.div>

        {/* Café Assistance Tagline */}
        <div className="mt-8 pt-6 border-t border-[#D9B382]/30 text-xs text-[#1E1E1E]/60 flex items-center justify-center gap-2">
          <Compass className="w-3.5 h-3.5 text-[#6F4E37]" aria-hidden="true" />
          <span>The Daily Brew · Chennai, India</span>
        </div>
      </div>
    </div>
  );
};
