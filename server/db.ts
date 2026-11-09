import fs from 'fs';
import path from 'path';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'men' | 'women' | 'sneakers' | 'casual';
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

export interface DatabaseSchema {
  products: Product[];
  users: User[];
  orders: Order[];
  contactMessages: ContactMessage[];
  newsletterSubscribers: NewsletterSubscriber[];
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

const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    name: '19Bees Admin',
    email: 'admin@19beeskicks.com',
    phone: '+92 328 2158299',
    passwordHash: 'admin123', // In demo full-stack mode, validated securely
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
        image: '/src/assets/images/product_men_sneaker_1794183121675.jpg'
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
        image: '/src/assets/images/product_women_runner_1794183121544.jpg'
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
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error('Error reading database file, initializing fresh:', err);
    }

    const initial: DatabaseSchema = {
      products: INITIAL_PRODUCTS,
      users: INITIAL_USERS,
      orders: INITIAL_ORDERS,
      contactMessages: [],
      newsletterSubscribers: []
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

  // Products
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
    this.data.products[idx] = { ...this.data.products[idx], ...updates };
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

  // Users
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

  updateUser(id: string, updates: Partial<User>): User | null {
    const idx = this.data.users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    this.data.users[idx] = { ...this.data.users[idx], ...updates };
    this.save();
    return this.data.users[idx];
  }

  // Orders
  getOrders(): Order[] {
    return this.data.orders;
  }

  getOrderById(id: string): Order | undefined {
    return this.data.orders.find(o => o.id === id || o.orderNumber.toUpperCase() === id.toUpperCase());
  }

  getOrdersByUserId(userId: string): Order[] {
    return this.data.orders.filter(o => o.userId === userId);
  }

  createOrder(order: Order): Order {
    this.data.orders.unshift(order);
    // Decrease stock count for ordered products
    for (const item of order.items) {
      const prod = this.getProductById(item.productId);
      if (prod) {
        prod.stockCount = Math.max(0, prod.stockCount - item.quantity);
        if (prod.stockCount === 0) prod.inStock = false;
      }
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
        note: `JazzCash payment verified: ${notes || 'Verified by Admin'}`
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

  // Contact
  addContactMessage(msg: ContactMessage): ContactMessage {
    this.data.contactMessages.unshift(msg);
    this.save();
    return msg;
  }

  getContactMessages(): ContactMessage[] {
    return this.data.contactMessages;
  }

  // Newsletter
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
}

export const db = new Database();
