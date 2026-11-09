import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, setCurrentPage, addToCart } = useShop();

  const handleMoveAllToCart = () => {
    wishlist.forEach(item => {
      const defaultSize = item.sizes[0] || 42;
      const defaultColor = item.colors[0] || 'Default';
      addToCart(item, defaultSize, defaultColor, 1);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="pb-4 border-b border-[#EEEEEC] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold block mb-1">
            Personal Registry
          </span>
          <h1 className="text-3xl font-serif-luxury font-bold text-[#111111]">
            Saved Wishlist ({wishlist.length})
          </h1>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={handleMoveAllToCart}
            className="bg-[#111111] text-white px-5 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D8C7AE]" />
            <span>Move All to Bag</span>
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white border border-[#EEEEEC] p-16 text-center max-w-lg mx-auto space-y-4">
          <Heart className="w-12 h-12 text-neutral-300 mx-auto stroke-1" />
          <h2 className="text-xl font-serif-luxury font-bold text-[#111111]">
            Your wishlist is empty
          </h2>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Save your favorite pairs while browsing our handcrafted footwear so you can easily review them later or move them to your bag.
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-[#111111] text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
