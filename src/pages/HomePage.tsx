import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, ShieldCheck, Sparkles, Feather, Clock } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, setCurrentPage, setSelectedCollection, viewProduct } = useShop();

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 3);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 3);

  const collections = [
    {
      title: "Men's Collection",
      tag: "men",
      subtitle: "Architectural silhouettes & calfskin leather",
      image: "/src/assets/images/product_men_sneaker_1794183121675.jpg"
    },
    {
      title: "Women's Collection",
      tag: "women",
      subtitle: "Featherlight runners & champagne tones",
      image: "/src/assets/images/product_women_runner_1794183121544.jpg"
    },
    {
      title: "Designer Sneakers",
      tag: "sneakers",
      subtitle: "Contemporary sculptural luxury street style",
      image: "/src/assets/images/hero_luxury_sneaker_1794183121618.jpg"
    },
    {
      title: "Casual & Hybrids",
      tag: "casual",
      subtitle: "Hand-burnished leather & sneaker comfort",
      image: "/src/assets/images/product_casual_loafers_1794183123383.jpg"
    },
    {
      title: "New Arrivals",
      tag: "newarrivals",
      subtitle: "Limited-edition artisan releases",
      image: "/src/assets/images/product_men_sneaker_1794183121675.jpg"
    },
    {
      title: "Best Sellers",
      tag: "bestsellers",
      subtitle: "Most coveted footwear silhouettes",
      image: "/src/assets/images/product_women_runner_1794183121544.jpg"
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. CINEMATIC LUXURY HERO SECTION */}
      <section className="relative overflow-hidden bg-[#111111] text-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-6 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#D8C7AE] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The 2026 Sovereign Edition</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold leading-[1.1] tracking-tight [text-wrap:balance]">
                STEP INTO YOUR STYLE.
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 font-light max-w-xl leading-relaxed">
                Discover the perfect balance of modern design, everyday comfort, and timeless style. Handcrafted with imported leathers for the discerning connoisseur.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="bg-[#D8C7AE] text-[#111111] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage('collections')}
                  className="border border-[#D8C7AE] text-[#FFFFFF] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  Explore Collections
                </button>
              </div>

              {/* Trust Callouts */}
              <div className="pt-6 border-t border-[#222222] grid grid-cols-3 gap-4 text-xs text-neutral-400">
                <div>
                  <div className="font-semibold text-white">Full-Grain Leather</div>
                  <div className="text-[11px] text-neutral-400">Handpicked hides</div>
                </div>
                <div>
                  <div className="font-semibold text-white">Express Delivery</div>
                  <div className="text-[11px] text-neutral-400">2-4 Days nationwide</div>
                </div>
                <div>
                  <div className="font-semibold text-white">JazzCash & COD</div>
                  <div className="text-[11px] text-neutral-400">Verified checkout</div>
                </div>
              </div>
            </div>

            {/* Right Cinematic Footwear Imagery */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="/src/assets/images/hero_luxury_sneaker_1794183121618.jpg"
                  alt="19BeesKicks Sovereign Luxury Footwear"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#D8C7AE] block">Featured Model</span>
                    <span className="font-serif-luxury font-bold text-sm">Aethel Travertine Runner</span>
                  </div>
                  <span className="font-mono text-sm font-bold bg-[#111111]/80 backdrop-blur-sm px-2.5 py-1 border border-white/20">
                    PKR 24,500
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED SIX COLLECTIONS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#EEEEEC]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold block mb-1">
              Curated Portfolios
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#111111]">
              Featured Collections
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('collections')}
            className="text-xs uppercase tracking-widest font-bold text-[#111111] hover:text-[#8C7A5E] transition-colors mt-2 md:mt-0 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map(col => (
            <div
              key={col.title}
              onClick={() => {
                if (col.tag === 'men') setCurrentPage('men');
                else if (col.tag === 'women') setCurrentPage('women');
                else {
                  setSelectedCollection(col.tag);
                  setCurrentPage('shop');
                }
              }}
              className="group relative overflow-hidden bg-white border border-[#EEEEEC] shadow-sm hover:border-[#D8C7AE] transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#EEEEEC]">
                <img
                  src={col.image}
                  alt={col.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif-luxury font-bold text-[#111111] group-hover:text-[#8C7A5E] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{col.subtitle}</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#EEEEEC] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EEEEEC]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold block mb-1">
              Top Rated
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#111111]">
              Best Sellers
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCollection('bestsellers');
              setCurrentPage('shop');
            }}
            className="text-xs uppercase tracking-widest font-bold text-[#111111] hover:text-[#8C7A5E] transition-colors mt-2 md:mt-0 flex items-center gap-1 cursor-pointer"
          >
            <span>See All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. NEW ARRIVALS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EEEEEC]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold block mb-1">
              Seasonal Releases
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#111111]">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCollection('newarrivals');
              setCurrentPage('shop');
            }}
            className="text-xs uppercase tracking-widest font-bold text-[#111111] hover:text-[#8C7A5E] transition-colors mt-2 md:mt-0 flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All New Releases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL CRAFTSMANSHIP & OUR STORY SPLIT */}
      <section className="bg-[#FFFFFF] border-y border-[#EEEEEC] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="aspect-[16/10] overflow-hidden shadow-xl border border-[#EEEEEC]">
                <img
                  src="/src/assets/images/craftsmanship_story_1794183122649.jpg"
                  alt="Artisan shoemaker at 19BeesKicks workshop"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#111111] text-[#FFFFFF] p-6 hidden sm:block max-w-xs shadow-xl">
                <span className="text-[10px] uppercase tracking-widest text-[#D8C7AE] block font-bold mb-1">Atelier Note</span>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  "Every pair undergoes 48 precision assembly checkpoints before leaving our workshop."
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 lg:pl-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold block">
                Artisanal Roots
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#111111] leading-tight">
                MORE THAN JUST FOOTWEAR.
              </h2>
              <p className="text-base text-neutral-600 leading-relaxed font-light">
                At 19BeesKicks, we believe every step tells a story. Our vision is to bring modern footwear, everyday comfort, and distinctive style together into an uncompromising luxury experience.
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                By pairing hand-burnished Italian calf hides with proprietary dual-compound shock absorption soles, we bridge high-end editorial aesthetics with the durability required for everyday life in Pakistan and abroad.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('story')}
                  className="inline-flex items-center gap-2 border-b-2 border-[#111111] pb-1 text-xs uppercase tracking-widest font-bold text-[#111111] hover:text-[#8C7A5E] hover:border-[#8C7A5E] transition-colors cursor-pointer"
                >
                  <span>Read The Full 19Bees Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US (4 Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold block mb-2">
            The 19Bees Standard
          </span>
          <h2 className="text-3xl font-serif-luxury font-bold text-[#111111]">
            Why Discerning Clients Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-white border border-[#EEEEEC] space-y-3">
            <div className="w-10 h-10 bg-[#F8F8F6] text-[#111111] flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-base font-bold text-[#111111]">Modern Footwear</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Curated silhouettes influenced by Milan and Tokyo runways, refined for contemporary wardrobes.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#EEEEEC] space-y-3">
            <div className="w-10 h-10 bg-[#F8F8F6] text-[#111111] flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-base font-bold text-[#111111]">Handpicked Materials</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Tumbled calfskin, silky nubuck, and precision hardware selected strictly for longevity and patina.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#EEEEEC] space-y-3">
            <div className="w-10 h-10 bg-[#F8F8F6] text-[#111111] flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-base font-bold text-[#111111]">Everyday Comfort</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Anatomical arch support insoles with memory foam responsive bounce for effortless 12-hour wear.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#EEEEEC] space-y-3">
            <div className="w-10 h-10 bg-[#F8F8F6] text-[#111111] flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="text-base font-bold text-[#111111]">Dedicated Support</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Real WhatsApp concierge (+92 328 2158299) for size recommendations and rapid order tracking.
            </p>
          </div>
        </div>
      </section>

      {/* 7. ATTRIBUTABLE CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold block mb-2">
            Client Perspectives
          </span>
          <h2 className="text-3xl font-serif-luxury font-bold text-[#111111]">
            Verified Customer Reviews
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#FFFFFF] border border-[#EEEEEC] space-y-4">
            <div className="flex items-center gap-1 text-amber-500 text-sm">
              {'★'.repeat(5)}
            </div>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
              "The Sovereign Low Obsidian arrived in Lahore in 2 days. The leather feel and weight is easily on par with international designer luxury houses. JazzCash payment was verified quickly."
            </p>
            <div className="pt-2 border-t border-[#EEEEEC] text-xs">
              <span className="font-bold text-[#111111] block">Farhan Zaidi</span>
              <span className="text-neutral-400">Architect, Lahore · Verified Purchase</span>
            </div>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#EEEEEC] space-y-4">
            <div className="flex items-center gap-1 text-amber-500 text-sm">
              {'★'.repeat(5)}
            </div>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
              "Ordered the Eline Champagne Runner for daily studio wear. The arch cushion is unbelievable and the gold heel detail is discreetly luxurious. 19Bees has set a new benchmark in Pakistan."
            </p>
            <div className="pt-2 border-t border-[#EEEEEC] text-xs">
              <span className="font-bold text-[#111111] block">Mahnoor Qureshi</span>
              <span className="text-neutral-400">Creative Director, Karachi · Verified Purchase</span>
            </div>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#EEEEEC] space-y-4">
            <div className="flex items-center gap-1 text-amber-500 text-sm">
              {'★'.repeat(5)}
            </div>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
              "I bought the Monaco Caramel Hybrid loafers for semi-formal wedding events and office meetings. Outstanding build quality, genuine leather aroma, and excellent doorstep COD service in Islamabad."
            </p>
            <div className="pt-2 border-t border-[#EEEEEC] text-xs">
              <span className="font-bold text-[#111111] block">Saad Tariq</span>
              <span className="text-neutral-400">Consultant, Islamabad · Verified Purchase</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CINEMATIC CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] text-white p-8 sm:p-16 text-center space-y-6 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D8C7AE] font-semibold">
              Elevate Your Everyday Footwear
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold leading-tight">
              YOUR NEXT FAVORITE PAIR IS WAITING.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Step into unmatched craftsmanship. Free express shipping nationwide across Pakistan on qualifying orders.
            </p>
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setCurrentPage('shop')}
                className="bg-[#D8C7AE] text-[#111111] px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-all shadow-xl cursor-pointer"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
