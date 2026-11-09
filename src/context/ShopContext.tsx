import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, SiteSettings, Collection, Category, Coupon } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

const DEFAULT_SETTINGS: SiteSettings = {
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

const DEFAULT_COLLECTIONS: Collection[] = [
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

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-1', name: "Men's Footwear", slug: 'men', description: 'Handcrafted luxury sneakers, dress hybrids, and boots for men.' },
  { id: 'cat-2', name: "Women's Footwear", slug: 'women', description: 'Featherlight runners, designer luxury trainers, and slip-ons for women.' },
  { id: 'cat-3', name: 'Designer Sneakers', slug: 'sneakers', description: 'High-end streetwear and sculpted statement sneaker silhouettes.' },
  { id: 'cat-4', name: 'Casual & Loafers', slug: 'casual', description: 'Burnished calfskin casual shoes and hybrid walking loafers.' }
];

interface ShopContextType {
  products: Product[];
  loading: boolean;
  refreshProducts: () => Promise<void>;
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
  // Dynamic Website Customization & Admin State
  siteSettings: SiteSettings;
  refreshSettings: () => Promise<void>;
  collections: Collection[];
  refreshCollections: () => Promise<void>;
  categories: Category[];
  refreshCategories: () => Promise<void>;
  // Coupon System
  appliedCoupon: Coupon | null;
  discountAmount: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  // Dynamic Site Settings, Collections, Categories
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [collections, setCollections] = useState<Collection[]>(DEFAULT_COLLECTIONS);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('19bk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('19bk_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User state
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('19bk_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

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
    } catch (err) {
      console.warn('Backend API not responding; using pre-bundled luxury catalogue data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.settings) setSiteSettings(data.settings);
      }
    } catch {
      // Keep default settings
    }
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
    } catch {
      // Keep default
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
    } catch {
      // Keep default
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSettings();
    fetchCollections();
    fetchCategories();
  }, []);

  const formatPKR = (amount: number): string => {
    return `PKR ${amount.toLocaleString('en-PK')}`;
  };

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

  // Re-evaluate discount if cart changes
  useEffect(() => {
    if (appliedCoupon) {
      if (cartSubtotal < appliedCoupon.minPurchase) {
        setAppliedCoupon(null);
        setDiscountAmount(0);
        showToast(`Coupon removed: Cart below PKR ${appliedCoupon.minPurchase.toLocaleString()}`);
      } else {
        if (appliedCoupon.discountType === 'percentage') {
          setDiscountAmount(Math.round((cartSubtotal * appliedCoupon.discountValue) / 100));
        } else {
          setDiscountAmount(Math.min(appliedCoupon.discountValue, cartSubtotal));
        }
      }
    }
  }, [cartSubtotal, appliedCoupon]);

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal: cartSubtotal })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAppliedCoupon(data.coupon);
        setDiscountAmount(data.discount);
        showToast(data.message);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || 'Invalid coupon code' };
    } catch {
      // Offline fallback
      const clean = code.toUpperCase().trim();
      if (clean === 'WELCOME10') {
        const disc = Math.round((cartSubtotal * 10) / 100);
        setDiscountAmount(disc);
        setAppliedCoupon({ id: 'cp-1', code: 'WELCOME10', discountType: 'percentage', discountValue: 10, minPurchase: 0, isActive: true, usageCount: 1 });
        showToast(`Promo Applied: 10% Off (-PKR ${disc.toLocaleString()})`);
        return { success: true, message: '10% discount applied!' };
      }
      return { success: false, message: 'Coupon code not found' };
    }
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

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        showToast(`Welcome back, ${data.user.name}`);
        return { success: true };
      }
      return { success: false, message: data.message || 'Login failed' };
    } catch {
      // Offline fallback for pre-seeded accounts
      const lowerEmail = email.toLowerCase().trim();
      if (lowerEmail === '19beeskicks@gmail.com' && password === 'samad123') {
        const u: User = { id: 'user-samad', name: 'Abdul Samad', email: '19beeskicks@gmail.com', phone: '+92 328 2158299', role: 'admin' };
        setUser(u);
        showToast('Logged in as Master Administrator');
        return { success: true };
      }
      if (lowerEmail === 'admin@19beeskicks.com' && password === 'admin123') {
        const u: User = { id: 'user-admin', name: '19Bees Admin', email: 'admin@19beeskicks.com', phone: '+92 328 2158299', role: 'admin' };
        setUser(u);
        showToast('Logged in as Administrator');
        return { success: true };
      }
      if (lowerEmail === 'hamza.khan@gmail.com' && password === 'password123') {
        const u: User = {
          id: 'user-demo-customer',
          name: 'Hamza Khan',
          email: 'hamza.khan@gmail.com',
          phone: '+92 300 1234567',
          role: 'customer',
          address: { street: 'House 42, Street 8, Phase 5, DHA', city: 'Lahore', postalCode: '54000' }
        };
        setUser(u);
        showToast('Logged in as Demo Customer');
        return { success: true };
      }
      return { success: false, message: 'Invalid email or password' };
    }
  };

  const register = async (userData: any) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        showToast(`Account created! Welcome, ${data.user.name}`);
        return { success: true };
      }
      return { success: false, message: data.message || 'Registration failed' };
    } catch {
      const u: User = {
        id: `user-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        role: 'customer',
        address: userData.address
      };
      setUser(u);
      showToast(`Welcome, ${userData.name}`);
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    showToast('You have been signed out');
    if (currentPage === 'admin' || currentPage === 'profile' || currentPage === 'orders') {
      setCurrentPage('home');
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        loading,
        refreshProducts: fetchProducts,
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
        siteSettings,
        refreshSettings: fetchSettings,
        collections,
        refreshCollections: fetchCollections,
        categories,
        refreshCategories: fetchCategories,
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
