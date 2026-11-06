import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Coffee, Menu, X, ArrowUpRight } from 'lucide-react';
import { CAFE_DETAILS } from '../data/cafeData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenReservation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'ambience', label: 'Ambience' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8F0]/95 backdrop-blur-md border-b border-[#D9B382]/30 transition-all duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 sm:gap-6">
          {/* Zone 1: Brand Wordmark with Official Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C67C4E] rounded-xl py-1"
            aria-label="The Daily Brew - Go to home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#D9B382]/60 shadow-xs group-hover:border-[#6F4E37] transition-all bg-[#FFF8F0] shrink-0">
              <img
                src={CAFE_DETAILS.logo}
                alt="The Daily Brew Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#1E1E1E] whitespace-nowrap shrink-0">
              The Daily Brew
            </span>
          </button>

          {/* Zone 2: Navigation Links with Animated Underline Microinteraction */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C67C4E] rounded-md ${
                    isActive
                      ? 'text-[#6F4E37] font-semibold'
                      : 'text-[#1E1E1E]/70 hover:text-[#1E1E1E]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenReservation}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#6F4E37] hover:bg-[#5A3F2C] text-[#FFF8F0] text-sm font-medium transition-all shadow-sm active:scale-98 hover:shadow-md whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6F4E37]"
            >
              <span>Visit Us</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Menu Button with 44px touch target */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl text-[#1E1E1E] hover:bg-[#D9B382]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C67C4E]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with smooth slide-down animation and full-width thumb targets */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-t border-[#D9B382]/30 bg-[#FFF8F0] px-4 pt-3 pb-6 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto"
          role="region"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`min-h-[46px] flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-[#D9B382]/30 text-[#6F4E37] font-semibold'
                      : 'text-[#1E1E1E]/80 hover:bg-[#D9B382]/15 active:bg-[#D9B382]/20'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#6F4E37]" />
                  )}
                </button>
              );
            })}
            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#6F4E37] text-[#FFF8F0] text-base font-medium shadow-sm hover:bg-[#5A3F2C] active:scale-98 transition-colors"
              >
                <span>Visit Us & Directions</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
