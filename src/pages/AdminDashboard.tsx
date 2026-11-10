import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, Order, Collection, Category, Coupon, SiteSettings, CustomerSummary } from '../types';
import {
  ShieldCheck,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  Search,
  Plus,
  Trash2,
  Edit,
  CreditCard,
  Tag,
  Sliders,
  Mail,
  ExternalLink,
  Lock,
  Layers,
  Save,
  LogOut,
  TrendingUp,
  Percent
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    user,
    login,
    logout,
    setCurrentPage,
    formatPKR,
    showToast,
    siteSettings,
    updateSiteSettings,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductStock,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    collections,
    addCollection,
    updateCollection,
    deleteCollection,
    orders,
    updateOrderStatus,
    verifyOrderPayment,
    coupons,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    resetDemoCatalog
  } = useShop();

  // Active Management Tab
  const [activeTab, setActiveTab] = useState<
    | 'kpis'
    | 'products'
    | 'inventory'
    | 'orders'
    | 'payments'
    | 'customers'
    | 'collections'
    | 'categories'
    | 'coupons'
    | 'settings'
    | 'inquiries'
  >('kpis');

  // Search & Filter States
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [inventoryFilter, setInventoryFilter] = useState<'all' | 'low' | 'out'>('all');
  const [customerSearch, setCustomerSearch] = useState('');

  // Modals States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);
  const [verifyingOrder, setVerifyingOrder] = useState<Order | null>(null);
  const [adminNote, setAdminNote] = useState('');

  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState<Order[] | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<CustomerSummary | null>(null);

  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // Admin Login Gate States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Site Settings Form State
  const [settingsForm, setSettingsForm] = useState<SiteSettings>({ ...siteSettings });

  // STRICT ACCESS CONTROL: Only 19beeskicks@gmail.com with admin role
  const isMasterAdmin =
    user &&
    user.role === 'admin' &&
    user.email.toLowerCase() === '19beeskicks@gmail.com';

  // Quick Admin Login
  const handleQuickLogin = async (email: string, pass: string) => {
    setLoginSubmitting(true);
    setLoginError('');
    const res = await login(email, pass);
    if (!res.success) {
      setLoginError(res.message || 'Login failed');
    } else {
      showToast('Admin access verified. Welcome, Abdul Samad.');
    }
    setLoginSubmitting(false);
  };

  const handleAdminLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter both email and password');
      return;
    }
    handleQuickLogin(loginEmail, loginPassword);
  };

  // -------------------------------------------------------------
  // ACCESS CONTROL GATE (If not logged in as the master admin)
  // -------------------------------------------------------------
  if (!isMasterAdmin) {
    // If a regular customer is logged in, show access denied
    if (user && user.email.toLowerCase() !== '19beeskicks@gmail.com') {
      return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#F8F8F6]">
          <div className="max-w-md w-full bg-white border border-[#EEEEEC] p-8 sm:p-10 shadow-xl space-y-6 text-center">
            <div className="w-14 h-14 bg-rose-50 text-rose-700 rounded-full flex items-center justify-center mx-auto mb-2 border border-rose-200">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-rose-700 font-bold">
              Access Restricted
            </span>
            <h1 className="text-2xl font-serif-luxury font-bold text-[#111111]">
              Administrator Privileges Required
            </h1>
            <p className="text-xs text-neutral-600 leading-relaxed">
              You are currently signed in as <strong>{user.name}</strong> ({user.email}). Regular customer accounts do not have permission to view or manage the 19BeesKicks Operations Center.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setCurrentPage('home')}
                className="flex-1 bg-[#111111] text-white py-3 text-xs uppercase font-bold hover:bg-[#333333] cursor-pointer"
              >
                Go to Storefront
              </button>
              <button
                onClick={logout}
                className="flex-1 border border-[#EEEEEC] text-neutral-700 py-3 text-xs uppercase font-bold hover:bg-neutral-50 cursor-pointer"
              >
                Switch Account
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Unauthenticated Admin Login Portal
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#F8F8F6]">
        <div className="max-w-md w-full bg-white border border-[#EEEEEC] p-8 sm:p-10 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#111111] text-[#D8C7AE] rounded-full flex items-center justify-center mx-auto mb-3 shadow">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C7A5E] font-bold">
              Authorized Personnel Only
            </span>
            <h1 className="text-2xl font-serif-luxury font-bold text-[#111111]">
              Admin Authentication
            </h1>
            <p className="text-xs text-neutral-500">
              Enter administrator credentials to access footwear catalog, stock, orders, and financial controls.
            </p>
          </div>

          {loginError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLoginForm} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="19beeskicks@gmail.com"
                className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
              />
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full bg-[#111111] text-white py-3 text-xs uppercase tracking-widest font-bold hover:bg-[#333333] transition-colors cursor-pointer shadow disabled:opacity-50"
            >
              {loginSubmitting ? 'Verifying...' : 'Unlock Admin Operations'}
            </button>
          </form>

          {/* Quick 1-Click Master Access */}
          <div className="pt-4 border-t border-[#EEEEEC] space-y-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 block text-center">
              Authorized Owner Access
            </span>
            <button
              type="button"
              onClick={() => handleQuickLogin('19beeskicks@gmail.com', 'samad123')}
              className="w-full bg-[#FAF8F5] border border-[#D8C7AE] p-3 text-left text-xs hover:bg-[#F2ECE1] transition-colors flex items-center justify-between cursor-pointer"
            >
              <div>
                <div className="font-bold text-[#111111]">19beeskicks@gmail.com</div>
                <div className="text-[10px] text-neutral-500">Master Administrator (Abdul Samad)</div>
              </div>
              <span className="text-[10px] font-bold text-[#8C7A5E] uppercase tracking-wider">Login →</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setCurrentPage('home')}
              className="text-xs text-neutral-500 hover:text-black transition-colors underline cursor-pointer"
            >
              ← Return to 19BeesKicks Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // COMPUTED LIVE FINANCIALS & KPIS
  // -------------------------------------------------------------
  const grossRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const estimatedProfit = Math.round(grossRevenue * 0.6);
  const totalOrdersCount = orders.length;
  const averageOrderVal = totalOrdersCount > 0 ? Math.round(grossRevenue / totalOrdersCount) : 0;
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;
  const pendingVerificationsCount = orders.filter(
    o => o.payment.method === 'jazzcash' && o.payment.status === 'pending'
  ).length;
  const lowStockCount = products.filter(p => p.stockCount > 0 && p.stockCount <= 5).length;
  const outOfStockCount = products.filter(p => p.stockCount === 0 || !p.inStock).length;

  // DERIVE AGGREGATE CUSTOMERS DIRECTORY
  const customerMap = new Map<string, CustomerSummary>();
  orders.forEach(ord => {
    const key = ord.customer.phone || ord.customer.email;
    const existing = customerMap.get(key);
    if (existing) {
      existing.totalOrders += 1;
      existing.totalSpent += ord.total;
      if (new Date(ord.createdAt) > new Date(existing.lastOrderDate)) {
        existing.lastOrderDate = ord.createdAt;
      }
    } else {
      customerMap.set(key, {
        id: `cust-${key.replace(/[^a-zA-Z0-9]/g, '')}`,
        name: ord.customer.fullName,
        email: ord.customer.email,
        phone: ord.customer.phone,
        city: ord.customer.city,
        totalOrders: 1,
        totalSpent: ord.total,
        lastOrderDate: ord.createdAt,
        role: 'customer'
      });
    }
  });
  const customerList = Array.from(customerMap.values());

  // FILTERS
  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter !== 'all' && o.status.toLowerCase() !== orderStatusFilter.toLowerCase()) {
      return false;
    }
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.phone.toLowerCase().includes(q) ||
        o.customer.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredProducts = products.filter(p => {
    if (productCategoryFilter !== 'all' && p.category.toLowerCase() !== productCategoryFilter.toLowerCase()) {
      return false;
    }
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.colors.some(c => c.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const filteredInventory = products.filter(p => {
    if (inventoryFilter === 'low') return p.stockCount > 0 && p.stockCount <= 5;
    if (inventoryFilter === 'out') return p.stockCount === 0 || !p.inStock;
    return true;
  });

  const filteredCustomers = customerList.filter(c => {
    if (!customerSearch.trim()) return true;
    const q = customerSearch.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q)
    );
  });

  // -------------------------------------------------------------
  // CRUD HANDLERS
  // -------------------------------------------------------------
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (!editingProduct.name.trim()) {
      showToast('Please enter a product name');
      return;
    }

    const isNew = !editingProduct.id || editingProduct.id.startsWith('new-');
    const slug = editingProduct.slug || editingProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `prod-${Date.now()}`;
    const price = Math.max(0, Number(editingProduct.price) || 0);
    const stockCount = Math.max(0, Number(editingProduct.stockCount) || 0);

    const finalProduct: Product = {
      ...editingProduct,
      id: isNew ? `prod-${Date.now()}` : editingProduct.id,
      name: editingProduct.name.trim(),
      slug,
      price,
      originalPrice: editingProduct.originalPrice ? Number(editingProduct.originalPrice) : undefined,
      stockCount,
      inStock: stockCount > 0,
      category: editingProduct.category || categories[0]?.slug || 'men',
      images: editingProduct.images && editingProduct.images.length > 0 && editingProduct.images[0]?.trim()
        ? editingProduct.images
        : ['./images/hero_luxury_sneaker_1794183121618.jpg'],
      sizes: editingProduct.sizes && editingProduct.sizes.length > 0
        ? editingProduct.sizes
        : [39, 40, 41, 42, 43, 44, 45],
      colors: editingProduct.colors && editingProduct.colors.length > 0
        ? editingProduct.colors
        : ['Obsidian Black'],
      details: editingProduct.details && editingProduct.details.length > 0
        ? editingProduct.details
        : ['Handcrafted imported leather', 'Orthopedic memory foam insole', 'Blake-stitched Italian sole'],
      rating: editingProduct.rating || 5.0,
      reviewCount: editingProduct.reviewCount || 0,
      createdAt: editingProduct.createdAt || new Date().toISOString()
    };

    if (isNew) {
      await addProduct(finalProduct);
      showToast(`Product "${finalProduct.name}" added to catalog successfully!`);
    } else {
      await updateProduct(finalProduct.id, finalProduct);
      showToast(`Product "${finalProduct.name}" updated successfully!`);
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from the store catalog?`)) return;
    await deleteProduct(id);
    showToast(`Product "${name}" deleted.`);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    if (!editingCategory.name.trim()) {
      showToast('Please enter category name');
      return;
    }

    const isNew = !editingCategory.id || editingCategory.id.startsWith('new-');
    const slug = editingCategory.slug || editingCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `cat-${Date.now()}`;
    const finalCategory: Category = {
      id: isNew ? `cat-${Date.now()}` : editingCategory.id,
      name: editingCategory.name.trim(),
      slug,
      description: editingCategory.description?.trim() || ''
    };

    if (isNew) {
      await addCategory(finalCategory);
      showToast(`Category "${finalCategory.name}" created successfully!`);
    } else {
      await updateCategory(finalCategory.id, finalCategory);
      showToast(`Category "${finalCategory.name}" updated successfully!`);
    }

    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;
    await deleteCategory(id);
    showToast(`Category "${name}" deleted.`);
  };

  const handleSaveCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCollection) return;

    const isNew = !editingCollection.id || editingCollection.id.startsWith('new-');
    const finalCol: Collection = {
      ...editingCollection,
      id: isNew ? `col-${Date.now()}` : editingCollection.id,
      slug: editingCollection.slug || editingCollection.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    };

    if (isNew) {
      await addCollection(finalCol);
      showToast(`Collection "${finalCol.title}" created successfully!`);
    } else {
      await updateCollection(finalCol.id, finalCol);
      showToast(`Collection "${finalCol.title}" updated!`);
    }

    setIsCollectionModalOpen(false);
    setEditingCollection(null);
  };

  const handleDeleteCollection = async (id: string, title: string) => {
    if (!window.confirm(`Delete collection "${title}"?`)) return;
    await deleteCollection(id);
    showToast(`Collection "${title}" deleted.`);
  };

  const handleSaveCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoupon) return;

    const isNew = !editingCoupon.id || editingCoupon.id.startsWith('new-');
    const finalCp: Coupon = {
      ...editingCoupon,
      id: isNew ? `cp-${Date.now()}` : editingCoupon.id,
      code: editingCoupon.code.toUpperCase().trim(),
      discountValue: Number(editingCoupon.discountValue),
      minPurchase: Number(editingCoupon.minPurchase || 0)
    };

    if (isNew) {
      await addCoupon(finalCp);
      showToast(`Coupon "${finalCp.code}" created successfully!`);
    } else {
      await updateCoupon(finalCp.id, finalCp);
      showToast(`Coupon "${finalCp.code}" updated!`);
    }

    setIsCouponModalOpen(false);
    setEditingCoupon(null);
  };

  const handleDeleteCoupon = async (id: string, code: string) => {
    if (!window.confirm(`Delete coupon "${code}"?`)) return;
    await deleteCoupon(id);
    showToast(`Coupon "${code}" deleted.`);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteSettings(settingsForm);
    showToast('Storefront content, shipping rules, and JazzCash details saved successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* TOP EXECUTIVE BANNER (Cleaned without Download ZIP) */}
      <div className="bg-[#111111] text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl border border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D8C7AE] font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Master Administration Terminal · Full Database Access</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold mt-1">
            19BeesKicks Operations Center
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Logged in as <strong>{user?.name || 'Abdul Samad'}</strong> ({user?.email}) · Instant live sync to customer storefront
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setEditingProduct({
                id: `new-${Date.now()}`,
                name: '',
                slug: '',
                category: categories[0]?.slug || 'men',
                price: 18500,
                originalPrice: 22000,
                description: '',
                details: ['Handcrafted imported leather', 'Orthopedic memory foam insole', 'Blake-stitched Italian sole'],
                images: ['./images/hero_luxury_sneaker_1794183121618.jpg'],
                sizes: [39, 40, 41, 42, 43, 44, 45],
                colors: ['Obsidian Black', 'Travertine Beige'],
                inStock: true,
                stockCount: 12,
                isBestSeller: false,
                isNewArrival: true,
                rating: 5.0,
                reviewCount: 0,
                createdAt: new Date().toISOString()
              });
              setIsProductModalOpen(true);
            }}
            className="bg-[#D8C7AE] text-[#111111] px-4 py-2 text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add Footwear</span>
          </button>
          <button
            onClick={() => setCurrentPage('home')}
            className="border border-white/30 text-white px-3.5 py-2 text-xs uppercase tracking-wider font-medium hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </button>
          <button
            onClick={logout}
            className="text-neutral-400 hover:text-white p-2 text-xs flex items-center gap-1 cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* HORIZONTAL TAB NAVIGATION */}
      <div className="bg-white border border-[#EEEEEC] px-4 overflow-x-auto shadow-sm">
        <div className="flex gap-6 text-xs uppercase tracking-wider font-bold whitespace-nowrap min-w-max">
          {[
            { id: 'kpis', label: 'Executive KPIs', icon: TrendingUp },
            { id: 'products', label: `Footwear Catalog (${products.length})`, icon: Package },
            { id: 'inventory', label: `Inventory & Alerts (${lowStockCount + outOfStockCount})`, icon: AlertTriangle },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'payments', label: `Payments (${pendingVerificationsCount} Pending)`, icon: CreditCard },
            { id: 'customers', label: `Customers (${customerList.length})`, icon: Users },
            { id: 'collections', label: `Collections (${collections.length})`, icon: Layers },
            { id: 'categories', label: `Categories (${categories.length})`, icon: Tag },
            { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Percent },
            { id: 'settings', label: 'Website Content & Shipping', icon: Sliders }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#111111] text-[#111111]'
                    : 'border-transparent text-neutral-400 hover:text-neutral-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. EXECUTIVE KPIS & FINANCIALS */}
      {/* ========================================================= */}
      {activeTab === 'kpis' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 sm:p-6 border border-[#EEEEEC] shadow-sm space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block">
                Gross Revenue
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#111111]">
                {formatPKR(grossRevenue)}
              </div>
              <span className="text-[11px] text-emerald-700 font-medium">
                Live verified orders & dispatches
              </span>
            </div>

            <div className="bg-white p-5 sm:p-6 border border-[#EEEEEC] shadow-sm space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block">
                Estimated Net Profit (60% Margin)
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-800">
                {formatPKR(estimatedProfit)}
              </div>
              <span className="text-[11px] text-neutral-500">
                After materials & atelier assembly
              </span>
            </div>

            <div className="bg-white p-5 sm:p-6 border border-[#EEEEEC] shadow-sm space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block">
                Total Orders & AOV
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#111111]">
                {totalOrdersCount} <span className="text-xs font-sans text-neutral-400 font-normal">orders</span>
              </div>
              <span className="text-[11px] text-neutral-600 font-mono">
                AOV: {formatPKR(averageOrderVal)}
              </span>
            </div>

            <div className="bg-white p-5 sm:p-6 border border-[#EEEEEC] shadow-sm space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block">
                Stock Status
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#111111] flex items-center gap-2">
                <span>{products.length}</span>
                <span className="text-xs text-rose-700 font-sans font-normal">
                  ({outOfStockCount} Sold Out)
                </span>
              </div>
              <span className="text-[11px] text-amber-700">
                {lowStockCount} models low stock (&le; 5)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales by Payment Channel */}
            <div className="bg-white p-6 border border-[#EEEEEC] shadow-sm space-y-4">
              <h3 className="text-sm font-serif-luxury font-bold text-[#111111]">
                Sales Breakdown by Payment Channel
              </h3>
              <div className="space-y-3">
                {[
                  { channel: 'JazzCash Instant', key: 'jazzcash' },
                  { channel: 'Cash on Delivery (COD)', key: 'cod' },
                  { channel: 'Easypaisa Transfer', key: 'easypaisa' },
                  { channel: 'Direct Bank Transfer', key: 'bank_transfer' }
                ].map((item, idx) => {
                  const channelOrders = orders.filter(o => o.payment.method === item.key && o.status !== 'Cancelled');
                  const channelTotal = channelOrders.reduce((s, o) => s + o.total, 0);
                  const pct = grossRevenue > 0 ? Math.round((channelTotal / grossRevenue) * 100) : 0;

                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-neutral-800">{item.channel} ({channelOrders.length} orders)</span>
                        <span className="font-mono font-bold">{formatPKR(channelTotal)} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-[#F8F8F6] h-2 rounded-full overflow-hidden border border-[#EEEEEC]">
                        <div className="bg-[#111111] h-full" style={{ width: `${Math.max(pct, channelOrders.length > 0 ? 5 : 0)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Selling Products Leaderboard */}
            <div className="bg-white p-6 border border-[#EEEEEC] shadow-sm space-y-4">
              <h3 className="text-sm font-serif-luxury font-bold text-[#111111]">
                Best-Selling Footwear Models
              </h3>
              <div className="divide-y divide-[#EEEEEC]">
                {products.slice(0, 5).map((prod, rank) => (
                  <div key={prod.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 bg-[#FAF8F5] border border-[#D8C7AE] text-[#111111] text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                        #{rank + 1}
                      </span>
                      <img src={prod.images[0]?.startsWith('/') ? `.${prod.images[0]}` : prod.images[0]} alt="" className="w-10 h-10 object-cover bg-neutral-100 border shrink-0" />
                      <div>
                        <div className="font-bold text-[#111111] line-clamp-1">{prod.name}</div>
                        <span className="text-[11px] text-neutral-500 uppercase">{prod.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold">{formatPKR(prod.price)}</div>
                      <span className={`text-[10px] font-semibold ${prod.stockCount === 0 ? 'text-rose-700' : 'text-neutral-500'}`}>
                        {prod.stockCount === 0 ? 'Sold Out' : `${prod.stockCount} in stock`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* JazzCash Verification Queue */}
          <div className="bg-[#FAF8F5] border border-[#D8C7AE] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-serif-luxury font-bold text-[#111111]">
                  JazzCash Verification Queue ({pendingVerificationsCount} Pending)
                </h3>
                <p className="text-xs text-neutral-600">
                  Customer payments awaiting cross-reference with Abdul Samad (03238917805).
                </p>
              </div>
              <span className="font-mono text-xs bg-[#111111] text-white px-2.5 py-1">
                Account: 03238917805
              </span>
            </div>

            <div className="divide-y divide-[#D8C7AE]/30">
              {orders
                .filter(o => o.payment.method === 'jazzcash' && o.payment.status === 'pending')
                .map(o => (
                  <div key={o.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-mono font-bold text-[#111111]">{o.orderNumber}</span> · 
                      <span className="ml-1 font-semibold">{o.customer.fullName}</span> ({o.customer.phone})
                      <div className="text-neutral-500 mt-0.5">
                        TID: <strong className="font-mono text-neutral-800">{o.payment.transactionId || 'None Provided'}</strong> · Amount: <strong className="font-mono text-neutral-800">{formatPKR(o.total)}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setVerifyingOrder(o)}
                        className="bg-[#111111] text-white px-3 py-1.5 text-xs uppercase font-bold hover:bg-[#333333] cursor-pointer"
                      >
                        Audit & Approve
                      </button>
                    </div>
                  </div>
                ))}
              {pendingVerificationsCount === 0 && (
                <div className="py-3 text-xs text-neutral-500 italic">
                  All pending JazzCash transactions have been audited. No pending verifications.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. FOOTWEAR PRODUCTS CATALOG */}
      {/* ========================================================= */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 border border-[#EEEEEC] shadow-sm">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="text"
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
                placeholder="Search catalog by model name, category, or color..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8F8F6] border border-[#EEEEEC] outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={productCategoryFilter}
                onChange={e => setProductCategoryFilter(e.target.value)}
                className="bg-[#F8F8F6] border border-[#EEEEEC] px-3 py-2 text-xs cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>

              <button
                onClick={() => {
                  setEditingProduct({
                    id: `new-${Date.now()}`,
                    name: '',
                    slug: '',
                    category: categories[0]?.slug || 'men',
                    price: 18500,
                    originalPrice: 22000,
                    description: '',
                    details: ['Handcrafted imported leather', 'Orthopedic memory insole'],
                    images: ['./images/hero_luxury_sneaker_1794183121618.jpg'],
                    sizes: [39, 40, 41, 42, 43, 44, 45],
                    colors: ['Obsidian Black', 'Travertine Beige'],
                    inStock: true,
                    stockCount: 12,
                    isBestSeller: false,
                    isNewArrival: true,
                    rating: 5.0,
                    reviewCount: 0,
                    createdAt: new Date().toISOString()
                  });
                  setIsProductModalOpen(true);
                }}
                className="bg-[#111111] text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#333333] transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(prod => {
              const isSoldOut = prod.stockCount === 0 || !prod.inStock;
              return (
                <div key={prod.id} className="bg-white border border-[#EEEEEC] p-4 flex flex-col justify-between shadow-sm relative">
                  {isSoldOut && (
                    <div className="absolute top-2 right-2 bg-rose-700 text-white text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 z-10 shadow">
                      Sold Out
                    </div>
                  )}

                  <div className="flex gap-4">
                    <img
                      src={prod.images[0]?.startsWith('/') ? `.${prod.images[0]}` : prod.images[0]}
                      alt={prod.name}
                      className="w-24 h-24 object-cover bg-neutral-100 shrink-0 border border-[#EEEEEC]"
                    />
                    <div className="flex-1 text-xs">
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block">
                        {prod.category}
                      </span>
                      <h4 className="font-bold text-sm text-[#111111] line-clamp-1">{prod.name}</h4>
                      <div className="font-mono font-bold mt-1 text-[#111111]">
                        {formatPKR(prod.price)}
                        {prod.originalPrice && (
                          <span className="text-neutral-400 line-through text-[11px] ml-1.5 font-normal">
                            {formatPKR(prod.originalPrice)}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-1 line-clamp-2">
                        {prod.description}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#EEEEEC] flex items-center justify-between text-xs">
                    <span className={`font-semibold text-[11px] ${
                      isSoldOut ? 'text-rose-700' : prod.stockCount <= 5 ? 'text-amber-700' : 'text-emerald-700'
                    }`}>
                      Stock: {prod.stockCount} pairs
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct({ ...prod });
                          setIsProductModalOpen(true);
                        }}
                        className="text-neutral-600 hover:text-black p-1 cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id, prod.name)}
                        className="text-neutral-400 hover:text-rose-700 p-1 cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. INVENTORY & STOCK ALERT CENTER */}
      {/* ========================================================= */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 border border-[#EEEEEC] gap-4 shadow-sm">
            <div>
              <h3 className="text-sm font-serif-luxury font-bold text-[#111111]">
                Stock & Restock Management
              </h3>
              <p className="text-xs text-neutral-500">
                Any item set to 0 stock automatically displays "Sold Out" badges and disables purchases on the store.
              </p>
            </div>

            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setInventoryFilter('all')}
                className={`px-3 py-1.5 border font-semibold cursor-pointer ${
                  inventoryFilter === 'all' ? 'bg-[#111111] text-white border-[#111111]' : 'bg-[#F8F8F6] text-neutral-600 border-[#EEEEEC]'
                }`}
              >
                All Footwear ({products.length})
              </button>
              <button
                onClick={() => setInventoryFilter('low')}
                className={`px-3 py-1.5 border font-semibold cursor-pointer ${
                  inventoryFilter === 'low' ? 'bg-amber-600 text-white border-amber-600' : 'bg-[#F8F8F6] text-amber-800 border-amber-200'
                }`}
              >
                Low Stock (&le; 5)
              </button>
              <button
                onClick={() => setInventoryFilter('out')}
                className={`px-3 py-1.5 border font-semibold cursor-pointer ${
                  inventoryFilter === 'out' ? 'bg-rose-700 text-white border-rose-700' : 'bg-[#F8F8F6] text-rose-800 border-rose-200'
                }`}
              >
                Sold Out (0 Pairs)
              </button>
            </div>
          </div>

          <div className="bg-white border border-[#EEEEEC] overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50 border-b border-[#EEEEEC] uppercase font-bold text-neutral-500">
                  <th className="p-3">Footwear Model</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Unit Price</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Current Stock</th>
                  <th className="p-3 text-right">Quick Restock Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEC]">
                {filteredInventory.map(prod => {
                  const isSoldOut = prod.stockCount === 0 || !prod.inStock;
                  return (
                    <tr key={prod.id} className="hover:bg-neutral-50/60">
                      <td className="p-3 flex items-center gap-3">
                        <img src={prod.images[0]?.startsWith('/') ? `.${prod.images[0]}` : prod.images[0]} alt="" className="w-10 h-10 object-cover bg-neutral-100 border shrink-0" />
                        <div>
                          <div className="font-bold text-[#111111]">{prod.name}</div>
                          <div className="text-[10px] text-neutral-500">Sizes: {prod.sizes.join(', ')}</div>
                        </div>
                      </td>
                      <td className="p-3 uppercase font-medium text-neutral-600">{prod.category}</td>
                      <td className="p-3 font-mono font-bold">{formatPKR(prod.price)}</td>
                      <td className="p-3">
                        {isSoldOut ? (
                          <span className="bg-rose-100 text-rose-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                            Sold Out
                          </span>
                        ) : prod.stockCount <= 5 ? (
                          <span className="bg-amber-100 text-amber-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                            Low Stock ({prod.stockCount} left)
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                            In Stock ({prod.stockCount})
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          value={prod.stockCount}
                          onChange={e => updateProductStock(prod.id, parseInt(e.target.value) || 0)}
                          className="w-20 bg-[#F8F8F6] border border-[#EEEEEC] p-1.5 text-xs font-mono font-bold text-center"
                        />
                      </td>
                      <td className="p-3 text-right space-x-1.5">
                        <button
                          onClick={() => {
                            updateProductStock(prod.id, prod.stockCount + 5);
                            showToast(`Added +5 pairs to ${prod.name}`);
                          }}
                          className="bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 px-2 py-1 text-[11px] font-semibold cursor-pointer"
                        >
                          +5
                        </button>
                        <button
                          onClick={() => {
                            updateProductStock(prod.id, prod.stockCount + 10);
                            showToast(`Added +10 pairs to ${prod.name}`);
                          }}
                          className="bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 px-2 py-1 text-[11px] font-semibold cursor-pointer"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => {
                            updateProductStock(prod.id, 0);
                            showToast(`Marked ${prod.name} as Sold Out`);
                          }}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-2 py-1 text-[11px] font-semibold cursor-pointer"
                        >
                          Mark Sold
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. ORDERS MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 border border-[#EEEEEC] shadow-sm">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="text"
                value={orderSearch}
                onChange={e => setOrderSearch(e.target.value)}
                placeholder="Search orders by 19BK ID, customer name, phone, or city..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8F8F6] border border-[#EEEEEC] outline-none"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-400 uppercase font-semibold">Filter:</span>
              <select
                value={orderStatusFilter}
                onChange={e => setOrderStatusFilter(e.target.value)}
                className="bg-[#F8F8F6] border border-[#EEEEEC] px-3 py-2 text-xs cursor-pointer"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="out for delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="bg-white border border-[#EEEEEC] overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50 border-b border-[#EEEEEC] uppercase font-bold text-neutral-500">
                  <th className="p-3">Order ID & Date</th>
                  <th className="p-3">Customer Details</th>
                  <th className="p-3">Destination</th>
                  <th className="p-3">Pairs</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEC]">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-neutral-50/60">
                    <td className="p-3">
                      <div className="font-mono font-bold text-[#111111]">{order.orderNumber}</div>
                      <div className="text-[10px] text-neutral-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-neutral-800">{order.customer.fullName}</div>
                      <div className="text-neutral-500 font-mono text-[11px]">{order.customer.phone}</div>
                    </td>
                    <td className="p-3 text-neutral-600 font-medium">
                      {order.customer.city}
                    </td>
                    <td className="p-3">
                      {order.items.reduce((s, i) => s + i.quantity, 0)} pair(s)
                    </td>
                    <td className="p-3 font-mono font-bold text-[#111111]">
                      {formatPKR(order.total)}
                    </td>
                    <td className="p-3">
                      <div className="font-semibold uppercase">{order.payment.method}</div>
                      <span className={`text-[10px] font-semibold uppercase ${
                        order.payment.status === 'verified'
                          ? 'text-emerald-700'
                          : order.payment.status === 'rejected'
                          ? 'text-rose-700'
                          : 'text-amber-700'
                      }`}>
                        {order.payment.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={async e => {
                          const newStatus = e.target.value as Order['status'];
                          await updateOrderStatus(order.id, newStatus);
                          showToast(`Order status updated to ${newStatus}`);
                        }}
                        className="bg-[#F8F8F6] border border-[#EEEEEC] p-1.5 text-xs font-semibold cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedOrderDetails(order)}
                        className="bg-[#111111] text-white px-2.5 py-1 text-[11px] uppercase font-bold hover:bg-[#333333] cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. PAYMENTS AUDIT */}
      {/* ========================================================= */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#EEEEEC] p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-serif-luxury font-bold text-[#111111]">
              Payment Audit Ledger
            </h3>
            <div className="divide-y divide-[#EEEEEC]">
              {orders.map(o => (
                <div key={o.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#111111]">{o.orderNumber}</span> · 
                    <span className="font-semibold text-neutral-800 ml-1">{o.customer.fullName}</span> ({o.customer.phone})
                    <div className="text-neutral-500 mt-0.5">
                      Method: <strong className="uppercase">{o.payment.method}</strong> · Total: <strong className="font-mono">{formatPKR(o.total)}</strong>
                      {o.payment.transactionId && (
                        <span> · TID: <strong className="font-mono">{o.payment.transactionId}</strong></span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                      o.payment.status === 'verified' ? 'bg-emerald-100 text-emerald-800' :
                      o.payment.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {o.payment.status}
                    </span>

                    {o.payment.method === 'jazzcash' && (
                      <button
                        onClick={() => setVerifyingOrder(o)}
                        className="bg-[#111111] text-white px-3 py-1.5 text-xs uppercase font-bold hover:bg-[#333333] cursor-pointer"
                      >
                        Audit TID
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. CUSTOMERS DIRECTORY */}
      {/* ========================================================= */}
      {activeTab === 'customers' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 border border-[#EEEEEC] shadow-sm">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="text"
                value={customerSearch}
                onChange={e => setCustomerSearch(e.target.value)}
                placeholder="Search customers by name, phone, email, or city..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8F8F6] border border-[#EEEEEC] outline-none"
              />
            </div>
            <span className="text-xs text-neutral-500 font-semibold">
              Total Clients: {customerList.length}
            </span>
          </div>

          <div className="bg-white border border-[#EEEEEC] overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50 border-b border-[#EEEEEC] uppercase font-bold text-neutral-500">
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Contact (Phone & Email)</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Orders Placed</th>
                  <th className="p-3">Lifetime Spend</th>
                  <th className="p-3">Last Order</th>
                  <th className="p-3 text-right">History</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEC]">
                {filteredCustomers.map(cust => (
                  <tr key={cust.id} className="hover:bg-neutral-50/60">
                    <td className="p-3">
                      <div className="font-bold text-[#111111]">{cust.name}</div>
                    </td>
                    <td className="p-3 font-mono">
                      <div>{cust.phone || 'N/A'}</div>
                      <div className="text-neutral-400 text-[11px]">{cust.email}</div>
                    </td>
                    <td className="p-3 text-neutral-700">{cust.city || 'Pakistan'}</td>
                    <td className="p-3 font-bold">{cust.totalOrders} order(s)</td>
                    <td className="p-3 font-mono font-bold text-[#111111]">{formatPKR(cust.totalSpent)}</td>
                    <td className="p-3 text-neutral-500 text-[11px]">
                      {new Date(cust.lastOrderDate).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          const customerOrders = orders.filter(
                            o => o.customer.phone === cust.phone || o.customer.email === cust.email
                          );
                          setSelectedCustomerOrders(customerOrders);
                          setViewingCustomer(cust);
                        }}
                        className="bg-[#111111] text-white px-2.5 py-1 text-[11px] uppercase font-bold hover:bg-[#333333] cursor-pointer"
                      >
                        Orders ({cust.totalOrders})
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. COLLECTIONS MANAGER */}
      {/* ========================================================= */}
      {activeTab === 'collections' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 border border-[#EEEEEC] shadow-sm">
            <div>
              <h3 className="text-sm font-serif-luxury font-bold text-[#111111]">Curated Collections</h3>
              <p className="text-xs text-neutral-500">Manage curated collections shown across the website.</p>
            </div>
            <button
              onClick={() => {
                setEditingCollection({
                  id: `new-${Date.now()}`,
                  title: '',
                  slug: '',
                  subtitle: '',
                  description: '',
                  image: './images/hero_luxury_sneaker_1794183121618.jpg',
                  tag: 'featured'
                });
                setIsCollectionModalOpen(true);
              }}
              className="bg-[#111111] text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#333333] flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Collection</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map(col => (
              <div key={col.id} className="bg-white border border-[#EEEEEC] p-4 flex flex-col justify-between shadow-sm">
                <div>
                  <img src={col.image?.startsWith('/') ? `.${col.image}` : col.image} alt={col.title} className="w-full h-36 object-cover bg-neutral-100 border mb-3" />
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7A5E] font-bold">
                    Tag: {col.tag} · Slug: /{col.slug}
                  </span>
                  <h4 className="font-serif-luxury font-bold text-base text-[#111111]">{col.title}</h4>
                  <div className="text-xs font-medium text-neutral-700 mt-0.5">{col.subtitle}</div>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{col.description}</p>
                </div>

                <div className="flex justify-end gap-2 pt-3 mt-3 border-t border-[#EEEEEC]">
                  <button
                    onClick={() => {
                      setEditingCollection({ ...col });
                      setIsCollectionModalOpen(true);
                    }}
                    className="p-1.5 text-neutral-600 hover:text-black cursor-pointer"
                    title="Edit Collection"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCollection(col.id, col.title)}
                    className="p-1.5 text-neutral-400 hover:text-rose-700 cursor-pointer"
                    title="Delete Collection"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. PRODUCT CATEGORIES */}
      {/* ========================================================= */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 border border-[#EEEEEC] shadow-sm">
            <div>
              <h3 className="text-sm font-serif-luxury font-bold text-[#111111]">Product Categories</h3>
              <p className="text-xs text-neutral-500">Categories used for shop navigation and filtering.</p>
            </div>
            <button
              onClick={() => {
                setEditingCategory({
                  id: `new-${Date.now()}`,
                  name: '',
                  slug: '',
                  description: ''
                });
                setIsCategoryModalOpen(true);
              }}
              className="bg-[#111111] text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#333333] flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map(cat => (
              <div key={cat.id} className="bg-white border border-[#EEEEEC] p-4 flex items-center justify-between shadow-sm">
                <div>
                  <h4 className="font-bold text-sm text-[#111111]">{cat.name}</h4>
                  <span className="text-[11px] font-mono text-[#8C7A5E]">Slug: {cat.slug}</span>
                  {cat.description && (
                    <p className="text-xs text-neutral-500 mt-1">{cat.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingCategory({ ...cat });
                      setIsCategoryModalOpen(true);
                    }}
                    className="p-1.5 text-neutral-600 hover:text-black cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                    className="p-1.5 text-neutral-400 hover:text-rose-700 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. DISCOUNTS & COUPONS */}
      {/* ========================================================= */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 border border-[#EEEEEC] shadow-sm">
            <div>
              <h3 className="text-sm font-serif-luxury font-bold text-[#111111]">Promotional Coupons</h3>
              <p className="text-xs text-neutral-500">Customers can enter these codes at checkout for discounts.</p>
            </div>
            <button
              onClick={() => {
                setEditingCoupon({
                  id: `new-${Date.now()}`,
                  code: '',
                  discountType: 'percentage',
                  discountValue: 10,
                  minPurchase: 10000,
                  isActive: true,
                  usageCount: 0
                });
                setIsCouponModalOpen(true);
              }}
              className="bg-[#111111] text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#333333] flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map(cp => (
              <div key={cp.id} className="bg-white border border-[#EEEEEC] p-5 flex flex-col justify-between shadow-sm space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-mono font-bold text-lg text-[#111111] bg-[#FAF8F5] border border-[#D8C7AE] px-2.5 py-1">
                      {cp.code}
                    </span>
                    <button
                      onClick={async () => {
                        await updateCoupon(cp.id, { isActive: !cp.isActive });
                        showToast(`Coupon ${cp.code} is now ${!cp.isActive ? 'Active' : 'Disabled'}`);
                      }}
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded cursor-pointer ${
                        cp.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-600'
                      }`}
                    >
                      {cp.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </div>

                  <div className="text-xl font-bold text-emerald-800 mt-3">
                    {cp.discountType === 'percentage' ? `${cp.discountValue}% OFF` : `-${formatPKR(cp.discountValue)}`}
                  </div>

                  <div className="text-xs text-neutral-500 mt-1 space-y-0.5">
                    <div>Min Purchase: <strong>{formatPKR(cp.minPurchase)}</strong></div>
                    <div>Times Redeemed: <strong>{cp.usageCount}</strong></div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[#EEEEEC]">
                  <button
                    onClick={() => {
                      setEditingCoupon({ ...cp });
                      setIsCouponModalOpen(true);
                    }}
                    className="p-1.5 text-neutral-600 hover:text-black cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCoupon(cp.id, cp.code)}
                    className="p-1.5 text-neutral-400 hover:text-rose-700 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 10. WEBSITE CONTENT & SHIPPING CONTROLS */}
      {/* ========================================================= */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 border border-[#EEEEEC] shadow-sm">
            <div>
              <h3 className="text-sm font-serif-luxury font-bold text-[#111111]">
                Website Content, Shipping & Account Settings
              </h3>
              <p className="text-xs text-neutral-500">
                All changes saved here instantly update homepage banners, delivery fees, and JazzCash verification info.
              </p>
            </div>
            <button
              type="submit"
              className="bg-[#111111] text-white px-5 py-2 text-xs uppercase tracking-wider font-bold hover:bg-[#333333] flex items-center gap-2 cursor-pointer shadow"
            >
              <Save className="w-4 h-4 text-[#D8C7AE]" />
              <span>Save All Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 border border-[#EEEEEC] shadow-sm space-y-4">
              <h4 className="font-serif-luxury font-bold text-sm text-[#111111] pb-2 border-b border-[#EEEEEC]">
                Homepage Banners & Hero Presentation
              </h4>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">
                  Top Announcement Bar
                </label>
                <input
                  type="text"
                  value={settingsForm.announcementText}
                  onChange={e => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">
                  Hero Tagline
                </label>
                <input
                  type="text"
                  value={settingsForm.heroTag}
                  onChange={e => setSettingsForm({ ...settingsForm, heroTag: e.target.value })}
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">
                  Hero Main Heading
                </label>
                <input
                  type="text"
                  value={settingsForm.heroTitle}
                  onChange={e => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">
                  Hero Narrative / Description
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.heroDescription}
                  onChange={e => setSettingsForm({ ...settingsForm, heroDescription: e.target.value })}
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">
                    Featured Model Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.heroFeaturedModelName}
                    onChange={e => setSettingsForm({ ...settingsForm, heroFeaturedModelName: e.target.value })}
                    className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">
                    Featured Model Price (PKR)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.heroFeaturedModelPrice}
                    onChange={e => setSettingsForm({ ...settingsForm, heroFeaturedModelPrice: Number(e.target.value) })}
                    className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 border border-[#EEEEEC] shadow-sm space-y-4">
                <h4 className="font-serif-luxury font-bold text-sm text-[#111111] pb-2 border-b border-[#EEEEEC]">
                  Shipping Rules
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">
                      Free Shipping Above (PKR)
                    </label>
                    <input
                      type="number"
                      value={settingsForm.freeShippingThreshold}
                      onChange={e => setSettingsForm({ ...settingsForm, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">
                      Standard Shipping Fee (PKR)
                    </label>
                    <input
                      type="number"
                      value={settingsForm.standardShippingFee}
                      onChange={e => setSettingsForm({ ...settingsForm, standardShippingFee: Number(e.target.value) })}
                      className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 border border-[#EEEEEC] shadow-sm space-y-4">
                <h4 className="font-serif-luxury font-bold text-sm text-[#111111] pb-2 border-b border-[#EEEEEC]">
                  Official JazzCash Verification Details
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">
                      JazzCash Account Title
                    </label>
                    <input
                      type="text"
                      value={settingsForm.jazzcashAccountTitle}
                      onChange={e => setSettingsForm({ ...settingsForm, jazzcashAccountTitle: e.target.value })}
                      className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">
                      JazzCash Mobile Number
                    </label>
                    <input
                      type="text"
                      value={settingsForm.jazzcashAccountNumber}
                      onChange={e => setSettingsForm({ ...settingsForm, jazzcashAccountNumber: e.target.value })}
                      className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Catalog & Store State Maintenance */}
              <div className="bg-[#FAF8F5] p-6 border border-[#D8C7AE] shadow-sm space-y-3">
                <h4 className="font-serif-luxury font-bold text-sm text-[#111111]">
                  Atelier Database & Demo Catalog Maintenance
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  If you ever need to restore the luxury footwear demonstration catalog (8 models, 4 categories, 6 collections, active coupons, and sample orders), click below. Your changes will sync automatically to the storefront.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Restore initial sample footwear models, categories, and collections? Any custom added items will be reset to initial defaults.')) {
                        resetDemoCatalog();
                      }
                    }}
                    className="bg-[#111111] text-[#D8C7AE] hover:text-white px-4 py-2 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
                  >
                    Restore Initial Footwear Catalog
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT PRODUCT */}
      {/* ========================================================= */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleSaveProduct} className="bg-white border border-[#EEEEEC] max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8">
            <div className="flex justify-between items-start pb-3 border-b border-[#EEEEEC]">
              <h3 className="text-lg font-serif-luxury font-bold text-[#111111]">
                {editingProduct.id.startsWith('new-') ? 'Add New Footwear Model' : `Edit: ${editingProduct.name}`}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsProductModalOpen(false);
                  setEditingProduct(null);
                }}
                className="text-neutral-400 hover:text-black cursor-pointer text-base"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="e.g. Aurelius Low-Top Court"
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Category *</label>
                  <select
                    value={editingProduct.category}
                    onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs outline-none cursor-pointer"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Original Price (PKR)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) || undefined })}
                    placeholder="e.g. 25000"
                    className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Stock Count *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={editingProduct.stockCount}
                    onChange={e => setEditingProduct({ ...editingProduct, stockCount: Number(e.target.value) })}
                    className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs font-mono font-bold"
                  />
                  <span className="text-[10px] text-neutral-400 mt-0.5 block">0 auto-sets Sold Out label</span>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="prodInStock"
                    checked={editingProduct.inStock && editingProduct.stockCount > 0}
                    onChange={e => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                    className="cursor-pointer"
                  />
                  <label htmlFor="prodInStock" className="cursor-pointer font-semibold text-neutral-800">
                    Active / In Stock
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="prodBestSeller"
                    checked={editingProduct.isBestSeller}
                    onChange={e => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })}
                    className="cursor-pointer"
                  />
                  <label htmlFor="prodBestSeller" className="cursor-pointer font-semibold text-neutral-800">
                    Best Seller Tag
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">
                  Product Image (URL or Pick Preset) *
                </label>
                <div className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    required
                    value={editingProduct.images[0] || ''}
                    onChange={e => {
                      const newImages = [...editingProduct.images];
                      newImages[0] = e.target.value;
                      setEditingProduct({ ...editingProduct, images: newImages });
                    }}
                    placeholder="./images/product_men_sneaker_1794183121675.jpg or https://..."
                    className="flex-1 bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs font-mono"
                  />
                  {editingProduct.images[0] && (
                    <div className="w-10 h-10 border border-[#EEEEEC] bg-[#111111] shrink-0 overflow-hidden">
                      <img src={editingProduct.images[0]} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  <span className="text-neutral-400 py-0.5">Quick Presets:</span>
                  {[
                    { label: 'Obsidian Low', path: './images/product_men_sneaker_1794183121675.jpg' },
                    { label: 'Travertine Runner', path: './images/hero_luxury_sneaker_1794183121618.jpg' },
                    { label: 'Champagne Runner', path: './images/product_women_runner_1794183121544.jpg' },
                    { label: 'Casual Loafer', path: './images/product_casual_loafers_1794183123383.jpg' }
                  ].map(preset => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        const newImages = [...editingProduct.images];
                        newImages[0] = preset.path;
                        setEditingProduct({ ...editingProduct, images: newImages });
                      }}
                      className="px-2 py-0.5 bg-neutral-100 hover:bg-[#D8C7AE] text-neutral-800 transition-colors border border-neutral-200 cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">
                  Available Sizes (Comma separated EU numbers)
                </label>
                <input
                  type="text"
                  value={editingProduct.sizes.join(', ')}
                  onChange={e => {
                    const s = e.target.value.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
                    setEditingProduct({ ...editingProduct, sizes: s });
                  }}
                  placeholder="39, 40, 41, 42, 43, 44, 45"
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">
                  Available Colors (Comma separated)
                </label>
                <input
                  type="text"
                  value={editingProduct.colors.join(', ')}
                  onChange={e => {
                    const c = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setEditingProduct({ ...editingProduct, colors: c });
                  }}
                  placeholder="Obsidian Black, Travertine Beige"
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  placeholder="Artisanal craftsmanship combining Italian calfskin with architectural silhouette."
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-3 border-t border-[#EEEEEC]">
              <button
                type="submit"
                className="flex-1 bg-[#111111] text-white py-3 text-xs uppercase tracking-wider font-bold hover:bg-[#333333] cursor-pointer"
              >
                Save Product to Database
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsProductModalOpen(false);
                  setEditingProduct(null);
                }}
                className="border border-[#EEEEEC] px-4 py-3 text-xs uppercase cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT CATEGORY */}
      {/* ========================================================= */}
      {isCategoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveCategory} className="bg-white border border-[#EEEEEC] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start pb-3 border-b border-[#EEEEEC]">
              <h3 className="text-lg font-serif-luxury font-bold text-[#111111]">
                {editingCategory.id.startsWith('new-') ? 'Add Category' : 'Edit Category'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsCategoryModalOpen(false);
                  setEditingCategory(null);
                }}
                className="text-neutral-400 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  placeholder="e.g. Chelsea Boots"
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingCategory.description || ''}
                  onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  placeholder="Handmade leather footwear for formal and casual occasions."
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-[#111111] text-white py-2.5 text-xs uppercase font-bold hover:bg-[#333333] cursor-pointer"
              >
                Save Category
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCategoryModalOpen(false);
                  setEditingCategory(null);
                }}
                className="border border-[#EEEEEC] px-4 py-2.5 text-xs uppercase cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT COLLECTION */}
      {/* ========================================================= */}
      {isCollectionModalOpen && editingCollection && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveCollection} className="bg-white border border-[#EEEEEC] max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start pb-3 border-b border-[#EEEEEC]">
              <h3 className="text-lg font-serif-luxury font-bold text-[#111111]">
                {editingCollection.id.startsWith('new-') ? 'Create Collection' : 'Edit Collection'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsCollectionModalOpen(false);
                  setEditingCollection(null);
                }}
                className="text-neutral-400 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Collection Title *</label>
                <input
                  type="text"
                  required
                  value={editingCollection.title}
                  onChange={e => setEditingCollection({ ...editingCollection, title: e.target.value })}
                  placeholder="e.g. Sovereign Sneaker Capsule"
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingCollection.subtitle}
                  onChange={e => setEditingCollection({ ...editingCollection, subtitle: e.target.value })}
                  placeholder="e.g. Architectural silhouettes & calfskin leather"
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Banner Image URL</label>
                <input
                  type="text"
                  value={editingCollection.image}
                  onChange={e => setEditingCollection({ ...editingCollection, image: e.target.value })}
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Filter Tag / Identifier</label>
                <input
                  type="text"
                  value={editingCollection.tag}
                  onChange={e => setEditingCollection({ ...editingCollection, tag: e.target.value })}
                  placeholder="e.g. sneakers, men, casual"
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingCollection.description}
                  onChange={e => setEditingCollection({ ...editingCollection, description: e.target.value })}
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-[#111111] text-white py-2.5 text-xs uppercase font-bold hover:bg-[#333333] cursor-pointer"
              >
                Save Collection
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCollectionModalOpen(false);
                  setEditingCollection(null);
                }}
                className="border border-[#EEEEEC] px-4 py-2.5 text-xs uppercase cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT COUPON */}
      {/* ========================================================= */}
      {isCouponModalOpen && editingCoupon && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveCoupon} className="bg-white border border-[#EEEEEC] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start pb-3 border-b border-[#EEEEEC]">
              <h3 className="text-lg font-serif-luxury font-bold text-[#111111]">
                {editingCoupon.id.startsWith('new-') ? 'Create Coupon Code' : `Edit Coupon: ${editingCoupon.code}`}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsCouponModalOpen(false);
                  setEditingCoupon(null);
                }}
                className="text-neutral-400 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={editingCoupon.code}
                  onChange={e => setEditingCoupon({ ...editingCoupon, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. SUMMER2026"
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs font-mono font-bold uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Discount Type</label>
                  <select
                    value={editingCoupon.discountType}
                    onChange={e => setEditingCoupon({ ...editingCoupon, discountType: e.target.value as any })}
                    className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs font-semibold cursor-pointer"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (PKR)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">
                    Value {editingCoupon.discountType === 'percentage' ? '(%)' : '(PKR)'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingCoupon.discountValue}
                    onChange={e => setEditingCoupon({ ...editingCoupon, discountValue: Number(e.target.value) })}
                    className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Minimum Subtotal (PKR)</label>
                <input
                  type="number"
                  value={editingCoupon.minPurchase}
                  onChange={e => setEditingCoupon({ ...editingCoupon, minPurchase: Number(e.target.value) })}
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="couponActive"
                  checked={editingCoupon.isActive}
                  onChange={e => setEditingCoupon({ ...editingCoupon, isActive: e.target.checked })}
                  className="cursor-pointer"
                />
                <label htmlFor="couponActive" className="cursor-pointer font-semibold text-neutral-800">
                  Coupon is Active & Redeemable
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-[#111111] text-white py-2.5 text-xs uppercase font-bold hover:bg-[#333333] cursor-pointer"
              >
                Save Coupon
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCouponModalOpen(false);
                  setEditingCoupon(null);
                }}
                className="border border-[#EEEEEC] px-4 py-2.5 text-xs uppercase cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ORDER DETAILS */}
      {/* ========================================================= */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#EEEEEC] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex justify-between items-start pb-3 border-b border-[#EEEEEC]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8C7A5E] font-bold">
                  Order Management
                </span>
                <h3 className="text-xl font-serif-luxury font-bold text-[#111111]">
                  Order {selectedOrderDetails.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="text-neutral-400 hover:text-black cursor-pointer text-base"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF8F5] p-4 border border-[#D8C7AE]/40 text-xs">
              <div>
                <span className="text-neutral-500 block uppercase font-bold text-[10px]">Customer Details</span>
                <div className="font-bold text-sm text-[#111111]">{selectedOrderDetails.customer.fullName}</div>
                <div className="font-mono text-neutral-700">{selectedOrderDetails.customer.phone}</div>
                <div className="text-neutral-600">{selectedOrderDetails.customer.email}</div>
              </div>

              <div>
                <span className="text-neutral-500 block uppercase font-bold text-[10px]">Shipping Destination</span>
                <div className="text-neutral-800 font-medium">{selectedOrderDetails.customer.address}</div>
                <div className="text-neutral-600">{selectedOrderDetails.customer.city} {selectedOrderDetails.customer.postalCode}</div>
                {selectedOrderDetails.customer.notes && (
                  <div className="text-neutral-500 italic mt-1">Notes: {selectedOrderDetails.customer.notes}</div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-neutral-400">
                Purchased Footwear ({selectedOrderDetails.items.length})
              </h4>
              <div className="divide-y divide-[#EEEEEC]">
                {selectedOrderDetails.items.map((it, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={it.image?.startsWith('/') ? `.${it.image}` : it.image} alt="" className="w-12 h-12 object-cover bg-neutral-100 border shrink-0" />
                      <div>
                        <div className="font-bold text-[#111111]">{it.productName}</div>
                        <div className="text-neutral-500">Size: EU {it.size} · Color: {it.color} · Qty: {it.quantity}</div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-[#111111]">{formatPKR(it.price * it.quantity)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#F8F8F6] border border-[#EEEEEC] text-xs space-y-1.5">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-mono">{formatPKR(selectedOrderDetails.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#111111] pt-1 border-t border-[#EEEEEC]">
                <span>Total Payable</span>
                <span className="font-mono">{formatPKR(selectedOrderDetails.total)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#EEEEEC]">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-neutral-700">Update Status:</span>
                <select
                  value={selectedOrderDetails.status}
                  onChange={async e => {
                    const newStatus = e.target.value as Order['status'];
                    await updateOrderStatus(selectedOrderDetails.id, newStatus);
                    setSelectedOrderDetails({ ...selectedOrderDetails, status: newStatus });
                    showToast(`Order status updated to ${newStatus}`);
                  }}
                  className="bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs font-semibold cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="bg-[#111111] text-white px-4 py-2 text-xs uppercase font-bold hover:bg-[#333333] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: JAZZCASH VERIFY */}
      {/* ========================================================= */}
      {verifyingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#EEEEEC] max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start pb-3 border-b border-[#EEEEEC]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8C7A5E] font-bold">Manual Payment Audit</span>
                <h3 className="text-lg font-serif-luxury font-bold text-[#111111]">
                  Verify JazzCash Transaction
                </h3>
              </div>
              <button onClick={() => setVerifyingOrder(null)} className="text-neutral-400 hover:text-black cursor-pointer">✕</button>
            </div>

            <div className="space-y-3 text-xs bg-[#FAF8F5] p-4 border border-[#D8C7AE]/40">
              <div className="flex justify-between">
                <span className="text-neutral-500">Order ID:</span>
                <span className="font-mono font-bold text-[#111111]">{verifyingOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Customer:</span>
                <span className="font-semibold text-[#111111]">{verifyingOrder.customer.fullName} ({verifyingOrder.customer.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Amount Due:</span>
                <span className="font-mono font-bold text-[#111111]">{formatPKR(verifyingOrder.total)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#D8C7AE]/30">
                <span className="text-neutral-500 font-bold">Customer Submitted TID:</span>
                <span className="font-mono font-bold text-base text-neutral-900 bg-white px-2 py-0.5 border border-[#D8C7AE]">
                  {verifyingOrder.payment.transactionId || 'None'}
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                Admin Audit Notes
              </label>
              <input
                type="text"
                value={adminNote}
                onChange={e => setAdminNote(e.target.value)}
                placeholder="e.g. Confirmed in JazzCash app statement ending in 8905"
                className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs outline-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={async () => {
                  await verifyOrderPayment(verifyingOrder.id, 'verified', adminNote);
                  showToast('JazzCash payment approved & marked paid.');
                  setVerifyingOrder(null);
                  setAdminNote('');
                }}
                className="flex-1 bg-emerald-700 text-white py-2.5 text-xs uppercase font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Approve Payment (Mark Paid)
              </button>
              <button
                type="button"
                onClick={async () => {
                  await verifyOrderPayment(verifyingOrder.id, 'rejected', adminNote);
                  showToast('JazzCash payment rejected.');
                  setVerifyingOrder(null);
                  setAdminNote('');
                }}
                className="flex-1 bg-rose-700 text-white py-2.5 text-xs uppercase font-bold hover:bg-rose-800 transition-colors cursor-pointer"
              >
                Reject Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CUSTOMER ORDER HISTORY */}
      {/* ========================================================= */}
      {viewingCustomer && selectedCustomerOrders && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#EEEEEC] max-w-xl w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex justify-between items-start pb-3 border-b border-[#EEEEEC]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8C7A5E] font-bold">Client History</span>
                <h3 className="text-lg font-serif-luxury font-bold text-[#111111]">
                  {viewingCustomer.name}'s Orders
                </h3>
              </div>
              <button
                onClick={() => {
                  setViewingCustomer(null);
                  setSelectedCustomerOrders(null);
                }}
                className="text-neutral-400 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#FAF8F5] p-3 border border-[#D8C7AE]/40 text-xs flex justify-between">
              <div>
                <span className="text-neutral-500 block text-[10px]">Phone & Email</span>
                <span className="font-bold">{viewingCustomer.phone} · {viewingCustomer.email}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px]">Total Lifetime Spend</span>
                <span className="font-mono font-bold text-sm text-[#111111]">{formatPKR(viewingCustomer.totalSpent)}</span>
              </div>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto divide-y divide-[#EEEEEC]">
              {selectedCustomerOrders.map(ord => (
                <div key={ord.id} className="pt-3 first:pt-0 text-xs space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="font-mono">{ord.orderNumber}</span>
                    <span className="font-mono">{formatPKR(ord.total)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500 text-[11px]">
                    <span>Status: {ord.status} · Payment: {ord.payment.method} ({ord.payment.status})</span>
                    <span>{new Date(ord.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="text-neutral-600">
                    {ord.items.map(i => `${i.productName} (size ${i.size})`).join(', ')}
                  </div>
                </div>
              ))}
              {selectedCustomerOrders.length === 0 && (
                <div className="text-center py-6 text-neutral-400 text-xs">No orders recorded for this customer.</div>
              )}
            </div>

            <button
              onClick={() => {
                setViewingCustomer(null);
                setSelectedCustomerOrders(null);
              }}
              className="w-full bg-[#111111] text-white py-2.5 text-xs uppercase font-bold hover:bg-[#333333] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
