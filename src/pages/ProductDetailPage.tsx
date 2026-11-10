import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, Truck, ShieldCheck, ArrowLeft, Check, Sparkles } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentPage,
    formatPKR,
    showToast
  } = useShop();

  const product = products.find(p => p.id === selectedProductId || p.slug === selectedProductId) || products[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number>(product ? product.sizes[0] || 42 : 42);
  const [selectedColor, setSelectedColor] = useState<string>(product ? product.colors[0] || 'Default' : 'Default');
  const [quantity, setQuantity] = useState(1);
  const [reviewTab, setReviewTab] = useState<'details' | 'sizing' | 'reviews'>('details');

  // Customer Review Form
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState([
    {
      name: 'Farhan Zaidi',
      city: 'Lahore',
      rating: 5,
      date: 'March 2026',
      comment: 'The calfskin leather quality exceeded my expectations. Comfortable right out of the box with zero heel blister friction.'
    },
    {
      name: 'Dr. Tariq Alvi',
      city: 'Islamabad',
      rating: 5,
      date: 'February 2026',
      comment: 'Remarkable craftsmanship. Delivered via TCS within 48 hours. JazzCash manual payment confirmation took less than 15 minutes.'
    }
  ]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-neutral-500 mb-4">Footwear model not found.</p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="bg-[#111111] text-white px-6 py-2 text-xs uppercase"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setCurrentPage('checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;
    setReviewsList([
      {
        name: newReviewName,
        city: 'Pakistan',
        rating: newReviewRating,
        date: 'Just now',
        comment: newReviewComment
      },
      ...reviewsList
    ]);
    setNewReviewName('');
    setNewReviewComment('');
    showToast('Thank you! Your verified client review has been recorded.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Back to catalog button */}
      <div>
        <button
          onClick={() => setCurrentPage('shop')}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-neutral-500 hover:text-[#111111] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collection</span>
        </button>
      </div>

      {/* Contiguous Purchase Module (Sticky Gallery Left, Purchase Module Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT: Multi-Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] bg-[#EEEEEC] overflow-hidden border border-[#EEEEEC] relative">
            <img
              src={(product.images[activeImageIdx] || product.images[0])?.startsWith('/') ? `.${product.images[activeImageIdx] || product.images[0]}` : (product.images[activeImageIdx] || product.images[0])}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {product.isNewArrival && (
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-bold bg-[#111111] text-white px-2.5 py-1">
                New Arrival
              </span>
            )}
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 h-20 bg-[#EEEEEC] border-2 overflow-hidden transition-all cursor-pointer ${
                    activeImageIdx === idx ? 'border-[#111111]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img?.startsWith('/') ? `.${img}` : img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 sm:p-8 border border-[#EEEEEC] shadow-sm">
          
          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
              <span>{product.category} Footwear</span>
              <span className="text-amber-600 font-mono">★ {product.rating} ({product.reviewCount} Reviews)</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#111111]">
              {product.name}
            </h1>

            {/* Price with tabular numerals */}
            <div className="mt-3 flex items-baseline gap-3 font-mono tabular-nums">
              <span className="text-2xl font-bold text-[#111111]">
                {formatPKR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-neutral-400 line-through">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-sans uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5">
                  Save {formatPKR(product.originalPrice - product.price)}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="space-y-2 pt-4 border-t border-[#EEEEEC]">
            <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block">
              Color: <span className="font-bold text-[#111111]">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
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

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700">
                Select Size (European Fit)
              </label>
              <button
                onClick={() => setReviewTab('sizing')}
                className="text-[11px] text-neutral-500 hover:text-[#111111] underline cursor-pointer"
              >
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {product.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-2 text-xs font-mono font-semibold border text-center transition-colors cursor-pointer ${
                    selectedSize === s
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'border-[#EEEEEC] text-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Stock Status */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-700">Quantity</span>
              <div className="flex items-center border border-[#EEEEEC]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-mono font-bold text-[#111111]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {product.stockCount <= 0 || !product.inStock ? (
              <span className="text-xs text-rose-700 font-bold flex items-center gap-1 bg-rose-50 px-2 py-1 border border-rose-200">
                <span>Sold Out (Awaiting Atelier Restock)</span>
              </span>
            ) : product.stockCount <= 3 ? (
              <span className="text-xs text-amber-700 font-semibold flex items-center gap-1">
                <span>Low Stock: Only {product.stockCount} left</span>
              </span>
            ) : (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>In Stock ({product.stockCount} pairs available)</span>
              </span>
            )}
          </div>

          {/* Action Buttons: Add to Bag & Buy Now */}
          <div className="space-y-2.5 pt-4">
            {product.stockCount <= 0 || !product.inStock ? (
              <button
                disabled
                className="w-full bg-neutral-300 text-neutral-500 py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-bold cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>Sold Out</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#111111] text-white py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#333333] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D8C7AE]" />
                  <span>Add to Shopping Bag</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-[#D8C7AE] text-[#111111] py-3 px-4 text-xs uppercase tracking-[0.15em] font-bold hover:bg-[#C9B89D] transition-colors cursor-pointer"
                  >
                    Instant Checkout
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 border border-[#EEEEEC] hover:bg-neutral-50 transition-colors cursor-pointer ${
                      wishlisted ? 'text-rose-600' : 'text-neutral-700'
                    }`}
                    title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-[#EEEEEC] space-y-2 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-neutral-700 shrink-0" />
              <span>Complimentary express delivery in Pakistan over PKR 15,000</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-700 shrink-0" />
              <span>Official JazzCash (Abdul Samad: 03238917805) & COD</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs: Specifications, Sizing, Reviews */}
      <div className="bg-white border border-[#EEEEEC] p-6 sm:p-8">
        <div className="flex border-b border-[#EEEEEC] gap-8 mb-6">
          <button
            onClick={() => setReviewTab('details')}
            className={`pb-3 text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer ${
              reviewTab === 'details' ? 'border-b-2 border-[#111111] text-[#111111]' : 'text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Artisanal Specifications
          </button>
          <button
            onClick={() => setReviewTab('sizing')}
            className={`pb-3 text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer ${
              reviewTab === 'sizing' ? 'border-b-2 border-[#111111] text-[#111111]' : 'text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Size Guide & Fit
          </button>
          <button
            onClick={() => setReviewTab('reviews')}
            className={`pb-3 text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer ${
              reviewTab === 'reviews' ? 'border-b-2 border-[#111111] text-[#111111]' : 'text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Client Reviews ({reviewsList.length})
          </button>
        </div>

        {/* Tab 1: Specifications */}
        {reviewTab === 'details' && (
          <div className="space-y-4 max-w-2xl text-xs text-neutral-600">
            <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
              Signature Construction Details
            </h4>
            <ul className="space-y-2 list-disc list-inside">
              {product.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
            <p className="pt-2 text-neutral-500 italic">
              Care Instructions: Store in the included breathable 19Bees cotton dust bag. Treat with neutral leather balm every 3 months.
            </p>
          </div>
        )}

        {/* Tab 2: Size Guide */}
        {reviewTab === 'sizing' && (
          <div className="space-y-4 max-w-2xl text-xs text-neutral-600">
            <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
              Footwear Conversion Table (True to Size)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-[#EEEEEC] font-mono tabular-nums">
                <thead>
                  <tr className="bg-neutral-50 border-b border-[#EEEEEC]">
                    <th className="p-2 font-bold">EU Size</th>
                    <th className="p-2 font-bold">UK Size</th>
                    <th className="p-2 font-bold">US Size</th>
                    <th className="p-2 font-bold">Foot Length (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEC]">
                  <tr><td className="p-2">39</td><td className="p-2">5.5</td><td className="p-2">6.5</td><td className="p-2">24.5 cm</td></tr>
                  <tr><td className="p-2">40</td><td className="p-2">6.0</td><td className="p-2">7.0</td><td className="p-2">25.0 cm</td></tr>
                  <tr><td className="p-2">41</td><td className="p-2">7.0</td><td className="p-2">8.0</td><td className="p-2">26.0 cm</td></tr>
                  <tr><td className="p-2">42</td><td className="p-2">8.0</td><td className="p-2">9.0</td><td className="p-2">26.5 cm</td></tr>
                  <tr><td className="p-2">43</td><td className="p-2">9.0</td><td className="p-2">10.0</td><td className="p-2">27.5 cm</td></tr>
                  <tr><td className="p-2">44</td><td className="p-2">9.5</td><td className="p-2">10.5</td><td className="p-2">28.0 cm</td></tr>
                  <tr><td className="p-2">45</td><td className="p-2">10.5</td><td className="p-2">11.5</td><td className="p-2">29.0 cm</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-neutral-500">
              Need assistance? WhatsApp our sizing specialists directly at <strong>+92 328 2158299</strong>.
            </p>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {reviewTab === 'reviews' && (
          <div className="space-y-8 max-w-3xl">
            {/* Reviews List */}
            <div className="space-y-4">
              {reviewsList.map((rev, i) => (
                <div key={i} className="p-4 bg-[#F8F8F6] border border-[#EEEEEC] space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#111111]">{rev.name} ({rev.city})</span>
                    <span className="text-amber-500">{'★'.repeat(rev.rating)}</span>
                  </div>
                  <p className="text-neutral-700">{rev.comment}</p>
                  <span className="text-[10px] text-neutral-400 block">{rev.date}</span>
                </div>
              ))}
            </div>

            {/* Leave a review form */}
            <form onSubmit={handleReviewSubmit} className="pt-6 border-t border-[#EEEEEC] space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#111111]">
                Leave a Verified Client Review
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newReviewName}
                  onChange={e => setNewReviewName(e.target.value)}
                  placeholder="Your Full Name"
                  required
                  className="bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none"
                />
                <select
                  value={newReviewRating}
                  onChange={e => setNewReviewRating(Number(e.target.value))}
                  className="bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none"
                >
                  <option value={5}>5 Stars - Outstanding Luxury</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Satisfactory</option>
                </select>
              </div>
              <textarea
                value={newReviewComment}
                onChange={e => setNewReviewComment(e.target.value)}
                placeholder="Share your experience regarding leather texture, fit, or delivery..."
                rows={3}
                required
                className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none"
              />
              <button
                type="submit"
                className="bg-[#111111] text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-[#EEEEEC]">
          <h2 className="text-2xl font-serif-luxury font-bold text-[#111111] mb-6">
            You May Also Admire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
