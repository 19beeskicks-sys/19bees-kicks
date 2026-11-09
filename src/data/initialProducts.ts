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
      '/images/product_men_sneaker_1794183121675.jpg',
      '/images/hero_luxury_sneaker_1794183121618.jpg'
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
      '/images/hero_luxury_sneaker_1794183121618.jpg',
      '/images/product_men_sneaker_1794183121675.jpg'
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
      '/images/product_women_runner_1794183121544.jpg',
      '/images/hero_luxury_sneaker_1794183121618.jpg'
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
      '/images/product_casual_loafers_1794183123383.jpg',
      '/images/product_men_sneaker_1794183121675.jpg'
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
      '/images/product_men_sneaker_1794183121675.jpg',
      '/images/hero_luxury_sneaker_1794183121618.jpg'
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
      '/images/product_women_runner_1794183121544.jpg',
      '/images/hero_luxury_sneaker_1794183121618.jpg'
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
  },
  {
    id: 'prod-7',
    name: 'Milano Chelsea Hybrid Tan',
    slug: 'milano-chelsea-hybrid-tan',
    category: 'casual',
    price: 26500,
    originalPrice: 31000,
    description: 'Artisanal ankle boot silhouette crafted in burnished honey tan calfskin with elasticated gusset and performance sneaker sole. A true runway statement piece.',
    details: [
      'Hand-waxed burnished honey tan calf leather',
      'Heavy-duty ribbed elastic lateral gussets',
      'Debossed pull-tabs with brass rivet accents',
      'Lugged dual-density hybrid walking sole'
    ],
    images: [
      '/images/product_casual_loafers_1794183123383.jpg',
      '/images/product_men_sneaker_1794183121675.jpg'
    ],
    sizes: [40, 41, 42, 43, 44],
    colors: ['Honey Tan', 'Deep Chocolate'],
    inStock: false,
    stockCount: 0, // Demonstrates SOLD OUT state
    isBestSeller: true,
    isNewArrival: false,
    rating: 5.0,
    reviewCount: 68,
    createdAt: '2026-01-05T08:00:00.000Z'
  },
  {
    id: 'prod-8',
    name: 'Verona Suede Derby Trainer',
    slug: 'verona-suede-derby-trainer',
    category: 'men',
    price: 17900,
    originalPrice: 21000,
    description: 'Supple English suede derby upper merged with an ultra-lightweight court cupsole. Versatile styling for both bespoke tailored trousers and denim.',
    details: [
      'Velvety water-repellent suede upper',
      'Supple calfskin glove inner lining',
      'Shock-absorbing crepe-textured rubber sole',
      'Waxed round laces'
    ],
    images: [
      '/images/product_men_sneaker_1794183121675.jpg',
      '/images/hero_luxury_sneaker_1794183121618.jpg'
    ],
    sizes: [40, 41, 42, 43],
    colors: ['Espresso Suede', 'Taupe Sand'],
    inStock: true,
    stockCount: 3, // Low stock alert demo
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 19,
    createdAt: '2026-02-25T11:00:00.000Z'
  },
  {
    id: 'prod-9',
    name: 'Celestia Metallic Rose Runner',
    slug: 'celestia-metallic-rose-runner',
    category: 'women',
    price: 23400,
    originalPrice: 27500,
    description: 'Subtle rose-gold metallic leather accents framing soft ivory suede panelling. Engineered with featherlight kinetic return footbed technology.',
    details: [
      'Italian metallic glazed leather highlights',
      'Perforated toe-vamp for climate control',
      'Reinforced heel TPU stabilizer clip',
      'Custom gold aglet luxury lacing'
    ],
    images: [
      '/images/product_women_runner_1794183121544.jpg',
      '/images/hero_luxury_sneaker_1794183121618.jpg'
    ],
    sizes: [36, 37, 38, 39, 40],
    colors: ['Rose Gold & Chalk', 'Pure Platinum'],
    inStock: true,
    stockCount: 7,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 15,
    createdAt: '2026-03-02T13:10:00.000Z'
  },
  {
    id: 'prod-10',
    name: 'Valerio Minimalist Court Obsidian',
    slug: 'valerio-minimalist-court-obsidian',
    category: 'sneakers',
    price: 15500,
    originalPrice: 18000,
    description: 'Sleek monochromatic court silhouette with clean stitchwork and gold foil serial stamp. Designed for effortless understated luxury.',
    details: [
      'Smooth matte nappa leather upper',
      'Discreet gold embossed branding',
      'High-traction gum rubber sole',
      'Comfort-padded collar'
    ],
    images: [
      '/images/hero_luxury_sneaker_1794183121618.jpg',
      '/images/product_men_sneaker_1794183121675.jpg'
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ['Triple Black', 'Black & Chalk'],
    inStock: true,
    stockCount: 11,
    isBestSeller: false,
    isNewArrival: false,
    rating: 4.7,
    reviewCount: 24,
    createdAt: '2026-01-25T16:40:00.000Z'
  }
];
