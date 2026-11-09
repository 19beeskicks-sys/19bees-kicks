import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'The Sovereign Low Obsidian',
    slug: 'sovereign-low-obsidian',
    category: 'men',
    price: 18500,
    originalPrice: 22000,
    description: 'Precision handcrafted calfskin leather sneaker with dual-density cushioned sole. Sculpted in deep obsidian with an ivory architectural sole unit for effortless formal-to-casual versatility.',
    details: [
      'Full-grain Italian calf leather upper',
      'Ergonomic memory-foam insole with arch support',
      'Micro-grooved anti-slip rubber cupsole',
      'Waxed cotton laces with bespoke antique metal aglets',
      'Handcrafted finish in Pakistan with imported materials'
    ],
    images: [
      '/src/assets/images/product_men_sneaker_1794183121675.jpg',
      '/src/assets/images/hero_luxury_sneaker_1794183121618.jpg'
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ['Obsidian Black', 'Chalk White'],
    inStock: true,
    stockCount: 18,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewCount: 38,
    createdAt: '2026-01-10T10:00:00.000Z'
  },
  {
    id: 'prod-2',
    name: 'Aethel Travertine Runner',
    slug: 'aethel-travertine-runner',
    category: 'sneakers',
    price: 24500,
    originalPrice: 28000,
    description: 'A masterpiece of contemporary luxury street footwear. Features a sculpted multi-panel suede and nappa leather upper resting on an architectural flared travertine-toned midsole.',
    details: [
      'Suede and perforated nappa leather panelling',
      'Sculpted dual-compound performance platform',
      'Breathable technical mesh inner lining',
      'Reinforced heel counter with 19Bees debossed crest',
      'Precision stitched sole border'
    ],
    images: [
      '/src/assets/images/hero_luxury_sneaker_1794183121618.jpg',
      '/src/assets/images/product_men_sneaker_1794183121675.jpg'
    ],
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ['Travertine Sand & Black', 'Monochrome Charcoal'],
    inStock: true,
    stockCount: 12,
    isBestSeller: true,
    isNewArrival: true,
    rating: 5.0,
    reviewCount: 52,
    createdAt: '2026-02-01T12:00:00.000Z'
  },
  {
    id: 'prod-3',
    name: 'Eline Champagne Runner',
    slug: 'eline-champagne-runner',
    category: 'women',
    price: 19800,
    originalPrice: 23500,
    description: 'Designed exclusively for refined feminine luxury. Soft champagne cream tone with gold electroplated heel clip accent and featherlight running sole technology.',
    details: [
      'Glove-soft premium cream lambskin & suede',
      'Champagne gold metallic heel counter clip',
      'Ultra-lightweight shock-absorbing EVA midsole',
      'Padded ankle collar for all-day comfort',
      'Subtle debossed gold foil signature'
    ],
    images: [
      '/src/assets/images/product_women_runner_1794183121544.jpg',
      '/src/assets/images/hero_luxury_sneaker_1794183121618.jpg'
    ],
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ['Champagne Cream', 'Pearl White', 'Rose Dust'],
    inStock: true,
    stockCount: 15,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 29,
    createdAt: '2026-02-15T09:30:00.000Z'
  },
  {
    id: 'prod-4',
    name: 'Monaco Caramel Hybrid',
    slug: 'monaco-caramel-hybrid',
    category: 'casual',
    price: 21500,
    originalPrice: 25000,
    description: 'The ultimate synthesis of traditional artisanal cobbling and modern sneaker engineering. Hand-burnished rich caramel calf leather upper with casual sneaker tread.',
    details: [
      'Hand-patinated full-grain crust leather',
      'Breathable natural calf leather lining',
      'Flexible blake-stitched sneaker cupsole',
      'Perforated toe-box for airflow and ease',
      'Made by master artisans with over 20 years experience'
    ],
    images: [
      '/src/assets/images/product_casual_loafers_1794183123383.jpg',
      '/src/assets/images/product_men_sneaker_1794183121675.jpg'
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ['Caramel Tan', 'Espresso Dark Brown'],
    inStock: true,
    stockCount: 9,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 17,
    createdAt: '2026-03-01T15:45:00.000Z'
  },
  {
    id: 'prod-5',
    name: 'Heritage Low Ivory Court',
    slug: 'heritage-low-ivory-court',
    category: 'sneakers',
    price: 16800,
    originalPrice: 19500,
    description: 'Clean minimalist tennis court silhouette elevated with textured tumbled leather and subtle luxury beige accent lining. Timeless luxury for everyday wear.',
    details: [
      'Tumbled full-grain leather construction',
      'Cushioned antimicrobial footbed',
      'Vulcanized natural rubber sole',
      'Signature gold stamped numbering',
      'Reinforced double-stitched stress zones'
    ],
    images: [
      '/src/assets/images/product_men_sneaker_1794183121675.jpg',
      '/src/assets/images/hero_luxury_sneaker_1794183121618.jpg'
    ],
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ['Off-White & Beige', 'Triple White'],
    inStock: true,
    stockCount: 22,
    isBestSeller: false,
    isNewArrival: false,
    rating: 4.7,
    reviewCount: 44,
    createdAt: '2026-01-20T11:15:00.000Z'
  },
  {
    id: 'prod-6',
    name: 'Aura Cloud Runner Beige',
    slug: 'aura-cloud-runner-beige',
    category: 'women',
    price: 22000,
    originalPrice: 26000,
    description: 'Featherlight technical luxury sneaker with sculptured curves, soft beige nubuck panels, and cushioned bounce geometry engineered for high lifestyle demands.',
    details: [
      'Silky Italian nubuck and breathable air-mesh',
      'Dual-density high-rebound cushioning',
      'Non-marking custom luxury outsole',
      'Tonal speed-lacing eyelets',
      'Antibacterial microfiber lining'
    ],
    images: [
      '/src/assets/images/product_women_runner_1794183121544.jpg',
      '/src/assets/images/hero_luxury_sneaker_1794183121618.jpg'
    ],
    sizes: [37, 38, 39, 40, 41],
    colors: ['Desert Sand', 'Ivory Cream'],
    inStock: true,
    stockCount: 14,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewCount: 31,
    createdAt: '2026-02-18T14:20:00.000Z'
  }
];
