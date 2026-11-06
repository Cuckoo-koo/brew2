import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye } from 'lucide-react';
import { CAFE_DETAILS, MENU_ITEMS } from '../data/cafeData';

export const CafeGallery: React.FC = () => {
  const galleryItems = [
    {
      title: 'Artisan Hot Cappuccino',
      subtitle: 'Single-origin espresso & silky microfoam',
      image: MENU_ITEMS[0].image,
      category: 'Signature Brews',
    },
    {
      title: 'The Daily Brew Morning Bar',
      subtitle: 'Warm croissants & aromatic roasts in Chennai',
      image: CAFE_DETAILS.heroBanner,
      category: 'Café Atmosphere',
    },
    {
      title: 'Iced Caramel Cold Brew',
      subtitle: 'Cascading chocolate drizzle & slow-steeped espresso',
      image: MENU_ITEMS[1].image,
      category: 'Chilled Delights',
    },
    {
      title: 'Farmhouse Grilled Sandwich',
      subtitle: 'Artisan sourdough, crisp garden greens & aged cheese',
      image: MENU_ITEMS[2].image,
      category: 'Gourmet Kitchen',
    },
    {
      title: 'Belgian Dark Chocolate Brownie',
      subtitle: 'Dense chocolate fudge, walnuts & sea salt flakes',
      image: MENU_ITEMS[3].image,
      category: 'Sweet Indulgence',
    },
  ];

  return (
    <section
      id="gallery"
      aria-label="The Daily Brew Visual Gallery"
      className="py-20 md:py-28 bg-[#FFF8F0] border-b border-[#D9B382]/20 relative overflow-hidden"
    >
      {/* Mobile-adapted ambient atmospheric glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-[550px] sm:h-[550px] rounded-full bg-[#D9B382]/10 blur-2xl sm:blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#6F4E37] uppercase mb-2">
            <span>Visual Storytelling</span>
            <span aria-hidden="true">·</span>
            <span>Handcrafted Moments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1E1E] tracking-tight mb-4">
            Moments at The Daily Brew
          </h2>
          <p className="text-[#1E1E1E]/75 text-base leading-relaxed">
            Every pour, crumb, and cozy nook captured in authentic detail from our daily café routine.
          </p>
        </motion.div>

        {/* Gallery Bento Grid Layout using only provided images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D9B382]/40 bg-[#1E1E1E] shadow-sm hover:shadow-2xl transition-all duration-500 ${
                idx === 1 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div
                className={`w-full overflow-hidden relative ${
                  idx === 1 ? 'aspect-[21/9] min-h-[260px]' : 'aspect-square min-h-[260px]'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle scrim for typography legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#D9B382] uppercase tracking-wider border border-white/10">
                    {item.category}
                  </span>
                </div>

                {/* Bottom Overlay Title & Subtitle */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white transform group-hover:translate-y-[-2px] transition-transform">
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 max-w-md line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
