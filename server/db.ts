import fs from 'fs';
import path from 'path';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number; // in PKR
  originalPrice?: number;
  description: string;
  details: string[];
  images: string[];
  sizes: number[]; // e.g. [39, 40, 41, 42, 43, 44, 45]
  colors: string[];
  inStock: boolean;
  stockCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: 'customer' | 'admin';
  address?: {
    street: string;
    city: string;
    postalCode: string;
  };
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  size: number;
  color: string;
  quantity: number;
  image: string;
}

export interface PaymentDetails {
  method: 'jazzcash' | 'easypaisa' | 'bank_transfer' | 'cod';
  status: 'pending' | 'verified' | 'rejected';
  accountTitle?: string;
  accountNumber?: string;
  transactionId?: string;
  screenshotUrl?: string;
  verifiedAt?: string;
  adminNotes?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. 19BK-2026-8491
  userId?: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    notes?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discountAmount?: number;
  couponCode?: string;
  shipping: number;
  total: number;
  payment: PaymentDetails;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  statusHistory: {
    status: string;
    timestamp: string;
    note: string;
  }[];
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  createdAt: string;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  isActive: boolean;
  usageCount: number;
  expiryDate?: string;
}

export interface SiteSettings {
  announcementText: string;
  heroTag: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroFeaturedModelName: string;
  heroFeaturedModelPrice: number;
  freeShippingThreshold: number;
  standardShippingFee: number;
  supportPhone: string;
  supportEmail: string;
  whatsappNumber: string;
  jazzcashAccountTitle: string;
  jazzcashAccountNumber: string;
}

export interface DatabaseSchema {
  products: Product[];
  users: User[];
  orders: Order[];
  contactMessages: ContactMessage[];
  newsletterSubscribers: NewsletterSubscriber[];
  collections: Collection[];
  categories: Category[];
  coupons: Coupon[];
  siteSettings: SiteSettings;
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'database.json');

const INITIAL_PRODUCTS: Product[] = [
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

const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    name: '19Bees Admin',
    email: 'admin@19beeskicks.com',
    phone: '+92 328 2158299',
    passwordHash: 'admin123',
    role: 'admin',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'user-samad',
    name: 'Abdul Samad',
    email: '19beeskicks@gmail.com',
    phone: '+92 328 2158299',
    passwordHash: 'samad123',
    role: 'admin',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'user-demo-customer',
    name: 'Hamza Khan',
    email: 'hamza.khan@gmail.com',
    phone: '+92 300 1234567',
    passwordHash: 'password123',
    role: 'customer',
    address: {
      street: 'House 42, Street 8, Phase 5, DHA',
      city: 'Lahore',
      postalCode: '54000'
    },
    createdAt: '2026-02-10T14:00:00.000Z'
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'order-1',
    orderNumber: '19BK-2026-8901',
    userId: 'user-demo-customer',
    customer: {
      fullName: 'Hamza Khan',
      email: 'hamza.khan@gmail.com',
      phone: '+92 300 1234567',
      address: 'House 42, Street 8, Phase 5, DHA',
      city: 'Lahore',
      postalCode: '54000',
      notes: 'Please call before delivery'
    },
    items: [
      {
        productId: 'prod-1',
        productName: 'The Sovereign Low Obsidian',
        price: 18500,
        size: 42,
        color: 'Obsidian Black',
        quantity: 1,
        image: '/images/product_men_sneaker_1794183121675.jpg'
      }
    ],
    subtotal: 18500,
    shipping: 0,
    total: 18500,
    payment: {
      method: 'jazzcash',
      status: 'pending',
      accountTitle: 'Abdul Samad',
      accountNumber: '03238917805',
      transactionId: 'JC-9823412093',
      adminNotes: 'Awaiting admin verification'
    },
    status: 'Processing',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2026-03-05T10:15:00.000Z',
        note: 'Order placed by customer via JazzCash payment'
      },
      {
        status: 'Processing',
        timestamp: '2026-03-05T11:00:00.000Z',
        note: 'JazzCash transaction ID submitted, order queued for verification'
      }
    ],
    createdAt: '2026-03-05T10:15:00.000Z'
  },
  {
    id: 'order-2',
    orderNumber: '19BK-2026-7812',
    customer: {
      fullName: 'Ayesha Malik',
      email: 'ayesha.m@yahoo.com',
      phone: '+92 321 9876543',
      address: 'Apartment 4B, Creek Vistas, Clifton',
      city: 'Karachi',
      postalCode: '75600'
    },
    items: [
      {
        productId: 'prod-3',
        productName: 'Eline Champagne Runner',
        price: 19800,
        size: 38,
        color: 'Champagne Cream',
        quantity: 1,
        image: '/images/product_women_runner_1794183121544.jpg'
      }
    ],
    subtotal: 19800,
    shipping: 0,
    total: 19800,
    payment: {
      method: 'cod',
      status: 'pending',
      adminNotes: 'Cash to be collected upon doorstep delivery'
    },
    status: 'Shipped',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2026-03-04T09:00:00.000Z',
        note: 'Cash on delivery order placed'
      },
      {
        status: 'Confirmed',
        timestamp: '2026-03-04T10:30:00.000Z',
        note: 'Customer phone confirmed by dispatch team'
      },
      {
        status: 'Shipped',
        timestamp: '2026-03-05T08:00:00.000Z',
        note: 'Dispatched via TCS Express Airway Bill #9842109'
      }
    ],
    createdAt: '2026-03-04T09:00:00.000Z'
  }
];

const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-1',
    title: "Men's Collection",
    slug: 'men',
    tag: 'men',
    subtitle: 'Architectural silhouettes & calfskin leather',
    description: 'Impeccable craftsmanship and Italian leather tailoring for the modern gentleman.',
    image: '/images/product_men_sneaker_1794183121675.jpg'
  },
  {
    id: 'col-2',
    title: "Women's Collection",
    slug: 'women',
    tag: 'women',
    subtitle: 'Featherlight runners & champagne tones',
    description: 'Ultra-refined feminine luxury designed for comfort and elevated daily presence.',
    image: '/images/product_women_runner_1794183121544.jpg'
  },
  {
    id: 'col-3',
    title: 'Designer Sneakers',
    slug: 'sneakers',
    tag: 'sneakers',
    subtitle: 'Contemporary sculptural luxury street style',
    description: 'Avant-garde platform soles and contrasting texture panelling.',
    image: '/images/hero_luxury_sneaker_1794183121618.jpg'
  },
  {
    id: 'col-4',
    title: 'Casual & Hybrids',
    slug: 'casual',
    tag: 'casual',
    subtitle: 'Hand-burnished leather & sneaker comfort',
    description: 'Blake-stitched loafers blended seamlessly with shock-absorbing sneaker treads.',
    image: '/images/product_casual_loafers_1794183123383.jpg'
  },
  {
    id: 'col-5',
    title: 'New Arrivals',
    slug: 'newarrivals',
    tag: 'newarrivals',
    subtitle: 'Limited-edition artisan releases',
    description: 'The newest handcrafted releases fresh from the 19Bees atelier.',
    image: '/images/product_men_sneaker_1794183121675.jpg'
  },
  {
    id: 'col-6',
    title: 'Best Sellers',
    slug: 'bestsellers',
    tag: 'bestsellers',
    subtitle: 'Most coveted footwear silhouettes',
    description: 'Our most sought-after shoes celebrated for unmatched comfort and style.',
    image: '/images/product_women_runner_1794183121544.jpg'
  }
];

const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: "Men's Footwear", slug: 'men', description: 'Handcrafted luxury sneakers, dress hybrids, and boots for men.' },
  { id: 'cat-2', name: "Women's Footwear", slug: 'women', description: 'Featherlight runners, designer luxury trainers, and slip-ons for women.' },
  { id: 'cat-3', name: 'Designer Sneakers', slug: 'sneakers', description: 'High-end streetwear and sculpted statement sneaker silhouettes.' },
  { id: 'cat-4', name: 'Casual & Loafers', slug: 'casual', description: 'Burnished calfskin casual shoes and hybrid walking loafers.' }
];

const INITIAL_COUPONS: Coupon[] = [
  { id: 'cp-1', code: 'WELCOME10', discountType: 'percentage', discountValue: 10, minPurchase: 10000, isActive: true, usageCount: 14 },
  { id: 'cp-2', code: 'BEES2000', discountType: 'fixed', discountValue: 2000, minPurchase: 20000, isActive: true, usageCount: 8 },
  { id: 'cp-3', code: 'VIP15', discountType: 'percentage', discountValue: 15, minPurchase: 30000, isActive: true, usageCount: 5 }
];

const INITIAL_SETTINGS: SiteSettings = {
  announcementText: 'Complimentary Express Shipping Across Pakistan On Orders Over PKR 15,000',
  heroTag: 'The 2026 Sovereign Edition',
  heroTitle: 'STEP INTO YOUR STYLE.',
  heroDescription: 'Discover the perfect balance of modern design, everyday comfort, and timeless style. Handcrafted with imported leathers for the discerning connoisseur.',
  heroImage: '/images/hero_luxury_sneaker_1794183121618.jpg',
  heroFeaturedModelName: 'Aethel Travertine Runner',
  heroFeaturedModelPrice: 24500,
  freeShippingThreshold: 15000,
  standardShippingFee: 250,
  supportPhone: '+92 328 2158299',
  supportEmail: '19beeskicks@gmail.com',
  whatsappNumber: '+92 328 2158299',
  jazzcashAccountTitle: 'Abdul Samad',
  jazzcashAccountNumber: '03238917805'
};

export class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        // Ensure new schema collections exist
        let changed = false;
        if (!parsed.collections) { parsed.collections = INITIAL_COLLECTIONS; changed = true; }
        if (!parsed.categories) { parsed.categories = INITIAL_CATEGORIES; changed = true; }
        if (!parsed.coupons) { parsed.coupons = INITIAL_COUPONS; changed = true; }
        if (!parsed.siteSettings) { parsed.siteSettings = INITIAL_SETTINGS; changed = true; }
        // Merge in any new sample products if less than 7 exist
        if (!parsed.products || parsed.products.length < 7) {
          parsed.products = INITIAL_PRODUCTS;
          changed = true;
        }
        if (changed) {
          this.save(parsed);
        }
        return parsed;
      }
    } catch (err) {
      console.error('Error reading database file, initializing fresh:', err);
    }

    const initial: DatabaseSchema = {
      products: INITIAL_PRODUCTS,
      users: INITIAL_USERS,
      orders: INITIAL_ORDERS,
      contactMessages: [],
      newsletterSubscribers: [],
      collections: INITIAL_COLLECTIONS,
      categories: INITIAL_CATEGORIES,
      coupons: INITIAL_COUPONS,
      siteSettings: INITIAL_SETTINGS
    };
    this.save(initial);
    return initial;
  }

  private save(dataToSave?: DatabaseSchema): void {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave || this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write database file:', err);
    }
  }

  // ---------------- PRODUCTS ----------------
  getProducts(): Product[] {
    return this.data.products;
  }

  getProductById(id: string): Product | undefined {
    return this.data.products.find(p => p.id === id || p.slug === id);
  }

  addProduct(product: Product): Product {
    this.data.products.unshift(product);
    this.save();
    return product;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    const current = this.data.products[idx];
    const updated = { ...current, ...updates };
    // Automatically update inStock based on stockCount
    if (updated.stockCount !== undefined) {
      updated.stockCount = Number(updated.stockCount);
      updated.inStock = updated.stockCount > 0;
    }
    this.data.products[idx] = updated;
    this.save();
    return updated;
  }

  updateProductStock(id: string, newStock: number): Product | null {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    const stock = Math.max(0, Number(newStock));
    this.data.products[idx].stockCount = stock;
    this.data.products[idx].inStock = stock > 0;
    this.save();
    return this.data.products[idx];
  }

  deleteProduct(id: string): boolean {
    const initialLen = this.data.products.length;
    this.data.products = this.data.products.filter(p => p.id !== id);
    if (this.data.products.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // ---------------- COLLECTIONS ----------------
  getCollections(): Collection[] {
    return this.data.collections || INITIAL_COLLECTIONS;
  }

  addCollection(col: Collection): Collection {
    if (!this.data.collections) this.data.collections = [];
    this.data.collections.push(col);
    this.save();
    return col;
  }

  updateCollection(id: string, updates: Partial<Collection>): Collection | null {
    if (!this.data.collections) this.data.collections = INITIAL_COLLECTIONS;
    const idx = this.data.collections.findIndex(c => c.id === id || c.slug === id);
    if (idx === -1) return null;
    this.data.collections[idx] = { ...this.data.collections[idx], ...updates };
    this.save();
    return this.data.collections[idx];
  }

  deleteCollection(id: string): boolean {
    if (!this.data.collections) return false;
    const initial = this.data.collections.length;
    this.data.collections = this.data.collections.filter(c => c.id !== id && c.slug !== id);
    if (this.data.collections.length !== initial) {
      this.save();
      return true;
    }
    return false;
  }

  // ---------------- CATEGORIES ----------------
  getCategories(): Category[] {
    return this.data.categories || INITIAL_CATEGORIES;
  }

  addCategory(cat: Category): Category {
    if (!this.data.categories) this.data.categories = [];
    this.data.categories.push(cat);
    this.save();
    return cat;
  }

  updateCategory(id: string, updates: Partial<Category>): Category | null {
    if (!this.data.categories) this.data.categories = INITIAL_CATEGORIES;
    const idx = this.data.categories.findIndex(c => c.id === id || c.slug === id);
    if (idx === -1) return null;
    this.data.categories[idx] = { ...this.data.categories[idx], ...updates };
    this.save();
    return this.data.categories[idx];
  }

  deleteCategory(id: string): boolean {
    if (!this.data.categories) return false;
    const initial = this.data.categories.length;
    this.data.categories = this.data.categories.filter(c => c.id !== id && c.slug !== id);
    if (this.data.categories.length !== initial) {
      this.save();
      return true;
    }
    return false;
  }

  // ---------------- COUPONS ----------------
  getCoupons(): Coupon[] {
    return this.data.coupons || INITIAL_COUPONS;
  }

  addCoupon(coupon: Coupon): Coupon {
    if (!this.data.coupons) this.data.coupons = [];
    this.data.coupons.unshift(coupon);
    this.save();
    return coupon;
  }

  updateCoupon(id: string, updates: Partial<Coupon>): Coupon | null {
    if (!this.data.coupons) this.data.coupons = INITIAL_COUPONS;
    const idx = this.data.coupons.findIndex(c => c.id === id || c.code.toUpperCase() === id.toUpperCase());
    if (idx === -1) return null;
    this.data.coupons[idx] = { ...this.data.coupons[idx], ...updates };
    this.save();
    return this.data.coupons[idx];
  }

  deleteCoupon(id: string): boolean {
    if (!this.data.coupons) return false;
    const initial = this.data.coupons.length;
    this.data.coupons = this.data.coupons.filter(c => c.id !== id && c.code !== id);
    if (this.data.coupons.length !== initial) {
      this.save();
      return true;
    }
    return false;
  }

  validateCoupon(code: string, subtotal: number): { valid: boolean; discount: number; message: string; coupon?: Coupon } {
    const list = this.getCoupons();
    const coupon = list.find(c => c.code.toUpperCase() === code.toUpperCase().trim());
    if (!coupon) {
      return { valid: false, discount: 0, message: 'Invalid coupon code' };
    }
    if (!coupon.isActive) {
      return { valid: false, discount: 0, message: 'This coupon code is currently inactive' };
    }
    if (subtotal < coupon.minPurchase) {
      return { valid: false, discount: 0, message: `Minimum purchase of PKR ${coupon.minPurchase.toLocaleString()} required for this coupon` };
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
    } else {
      discount = Math.min(coupon.discountValue, subtotal);
    }

    return { valid: true, discount, message: `Coupon applied: Saved PKR ${discount.toLocaleString()}`, coupon };
  }

  // ---------------- SITE SETTINGS ----------------
  getSiteSettings(): SiteSettings {
    return this.data.siteSettings || INITIAL_SETTINGS;
  }

  updateSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
    this.data.siteSettings = { ...(this.data.siteSettings || INITIAL_SETTINGS), ...settings };
    this.save();
    return this.data.siteSettings;
  }

  // ---------------- USERS & CUSTOMERS ----------------
  getUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id: string): User | undefined {
    return this.data.users.find(u => u.id === id);
  }

  createUser(user: User): User {
    this.data.users.push(user);
    this.save();
    return user;
  }

  getCustomersList(): any[] {
    const customersMap = new Map<string, any>();

    // 1. Registered users
    for (const u of this.data.users) {
      if (u.role === 'admin') continue;
      customersMap.set(u.email.toLowerCase(), {
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        city: u.address?.city || 'Pakistan',
        totalOrders: 0,
        totalSpent: 0,
        lastOrderDate: u.createdAt,
        registered: true
      });
    }

    // 2. Aggregate orders
    for (const o of this.data.orders) {
      const email = o.customer.email.toLowerCase();
      let record = customersMap.get(email);
      if (!record) {
        record = {
          id: o.userId || `cust-${Date.now()}`,
          name: o.customer.fullName,
          email: o.customer.email,
          phone: o.customer.phone,
          city: o.customer.city,
          totalOrders: 0,
          totalSpent: 0,
          lastOrderDate: o.createdAt,
          registered: false
        };
        customersMap.set(email, record);
      }
      record.totalOrders += 1;
      if (o.status !== 'Cancelled') {
        record.totalSpent += o.total;
      }
      if (new Date(o.createdAt) > new Date(record.lastOrderDate)) {
        record.lastOrderDate = o.createdAt;
      }
    }

    return Array.from(customersMap.values()).sort((a, b) => b.totalSpent - a.totalSpent);
  }

  // ---------------- ORDERS ----------------
  getOrders(): Order[] {
    return this.data.orders;
  }

  getOrderById(id: string): Order | undefined {
    return this.data.orders.find(o => o.id === id || o.orderNumber.toUpperCase() === id.toUpperCase());
  }

  getOrdersByUserId(userId: string): Order[] {
    return this.data.orders.filter(o => o.userId === userId || o.customer.email.toLowerCase() === userId.toLowerCase());
  }

  createOrder(order: Order): Order {
    this.data.orders.unshift(order);
    // Decrease stock count for ordered products and auto-mark sold out if zero
    for (const item of order.items) {
      const prod = this.getProductById(item.productId);
      if (prod) {
        prod.stockCount = Math.max(0, prod.stockCount - item.quantity);
        if (prod.stockCount === 0) {
          prod.inStock = false;
        }
      }
    }
    // Increment coupon usage count if coupon applied
    if (order.couponCode) {
      const c = this.data.coupons?.find(cp => cp.code.toUpperCase() === order.couponCode?.toUpperCase());
      if (c) c.usageCount = (c.usageCount || 0) + 1;
    }
    this.save();
    return order;
  }

  updateOrderStatus(orderId: string, status: Order['status'], note: string): Order | null {
    const order = this.data.orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;
    order.status = status;
    order.statusHistory.push({
      status,
      timestamp: new Date().toISOString(),
      note
    });
    this.save();
    return order;
  }

  updatePaymentVerification(orderId: string, status: 'verified' | 'rejected', notes?: string): Order | null {
    const order = this.data.orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;
    order.payment.status = status;
    order.payment.verifiedAt = new Date().toISOString();
    if (notes) order.payment.adminNotes = notes;
    if (status === 'verified') {
      order.status = 'Confirmed';
      order.statusHistory.push({
        status: 'Confirmed',
        timestamp: new Date().toISOString(),
        note: `Payment verified by Admin: ${notes || 'Funds confirmed received'}`
      });
    } else {
      order.statusHistory.push({
        status: order.status,
        timestamp: new Date().toISOString(),
        note: `Payment rejected by Admin: ${notes || 'Invalid transaction details'}`
      });
    }
    this.save();
    return order;
  }

  // ---------------- CONTACT & NEWSLETTER ----------------
  addContactMessage(msg: ContactMessage): ContactMessage {
    this.data.contactMessages.unshift(msg);
    this.save();
    return msg;
  }

  getContactMessages(): ContactMessage[] {
    return this.data.contactMessages;
  }

  addNewsletter(email: string): boolean {
    const exists = this.data.newsletterSubscribers.some(s => s.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;
    this.data.newsletterSubscribers.unshift({
      id: `sub-${Date.now()}`,
      email,
      createdAt: new Date().toISOString()
    });
    this.save();
    return true;
  }

  getNewsletterSubscribers(): NewsletterSubscriber[] {
    return this.data.newsletterSubscribers;
  }

  // ---------------- FINANCIAL & ANALYTICS ----------------
  getFinancialAnalytics(): any {
    const orders = this.data.orders;
    const nonCancelled = orders.filter(o => o.status !== 'Cancelled');
    const totalRevenue = nonCancelled.reduce((sum, o) => sum + o.total, 0);

    // Estimated profit margin (42% luxury footwear gross margin calculation)
    const estimatedCost = Math.round(totalRevenue * 0.58);
    const estimatedProfit = Math.round(totalRevenue * 0.42);

    const verifiedRevenue = nonCancelled
      .filter(o => o.payment.status === 'verified' || o.status === 'Delivered')
      .reduce((sum, o) => sum + o.total, 0);

    const pendingRevenue = nonCancelled
      .filter(o => o.payment.status === 'pending')
      .reduce((sum, o) => sum + o.total, 0);

    const averageOrderValue = nonCancelled.length > 0 ? Math.round(totalRevenue / nonCancelled.length) : 0;

    // By payment method
    const paymentBreakdown = {
      jazzcash: orders.filter(o => o.payment.method === 'jazzcash').reduce((sum, o) => sum + o.total, 0),
      easypaisa: orders.filter(o => o.payment.method === 'easypaisa').reduce((sum, o) => sum + o.total, 0),
      cod: orders.filter(o => o.payment.method === 'cod').reduce((sum, o) => sum + o.total, 0),
      bank_transfer: orders.filter(o => o.payment.method === 'bank_transfer').reduce((sum, o) => sum + o.total, 0)
    };

    // Product sales rank
    const productSalesMap = new Map<string, { id: string; name: string; unitsSold: number; revenue: number; image: string }>();
    for (const p of this.data.products) {
      productSalesMap.set(p.id, { id: p.id, name: p.name, unitsSold: 0, revenue: 0, image: p.images[0] });
    }
    for (const o of nonCancelled) {
      for (const item of o.items) {
        let entry = productSalesMap.get(item.productId);
        if (!entry) {
          entry = { id: item.productId, name: item.productName, unitsSold: 0, revenue: 0, image: item.image };
          productSalesMap.set(item.productId, entry);
        }
        entry.unitsSold += item.quantity;
        entry.revenue += item.price * item.quantity;
      }
    }

    const topSellingProducts = Array.from(productSalesMap.values())
      .sort((a, b) => b.unitsSold - a.unitsSold)
      .slice(0, 5);

    return {
      totalRevenue,
      estimatedProfit,
      estimatedCost,
      verifiedRevenue,
      pendingRevenue,
      averageOrderValue,
      totalOrdersCount: orders.length,
      deliveredOrdersCount: orders.filter(o => o.status === 'Delivered').length,
      pendingOrdersCount: orders.filter(o => o.status === 'Pending').length,
      paymentBreakdown,
      topSellingProducts
    };
  }
}

export const db = new Database();
