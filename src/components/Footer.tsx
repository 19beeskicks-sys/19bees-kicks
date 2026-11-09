import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    try {
      setSubscribing(true);
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubscribed(true);
        showToast('Subscribed to 19BeesKicks VIP updates!');
      }
    } catch {
      showToast('Could not subscribe. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#111111] text-[#FFFFFF] pt-16 pb-12 border-t border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#222222]">
          
          {/* Brand & Manifesto Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-serif-luxury font-bold tracking-[0.2em] text-[#FFFFFF]">
              19BEESKICKS
            </span>
            <p className="text-xs uppercase tracking-[0.25em] text-[#D8C7AE] font-semibold">
              EVERY STEP. YOUR STYLE.
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              19BeesKicks brings together artisanal cobbling, contemporary luxury silhouettes, and everyday anatomical comfort. Crafted for individuals who make every step a statement of intention.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-neutral-300">
              <a
                href="https://wa.me/923282158299"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#D8C7AE] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#D8C7AE]" />
                <span>WhatsApp: +92 328 2158299</span>
              </a>
              <a
                href="mailto:19beeskicks@gmail.com"
                className="flex items-center gap-2 hover:text-[#D8C7AE] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#D8C7AE]" />
                <span>Email: 19beeskicks@gmail.com</span>
              </a>
              <a
                href="tel:+923282158299"
                className="flex items-center gap-2 hover:text-[#D8C7AE] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D8C7AE]" />
                <span>Phone: +92 328 2158299</span>
              </a>
            </div>
          </div>

          {/* Footwear Collections */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#D8C7AE]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Footwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('men')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Men's Shoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('women')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Women's Shoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('collections')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Designer Sneakers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('collections')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Casual & Hybrids
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge & Policy */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#D8C7AE]">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => setCurrentPage('story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The 19Bees Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('shipping')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('returns')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* VIP Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#D8C7AE]">
              Stay Ahead
            </h4>
            <p className="text-xs text-neutral-400">
              Receive private invitations to limited-batch drops, private sales, and seasonal releases.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#1e1e1e] border border-emerald-800 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you. You are on the private VIP list.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full bg-[#1A1A1A] border border-[#333333] px-3 py-2 text-xs text-white placeholder:text-neutral-500 outline-none focus:border-[#D8C7AE] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={subscribing}
                    className="absolute right-1 top-1 bottom-1 bg-[#D8C7AE] text-[#111111] px-3 text-xs font-semibold hover:bg-white transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-neutral-500 block">
                  By subscribing, you agree to 19BeesKicks Terms & Privacy Policy.
                </span>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Payment Channels & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] uppercase tracking-wider text-neutral-500">Supported in Pakistan:</span>
            <span className="text-xs font-mono font-medium text-white px-2 py-0.5 bg-[#1C1C1C] border border-[#333333]">
              JazzCash
            </span>
            <span className="text-xs font-mono font-medium text-white px-2 py-0.5 bg-[#1C1C1C] border border-[#333333]">
              Easypaisa
            </span>
            <span className="text-xs font-mono font-medium text-white px-2 py-0.5 bg-[#1C1C1C] border border-[#333333]">
              Bank Transfer
            </span>
            <span className="text-xs font-mono font-medium text-white px-2 py-0.5 bg-[#1C1C1C] border border-[#333333]">
              Cash on Delivery (COD)
            </span>
          </div>

          <div className="text-center md:text-right">
            <p>© {new Date().getFullYear()} 19BeesKicks. All rights reserved.</p>
            <p className="text-[10px] text-neutral-500 mt-0.5">Official JazzCash Title: Abdul Samad · Account: 03238917805</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
