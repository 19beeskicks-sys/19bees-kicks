import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { viewProduct, addToCart, toggleWishlist, isInWishlist, formatPKR } = useShop();
  const wishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 42;
    const defaultColor = product.colors[0] || 'Default';
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={() => viewProduct(product.id)}
      className="group flex flex-col bg-[#FFFFFF] border border-[#EEEEEC] transition-all duration-300 hover:border-[#D8C7AE]/60 hover:shadow-lg cursor-pointer relative"
    >
      {/* Top badges: limited to at most 1 subtle text tag */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
        {product.isNewArrival && (
          <span className="text-[10px] uppercase tracking-widest font-bold bg-[#111111] text-white px-2 py-0.5">
            New Arrival
          </span>
        )}
        {!product.isNewArrival && product.isBestSeller && (
          <span className="text-[10px] uppercase tracking-widest font-bold bg-[#D8C7AE] text-[#111111] px-2 py-0.5">
            Best Seller
          </span>
        )}
      </div>

      {/* Wishlist toggle */}
      <button
        type="button"
        onClick={handleWishlistClick}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-[#111111] hover:text-rose-600 transition-colors shadow-sm cursor-pointer"
      >
        <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
      </button>

      {/* Product Image area: 65%-75% of card height */}
      <div className="relative aspect-[4/3] bg-[#EEEEEC] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover action overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex-1 bg-[#FFFFFF] text-[#111111] py-2 px-3 text-xs uppercase tracking-wider font-semibold hover:bg-[#D8C7AE] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Add
          </button>
          <button
            type="button"
            onClick={() => viewProduct(product.id)}
            className="bg-[#111111] text-[#FFFFFF] p-2 hover:bg-[#333333] transition-colors cursor-pointer shadow"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Body with Clean Unboxed Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category unboxed text with separator */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 font-medium mb-1.5">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.colors.length} Color{product.colors.length > 1 ? 's' : ''}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-semibold text-[#111111] group-hover:text-[#8C7A5E] transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>
        </div>

        <div>
          {/* Sizes preview */}
          <div className="flex items-center gap-1 text-[11px] text-neutral-500 mb-3">
            <span className="font-medium text-neutral-400">EU:</span>
            <span>{product.sizes.slice(0, 4).join(', ')}{product.sizes.length > 4 ? '...' : ''}</span>
          </div>

          {/* Price display with tabular numerals */}
          <div className="flex items-baseline justify-between pt-2 border-t border-[#EEEEEC]">
            <div className="flex items-baseline gap-2 font-mono tabular-nums">
              <span className="text-base font-bold text-[#111111]">
                {formatPKR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-neutral-400 line-through">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
            </div>

            <span className={`text-[11px] uppercase tracking-wider font-semibold ${product.inStock ? 'text-emerald-700' : 'text-neutral-400'}`}>
              {product.inStock ? 'In Stock' : 'Sold Out'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
