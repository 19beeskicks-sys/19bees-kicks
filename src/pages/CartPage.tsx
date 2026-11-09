import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, ArrowRight, ArrowLeft, ShieldCheck, ShoppingBag } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    formatPKR,
    setCurrentPage,
    showToast
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const FREE_SHIPPING_THRESHOLD = 15000;
  const shipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : (cart.length > 0 ? 250 : 0);
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shipping);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === '19BEES' || code === 'VIP10') {
      setDiscountPercent(10);
      showToast('10% VIP Luxury voucher applied!');
    } else {
      showToast('Invalid coupon code. Try "19BEES"');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto bg-white p-12 border border-[#EEEEEC] space-y-4 shadow-sm">
          <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto stroke-1" />
          <h1 className="text-2xl font-serif-luxury font-bold text-[#111111]">
            Your shopping bag is empty
          </h1>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Discover our collection of handcrafted leather sneakers and casual loafers engineered for modern luxury.
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-[#111111] text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors cursor-pointer"
          >
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold block mb-1">
          Review Order
        </span>
        <h1 className="text-3xl font-serif-luxury font-bold text-[#111111]">
          Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Items Table / List */}
        <div className="lg:col-span-8 bg-white border border-[#EEEEEC] p-6 space-y-6">
          <div className="hidden sm:grid grid-cols-12 text-xs uppercase tracking-wider font-bold text-neutral-400 pb-3 border-b border-[#EEEEEC]">
            <span className="col-span-6">Footwear Model</span>
            <span className="col-span-2 text-center">Size / Color</span>
            <span className="col-span-2 text-center">Quantity</span>
            <span className="col-span-2 text-right">Total</span>
          </div>

          <div className="divide-y divide-[#EEEEEC]">
            {cart.map((item, idx) => (
              <div key={`${item.productId}-${item.size}-${item.color}-${idx}`} className="py-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
                
                {/* Product info */}
                <div className="w-full sm:col-span-6 flex gap-4 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover bg-[#EEEEEC] shrink-0 border border-[#EEEEEC]"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-[#111111]">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-neutral-500 font-mono mt-0.5">
                      {formatPKR(item.product.price)} each
                    </p>
                    <button
                      onClick={() => removeFromCart(item.productId, item.size, item.color)}
                      className="text-xs text-neutral-400 hover:text-rose-600 mt-2 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Size / Color */}
                <div className="sm:col-span-2 text-center text-xs">
                  <div className="font-semibold text-neutral-800">EU {item.size}</div>
                  <div className="text-neutral-500 text-[11px]">{item.color}</div>
                </div>

                {/* Quantity Stepper */}
                <div className="sm:col-span-2 flex justify-center">
                  <div className="flex items-center border border-[#EEEEEC]">
                    <button
                      onClick={() => updateCartQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                      className="px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-mono font-bold text-[#111111]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                      className="px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="sm:col-span-2 text-right font-mono font-bold text-sm text-[#111111]">
                  {formatPKR(item.product.price * item.quantity)}
                </div>

              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#EEEEEC] flex justify-between items-center">
            <button
              onClick={() => setCurrentPage('shop')}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-neutral-600 hover:text-[#111111] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#EEEEEC] p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-serif-luxury font-bold text-[#111111] pb-3 border-b border-[#EEEEEC]">
              Order Summary
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Items Subtotal</span>
                <span className="font-mono font-semibold text-[#111111]">{formatPKR(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>VIP Discount (10%)</span>
                  <span className="font-mono font-semibold">-{formatPKR(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span>Shipping in Pakistan</span>
                <span className="font-mono font-semibold text-[#111111]">
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase">Free</span>
                  ) : (
                    formatPKR(shipping)
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-[#EEEEEC] flex justify-between text-base font-bold text-[#111111]">
                <span>Grand Total</span>
                <span className="font-mono text-lg">{formatPKR(grandTotal)}</span>
              </div>
            </div>

            {/* Voucher Code Form */}
            <form onSubmit={handleApplyCoupon} className="pt-3 flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                placeholder="Promo code (e.g. 19BEES)"
                className="flex-1 bg-[#F8F8F6] border border-[#EEEEEC] px-3 py-2 text-xs uppercase font-mono outline-none"
              />
              <button
                type="submit"
                className="bg-[#111111] text-white px-3 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#333333] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {/* Checkout CTA */}
            <button
              onClick={() => setCurrentPage('checkout')}
              className="w-full bg-[#111111] text-white py-4 px-6 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#333333] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#D8C7AE]" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Official JazzCash & Cash on Delivery Verified</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
