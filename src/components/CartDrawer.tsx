import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    formatPKR,
    setCurrentPage
  } = useShop();

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 15000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const diffToFree = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const handleViewFullCart = () => {
    setIsCartOpen(false);
    setCurrentPage('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#EEEEEC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#111111]" />
              <h2 className="text-lg font-serif-luxury font-bold tracking-wider text-[#111111]">
                Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-400 hover:text-[#111111] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#F8F8F6] p-4 border-b border-[#EEEEEC]">
            <div className="text-xs text-neutral-600 mb-1.5 flex justify-between">
              {diffToFree === 0 ? (
                <span className="font-semibold text-emerald-800">You unlocked FREE Express Shipping in Pakistan!</span>
              ) : (
                <span>Add <strong>{formatPKR(diffToFree)}</strong> more for FREE shipping</span>
              )}
              <span className="font-mono text-neutral-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#EEEEEC] h-1.5 overflow-hidden">
              <div
                className="bg-[#111111] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="w-12 h-12 text-neutral-300 mb-4 stroke-1" />
                <h3 className="text-base font-serif-luxury font-medium text-[#111111] mb-2">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mb-6">
                  Explore our handcrafted luxury footwear collections designed for everyday comfort and style.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentPage('shop');
                  }}
                  className="bg-[#111111] text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors cursor-pointer"
                >
                  Explore Footwear
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.productId}-${item.size}-${item.color}-${idx}`} className="flex gap-4 pb-6 border-b border-[#EEEEEC] last:border-b-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover bg-[#EEEEEC] shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-semibold text-[#111111] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.productId, item.size, item.color)}
                          className="text-neutral-400 hover:text-rose-600 p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        Size: <strong className="text-neutral-800">EU {item.size}</strong> · Color: <strong className="text-neutral-800">{item.color}</strong>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-[#EEEEEC]">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-0.5 text-xs font-mono font-medium text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-mono font-bold text-[#111111]">
                        {formatPKR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F8F8F6] border-t border-[#EEEEEC] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-[#111111]">{formatPKR(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping in Pakistan</span>
                  <span className="font-mono font-semibold text-[#111111]">
                    {cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE' : formatPKR(250)}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#EEEEEC] flex justify-between text-sm font-bold text-[#111111]">
                  <span>Total Due</span>
                  <span className="font-mono text-base">
                    {formatPKR(cartSubtotal + (cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 250))}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#111111] text-white py-3 px-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#D8C7AE]" />
                </button>
                <button
                  onClick={handleViewFullCart}
                  className="w-full border border-[#111111] text-[#111111] py-2.5 px-4 text-xs uppercase tracking-widest font-semibold hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  View Full Cart
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Verified JazzCash, COD & Bank Transfer Protected</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
