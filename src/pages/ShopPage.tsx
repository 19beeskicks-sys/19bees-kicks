import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, RotateCcw, Search } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, categories, selectedCollection, setSelectedCollection, formatPKR } = useShop();

  const [categoryFilter, setCategoryFilter] = useState<string>(selectedCollection || 'all');
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('latest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Available filter options derived dynamically
  const allSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
  const allColors = ['Black', 'White', 'Beige', 'Caramel', 'Champagne', 'Cream'];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category / Collection
      if (categoryFilter !== 'all') {
        if (categoryFilter === 'bestsellers' && !p.isBestSeller) return false;
        else if (categoryFilter === 'newarrivals' && !p.isNewArrival) return false;
        else if (!['bestsellers', 'newarrivals'].includes(categoryFilter) && p.category !== categoryFilter) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesColor = p.colors.some(c => c.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesColor) return false;
      }

      // Price
      if (p.price > maxPrice) return false;

      // Size
      if (selectedSize && !p.sizes.includes(selectedSize)) return false;

      // Color
      if (selectedColor && !p.colors.some(c => c.toLowerCase().includes(selectedColor.toLowerCase()))) return false;

      // Stock
      if (onlyInStock && (!p.inStock || p.stockCount <= 0)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'popularity') return b.reviewCount - a.reviewCount;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [products, categoryFilter, searchQuery, maxPrice, selectedSize, selectedColor, onlyInStock, sortBy]);

  const resetFilters = () => {
    setCategoryFilter('all');
    setSelectedCollection(null);
    setSelectedSize(null);
    setSelectedColor(null);
    setMaxPrice(30000);
    setOnlyInStock(false);
    setSearchQuery('');
    setSortBy('latest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Title & Breadcrumb */}
      <div className="mb-8 pb-4 border-b border-[#EEEEEC] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold block mb-1">
            Footwear Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#111111]">
            Explore All Footwear
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Showing {filteredProducts.length} handcrafted models
          </p>
        </div>

        {/* Controls: Search, Sort, Mobile filter toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search catalog..."
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-[#EEEEEC] text-[#111111] outline-none focus:border-[#111111] transition-colors"
            />
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-600 bg-white border border-[#EEEEEC] px-3 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="outline-none bg-transparent text-xs text-[#111111] cursor-pointer"
            >
              <option value="latest">Sort: Latest Additions</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="popularity">Popularity / Reviews</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-1.5 text-xs font-semibold uppercase bg-neutral-900 text-white px-3 py-1.5 cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR FILTERS (Desktop + collapsible on mobile) */}
        <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-8 bg-white p-6 border border-[#EEEEEC] h-fit`}>
          <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEC]">
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#111111]">
              Refine Search
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] text-neutral-500 hover:text-[#111111] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-neutral-400 block">
              Categories
            </label>
            <div className="flex flex-col space-y-1 text-xs">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`text-left py-1.5 px-2 text-xs transition-colors cursor-pointer flex justify-between ${
                  categoryFilter === 'all'
                    ? 'bg-[#111111] text-white font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span>All Footwear</span>
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.slug)}
                  className={`text-left py-1.5 px-2 text-xs transition-colors cursor-pointer flex justify-between ${
                    categoryFilter === cat.slug
                      ? 'bg-[#111111] text-white font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
              <button
                onClick={() => setCategoryFilter('bestsellers')}
                className={`text-left py-1.5 px-2 text-xs transition-colors cursor-pointer flex justify-between ${
                  categoryFilter === 'bestsellers'
                    ? 'bg-[#111111] text-white font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span>Best Sellers</span>
              </button>
              <button
                onClick={() => setCategoryFilter('newarrivals')}
                className={`text-left py-1.5 px-2 text-xs transition-colors cursor-pointer flex justify-between ${
                  categoryFilter === 'newarrivals'
                    ? 'bg-[#111111] text-white font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span>New Arrivals</span>
              </button>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 pt-4 border-t border-[#EEEEEC]">
            <div className="flex justify-between items-center text-xs">
              <label className="uppercase tracking-wider font-semibold text-neutral-400">
                Max Price
              </label>
              <span className="font-mono font-bold text-[#111111]">
                {formatPKR(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="30000"
              step="1000"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#111111] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
              <span>PKR 10k</span>
              <span>PKR 30k</span>
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-2 pt-4 border-t border-[#EEEEEC]">
            <div className="flex justify-between items-center">
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
                Size (EU)
              </label>
              {selectedSize && (
                <button
                  onClick={() => setSelectedSize(null)}
                  className="text-[10px] text-neutral-500 hover:text-black cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {allSizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(selectedSize === s ? null : s)}
                  className={`py-1.5 text-xs font-mono font-medium border text-center transition-colors cursor-pointer ${
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

          {/* Color Filter */}
          <div className="space-y-2 pt-4 border-t border-[#EEEEEC]">
            <div className="flex justify-between items-center">
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
                Color Palette
              </label>
              {selectedColor && (
                <button
                  onClick={() => setSelectedColor(null)}
                  className="text-[10px] text-neutral-500 hover:text-black cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {allColors.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(selectedColor === c ? null : c)}
                  className={`px-2.5 py-1 text-xs border transition-colors cursor-pointer ${
                    selectedColor === c
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'border-[#EEEEEC] text-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Checkbox */}
          <div className="pt-4 border-t border-[#EEEEEC]">
            <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={e => setOnlyInStock(e.target.checked)}
                className="accent-[#111111] cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 text-center border border-[#EEEEEC] space-y-4">
              <h3 className="text-lg font-serif-luxury font-bold text-[#111111]">
                No footwear matched your criteria
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try widening your price range, clearing selected sizes, or resetting all filters.
              </p>
              <button
                onClick={resetFilters}
                className="bg-[#111111] text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
