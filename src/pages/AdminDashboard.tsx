import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Order, Product, AdminStats } from '../types';
import { ShieldCheck, Package, ShoppingBag, Users, DollarSign, Clock, AlertTriangle, CheckCircle, XCircle, Search, Plus, Trash2, Edit } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user, setCurrentPage, formatPKR, showToast } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'messages' | 'newsletter'>('overview');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Order Search & Filter
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  
  // Verification Modal
  const [verifyingOrder, setVerifyingOrder] = useState<Order | null>(null);
  const [adminNote, setAdminNote] = useState('');

  // Add Product Form Modal
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<'men' | 'women' | 'sneakers' | 'casual'>('men');
  const [newProductPrice, setNewProductPrice] = useState('18500');
  const [newProductStock, setNewProductStock] = useState('15');
  const [newProductDesc, setNewProductDesc] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsRes, ordersRes, productsRes, contactRes, newsRes] = await Promise.all([
        fetch('/api/admin/stats').then(r => r.json()),
        fetch('/api/orders').then(r => r.json()),
        fetch('/api/products').then(r => r.json()),
        fetch('/api/contact').then(r => r.json()),
        fetch('/api/newsletter').then(r => r.json())
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (ordersRes.success) setOrders(ordersRes.orders || []);
      if (productsRes.success) setProducts(productsRes.products || []);
      if (contactRes.success) setContactMessages(contactRes.messages || []);
      if (newsRes.success) setSubscribers(newsRes.subscribers || []);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          note: `Admin status update: changed to ${newStatus}`
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Order status updated to ${newStatus}`);
        loadData();
      }
    } catch {
      showToast('Failed to update order status');
    }
  };

  const handleVerifyPayment = async (status: 'verified' | 'rejected') => {
    if (!verifyingOrder) return;
    try {
      const res = await fetch(`/api/orders/${verifyingOrder.id}/verify-payment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          adminNotes: adminNote || (status === 'verified' ? 'JazzCash transaction confirmed' : 'Payment rejected')
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`JazzCash payment ${status === 'verified' ? 'Approved' : 'Rejected'}`);
        setVerifyingOrder(null);
        setAdminNote('');
        loadData();
      }
    } catch {
      showToast('Error verifying payment');
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProductName,
          category: newProductCategory,
          price: Number(newProductPrice),
          stockCount: Number(newProductStock),
          description: newProductDesc,
          sizes: [40, 41, 42, 43, 44],
          colors: ['Obsidian Black', 'Travertine Beige'],
          images: ['/src/assets/images/hero_luxury_sneaker_1794183121618.jpg']
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Product "${newProductName}" added to store`);
        setIsAddProductOpen(false);
        setNewProductName('');
        setNewProductDesc('');
        loadData();
      }
    } catch {
      showToast('Failed to create product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this footwear model?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Product removed');
        loadData();
      }
    } catch {
      showToast('Failed to delete product');
    }
  };

  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter !== 'all' && o.status.toLowerCase() !== orderStatusFilter.toLowerCase()) {
      return false;
    }
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.phone.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-[#111111] text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D8C7AE] font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Master Administration Terminal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold mt-1">
            19BeesKicks Operations Center
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Logged in as <strong>{user?.name || 'Administrator'}</strong> · Connected to Live SQLite/Database
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/api/download-zip"
            download="19BeesKicks-complete-project.zip"
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Download Project (.ZIP)</span>
          </a>
          <button
            onClick={() => setIsAddProductOpen(true)}
            className="bg-[#D8C7AE] text-[#111111] px-4 py-2.5 text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Footwear</span>
          </button>
          <button
            onClick={() => setCurrentPage('home')}
            className="border border-white/30 text-white px-4 py-2.5 text-xs uppercase tracking-wider font-medium hover:bg-white/10 transition-colors cursor-pointer"
          >
            Visit Storefront
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#EEEEEC] overflow-x-auto gap-8 text-xs uppercase tracking-widest font-bold">
        {[
          { id: 'overview', label: 'Executive KPIs' },
          { id: 'orders', label: `Orders & Payments (${orders.length})` },
          { id: 'products', label: `Footwear Inventory (${products.length})` },
          { id: 'messages', label: `Contact Inquiries (${contactMessages.length})` },
          { id: 'newsletter', label: `Subscribers (${subscribers.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'border-b-2 border-[#111111] text-[#111111]'
                : 'text-neutral-400 hover:text-neutral-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. OVERVIEW KPI CARDS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 border border-[#EEEEEC] shadow-sm space-y-2">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold block">
                Gross Revenue
              </span>
              <div className="text-2xl font-mono font-bold text-[#111111]">
                {formatPKR(stats?.totalRevenue || 0)}
              </div>
              <span className="text-[11px] text-emerald-700 font-medium">Processed via JazzCash & COD</span>
            </div>

            <div className="bg-white p-6 border border-[#EEEEEC] shadow-sm space-y-2">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold block">
                Total Orders
              </span>
              <div className="text-2xl font-mono font-bold text-[#111111]">
                {stats?.totalOrders || orders.length}
              </div>
              <span className="text-[11px] text-neutral-500">
                {orders.filter(o => o.status === 'Delivered').length} Delivered Nationwide
              </span>
            </div>

            <div className="bg-white p-6 border border-[#EEEEEC] shadow-sm space-y-2">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold block">
                Pending JazzCash Verifications
              </span>
              <div className="text-2xl font-mono font-bold text-amber-600">
                {orders.filter(o => o.payment.method === 'jazzcash' && o.payment.status === 'pending').length}
              </div>
              <span className="text-[11px] text-amber-700">Requires manual audit</span>
            </div>

            <div className="bg-white p-6 border border-[#EEEEEC] shadow-sm space-y-2">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold block">
                Footwear Catalog
              </span>
              <div className="text-2xl font-mono font-bold text-[#111111]">
                {products.length} Models
              </div>
              <span className="text-[11px] text-neutral-500">
                {products.filter(p => p.stockCount <= 10).length} models low stock
              </span>
            </div>
          </div>

          {/* Quick Pending Verifications Box */}
          <div className="bg-[#FAF8F5] border border-[#D8C7AE] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-serif-luxury font-bold text-[#111111]">
                  JazzCash Manual Verification Queue
                </h3>
                <p className="text-xs text-neutral-600">
                  Orders awaiting cross-reference with Abdul Samad (03238917805) statement.
                </p>
              </div>
              <span className="bg-[#111111] text-white text-xs px-2.5 py-1 font-mono">
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
                        Audit & Verify
                      </button>
                    </div>
                  </div>
                ))}
              {orders.filter(o => o.payment.method === 'jazzcash' && o.payment.status === 'pending').length === 0 && (
                <div className="py-4 text-xs text-neutral-500 italic">
                  All pending JazzCash transactions have been audited. No pending verifications.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 border border-[#EEEEEC]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="text"
                value={orderSearch}
                onChange={e => setOrderSearch(e.target.value)}
                placeholder="Search orders by 19BK ID, customer name, or phone..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8F8F6] border border-[#EEEEEC] outline-none"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-400 uppercase font-semibold">Status:</span>
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
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="bg-white border border-[#EEEEEC] overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50 border-b border-[#EEEEEC] uppercase font-bold text-neutral-500">
                  <th className="p-3">Order Number</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Destination</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Delivery Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEC]">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-neutral-50/60">
                    <td className="p-3 font-mono font-bold text-[#111111]">
                      {order.orderNumber}
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-neutral-800">{order.customer.fullName}</div>
                      <div className="text-neutral-500 font-mono text-[11px]">{order.customer.phone}</div>
                    </td>
                    <td className="p-3 text-neutral-600">
                      {order.customer.city}
                    </td>
                    <td className="p-3">
                      {order.items.length} pair{order.items.length > 1 ? 's' : ''}
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
                        onChange={e => handleUpdateStatus(order.id, e.target.value as any)}
                        className="bg-[#F8F8F6] border border-[#EEEEEC] p-1 text-xs font-semibold cursor-pointer"
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
                    <td className="p-3 text-right space-x-1">
                      {order.payment.method === 'jazzcash' && order.payment.status === 'pending' && (
                        <button
                          onClick={() => setVerifyingOrder(order)}
                          className="bg-[#111111] text-white px-2.5 py-1 text-[11px] uppercase font-bold hover:bg-[#333333] cursor-pointer"
                        >
                          Verify JazzCash
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. PRODUCTS INVENTORY */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 border border-[#EEEEEC]">
            <div>
              <h3 className="text-sm font-bold text-[#111111]">Catalog Inventory</h3>
              <p className="text-xs text-neutral-500">Manage stock quantities, prices, and active listings.</p>
            </div>
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="bg-[#111111] text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#333333] cursor-pointer"
            >
              + Add Footwear
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(prod => (
              <div key={prod.id} className="bg-white border border-[#EEEEEC] p-4 flex gap-4">
                <img src={prod.images[0]} alt="" className="w-24 h-24 object-cover bg-neutral-100 shrink-0 border" />
                <div className="flex-1 flex flex-col justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">{prod.category}</span>
                    <h4 className="font-bold text-sm text-[#111111] line-clamp-1">{prod.name}</h4>
                    <div className="font-mono font-bold mt-1">{formatPKR(prod.price)}</div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#EEEEEC]">
                    <span className={`text-[11px] font-semibold ${prod.stockCount <= 5 ? 'text-rose-600' : 'text-neutral-600'}`}>
                      Stock: {prod.stockCount} pairs
                    </span>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="text-neutral-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. CONTACT INQUIRIES */}
      {activeTab === 'messages' && (
        <div className="bg-white border border-[#EEEEEC] p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#111111]">Customer Inquiries & Messages</h3>
          {contactMessages.length === 0 ? (
            <p className="text-xs text-neutral-500 italic">No customer inquiries submitted yet.</p>
          ) : (
            <div className="divide-y divide-[#EEEEEC] space-y-4">
              {contactMessages.map((msg, idx) => (
                <div key={idx} className="pt-4 first:pt-0 space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-neutral-800">
                    <span>{msg.name} ({msg.email} · {msg.phone})</span>
                    <span className="font-mono text-neutral-400 font-normal">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-neutral-600 font-semibold">{msg.subject}</div>
                  <p className="text-neutral-700 bg-[#F8F8F6] p-3 border border-[#EEEEEC]">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. NEWSLETTER SUBSCRIBERS */}
      {activeTab === 'newsletter' && (
        <div className="bg-white border border-[#EEEEEC] p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#111111]">VIP Newsletter Subscribers ({subscribers.length})</h3>
          <div className="divide-y divide-[#EEEEEC] max-h-96 overflow-y-auto">
            {subscribers.map((sub, i) => (
              <div key={i} className="py-2.5 flex justify-between text-xs text-neutral-700">
                <span className="font-mono">{sub.email}</span>
                <span className="text-neutral-400">{new Date(sub.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* JAZZCASH VERIFICATION MODAL */}
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
              <button
                onClick={() => setVerifyingOrder(null)}
                className="text-neutral-400 hover:text-black cursor-pointer"
              >
                ✕
              </button>
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
              {verifyingOrder.payment.screenshotUrl && (
                <div className="pt-2">
                  <span className="text-neutral-500 block mb-1">Attached Payment Screenshot:</span>
                  <img
                    src={verifyingOrder.payment.screenshotUrl}
                    alt="Payment Screenshot"
                    className="max-h-48 rounded border object-contain"
                  />
                </div>
              )}
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
                onClick={() => handleVerifyPayment('verified')}
                className="flex-1 bg-emerald-700 text-white py-2.5 text-xs uppercase font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Approve Payment (Mark Paid)
              </button>
              <button
                type="button"
                onClick={() => handleVerifyPayment('rejected')}
                className="flex-1 bg-rose-700 text-white py-2.5 text-xs uppercase font-bold hover:bg-rose-800 transition-colors cursor-pointer"
              >
                Reject Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateProduct} className="bg-white border border-[#EEEEEC] max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start pb-3 border-b border-[#EEEEEC]">
              <h3 className="text-lg font-serif-luxury font-bold text-[#111111]">
                Add New Footwear Model
              </h3>
              <button
                type="button"
                onClick={() => setIsAddProductOpen(false)}
                className="text-neutral-400 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Product Name *</label>
              <input
                type="text"
                required
                value={newProductName}
                onChange={e => setNewProductName(e.target.value)}
                placeholder="e.g. Aurelius Low-Top Court"
                className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Category</label>
                <select
                  value={newProductCategory}
                  onChange={e => setNewProductCategory(e.target.value as any)}
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs outline-none"
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="sneakers">Sneakers</option>
                  <option value="casual">Casual</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Price (PKR) *</label>
                <input
                  type="number"
                  required
                  value={newProductPrice}
                  onChange={e => setNewProductPrice(e.target.value)}
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Stock Count</label>
                <input
                  type="number"
                  required
                  value={newProductStock}
                  onChange={e => setNewProductStock(e.target.value)}
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase font-semibold text-neutral-700 block mb-1">Description</label>
              <textarea
                rows={2}
                value={newProductDesc}
                onChange={e => setNewProductDesc(e.target.value)}
                placeholder="Handcrafted Italian calfskin leather with cushioned sole."
                className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs outline-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-[#111111] text-white py-2.5 text-xs uppercase tracking-wider font-bold hover:bg-[#333333] cursor-pointer"
              >
                Save Footwear to Database
              </button>
              <button
                type="button"
                onClick={() => setIsAddProductOpen(false)}
                className="border border-[#EEEEEC] px-4 py-2.5 text-xs uppercase cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
