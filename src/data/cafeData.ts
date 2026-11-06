export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'cold-beverages' | 'food' | 'desserts';
  price: number;
  description: string;
  prepTime: string;
  badge?: string;
  popular?: boolean;
  ingredients: string[];
  dietary: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan';
  calories?: string;
  imageFallbackGradient: string;
  iconName: 'Coffee' | 'CupSoda' | 'Sandwich' | 'Cake';
  image: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'coffee',
    price: 150,
    description: 'Double shot of dark roasted espresso balanced with silky steamed whole milk and velvety microfoam.',
    prepTime: '4-5 mins',
    badge: 'Signature',
    popular: true,
    ingredients: ['100% Arabica Espresso', 'Steamed Fresh Milk', 'Microfoam Layer', 'Dusting of Cocoa'],
    dietary: 'Vegetarian',
    calories: '120 kcal',
    imageFallbackGradient: 'from-[#4A2E1B] via-[#6F4E37] to-[#8C6246]',
    iconName: 'Coffee',
    image: '/assets/aistudio/02_alternate_cappuccino_c5035702.jpg',
  },
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    category: 'cold-beverages',
    price: 180,
    description: 'Chilled artisanal espresso blended smoothly with creamy milk and rich vanilla bean notes over crushed ice.',
    prepTime: '3-4 mins',
    badge: 'Guest Favourite',
    popular: true,
    ingredients: ['Slow-Extracted Espresso', 'Chilled Fresh Milk', 'Madagascar Vanilla', 'Light Cane Sugar'],
    dietary: 'Vegetarian',
    calories: '190 kcal',
    imageFallbackGradient: 'from-[#2F1F17] via-[#5C3E2D] to-[#997359]',
    iconName: 'CupSoda',
    image: '/assets/aistudio/03_alternate_iced_coffee_65df194b.jpg',
  },
  {
    id: 'classic-sandwich',
    name: 'Classic Sandwich',
    category: 'food',
    price: 120,
    description: 'Toasted farmhouse sourdough bread layered with crisp garden vegetables, herb pesto spread, and melted cheese.',
    prepTime: '6-8 mins',
    badge: 'Freshly Grilled',
    popular: true,
    ingredients: ['Artisan Sourdough', 'Vine-Ripened Tomatoes', 'Crisp Cucumbers', 'Aged Cheddar', 'Basil Pesto'],
    dietary: 'Vegetarian',
    calories: '280 kcal',
    imageFallbackGradient: 'from-[#7A4B1A] via-[#A87236] to-[#D9B382]',
    iconName: 'Sandwich',
    image: '/assets/aistudio/04_alternate_sandwich_edeb9705.jpg',
  },
  {
    id: 'chocolate-brownie',
    name: 'Chocolate Brownie',
    category: 'desserts',
    price: 100,
    description: 'Warm, dense Belgian dark chocolate fudge brownie topped with crunchy roasted walnuts and sea salt crystals.',
    prepTime: 'Ready to serve',
    badge: 'Chef Special',
    popular: true,
    ingredients: ['70% Belgian Dark Chocolate', 'Pure Butter', 'Roasted Walnuts', 'Organic Flour', 'Fleur de Sel'],
    dietary: 'Vegetarian',
    calories: '310 kcal',
    imageFallbackGradient: 'from-[#26150F] via-[#48281C] to-[#6F4E37]',
    iconName: 'Cake',
    image: '/assets/aistudio/05_alternate_brownie_a36c4410.jpg',
  }
];

export const CAFE_DETAILS = {
  name: 'The Daily Brew',
  tagline: 'Your Everyday Coffee Destination',
  logo: '/assets/aistudio/06_alternate_logo_2e882e7e.jpg',
  heroBanner: '/assets/aistudio/01_alternate_hero_banner_ef90cce4.jpg',
  description:
    'From freshly brewed coffee to delicious bites, discover your favourite spot to relax, recharge and reconnect.',
  aboutStory:
    'At The Daily Brew, we believe every great day starts with a good cup of coffee. Enjoy freshly brewed beverages, delicious food and a welcoming atmosphere.',
  aboutExtended:
    'Rooted in the vibrant pulse of Chennai, The Daily Brew was created as a sanctuary for conversation, productivity, and the timeless ritual of a handcrafted cup. We source single-estate beans and fresh local bakery ingredients daily to ensure every sip and bite is memorable.',
  contact: {
    email: 'hello@thedailybrew.example',
    phone: '+91 98765 43210',
    phoneDisplay: '+91 98765 43210',
    location: 'Chennai',
    fullAddress: 'Chennai',
    hours: [
      { days: 'Monday – Friday', time: '7:30 AM – 10:30 PM' },
      { days: 'Saturday & Sunday', time: '8:00 AM – 11:00 PM' }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Power Outlets at Every Booth',
      'Air-Conditioned Indoor Seating',
      'Pet-Friendly Outdoor Patio',
      'Takeaway & Pre-orders'
    ]
  },
  social: [
    { name: 'Instagram', handle: '@thedailybrew_in', url: 'https://instagram.com' },
    { name: 'Facebook', handle: 'The Daily Brew Cafe', url: 'https://facebook.com' },
    { name: 'Twitter', handle: '@dailybrewchennai', url: 'https://x.com' }
  ]
};
