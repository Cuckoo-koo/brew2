import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee } from 'lucide-react';
import { CAFE_DETAILS } from '../data/cafeData';

interface CoffeeLoaderProps {
  onComplete: () => void;
}

export const CoffeeLoader: React.FC<CoffeeLoaderProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 0.9s auto-dismiss as requested
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 400); // Allow exit animation to complete
    }, 900);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1E1E1E] text-[#FFF8F0]"
          role="status"
          aria-live="polite"
          aria-label="Loading The Daily Brew"
        >
          {/* Subtle warm amber radial glow behind loader */}
          <div
            className="absolute w-72 h-72 rounded-full bg-[#6F4E37]/30 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Animated Logo with Coffee Steam Accent */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative w-20 h-20 rounded-2xl overflow-hidden border border-[#D9B382]/40 bg-white p-1 shadow-2xl mb-5"
            >
              <img
                src={CAFE_DETAILS.logo}
                alt="The Daily Brew"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Brewing Headline */}
            <motion.h2
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="font-heading text-xl font-bold tracking-tight text-white mb-2"
            >
              The Daily Brew
            </motion.h2>

            {/* Coffee Brewing Concept Message */}
            <motion.p
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="text-xs text-[#D9B382] font-medium tracking-wide max-w-xs"
            >
              Preparing your perfect coffee experience...
            </motion.p>

            {/* Elegant Minimal Progress Line */}
            <div className="w-36 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                className="w-1/2 h-full bg-gradient-to-r from-[#D9B382] via-[#C67C4E] to-[#D4A056] rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
