import React, { useState } from 'react';
import { MenuItem } from '../data/cafeData';
import { X, Clock, Check, Coffee, CupSoda, Sandwich, Cake, ShoppingBag } from 'lucide-react';

interface QuickViewModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onConfirmOrder: (item: MenuItem, notes: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  item,
  onClose,
  onConfirmOrder,
}) => {
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [success, setSuccess] = useState(false);

  if (!item) return null;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      onConfirmOrder(item, specialInstructions);
      setSuccess(false);
      setSpecialInstructions('');
      onClose();
    }, 600);
  };

  const renderIcon = (iconName: MenuItem['iconName']) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-10 h-10 text-white" aria-hidden="true" />;
      case 'CupSoda':
        return <CupSoda className="w-10 h-10 text-white" aria-hidden="true" />;
      case 'Sandwich':
        return <Sandwich className="w-10 h-10 text-white" aria-hidden="true" />;
      case 'Cake':
        return <Cake className="w-10 h-10 text-white" aria-hidden="true" />;
      default:
        return <Coffee className="w-10 h-10 text-white" aria-hidden="true" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#D9B382]/40 transition-all my-4 max-h-[90vh] flex flex-col">
        {/* Close Button with generous touch target */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Modal Graphic Header with Real Product Photo */}
        <div className="relative h-48 bg-[#2D1A10] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 pointer-events-none" />

          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs">
            <span className="bg-black/60 px-2.5 py-0.5 rounded text-[11px] font-medium text-white uppercase tracking-wider">
              {item.dietary}
            </span>
            {item.badge && (
              <span className="bg-[#6F4E37] px-2.5 py-0.5 rounded text-[11px] font-semibold text-white">
                {item.badge}
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-baseline justify-between text-white">
            <div>
              <h3 id="modal-title" className="text-2xl font-bold font-heading text-white">
                {item.name}
              </h3>
              <p className="text-xs text-[#D9B382]">{item.calories}</p>
            </div>
            <span className="text-2xl font-bold font-mono text-white tabular-nums">
              ₹{item.price}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-[#D9B382]/20 mb-4">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wide block">Pricing</span>
              <span className="text-2xl font-bold text-[#6F4E37] font-mono tabular-nums">
                ₹{item.price}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-[#FFF8F0] px-3 py-1.5 rounded-lg border border-[#D9B382]/30">
              <Clock className="w-4 h-4 text-[#6F4E37]" aria-hidden="true" />
              <span>Prep: {item.prepTime}</span>
            </div>
          </div>

          <p className="text-sm text-[#1E1E1E]/80 leading-relaxed mb-5">
            {item.description}
          </p>

          {/* Key Ingredients */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1E1E1E]/60 mb-2">
              Fresh Ingredients & Notes
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {item.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-md bg-[#FFF8F0] text-[#6F4E37] border border-[#D9B382]/40 font-medium"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Order / Prep Note Form */}
          <form onSubmit={handleOrder} className="space-y-4">
            <div>
              <label
                htmlFor="order-notes"
                className="block text-xs font-semibold text-[#1E1E1E] mb-1"
              >
                Barista Notes (optional)
              </label>
              <input
                id="order-notes"
                type="text"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Extra hot, oat milk substitute, less sweet..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9B382]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
              />
            </div>

            <button
              type="submit"
              disabled={success}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#6F4E37] hover:bg-[#5A3F2C] text-white font-semibold text-sm shadow-md transition-all active:scale-98 disabled:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37]"
            >
              {success ? (
                <>
                  <Check className="w-4 h-4 text-[#D9B382]" aria-hidden="true" />
                  <span>Item Added to Order Note!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                  <span>Confirm Quick Order (₹{item.price})</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
