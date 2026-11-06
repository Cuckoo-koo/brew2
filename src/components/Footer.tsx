import React from 'react';
import { Coffee, Instagram, Facebook, Twitter, Heart, ArrowUp } from 'lucide-react';
import { CAFE_DETAILS } from '../data/cafeData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  footerText?: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, footerText }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E1E1E] text-[#FFF8F0] pt-16 pb-12 border-t border-[#6F4E37]/30 relative overflow-hidden">
      {/* Subtle warm ambient glow */}
      <div
        className="absolute top-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-[#6F4E37]/10 blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info & Story */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D9B382]/40 bg-white shrink-0">
                <img
                  src="/assets/aistudio/06_alternate_logo_2e882e7e.jpg"
                  alt="The Daily Brew Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                {CAFE_DETAILS.name}
              </span>
            </div>
            <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
              {CAFE_DETAILS.tagline}. Handcrafting artisanal coffee moments and freshly prepared café favorites in the heart of Chennai.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={CAFE_DETAILS.social[0].url}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#6F4E37] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={CAFE_DETAILS.social[1].url}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#6F4E37] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                aria-label="Facebook page"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={CAFE_DETAILS.social[2].url}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#6F4E37] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                aria-label="Twitter account"
              >
                <Twitter className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D9B382]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-white transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors text-left"
                >
                  Explore Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Our Café
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Snippet */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D9B382]">
              Visit or Inquire
            </h4>
            <div className="text-sm text-gray-300 space-y-1.5 leading-relaxed">
              <p className="text-white font-medium">Chennai</p>
              <p className="pt-2">
                <span className="text-gray-400 text-xs block">Phone:</span>
                <a
                  href={`tel:${CAFE_DETAILS.contact.phone.replace(/\s+/g, '')}`}
                  className="text-white hover:text-[#D9B382] font-mono text-xs"
                >
                  {CAFE_DETAILS.contact.phone}
                </a>
              </p>
              <p>
                <span className="text-gray-400 text-xs block">Email:</span>
                <a
                  href={`mailto:${CAFE_DETAILS.contact.email}`}
                  className="text-white hover:text-[#D9B382] text-xs"
                >
                  {CAFE_DETAILS.contact.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Copyright & Legal Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-medium text-gray-300">
              {footerText || '© 2026 The Daily Brew. All Rights Reserved.'}
            </p>
            <p className="text-[11px] text-gray-500">
              All website content, branding, visual assets, source code customizations, UI designs, and intellectual property belong exclusively to The Daily Brew.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
              Crafted with <Heart className="w-3 h-3 text-[#C67C4E] fill-[#C67C4E]" aria-hidden="true" /> in Chennai
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B382]"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
