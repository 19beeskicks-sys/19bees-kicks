import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, SiteSettings, Collection, Category, Coupon } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

const DEFAULT_SETTINGS: SiteSettings = {
  announcementText: 'Complimentary Express Shipping Across Pakistan On Orders Over PKR 15,000',
  heroTag: 'The 2026 Sovereign Edition',
  heroTitle: 'STEP INTO YOUR STYLE.',
  heroDescription: 'Discover the perfect balance of modern design, everyday comfort, and timeless style. Handcrafted with imported leathers for the discerning connoisseur.',
  heroImage: './images/hero_luxury_sneaker_1794183121618.jpg',
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

const DEFAULT_COLLECTIONS: Collection[] = [
  {
    id: 'col-1',
    title: "Men's Collection",
    slug: 'men',
    tag: 'men',
    subtitle: 'Architectural silhouettes & calfskin leather',
    description: 'Impeccable craftsmanship and Italian leather tailoring for the modern gentleman.',
    image: './images/product_men_sneaker_1794183121675.jpg'
  },
  {
    id: 'col-2',
    title: "Women's Collection",
    slug: 'women',
    tag: 'women',
    subtitle: 'Featherlight runners & champagne tones',
    description: 'Ultra-refined feminine luxury designed for comfort and elevated daily presence.',
    image: './images/product_women_runner_1794183121544.jpg'
  },
  {
    id: 'col-3',
    title: 'Designer Sneakers',
    slug: 'sneakers',
    tag: 'sneakers',
    subtitle: 'Contemporary sculptural luxury street style',
    description: 'Avant-garde platform soles and contrasting texture panelling.',
    image: './images/hero_luxury_sneaker_1794183121618.jpg'
  },
  {
    id: 'col-4',
    title: 'Casual & Hybrids',
    slug: 'casual',
    tag: 'casual',
    subtitle: 'Hand-burnished leather & sneaker comfort',
    description: 'Blake-stitched loafers blended seamlessly with shock-absorbing sneaker treads.',
    image: './images/product_casual_loafers_1794183123383.jpg'
  },
  {
    id: 'col-5',
    title: 'New Arrivals',
    slug: 'newarrivals',
    tag: 'newarrivals',
    subtitle: 'Limited-edition artisan releases',
    description: 'The newest handcrafted releases fresh from the 19Bees atelier.',
    image: './images/product_men_sneaker_1794183121675.jpg'
  },
  {
    id: 'col-6',
    title: 'Best Sellers',
    slug: 'bestsellers',
    tag: 'bestsellers',
    subtitle: 'Most coveted footwear silhouettes',
    description: 'Our most sought-after shoes celebrated for unmatched comfort and style.',
    image: './images/product_women_runner_1794183121544.jpg'
  }
];

const DEFAULT_CATEGORIES: Category[] = [
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

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: '19BK-2026-8491',
    customer: {
      fullName: 'Tariq Mehmood',
      email: 'tariq.mehmood@gmail.com',
      phone: '0300 1234567',
      address: 'House 42, Street 8, Phase 5, DHA',
      city: 'Lahore',
      postalCode: '54000',
      notes: 'Call before arrival'
    },
    items: [
      {
        productId: 'prod-1',
        productName: 'The Sovereign Low Obsidian',
        price: 18500,
        size: 42,
        color: 'Obsidian Black',
        quantity: 1,
        image: './images/product_men_sneaker_1794183121675.jpg'
      },
      {
        productId: 'prod-3',
        productName: 'Eline Champagne Runner',
        price: 19800,
        size: 38,
        color: 'Champagne Cream',
        quantity: 1,
        image: './images/product_women_runner_1794183121544.jpg'
      }
    ],
    subtotal: 38300,
    shipping: 0,
    total: 38300,
    payment: {
      method: 'jazzcash',
      status: 'pending',
      accountTitle: 'Abdul Samad',
      accountNumber: '03238917805',
      transactionId: '018491823901',
      adminNotes: 'Awaiting manual verification against statement 03238917805'
    },
    status: 'Pending',
    statusHistory: [
      { status: 'Pending', timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), note: 'Order logged with JazzCash TID 018491823901' }
    ],
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'ord-2',
    orderNumber: '19BK-2026-4120',
    customer: {
      fullName: 'Bilal Ahmed',
      email: 'bilal.ahmed@hotmail.com',
      phone: '0321 9876543',
      address: 'Apartment 4B, Creek Vistas, Phase 8, DHA',
      city: 'Karachi',
      postalCode: '75500'
    },
    items: [
      {
        productId: 'prod-2',
        productName: 'Aethel Travertine Runner',
        price: 24500,
        size: 43,
        color: 'Travertine Sand & Black',
        quantity: 1,
        image: './images/hero_luxury_sneaker_1794183121618.jpg'
      }
    ],
    subtotal: 24500,
    shipping: 0,
    total: 24500,
    payment: {
      method: 'cod',
      status: 'verified',
      adminNotes: 'Doorstep cash on delivery confirmed'
    },
    status: 'Confirmed',
    statusHistory: [
      { status: 'Confirmed', timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), note: 'Address verified via phone' }
    ],
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'ord-3',
    orderNumber: '19BK-2026-1932',
    customer: {
      fullName: 'Zainab Tariq',
      email: 'zainab.t@yahoo.com',
      phone: '0333 5551234',
      address: 'House 19, Sector F-7/2',
      city: 'Islamabad',
      postalCode: '44000'
    },
    items: [
      {
        productId: 'prod-3',
        productName: 'Eline Champagne Runner',
        price: 19800,
        size: 37,
        color: 'Champagne Cream',
        quantity: 1,
        image: './images/product_women_runner_1794183121544.jpg'
      }
    ],
    subtotal: 19800,
    shipping: 0,
    total: 19800,
    payment: {
      method: 'jazzcash',
      status: 'verified',
      transactionId: '098127364512',
      adminNotes: 'JazzCash payment verified by Abdul Samad'
    },
    status: 'Delivered',
    statusHistory: [
      { status: 'Delivered', timestamp: new Date(Date.now() - 3600000 * 72).toISOString(), note: 'Delivered via Express courier' }
    ],
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
  }
];

interface ShopContextType {
  products: Product[];
  loading: boolean;
  refreshProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<boolean>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  updateProductStock: (id: string, stockCount: number) => Promise<boolean>;

  categories: Category[];
  refreshCategories: () => Promise<void>;
  addCategory: (cat: Category) => Promise<boolean>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;

  collections: Collection[];
  refreshCollections: () => Promise<void>;
  addCollection: (col: Collection) => Promise<boolean>;
  updateCollection: (id: string, updates: Partial<Collection>) => Promise<boolean>;
  deleteCollection: (id: string) => Promise<boolean>;

  orders: Order[];
  refreshOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status'], note?: string) => Promise<boolean>;
  verifyOrderPayment: (orderId: string, status: 'verified' | 'rejected', notes?: string) => Promise<boolean>;

  coupons: Coupon[];
  refreshCoupons: () => Promise<void>;
  addCoupon: (cp: Coupon) => Promise<boolean>;
  updateCoupon: (id: string, updates: Partial<Coupon>) => Promise<boolean>;
  deleteCoupon: (id: string) => Promise<boolean>;

  siteSettings: SiteSettings;
  refreshSettings: () => Promise<void>;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<boolean>;
  resetDemoCatalog: () => void;

  cart: CartItem[];
  addToCart: (product: Product, size: number, color: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, size: number, color: string, quantity: number) => void;
  removeFromCart: (productId: string, size: number, color: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: any) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;

  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedProductId: string | null;
  viewProduct: (idOrSlug: string) => void;
  activeTrackingOrder: string | null;
  setActiveTrackingOrder: (orderNumber: string | null) => void;
  formatPKR: (amount: number) => string;
  toast: string | null;
  showToast: (msg: string) => void;
  selectedCollection: string | null;
  setSelectedCollection: (col: string | null) => void;

  appliedCoupon: Coupon | null;
  discountAmount: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // PRODUCTS
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('19bk_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_PRODUCTS;
  });

  // CATEGORIES
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('19bk_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_CATEGORIES;
  });

  // COLLECTIONS
  const [collections, setCollections] = useState<Collection[]>(() => {
    try {
      const saved = localStorage.getItem('19bk_collections');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_COLLECTIONS;
  });

  // ORDERS
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('19bk_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_ORDERS;
  });

  // COUPONS
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('19bk_coupons');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_COUPONS;
  });

  // SITE SETTINGS
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('19bk_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch {}
    return DEFAULT_SETTINGS;
  });

  // LOADING & APP STATE
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  // CART
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('19bk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // WISHLIST
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('19bk_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // USER AUTH (Only 19beeskicks@gmail.com can be Admin)
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('19bk_user');
      if (saved) {
        const u = JSON.parse(saved);
        // Enforce strict security: only 19beeskicks@gmail.com can have admin privileges
        if (u && u.email && u.email.toLowerCase() === '19beeskicks@gmail.com') {
          return { ...u, role: 'admin' };
        } else if (u) {
          return { ...u, role: 'customer' };
        }
      }
    } catch {}
    return null;
  });

  // COUPON DISCOUNT IN CART
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // PERSISTENCE EFFECT TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('19bk_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('19bk_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('19bk_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('19bk_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('19bk_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('19bk_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('19bk_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('19bk_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('19bk_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('19bk_user');
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // SYNC FROM BACKEND API IF AVAILABLE
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      }
    } catch {
      // Backend not running (e.g. GitHub Pages) - uses state/localStorage
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.categories) && data.categories.length > 0) {
          setCategories(data.categories);
        }
      }
    } catch {}
  };

  const fetchCollections = async () => {
    try {
      const res = await fetch('/api/collections');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.collections) && data.collections.length > 0) {
          setCollections(data.collections);
        }
      }
    } catch {}
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.orders) && data.orders.length > 0) {
          setOrders(data.orders);
        }
      }
    } catch {}
  };

  const fetchCoupons = async () => {
    try {
      const res = await fetch('/api/coupons');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.coupons) && data.coupons.length > 0) {
          setCoupons(data.coupons);
        }
      }
    } catch {}
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.settings) setSiteSettings(data.settings);
      }
    } catch {}
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCollections();
    fetchOrders();
    fetchCoupons();
    fetchSettings();
  }, []);

  // HYBRID CRUD: PRODUCTS
  const addProduct = async (prod: Product): Promise<boolean> => {
    setProducts(prev => [prod, ...prev.filter(p => p.id !== prod.id)]);
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prod)
      });
    } catch {}
    return true;
  };

  const updateProduct = async (id: string, updates: Partial<Product>): Promise<boolean> => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    return true;
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    setProducts(prev => prev.filter(p => p.id !== id));
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch {}
    return true;
  };

  const updateProductStock = async (id: string, stockCount: number): Promise<boolean> => {
    const validCount = Math.max(0, stockCount);
    const inStock = validCount > 0;
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, stockCount: validCount, inStock } : p))
    );
    try {
      await fetch(`/api/products/${id}/stock`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stockCount: validCount })
      });
    } catch {}
    return true;
  };

  // HYBRID CRUD: CATEGORIES
  const addCategory = async (cat: Category): Promise<boolean> => {
    setCategories(prev => [cat, ...prev.filter(c => c.id !== cat.id && c.slug !== cat.slug)]);
    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cat)
      });
    } catch {}
    return true;
  };

  const updateCategory = async (id: string, updates: Partial<Category>): Promise<boolean> => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    try {
      await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    return true;
  };

  const deleteCategory = async (id: string): Promise<boolean> => {
    setCategories(prev => prev.filter(c => c.id !== id));
    try {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    } catch {}
    return true;
  };

  // HYBRID CRUD: COLLECTIONS
  const addCollection = async (col: Collection): Promise<boolean> => {
    setCollections(prev => [col, ...prev.filter(c => c.id !== col.id && c.slug !== col.slug)]);
    try {
      await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(col)
      });
    } catch {}
    return true;
  };

  const updateCollection = async (id: string, updates: Partial<Collection>): Promise<boolean> => {
    setCollections(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    try {
      await fetch(`/api/collections/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    return true;
  };

  const deleteCollection = async (id: string): Promise<boolean> => {
    setCollections(prev => prev.filter(c => c.id !== id));
    try {
      await fetch(`/api/collections/${id}`, { method: 'DELETE' });
    } catch {}
    return true;
  };

  // HYBRID CRUD: ORDERS
  const updateOrderStatus = async (orderId: string, status: Order['status'], note?: string): Promise<boolean> => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          const newHistory = [
            ...o.statusHistory,
            { status, timestamp: new Date().toISOString(), note: note || `Status updated to ${status}` }
          ];
          return { ...o, status, statusHistory: newHistory };
        }
        return o;
      })
    );
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, note })
      });
    } catch {}
    return true;
  };

  const verifyOrderPayment = async (orderId: string, status: 'verified' | 'rejected', notes?: string): Promise<boolean> => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            payment: {
              ...o.payment,
              status,
              verifiedAt: status === 'verified' ? new Date().toISOString() : undefined,
              adminNotes: notes || (status === 'verified' ? 'Payment confirmed by Abdul Samad' : 'Payment rejected')
            }
          };
        }
        return o;
      })
    );
    try {
      await fetch(`/api/orders/${orderId}/verify-payment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes: notes })
      });
    } catch {}
    return true;
  };

  // HYBRID CRUD: COUPONS
  const addCoupon = async (cp: Coupon): Promise<boolean> => {
    setCoupons(prev => [cp, ...prev.filter(c => c.id !== cp.id)]);
    try {
      await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cp)
      });
    } catch {}
    return true;
  };

  const updateCoupon = async (id: string, updates: Partial<Coupon>): Promise<boolean> => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    try {
      await fetch(`/api/coupons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    return true;
  };

  const deleteCoupon = async (id: string): Promise<boolean> => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    try {
      await fetch(`/api/coupons/${id}`, { method: 'DELETE' });
    } catch {}
    return true;
  };

  // HYBRID SETTINGS
  const updateSiteSettings = async (updates: Partial<SiteSettings>): Promise<boolean> => {
    setSiteSettings(prev => ({ ...prev, ...updates }));
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    return true;
  };

  // FORMAT PKR
  const formatPKR = (amount: number) => {
    return `PKR ${amount.toLocaleString('en-PK')}`;
  };

  // CART LOGIC
  const addToCart = (product: Product, size: number, color: string, quantity = 1) => {
    if (!product.inStock || product.stockCount === 0) {
      showToast(`${product.name} is currently Sold Out.`);
      return;
    }

    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.productId === product.id && item.size === size && item.color === color
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { productId: product.id, product, size, color, quantity }];
      }
    });
    showToast(`Added ${product.name} (Size ${size}) to cart`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, size: number, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.productId === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, size: number, color: string) => {
    setCart(prev =>
      prev.filter(
        item => !(item.productId === productId && item.size === size && item.color === color)
      )
    );
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // COUPON VALIDATION
  const applyCoupon = async (code: string) => {
    const cleanCode = code.toUpperCase().trim();
    const found = coupons.find(c => c.code === cleanCode && c.isActive);

    if (!found) {
      showToast('Invalid or expired coupon code');
      return { success: false, message: 'Invalid or expired coupon code' };
    }

    if (cartSubtotal < found.minPurchase) {
      const msg = `Minimum purchase of ${formatPKR(found.minPurchase)} required for coupon ${cleanCode}`;
      showToast(msg);
      return { success: false, message: msg };
    }

    let calculatedDiscount = 0;
    if (found.discountType === 'percentage') {
      calculatedDiscount = Math.round((cartSubtotal * found.discountValue) / 100);
    } else {
      calculatedDiscount = Math.min(found.discountValue, cartSubtotal);
    }

    setAppliedCoupon(found);
    setDiscountAmount(calculatedDiscount);
    showToast(`Coupon ${cleanCode} applied! Saved ${formatPKR(calculatedDiscount)}`);
    return { success: true, message: 'Coupon applied successfully' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    showToast('Coupon code removed');
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from wishlist`);
        return prev.filter(p => p.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to wishlist`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const viewProduct = (idOrSlug: string) => {
    setSelectedProductId(idOrSlug);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // STRICT SINGLE-ADMIN AUTHENTICATION GATE
  const login = async (email: string, password: string) => {
    const cleanEmail = email.toLowerCase().trim();

    // 1. Check if backend API responds
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password })
      });
      const data = await res.json();
      if (res.ok && data.success && data.user) {
        // Enforce: only 19beeskicks@gmail.com has admin role
        const role = cleanEmail === '19beeskicks@gmail.com' ? 'admin' : 'customer';
        const authenticatedUser: User = { ...data.user, role };
        setUser(authenticatedUser);
        showToast(`Welcome back, ${authenticatedUser.name}`);
        return { success: true };
      }
    } catch {}

    // 2. Client-side authentication & fallback
    // SINGLE AUTHORIZED ADMIN ACCOUNT
    if (cleanEmail === '19beeskicks@gmail.com' && (password === 'samad123' || password === 'password123')) {
      const adminUser: User = {
        id: 'user-samad-master',
        name: 'Abdul Samad',
        email: '19beeskicks@gmail.com',
        phone: '+92 328 2158299',
        role: 'admin'
      };
      setUser(adminUser);
      showToast('Master Administrator verified.');
      return { success: true };
    }

    // Check registered customers in localStorage
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('19bk_all_users') || '[]');
      const match = registeredUsers.find(
        (u: any) => u.email.toLowerCase() === cleanEmail && u.password === password
      );
      if (match) {
        const customerUser: User = {
          id: match.id,
          name: match.name,
          email: match.email,
          phone: match.phone || '',
          role: 'customer', // strictly customer
          address: match.address
        };
        setUser(customerUser);
        showToast(`Welcome back, ${match.name}`);
        return { success: true };
      }
    } catch {}

    return { success: false, message: 'Invalid credentials. Access restricted.' };
  };

  const register = async (userData: any) => {
    const cleanEmail = userData.email.toLowerCase().trim();
    const isMasterAdmin = cleanEmail === '19beeskicks@gmail.com';

    // Only 19beeskicks@gmail.com gets admin role, all other accounts are strictly customers
    const newCustomer: User = {
      id: isMasterAdmin ? 'user-samad-master' : `user-${Date.now()}`,
      name: userData.name || (isMasterAdmin ? 'Abdul Samad' : 'Client'),
      email: cleanEmail,
      phone: userData.phone || '',
      role: isMasterAdmin ? 'admin' : 'customer',
      address: userData.address
    };

    // Save in local users store
    try {
      const existing = JSON.parse(localStorage.getItem('19bk_all_users') || '[]');
      existing.push({ ...newCustomer, password: userData.password });
      localStorage.setItem('19bk_all_users', JSON.stringify(existing));
    } catch {}

    // Also attempt backend registration
    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
    } catch {}

    setUser(newCustomer);
    showToast(`Account created! Welcome, ${newCustomer.name}`);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out successfully');
    if (currentPage === 'admin' || currentPage === 'profile' || currentPage === 'orders') {
      setCurrentPage('home');
    }
  };

  const resetDemoCatalog = () => {
    localStorage.removeItem('19bk_products');
    localStorage.removeItem('19bk_categories');
    localStorage.removeItem('19bk_collections');
    localStorage.removeItem('19bk_orders');
    localStorage.removeItem('19bk_coupons');
    localStorage.removeItem('19bk_settings');
    setProducts(INITIAL_PRODUCTS);
    setCategories(DEFAULT_CATEGORIES);
    setCollections(DEFAULT_COLLECTIONS);
    setOrders(INITIAL_ORDERS);
    setCoupons(INITIAL_COUPONS);
    setSiteSettings(DEFAULT_SETTINGS);
    showToast('Store catalog & demonstration data successfully re-initialized.');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        loading,
        refreshProducts: fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        updateProductStock,

        categories,
        refreshCategories: fetchCategories,
        addCategory,
        updateCategory,
        deleteCategory,

        collections,
        refreshCollections: fetchCollections,
        addCollection,
        updateCollection,
        deleteCollection,

        orders,
        refreshOrders: fetchOrders,
        updateOrderStatus,
        verifyOrderPayment,

        coupons,
        refreshCoupons: fetchCoupons,
        addCoupon,
        updateCoupon,
        deleteCoupon,

        siteSettings,
        refreshSettings: fetchSettings,
        updateSiteSettings,
        resetDemoCatalog,

        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,

        wishlist,
        toggleWishlist,
        isInWishlist,

        user,
        login,
        register,
        logout,

        currentPage,
        setCurrentPage: (p: string) => {
          setCurrentPage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        selectedProductId,
        viewProduct,
        activeTrackingOrder,
        setActiveTrackingOrder,
        formatPKR,
        toast,
        showToast,
        selectedCollection,
        setSelectedCollection,

        appliedCoupon,
        discountAmount,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
