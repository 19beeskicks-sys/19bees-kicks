import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import craftsmanshipImg from '../assets/images/craftsmanship_story_1794183122649.jpg';

export const OurStoryPage: React.FC = () => {
  const { setCurrentPage } = useShop();

  return (
    <div className="space-y-20 pb-20">
      
      {/* Banner */}
      <div className="bg-[#111111] text-white py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D8C7AE] font-semibold block">
            Atelier Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold leading-tight">
            THE STORY BEHIND 19BEESKICKS.
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
            Every Step. Your Style.
          </p>
        </div>
      </div>

      {/* Main Narrative Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold block">
              Our Genesis
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#111111]">
              A Vision of Modern Footwear & Everyday Comfort
            </h2>
            <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
              <p>
                19BeesKicks was created with a simple vision: to bring together modern footwear, individual style, and everyday comfort into an uncompromising luxury experience.
              </p>
              <p>
                We believe footwear is more than just something you wear. It represents your personality, confidence, and the way you move through life. Whether walking into a high-stakes boardroom, catching a flight, or gathering for an evening celebration, your footwear anchors your presence.
              </p>
              <p>
                Our mission is to make stylish, artisanal footwear accessible through a carefully selected range of products crafted by seasoned cobblers with decades of hands-on experience in leather tanning and precision assembly.
              </p>
              <p className="font-medium text-[#111111]">
                At 19BeesKicks, every step matters.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden border border-[#EEEEEC] shadow-xl">
              <img
                src={craftsmanshipImg}
                alt="Master artisan craftsman at 19BeesKicks workbench"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Core Values 3-Grid */}
      <div className="bg-white border-y border-[#EEEEEC] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold block mb-1">
              Guiding Ethos
            </span>
            <h3 className="text-2xl font-serif-luxury font-bold text-[#111111]">
              Our Enduring Values
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
            <div className="p-6 bg-[#F8F8F6] border border-[#EEEEEC] space-y-3">
              <span className="text-base font-serif-luxury font-bold text-[#111111] block">
                01. Material Authenticity
              </span>
              <p className="text-neutral-600 leading-relaxed">
                We refuse synthetic imitation hides. Every sneaker and loafer is constructed with full-grain calfskin or supple lambskin that breathes naturally and forms to your individual stride.
              </p>
            </div>

            <div className="p-6 bg-[#F8F8F6] border border-[#EEEEEC] space-y-3">
              <span className="text-base font-serif-luxury font-bold text-[#111111] block">
                02. Anatomical Precision
              </span>
              <p className="text-neutral-600 leading-relaxed">
                A sneaker must look stunning standing still, but feel effortless in motion. Our custom dual-compound outsoles and memory-foam arch insoles guarantee 12-hour all-day ease.
              </p>
            </div>

            <div className="p-6 bg-[#F8F8F6] border border-[#EEEEEC] space-y-3">
              <span className="text-base font-serif-luxury font-bold text-[#111111] block">
                03. Client Transparency
              </span>
              <p className="text-neutral-600 leading-relaxed">
                From real JazzCash payment audits to prompt nationwide courier tracking, we treat every customer with bespoke atelier care and personal respect.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <h3 className="text-2xl font-serif-luxury font-bold text-[#111111]">
          Step into 19BeesKicks Today
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600">
          Explore our limited-batch seasonal models designed in Pakistan for contemporary living.
        </p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="bg-[#111111] text-white px-8 py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors inline-flex items-center gap-2 cursor-pointer shadow"
        >
          <span>Shop The Collection</span>
          <ArrowRight className="w-4 h-4 text-[#D8C7AE]" />
        </button>
      </div>

    </div>
  );
};
