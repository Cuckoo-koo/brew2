import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MenuItem, MENU_ITEMS } from '../data/cafeData';
import { Info, Clock, Plus, Sparkles } from 'lucide-react';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickOrder: (item: MenuItem) => void;
  items?: (MenuItem & { is_available?: boolean })[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onQuickOrder,
  items = MENU_ITEMS,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const availableItems = items.filter((item: MenuItem & { is_available?: boolean }) => item.is_available ?? true);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'coffee', label: 'Hot Brews' },
    { id: 'cold-beverages', label: 'Cold Brews' },
    { id: 'food', label: 'Sandwiches & Bites' },
    { id: 'desserts', label: 'Pastries & Desserts' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? availableItems
      : availableItems.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="menu"
      aria-label="The Daily Brew Menu"
      className="py-20 md:py-28 bg-[#FFF8F0] border-b border-[#D9B382]/20 relative overflow-hidden"
    >
      {/* Mobile-adapted ambient atmospheric glow */}
      <div
        className="absolute top-1/4 -left-20 w-64 h-64 sm:w-[480px] sm:h-[480px] rounded-full bg-[#D9B382]/12 blur-2xl sm:blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-20 w-60 h-60 sm:w-[420px] sm:h-[420px] rounded-full bg-[#C67C4E]/10 blur-2xl sm:blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Fade-In Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#6F4E37] uppercase mb-2">
            <span>Handcrafted Delights</span>
            <span aria-hidden="true">·</span>
            <span>Made Fresh Daily</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1E1E] tracking-tight mb-4">
            Our Café Offerings
          </h2>
          <p className="text-[#1E1E1E]/75 text-base leading-relaxed">
            Every item on our menu is prepared with ethically sourced, top-tier ingredients to delight your senses.
          </p>
        </motion.div>

        {/* Filter Segmented Controls with Microinteraction transitions */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#D9B382]/40 shadow-xs gap-1.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37] ${
                    isSelected
                      ? 'text-[#FFF8F0]'
                      : 'text-[#1E1E1E]/70 hover:text-[#1E1E1E] hover:bg-[#FFF8F0]'
                  }`}
                  aria-pressed={isSelected}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute inset-0 bg-[#6F4E37] rounded-xl shadow-sm"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group bg-white rounded-2xl sm:rounded-3xl border border-[#D9B382]/40 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Media Presentation Header with Real Product Photo & Zoom Microinteraction */}
                <div className="relative h-52 bg-[#2D1A10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

                  {/* Top unboxed kicker */}
                  <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between text-xs">
                    <span className="bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded text-[11px] font-medium text-white uppercase tracking-wider">
                      {item.dietary}
                    </span>
                    {item.badge && (
                      <span className="bg-[#6F4E37]/90 backdrop-blur-xs px-2.5 py-0.5 rounded text-[11px] font-semibold text-[#FFF8F0] shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Prep time metadata */}
                  <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 text-[11px] text-white/95 bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-md">
                    <Clock className="w-3 h-3 text-[#D9B382]" aria-hidden="true" />
                    <span>{item.prepTime}</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-heading text-lg font-bold text-[#1E1E1E] group-hover:text-[#6F4E37] transition-colors">
                      {item.name}
                    </h3>
                    {/* Attractive Tabular Pricing */}
                    <span className="font-semibold text-lg text-[#6F4E37] font-mono tabular-nums whitespace-nowrap">
                      ₹{item.price}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#1E1E1E]/70 line-clamp-3 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Ingredients Preview */}
                  <div className="text-[11px] text-[#1E1E1E]/55 flex flex-wrap gap-1 mb-2">
                    {item.ingredients.slice(0, 3).map((ing, i) => (
                      <span key={i}>
                        {ing}
                        {i < 2 && i < item.ingredients.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Controls with Microinteraction Hover */}
              <div className="p-5 sm:p-6 pt-0 border-t border-[#D9B382]/20 flex items-center gap-2 mt-2">
                <button
                  onClick={() => onSelectItem(item)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#D9B382]/60 hover:border-[#6F4E37] text-xs font-medium text-[#1E1E1E] hover:bg-[#FFF8F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37]"
                  aria-label={`View details of ${item.name}`}
                >
                  <Info className="w-3.5 h-3.5 text-[#6F4E37]" aria-hidden="true" />
                  <span>Details</span>
                </button>

                <button
                  onClick={() => onQuickOrder(item)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#6F4E37] hover:bg-[#5A3F2C] text-xs font-semibold text-[#FFF8F0] shadow-sm transition-all active:scale-95 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37]"
                  aria-label={`Order ${item.name}`}
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Order Now</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Quiet Customization Notice */}
        <div className="mt-12 text-center text-xs text-[#1E1E1E]/65">
          <span>Customizations like oat milk, almond milk, and sugar-free options available upon request at the counter.</span>
        </div>
      </div>
    </section>
  );
};
