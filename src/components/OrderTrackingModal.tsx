import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';
import { X, Search, CheckCircle2, Clock, Truck, Package, ShieldCheck, MapPin } from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const { activeTrackingOrder, setActiveTrackingOrder, formatPKR } = useShop();
  const [searchInput, setSearchInput] = useState('');
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTrackingOrder && activeTrackingOrder !== 'open-tracker') {
      fetchOrder(activeTrackingOrder);
    }
  }, [activeTrackingOrder]);

  const fetchOrder = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/orders/${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (res.ok && data.success && data.order) {
        setOrderData(data.order);
      } else {
        setError(`No active order found for reference "${query}". Please check your order ID or phone.`);
        setOrderData(null);
      }
    } catch {
      setError('Failed to reach tracking server. Please try again.');
      setOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchOrder(searchInput);
    }
  };

  if (!activeTrackingOrder) return null;

  const STATUS_STEPS = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const currentStatusIndex = orderData ? STATUS_STEPS.indexOf(orderData.status) : -1;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] w-full max-w-2xl border border-[#EEEEEC] shadow-2xl relative my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-[#EEEEEC] flex items-center justify-between bg-[#F8F8F6]">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">19BeesKicks Courier Network</span>
            <h2 className="text-xl font-serif-luxury font-bold text-[#111111]">Order Tracking & Live Status</h2>
          </div>
          <button
            onClick={() => {
              setActiveTrackingOrder(null);
              setOrderData(null);
              setError(null);
            }}
            className="p-2 text-neutral-400 hover:text-[#111111] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Lookup Input */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Enter 19BK Order ID (e.g. 19BK-2026-8901)"
                className="w-full bg-[#F8F8F6] border border-[#EEEEEC] pl-10 pr-4 py-2.5 text-sm text-[#111111] outline-none focus:border-[#111111] transition-colors font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#111111] text-white px-5 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Locating...' : 'Track'}
            </button>
          </form>

          {/* Quick Demo Selector */}
          {!orderData && (
            <div className="text-xs text-neutral-500 bg-neutral-50 p-3 border border-[#EEEEEC]">
              <span className="font-semibold text-neutral-800">Quick Test Order IDs: </span>
              <button
                type="button"
                onClick={() => {
                  setSearchInput('19BK-2026-8901');
                  fetchOrder('19BK-2026-8901');
                }}
                className="underline text-[#8C7A5E] hover:text-[#111111] mx-1 cursor-pointer"
              >
                19BK-2026-8901 (JazzCash)
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  setSearchInput('19BK-2026-7812');
                  fetchOrder('19BK-2026-7812');
                }}
                className="underline text-[#8C7A5E] hover:text-[#111111] mx-1 cursor-pointer"
              >
                19BK-2026-7812 (COD Shipped)
              </button>
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {error}
            </div>
          )}

          {/* Order Found Details */}
          {orderData && (
            <div className="space-y-6">
              {/* Order Reference Top Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#F8F8F6] border border-[#EEEEEC]">
                <div>
                  <div className="text-xs text-neutral-500">Order Reference</div>
                  <div className="text-lg font-mono font-bold text-[#111111]">{orderData.orderNumber}</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500">Payment Status</div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase">
                    <span className={`inline-block w-2 h-2 rounded-full ${
                      orderData.payment.status === 'verified' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`} />
                    <span>{orderData.payment.method.toUpperCase()} ({orderData.payment.status})</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500">Order Total</div>
                  <div className="text-base font-mono font-bold text-[#111111]">{formatPKR(orderData.total)}</div>
                </div>
              </div>

              {/* Visual Progress Timeline */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-4">
                  Shipment Progress Timeline
                </h4>
                <div className="relative flex items-center justify-between">
                  {/* Connecting track line */}
                  <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-[#EEEEEC] -z-0" />
                  <div
                    className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-[#111111] -z-0 transition-all duration-500"
                    style={{
                      width: `${(Math.max(0, currentStatusIndex) / (STATUS_STEPS.length - 1)) * 100}%`
                    }}
                  />

                  {STATUS_STEPS.map((step, idx) => {
                    const isDone = idx <= currentStatusIndex;
                    const isCurrent = idx === currentStatusIndex;
                    return (
                      <div key={step} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            isDone
                              ? 'bg-[#111111] text-[#FFFFFF]'
                              : 'bg-[#EEEEEC] text-neutral-400 border border-neutral-300'
                          } ${isCurrent ? 'ring-4 ring-[#D8C7AE]' : ''}`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className={`text-[10px] mt-2 tracking-wider uppercase font-semibold ${
                          isCurrent ? 'text-[#111111]' : 'text-neutral-400'
                        }`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status History Logs */}
              <div className="border-t border-[#EEEEEC] pt-4">
                <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-3">
                  Tracking Updates
                </h4>
                <div className="space-y-2">
                  {orderData.statusHistory.map((hist, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs p-2.5 bg-neutral-50 border border-[#EEEEEC]">
                      <Truck className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between font-semibold text-neutral-800">
                          <span>{hist.status}</span>
                          <span className="font-mono text-[11px] text-neutral-400">
                            {new Date(hist.timestamp).toLocaleDateString('en-PK', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-neutral-600 mt-0.5">{hist.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destination Address & Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#F8F8F6] p-4 border border-[#EEEEEC]">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-neutral-700 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Delivery Address</span>
                  </div>
                  <p className="text-neutral-600">
                    {orderData.customer.fullName}<br />
                    {orderData.customer.address}, {orderData.customer.city}<br />
                    Phone: {orderData.customer.phone}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 font-bold text-neutral-700 mb-1">
                    <Package className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Ordered Footwear ({orderData.items.length})</span>
                  </div>
                  <div className="space-y-1">
                    {orderData.items.map((item, idx) => (
                      <div key={idx} className="text-neutral-600 flex justify-between">
                        <span>{item.productName} (EU {item.size})</span>
                        <span className="font-mono font-medium">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8F8F6] border-t border-[#EEEEEC] flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-neutral-700" />
            <span>Support: WhatsApp +92 328 2158299</span>
          </div>
          <button
            onClick={() => setActiveTrackingOrder(null)}
            className="text-xs uppercase tracking-wider font-semibold text-[#111111] hover:underline cursor-pointer"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
