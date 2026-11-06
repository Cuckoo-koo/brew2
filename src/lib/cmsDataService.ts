import { supabase, isSupabaseConfigured } from './supabaseClient';
import { MENU_ITEMS, CAFE_DETAILS, MenuItem } from '../data/cafeData';

export interface SiteSettings {
  id?: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  aboutStory: string;
  aboutExtended: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  footerText: string;
  logoUrl: string;
  heroBannerUrl: string;
  updatedAt?: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  size?: string;
  type: string;
  uploadedAt: string;
}

export interface CustomerInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'resolved';
}

const LOCAL_PRODUCTS_KEY = 'dailybrew_cms_products';
const LOCAL_SETTINGS_KEY = 'dailybrew_cms_settings';
const LOCAL_MEDIA_KEY = 'dailybrew_cms_media';
const LOCAL_INQUIRIES_KEY = 'dailybrew_cms_inquiries';

// Initial default settings
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  name: CAFE_DETAILS.name,
  heroTitle: 'Your Everyday Coffee Destination.',
  heroSubtitle: CAFE_DETAILS.description,
  heroCtaText: 'Explore Our Menu',
  aboutStory: CAFE_DETAILS.aboutStory,
  aboutExtended: CAFE_DETAILS.aboutExtended,
  contactEmail: CAFE_DETAILS.contact.email,
  contactPhone: CAFE_DETAILS.contact.phone,
  contactLocation: CAFE_DETAILS.contact.location,
  footerText: '© 2026 The Daily Brew. All Rights Reserved.',
  logoUrl: CAFE_DETAILS.logo,
  heroBannerUrl: CAFE_DETAILS.heroBanner,
};

// Initial default media library assets
const DEFAULT_MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'media-1',
    name: '01_alternate_hero_banner.jpg',
    url: '/assets/aistudio/01_alternate_hero_banner_ef90cce4.jpg',
    size: '1.2 MB',
    type: 'image/jpeg',
    uploadedAt: '2026-11-05T09:00:00Z',
  },
  {
    id: 'media-2',
    name: '02_alternate_cappuccino.jpg',
    url: '/assets/aistudio/02_alternate_cappuccino_c5035702.jpg',
    size: '420 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-11-05T09:00:00Z',
  },
  {
    id: 'media-3',
    name: '03_alternate_iced_coffee.jpg',
    url: '/assets/aistudio/03_alternate_iced_coffee_65df194b.jpg',
    size: '380 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-11-05T09:00:00Z',
  },
  {
    id: 'media-4',
    name: '04_alternate_sandwich.jpg',
    url: '/assets/aistudio/04_alternate_sandwich_edeb9705.jpg',
    size: '450 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-11-05T09:00:00Z',
  },
  {
    id: 'media-5',
    name: '05_alternate_brownie.jpg',
    url: '/assets/aistudio/05_alternate_brownie_a36c4410.jpg',
    size: '410 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-11-05T09:00:00Z',
  },
  {
    id: 'media-6',
    name: '06_alternate_logo.jpg',
    url: '/assets/aistudio/06_alternate_logo_2e882e7e.jpg',
    size: '120 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-11-05T09:00:00Z',
  },
];

// Seed initial products in local store if empty
function getLocalProducts(): (MenuItem & { is_available?: boolean })[] {
  try {
    const data = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  const initial = MENU_ITEMS.map((item) => ({ ...item, is_available: true }));
  localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(initial));
  return initial;
}

function getLocalSettings(): SiteSettings {
  try {
    const data = localStorage.getItem(LOCAL_SETTINGS_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(DEFAULT_SITE_SETTINGS));
  return DEFAULT_SITE_SETTINGS;
}

function getLocalMedia(): MediaAsset[] {
  try {
    const data = localStorage.getItem(LOCAL_MEDIA_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  localStorage.setItem(LOCAL_MEDIA_KEY, JSON.stringify(DEFAULT_MEDIA_ASSETS));
  return DEFAULT_MEDIA_ASSETS;
}

function getLocalInquiries(): CustomerInquiry[] {
  try {
    const data = localStorage.getItem(LOCAL_INQUIRIES_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return [
    {
      id: 'inq-1',
      name: 'Aarav Sundaram',
      email: 'aarav@example.com',
      phone: '+91 98765 11223',
      notes: 'Looking for booth table reservation for 4 people on Friday evening.',
      createdAt: '2026-11-05T14:30:00Z',
      status: 'new',
    },
    {
      id: 'inq-2',
      name: 'Priya Raman',
      email: 'priya@example.com',
      phone: '+91 98765 44556',
      notes: 'Inquiring about catering for corporate breakfast event in Chennai.',
      createdAt: '2026-11-05T11:15:00Z',
      status: 'reviewed',
    },
  ];
}

// --- CMS Data Service APIs ---

export async function fetchProducts(): Promise<(MenuItem & { is_available: boolean })[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((d) => ({
          id: d.id,
          name: d.name,
          category: d.category,
          price: Number(d.price),
          description: d.description,
          prepTime: d.prep_time || '5 mins',
          badge: d.badge || undefined,
          ingredients: d.ingredients || [],
          dietary: d.dietary || 'Vegetarian',
          calories: d.calories || undefined,
          imageFallbackGradient: d.image_fallback_gradient || 'from-[#4A2E1B] via-[#6F4E37] to-[#8C6246]',
          iconName: d.icon_name || 'Coffee',
          image: d.image_url || '/assets/aistudio/02_alternate_cappuccino_c5035702.jpg',
          is_available: d.is_available ?? true,
        }));
      }
    } catch {
      // Fallback on error
    }
  }

  const items = getLocalProducts();
  return items.map((i) => ({ ...i, is_available: i.is_available ?? true }));
}

export async function createProduct(product: Partial<MenuItem> & { is_available?: boolean }): Promise<MenuItem & { is_available: boolean }> {
  const newProduct: MenuItem & { is_available: boolean } = {
    id: product.id || `prod_${Date.now()}`,
    name: product.name || 'New Coffee Item',
    category: product.category || 'coffee',
    price: product.price || 150,
    description: product.description || 'Artisanal micro-batch roast prepared fresh in Chennai.',
    prepTime: product.prepTime || '5 mins',
    badge: product.badge || 'New',
    ingredients: product.ingredients || ['Espresso', 'Fresh Milk'],
    dietary: product.dietary || 'Vegetarian',
    calories: product.calories || '140 kcal',
    imageFallbackGradient: 'from-[#4A2E1B] via-[#6F4E37] to-[#8C6246]',
    iconName: product.iconName || 'Coffee',
    image: product.image || '/assets/aistudio/02_alternate_cappuccino_c5035702.jpg',
    is_available: product.is_available ?? true,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('products').insert([
        {
          id: newProduct.id,
          name: newProduct.name,
          category: newProduct.category,
          price: newProduct.price,
          description: newProduct.description,
          prep_time: newProduct.prepTime,
          badge: newProduct.badge,
          ingredients: newProduct.ingredients,
          dietary: newProduct.dietary,
          calories: newProduct.calories,
          image_url: newProduct.image,
          is_available: newProduct.is_available,
        },
      ]);
    } catch {}
  }

  const items = getLocalProducts();
  const updated = [newProduct, ...items];
  localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(updated));
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<MenuItem & { is_available: boolean }>): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('products').update({
        ...(updates.name && { name: updates.name }),
        ...(updates.price !== undefined && { price: updates.price }),
        ...(updates.description && { description: updates.description }),
        ...(updates.category && { category: updates.category }),
        ...(updates.image && { image_url: updates.image }),
        ...(updates.is_available !== undefined && { is_available: updates.is_available }),
        updated_at: new Date().toISOString(),
      }).eq('id', id);
    } catch {}
  }

  const items = getLocalProducts();
  const updated = items.map((item) => (item.id === id ? { ...item, ...updates } : item));
  localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(updated));
}

export async function deleteProduct(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('products').delete().eq('id', id);
    } catch {}
  }

  const items = getLocalProducts();
  const updated = items.filter((item) => item.id !== id);
  localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(updated));
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
      if (!error && data) {
        return {
          id: data.id,
          name: data.name || CAFE_DETAILS.name,
          heroTitle: data.hero_title || DEFAULT_SITE_SETTINGS.heroTitle,
          heroSubtitle: data.hero_subtitle || DEFAULT_SITE_SETTINGS.heroSubtitle,
          heroCtaText: data.hero_cta_text || DEFAULT_SITE_SETTINGS.heroCtaText,
          aboutStory: data.about_story || DEFAULT_SITE_SETTINGS.aboutStory,
          aboutExtended: data.about_extended || DEFAULT_SITE_SETTINGS.aboutExtended,
          contactEmail: data.contact_email || DEFAULT_SITE_SETTINGS.contactEmail,
          contactPhone: data.contact_phone || DEFAULT_SITE_SETTINGS.contactPhone,
          contactLocation: data.contact_location || DEFAULT_SITE_SETTINGS.contactLocation,
          footerText: data.footer_text || DEFAULT_SITE_SETTINGS.footerText,
          logoUrl: data.logo_url || DEFAULT_SITE_SETTINGS.logoUrl,
          heroBannerUrl: data.hero_banner_url || DEFAULT_SITE_SETTINGS.heroBannerUrl,
          updatedAt: data.updated_at,
        };
      }
    } catch {}
  }

  return getLocalSettings();
}

export async function updateSiteSettings(newSettings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = getLocalSettings();
  const updated: SiteSettings = {
    ...current,
    ...newSettings,
    updatedAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('site_settings').upsert([
        {
          id: updated.id || 'main_settings',
          name: updated.name,
          hero_title: updated.heroTitle,
          hero_subtitle: updated.heroSubtitle,
          hero_cta_text: updated.heroCtaText,
          about_story: updated.aboutStory,
          about_extended: updated.aboutExtended,
          contact_email: updated.contactEmail,
          contact_phone: updated.contactPhone,
          contact_location: updated.contactLocation,
          footer_text: updated.footerText,
          logo_url: updated.logoUrl,
          hero_banner_url: updated.heroBannerUrl,
          updated_at: updated.updatedAt,
        },
      ]);
    } catch {}
  }

  localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(updated));
  return updated;
}

export async function fetchMediaAssets(): Promise<MediaAsset[]> {
  return getLocalMedia();
}

export async function addMediaAsset(name: string, url: string, size = '350 KB', type = 'image/jpeg'): Promise<MediaAsset> {
  const newAsset: MediaAsset = {
    id: `media-${Date.now()}`,
    name,
    url,
    size,
    type,
    uploadedAt: new Date().toISOString(),
  };

  const assets = getLocalMedia();
  const updated = [newAsset, ...assets];
  localStorage.setItem(LOCAL_MEDIA_KEY, JSON.stringify(updated));
  return newAsset;
}

export async function deleteMediaAsset(id: string): Promise<void> {
  const assets = getLocalMedia();
  const updated = assets.filter((a) => a.id !== id);
  localStorage.setItem(LOCAL_MEDIA_KEY, JSON.stringify(updated));
}

export async function fetchInquiries(): Promise<CustomerInquiry[]> {
  return getLocalInquiries();
}

export async function addInquiry(inquiry: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>): Promise<void> {
  const newInquiry: CustomerInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  const list = getLocalInquiries();
  localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify([newInquiry, ...list]));
}

/**
 * SQL Schema & RLS Policies script for Supabase Cloud Database setup
 */
export const SUPABASE_SQL_SCHEMA = `-- Supabase PostgreSQL Table Schemas & Row Level Security Policies
-- Paste this script into your Supabase SQL Editor to provision tables and security rules

-- 1. Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  prep_time TEXT DEFAULT '5 mins',
  badge TEXT,
  ingredients JSONB DEFAULT '[]'::jsonb,
  dietary TEXT DEFAULT 'Vegetarian',
  calories TEXT,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'main_settings',
  name TEXT NOT NULL DEFAULT 'The Daily Brew',
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_cta_text TEXT,
  about_story TEXT,
  about_extended TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_location TEXT,
  footer_text TEXT,
  logo_url TEXT,
  hero_banner_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 4. Public Read Policies (Allow anyone to view menu & settings)
CREATE POLICY "Public products view" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Public settings view" ON public.site_settings
  FOR SELECT USING (true);

-- 5. Public Write Policies for Anon Key (Allow anonymous insert/update for demo & initial setup)
CREATE POLICY "Anon insert products" ON public.products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anon update products" ON public.products
  FOR UPDATE USING (true);

CREATE POLICY "Anon delete products" ON public.products
  FOR DELETE USING (true);

CREATE POLICY "Anon insert settings" ON public.site_settings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anon update settings" ON public.site_settings
  FOR UPDATE USING (true);

-- 6. Insert Initial Default Site Settings
INSERT INTO public.site_settings (
  id, name, hero_title, hero_subtitle, hero_cta_text,
  about_story, about_extended, contact_email, contact_phone,
  contact_location, footer_text, logo_url, hero_banner_url
) VALUES (
  'main_settings',
  'The Daily Brew',
  'Your Everyday Coffee Destination.',
  'From freshly brewed coffee to delicious bites, discover your favourite spot to relax, recharge and reconnect.',
  'Explore Our Menu',
  'At The Daily Brew, we believe every great day starts with a good cup of coffee. Enjoy freshly brewed beverages, delicious food and a welcoming atmosphere.',
  'Rooted in the vibrant pulse of Chennai, The Daily Brew was created as a sanctuary for conversation, productivity, and the timeless ritual of a handcrafted cup. We source single-estate beans and fresh local bakery ingredients daily to ensure every sip and bite is memorable.',
  'hello@thedailybrew.example',
  '+91 98765 43210',
  'Chennai',
  '© 2026 The Daily Brew. All Rights Reserved.',
  '/assets/aistudio/06_alternate_logo_2e882e7e.jpg',
  '/assets/aistudio/01_alternate_hero_banner_ef90cce4.jpg'
) ON CONFLICT (id) DO NOTHING;

-- 7. Insert Initial Seed Menu Products
INSERT INTO public.products (
  name, category, price, description, prep_time, badge, ingredients, dietary, calories, image_url, is_available
) VALUES
(
  'Cappuccino',
  'coffee',
  150,
  'Double shot of dark roasted espresso balanced with silky steamed whole milk and velvety microfoam.',
  '4-5 mins',
  'Signature',
  '["100% Arabica Espresso", "Steamed Fresh Milk", "Microfoam Layer", "Dusting of Cocoa"]'::jsonb,
  'Vegetarian',
  '120 kcal',
  '/assets/aistudio/02_alternate_cappuccino_c5035702.jpg',
  true
),
(
  'Cold Coffee',
  'cold-beverages',
  180,
  'Chilled artisanal espresso blended smoothly with creamy milk and rich vanilla bean notes over crushed ice.',
  '3-4 mins',
  'Guest Favourite',
  '["Slow-Extracted Espresso", "Chilled Fresh Milk", "Madagascar Vanilla", "Light Cane Sugar"]'::jsonb,
  'Vegetarian',
  '190 kcal',
  '/assets/aistudio/03_alternate_iced_coffee_65df194b.jpg',
  true
),
(
  'Classic Sandwich',
  'food',
  120,
  'Toasted farmhouse sourdough bread layered with crisp garden vegetables, herb pesto spread, and melted cheese.',
  '6-8 mins',
  'Freshly Grilled',
  '["Artisan Sourdough", "Vine-Ripened Tomatoes", "Crisp Cucumbers", "Aged Cheddar", "Basil Pesto"]'::jsonb,
  'Vegetarian',
  '280 kcal',
  '/assets/aistudio/04_alternate_sandwich_edeb9705.jpg',
  true
),
(
  'Chocolate Brownie',
  'desserts',
  100,
  'Warm, dense Belgian dark chocolate fudge brownie topped with crunchy roasted walnuts and sea salt crystals.',
  'Ready to serve',
  'Chef Special',
  '["70% Belgian Dark Chocolate", "Pure Butter", "Roasted Walnuts", "Organic Flour", "Fleur de Sel"]'::jsonb,
  'Vegetarian',
  '310 kcal',
  '/assets/aistudio/05_alternate_brownie_a36c4410.jpg',
  true
);
`;
