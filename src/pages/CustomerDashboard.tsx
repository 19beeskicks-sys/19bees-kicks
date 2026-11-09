import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';
import { User, Package, MapPin, Truck, LogOut, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { user, logout, setCurrentPage, formatPKR, setActiveTrackingOrder } = useShop();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/orders?userId=${encodeURIComponent(user?.id || '')}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error('Failed to load user orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-serif-luxury font-bold text-[#111111] mb-2">Please Sign In</h2>
        <p className="text-xs text-neutral-500 mb-6">Sign in to access your order history, delivery addresses, and VIP perks.</p>
        <button
          onClick={() => setCurrentPage('auth')}
          className="bg-[#111111] text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner */}
      <div className="bg-white border border-[#EEEEEC] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#111111] text-[#D8C7AE] rounded-full flex items-center justify-center font-bold text-xl font-serif-luxury">
            {user.name.charAt(0)}
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">Client Profile</span>
            <h1 className="text-2xl font-serif-luxury font-bold text-[#111111]">{user.name}</h1>
            <p className="text-xs text-neutral-500">{user.email} · {user.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user.role === 'admin' && (
            <button
              onClick={() => setCurrentPage('admin')}
              className="bg-[#D8C7AE] text-[#111111] px-4 py-2 text-xs uppercase font-bold hover:bg-white border border-neutral-300 transition-colors cursor-pointer"
            >
              Open Admin Console
            </button>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 border border-[#EEEEEC] px-4 py-2 text-xs uppercase font-semibold text-neutral-600 hover:text-black hover:border-black transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Orders History (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#EEEEEC] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEC]">
            <h2 className="text-base font-serif-luxury font-bold text-[#111111] flex items-center gap-2">
              <Package className="w-4 h-4 text-neutral-700" />
              <span>Your Orders ({orders.length})</span>
            </h2>
            <button
              onClick={() => setCurrentPage('shop')}
              className="text-xs text-neutral-500 hover:text-black cursor-pointer"
            >
              Shop New Footwear
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-neutral-400">Loading order history...</div>
          ) : orders.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Package className="w-10 h-10 text-neutral-300 mx-auto stroke-1" />
              <p className="text-xs text-neutral-500">You haven't placed any footwear orders yet.</p>
              <button
                onClick={() => setCurrentPage('shop')}
                className="bg-[#111111] text-white px-5 py-2 text-xs uppercase font-semibold"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6 divide-y divide-[#EEEEEC]">
              {orders.map(order => (
                <div key={order.id} className="pt-6 first:pt-0 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-mono font-bold text-sm text-[#111111]">{order.orderNumber}</span>
                      <span className="text-neutral-400 ml-2">
                        {new Date(order.createdAt).toLocaleDateString('en-PK', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-0.5 text-[11px] font-bold uppercase ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {order.status}
                      </span>
                      <button
                        onClick={() => setActiveTrackingOrder(order.orderNumber)}
                        className="text-xs text-[#8C7A5E] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Track</span>
                      </button>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs bg-[#F8F8F6] p-3 border border-[#EEEEEC]">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt="" className="w-12 h-12 object-cover bg-neutral-200" />
                          <div>
                            <div className="font-semibold text-[#111111]">{item.productName}</div>
                            <div className="text-neutral-500">EU Size {item.size} · Color: {item.color} · Qty: {item.quantity}</div>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-[#111111]">{formatPKR(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-neutral-500">
                      Payment: <strong className="uppercase text-neutral-800">{order.payment.method}</strong> ({order.payment.status})
                    </span>
                    <span className="font-mono font-bold text-sm text-[#111111]">
                      Total: {formatPKR(order.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Saved Address & Support (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#EEEEEC] p-6 space-y-4 shadow-sm text-xs">
            <h3 className="text-sm font-serif-luxury font-bold text-[#111111] pb-2 border-b border-[#EEEEEC] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-neutral-600" />
              <span>Default Delivery Address</span>
            </h3>

            {user.address ? (
              <div className="space-y-1 text-neutral-600">
                <p className="font-semibold text-neutral-900">{user.name}</p>
                <p>{user.address.street}</p>
                <p>{user.address.city} {user.address.postalCode}</p>
                <p>Phone: {user.phone}</p>
              </div>
            ) : (
              <p className="text-neutral-500 italic">No saved address yet. It will be added upon your next checkout.</p>
            )}
          </div>

          <div className="bg-[#FAF8F5] border border-[#D8C7AE] p-6 space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-[#111111]">
              <ShieldCheck className="w-4 h-4 text-[#8C7A5E]" />
              <span>Client Concierge Support</span>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Have questions regarding sizing, custom fittings, or shipment dispatch?
            </p>
            <a
              href="https://wa.me/923282158299"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#111111] text-white px-4 py-2 text-xs font-semibold hover:bg-[#333333] transition-colors"
            >
              WhatsApp Concierge (+92 328 2158299)
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
