import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { setCurrentPage } = useShop();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I place an order on 19BeesKicks?',
      a: 'Browse our collection, select your desired footwear model, pick your European size (EU 39–45 for men, 36–41 for women) and preferred leather color, then click "Add to Shopping Bag". When ready, proceed to Checkout, enter your delivery address in Pakistan, select your payment channel (JazzCash, Cash on Delivery, Easypaisa, or Bank Transfer), and submit your order.'
    },
    {
      q: 'How do I select the right shoe size?',
      a: 'All 19BeesKicks footwear models are handcrafted true to standard European sizing. If you typically wear EU 42 in dress shoes or sneakers, select EU 42. You can reference our detailed Size Guide on any product detail page, or message our WhatsApp concierge at +92 328 2158299 for tailored fitting advice.'
    },
    {
      q: 'What payment methods are supported in Pakistan?',
      a: 'We accept manual JazzCash transfers, Cash on Delivery (COD) across Pakistan, Easypaisa mobile wallet payments, and direct Bank Transfer (Meezan Bank). All digital payment channels are verified by our finance team before dispatch.'
    },
    {
      q: 'How does the JazzCash payment verification workflow operate?',
      a: 'When you choose JazzCash at checkout, you will see our official account details: Title: Abdul Samad, Account Number: 03238917805. Transfer the exact order total via the JazzCash app or *786#, then enter your 10–12 digit Transaction ID (TID) and optionally attach a screenshot. Your order is logged in the database with PENDING verification status and confirmed by admin within 15–30 minutes.'
    },
    {
      q: 'Do you offer Cash on Delivery (COD) across Pakistan?',
      a: 'Yes, we provide Cash on Delivery across all major cities and towns in Pakistan. Our fulfillment department will place a brief courtesy confirmation call to your phone before handing the parcel to TCS or Leopards Courier.'
    },
    {
      q: 'How long does delivery take nationwide?',
      a: 'Orders shipped to major urban centers (Karachi, Lahore, Islamabad, Rawalpindi) typically arrive within 2 to 3 business days. Deliveries to other cities and regional districts take approximately 3 to 4 business days.'
    },
    {
      q: 'How can I track my order in real-time?',
      a: 'Every order generates a unique reference number (such as 19BK-2026-8901). You can click "Track Order" in the top bar or inside your client dashboard to view an interactive visual progress timeline showing whether your pair is Pending, Confirmed, Processing, Shipped, or Out for Delivery.'
    },
    {
      q: 'Can I cancel or modify an order after submission?',
      a: 'You can cancel or modify your order size/address free of charge before the status changes to "Shipped". Simply contact our concierge immediately on WhatsApp (+92 328 2158299) or email 19beeskicks@gmail.com with your 19BK order ID.'
    },
    {
      q: 'What is your return and exchange policy?',
      a: 'We offer a 7-day hassle-free exchange and return policy on unworn footwear in its original packaging with tags intact. If the size does not fit comfortably, we arrange a prompt courier size swap.'
    },
    {
      q: 'How can I contact customer support?',
      a: 'Our dedicated customer care team is available Monday to Saturday via WhatsApp at +92 328 2158299, by phone at +92 328 2158299, or via email at 19beeskicks@gmail.com.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold block">
          Client Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#111111]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 font-light">
          Everything you need to know about purchasing, sizing, JazzCash payment, and nationwide courier delivery.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-[#EEEEEC] overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50"
              >
                <span className="text-sm font-semibold text-[#111111]">
                  {faq.q}
                </span>
                <span className="p-1 rounded-full text-neutral-500">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-[#EEEEEC]/60 bg-[#FAF8F5]/30">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-[#FAF8F5] border border-[#D8C7AE] p-6 text-center space-y-3">
        <h3 className="text-base font-serif-luxury font-bold text-[#111111]">
          Still have questions regarding your order?
        </h3>
        <p className="text-xs text-neutral-600">
          Our concierge specialists in Pakistan are online on WhatsApp right now.
        </p>
        <div className="pt-1">
          <a
            href="https://wa.me/923282158299"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#111111] text-white px-6 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-[#333333] transition-colors"
          >
            <span>Message WhatsApp Concierge (+92 328 2158299)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D8C7AE]" />
          </a>
        </div>
      </div>

    </div>
  );
};
