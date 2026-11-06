import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CafeAmbienceSection } from './components/CafeAmbienceSection';
import { MenuSection } from './components/MenuSection';
import { CafeGallery } from './components/CafeGallery';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { ReservationModal } from './components/ReservationModal';
import { CoffeeLoader } from './components/CoffeeLoader';
import { CoffeeCursor } from './components/CoffeeCursor';
import { SeoManager } from './components/SeoManager';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { MenuItem } from './data/cafeData';
import { fetchProducts, fetchSiteSettings, SiteSettings } from './lib/cmsDataService';
import { Check, ShoppingBag, ShieldCheck } from 'lucide-react';
import { initAntiDebug } from './utils/antiDebug';

function AppContent() {
  const { isAuthenticated, loading: authLoading } = useAdminAuth();
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [cmsProducts, setCmsProducts] = useState<(MenuItem & { is_available: boolean })[]>([]);
  const [cmsSettings, setCmsSettings] = useState<SiteSettings | null>(null);

  const [orderToast, setOrderToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  // Activate client anti-debugging protection to hide code
  useEffect(() => {
    const cleanup = initAntiDebug();
    return cleanup;
  }, []);

  // Track browser path for routing
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Load CMS Data on Storefront view
  useEffect(() => {
    loadStorefrontData();
  }, [currentPath]);

  const loadStorefrontData = async () => {
    const [prods, settings] = await Promise.all([fetchProducts(), fetchSiteSettings()]);
    setCmsProducts(prods);
    setCmsSettings(settings);
  };

  const handleNavigatePath = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll navigation handler
  const handleNavigateSection = (sectionId: string) => {
    if (currentPath !== '/' && currentPath !== '') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
    }
    setActiveSection(sectionId);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleReturnHome = () => {
    handleNavigatePath('/');
  };

  // Scroll spy for sticky navbar active indication
  useEffect(() => {
    if (currentPath !== '/' && currentPath !== '') return;

    const handleScroll = () => {
      const sections = ['hero', 'ambience', 'menu', 'gallery', 'about', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const triggerToast = (message: string) => {
    setOrderToast({ message, visible: true });
    setTimeout(() => {
      setOrderToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  };

  const handleQuickOrder = (item: MenuItem) => {
    triggerToast(`Added 1x ${item.name} (₹${item.price}) to counter order.`);
  };

  const handleConfirmOrder = (item: MenuItem, notes: string) => {
    const noteText = notes ? ` with request: "${notes}"` : '';
    triggerToast(`Ordered ${item.name} (₹${item.price})${noteText}!`);
  };

  // ROUTE 1: Admin Dashboard (/admin)
  if (currentPath === '/admin' || currentPath === '/admin/dashboard') {
    if (authLoading) {
      return (
        <div className="min-h-screen bg-[#1E1E1E] text-white flex items-center justify-center text-sm">
          Checking owner authentication...
        </div>
      );
    }
    if (!isAuthenticated) {
      return <AdminLoginPage onSuccess={() => handleNavigatePath('/admin')} onReturnToSite={handleReturnHome} />;
    }
    return <AdminDashboardPage onReturnToSite={handleReturnHome} />;
  }

  // ROUTE 2: Admin Login (/admin/login)
  if (currentPath === '/admin/login') {
    return <AdminLoginPage onSuccess={() => handleNavigatePath('/admin')} onReturnToSite={handleReturnHome} />;
  }

  // Custom 404 condition (Route not matching home or standard hash/admin)
  const is404 =
    currentPath !== '/' &&
    currentPath !== '' &&
    currentPath !== '/index.html';

  if (is404) {
    return <NotFoundPage onReturnHome={handleReturnHome} />;
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#1E1E1E] flex flex-col font-body selection:bg-[#D9B382]/30 selection:text-[#6F4E37] relative">
      {/* Dynamic Tier-1 SEO Manager */}
      <SeoManager settings={cmsSettings} />

      {/* Branded 0.9s Coffee Brewing Loading Screen */}
      {isLoading && <CoffeeLoader onComplete={() => setIsLoading(false)} />}

      {/* Subtle Amber Glow Coffee Cursor for Desktop */}
      <CoffeeCursor />

      {/* Skip to Content Link for WCAG Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#6F4E37] text-white rounded-md shadow-lg outline-none ring-2 ring-white"
      >
        Skip to main content
      </a>

      {/* Sticky Three-Zone Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigateSection}
        onOpenReservation={() => setReservationOpen(true)}
      />

      {/* Main Storytelling Experience */}
      <main id="main-content" className="flex-1">
        <Hero
          title={cmsSettings?.heroTitle}
          subtitle={cmsSettings?.heroSubtitle}
          ctaText={cmsSettings?.heroCtaText}
          heroBanner={cmsSettings?.heroBannerUrl}
          onExploreMenu={() => handleNavigateSection('menu')}
          onVisitUs={() => handleNavigateSection('contact')}
        />
        <CafeAmbienceSection />
        <MenuSection
          items={cmsProducts.length > 0 ? cmsProducts : undefined}
          onSelectItem={(item) => setSelectedItem(item)}
          onQuickOrder={handleQuickOrder}
        />
        <CafeGallery />
        <AboutSection story={cmsSettings?.aboutStory} extended={cmsSettings?.aboutExtended} />
        <ContactSection
          email={cmsSettings?.contactEmail}
          phone={cmsSettings?.contactPhone}
          location={cmsSettings?.contactLocation}
        />
      </main>

      {/* Discreet Owner CMS Quick Access Pill */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => handleNavigatePath('/admin')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E1E1E]/90 hover:bg-[#1E1E1E] text-white text-[11px] font-semibold shadow-lg backdrop-blur-md border border-[#D9B382]/40 transition-all hover:scale-105 active:scale-95"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#D9B382]" aria-hidden="true" />
          <span>Owner CMS Portal</span>
        </button>
      </div>

      {/* Footer */}
      <Footer footerText={cmsSettings?.footerText} onNavigate={handleNavigateSection} />

      {/* Interactive Modals */}
      <QuickViewModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onConfirmOrder={handleConfirmOrder}
      />

      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />

      {/* Order & Microinteraction Feedback Toast */}
      {orderToast.visible && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#1E1E1E] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#D9B382]/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <div className="w-8 h-8 rounded-full bg-[#6F4E37] text-[#D9B382] flex items-center justify-center shrink-0">
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="text-xs sm:text-sm">
            <span className="font-semibold block text-white">Café Counter Update</span>
            <span className="text-gray-300">{orderToast.message}</span>
          </div>
          <div className="ml-2 pl-2 border-l border-white/20 text-[#D9B382]">
            <Check className="w-4 h-4" aria-hidden="true" />
          </div>
        </aside>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <AppContent />
    </AdminAuthProvider>
  );
}
