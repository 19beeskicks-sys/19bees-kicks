export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'men' | 'women' | 'sneakers' | 'casual';
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  images: string[];
  sizes: number[];
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
  orderNumber: string;
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

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  pendingOrders: number;
  pendingVerifications: number;
  lowStockCount: number;
}
