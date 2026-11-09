export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string; // 'men' | 'women' | 'sneakers' | 'casual' or custom category
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
  role: 'customer' | 'admin';
  address?: {
    street: string;
    city: string;
    postalCode: string;
  };
}

export interface CartItem {
  productId: string;
  product: Product;
  size: number;
  color: string;
  quantity: number;
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
  discountType: 'percentage' | 'fixed'; // percentage or fixed PKR
  discountValue: number; // e.g. 10 (%) or 2000 (PKR)
  minPurchase: number; // minimum cart subtotal required
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
  freeShippingThreshold: number; // e.g. 15000 PKR
  standardShippingFee: number; // e.g. 250 PKR
  supportPhone: string;
  supportEmail: string;
  whatsappNumber: string;
  jazzcashAccountTitle: string;
  jazzcashAccountNumber: string;
}

export interface CustomerSummary {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  role: 'customer' | 'admin';
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  pendingOrders: number;
  pendingVerifications: number;
  lowStockCount: number;
  outOfStockCount: number;
  estimatedProfit: number;
  averageOrderValue: number;
}
