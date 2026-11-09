import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight } from 'lucide-react';

export const CollectionsDirectoryPage: React.FC = () => {
  const { setCurrentPage, setSelectedCollection } = useShop();

  const collections = [
    {
      title: "Men's Footwear",
      tag: "men",
      desc: "Architectural low-tops, formal-casual sneakers, and Italian calfskin leather silhouettes.",
      image: "/src/assets/images/product_men_sneaker_1794183121675.jpg",
      count: "12 Exclusive Models"
    },
    {
      title: "Women's Footwear",
      tag: "women",
      desc: "Featherlight runners, champagne metallic accents, and glove-soft cream lambskin trainers.",
      image: "/src/assets/images/product_women_runner_1794183121544.jpg",
      count: "8 Coveted Models"
    },
    {
      title: "Designer Sneakers",
      tag: "sneakers",
      desc: "Modern sculptural street silhouettes crafted with travertine midsoles and multi-compound ergonomics.",
      image: "/src/assets/images/hero_luxury_sneaker_1794183121618.jpg",
      count: "16 High-Rebound Pairs"
    },
    {
      title: "Casual & Loafer Hybrids",
      tag: "casual",
      desc: "Hand-burnished caramel leather meeting sneaker flexibility for meetings, travel, and evening outings.",
      image: "/src/assets/images/product_casual_loafers_1794183123383.jpg",
      count: "6 Handcrafted Pairs"
    },
    {
      title: "Best Sellers",
      tag: "bestsellers",
      desc: "Our most requested models with over 98% 5-star verified customer ratings in Pakistan.",
      image: "/src/assets/images/hero_luxury_sneaker_1794183121618.jpg",
      count: "Iconic Top 5"
    },
    {
      title: "New Arrivals Batch",
      tag: "newarrivals",
      desc: "Limited-edition studio drops featuring contemporary seasonal leather dyes and performance cushions.",
      image: "/src/assets/images/product_men_sneaker_1794183121675.jpg",
      count: "Just Dropped"
    }
  ];

  const handleSelect = (tag: string) => {
    if (tag === 'men') setCurrentPage('men');
    else if (tag === 'women') setCurrentPage('women');
    else {
      setSelectedCollection(tag);
      setCurrentPage('shop');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold block">
          Portfolio Directory
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#111111]">
          All Collections
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
          Explore the curated universes of 19BeesKicks. Every collection is engineered to harmonize aesthetic refinement with all-day anatomical wear.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map(col => (
          <div
            key={col.title}
            onClick={() => handleSelect(col.tag)}
            className="group bg-white border border-[#EEEEEC] overflow-hidden hover:border-[#D8C7AE] transition-all duration-300 shadow-sm cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] bg-[#EEEEEC] overflow-hidden relative">
                <img
                  src={col.image}
                  alt={col.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-3 right-3 bg-[#111111]/80 backdrop-blur-sm text-white text-[10px] font-mono uppercase tracking-widest px-2.5 py-1">
                  {col.count}
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-serif-luxury font-bold text-[#111111] group-hover:text-[#8C7A5E] transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {col.desc}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#111111] group-hover:text-[#8C7A5E]">
              <span>Discover Collection</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
