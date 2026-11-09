import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

export const MenCollectionPage: React.FC = () => {
  const { products, formatPKR } = useShop();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('latest');

  const menProducts = useMemo(() => {
    return products
      .filter(p => p.category === 'men' || p.category === 'sneakers' || p.category === 'casual')
      .filter(p => !selectedSize || p.sizes.includes(selectedSize))
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, selectedSize, sortBy]);

  return (
    <div className="space-y-12 pb-20">
      
      {/* Editorial Men's Banner */}
      <div className="bg-[#111111] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D8C7AE] font-semibold block mb-2">
            The Gentleman's Wardrobe
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold">
            Men's Luxury Footwear Collection
          </h1>
          <p className="text-sm text-neutral-300 max-w-xl mt-3 font-light leading-relaxed">
            Architectural low-top sneakers, calfskin court shoes, and hand-burnished casual hybrids engineered for quiet elegance and daily endurance.
          </p>
        </div>
      </div>

      {/* Filter Bar & Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#EEEEEC]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">Filter Size:</span>
            <div className="flex gap-1">
              {[40, 41, 42, 43, 44, 45].map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(selectedSize === s ? null : s)}
                  className={`px-2.5 py-1 text-xs font-mono font-medium border transition-colors cursor-pointer ${
                    selectedSize === s
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'border-[#EEEEEC] text-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="outline-none bg-white border border-[#EEEEEC] px-3 py-1.5 text-xs text-[#111111] cursor-pointer"
            >
              <option value="latest">Sort: Latest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

    </div>
  );
};
