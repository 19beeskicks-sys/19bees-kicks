import React from 'react';
import { useShop } from '../context/ShopContext';
import { Truck, RotateCcw, Shield, FileText } from 'lucide-react';

interface LegalPolicyProps {
  type: 'shipping' | 'returns' | 'terms' | 'privacy';
}

export const LegalPolicyPage: React.FC<LegalPolicyProps> = ({ type }) => {
  const { setCurrentPage } = useShop();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* SHIPPING POLICY */}
      {type === 'shipping' && (
        <div className="bg-white border border-[#EEEEEC] p-8 sm:p-12 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 text-[#8C7A5E]">
            <Truck className="w-6 h-6" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">Policy Document</span>
          </div>
          <h1 className="text-3xl font-serif-luxury font-bold text-[#111111]">
            Shipping & Nationwide Delivery Policy
          </h1>
          <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
            <h3 className="text-base font-bold text-[#111111]">1. Delivery Timeline Across Pakistan</h3>
            <p>
              19BeesKicks dispatches all footwear orders through premier express courier services (TCS, Leopards, and Call Courier). Deliveries to major urban centers (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad) typically arrive within <strong>2 to 3 business days</strong>. Remote and regional destinations take <strong>3 to 4 business days</strong>.
            </p>

            <h3 className="text-base font-bold text-[#111111]">2. Delivery Charges</h3>
            <p>
              • <strong>Complimentary Express Shipping:</strong> Orders valued at <strong>PKR 15,000 or greater</strong> qualify for 100% free nationwide express shipping.<br />
              • <strong>Standard Shipping Fee:</strong> Orders below PKR 15,000 carry a flat rate of <strong>PKR 250</strong> anywhere in Pakistan.
            </p>

            <h3 className="text-base font-bold text-[#111111]">3. Order Dispatch & Real-Time Tracking</h3>
            <p>
              Once your order has been assembled and handed to the courier, an SMS notification containing your Airway Bill (CN) number is transmitted to your registered phone number. You can monitor your shipment status using our Live Order Tracker at any time.
            </p>

            <h3 className="text-base font-bold text-[#111111]">4. Inspection Upon Doorstep Delivery</h3>
            <p>
              For Cash on Delivery orders, please prepare the exact payable amount for the courier. All packages are sealed with 19BeesKicks security tape.
            </p>
          </div>
        </div>
      )}

      {/* RETURNS & REFUND POLICY */}
      {type === 'returns' && (
        <div className="bg-white border border-[#EEEEEC] p-8 sm:p-12 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 text-[#8C7A5E]">
            <RotateCcw className="w-6 h-6" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">Client Protection</span>
          </div>
          <h1 className="text-3xl font-serif-luxury font-bold text-[#111111]">
            Return & Exchange Policy
          </h1>
          <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
            <h3 className="text-base font-bold text-[#111111]">1. 7-Day Hassle-Free Size Exchange</h3>
            <p>
              If your chosen pair does not fit as comfortably as expected, you may request a size exchange within <strong>7 days</strong> of delivery receipt. The footwear must remain unworn, uncreased, with original dust bags and luxury box intact.
            </p>

            <h3 className="text-base font-bold text-[#111111]">2. Exchange Workflow</h3>
            <p>
              Simply contact our WhatsApp Concierge at <strong>+92 328 2158299</strong> with your Order ID and photo of the footwear. We will book a reverse parcel pickup from your address and immediately ship out your replacement size.
            </p>

            <h3 className="text-base font-bold text-[#111111]">3. Damaged or Defective Footwear</h3>
            <p>
              Every pair undergoes rigorous craftsmanship inspection. In the unlikely scenario of a material flaw upon arrival, we offer immediate zero-cost replacement or full reimbursement via JazzCash, Easypaisa, or direct bank transfer.
            </p>
          </div>
        </div>
      )}

      {/* TERMS & CONDITIONS */}
      {type === 'terms' && (
        <div className="bg-white border border-[#EEEEEC] p-8 sm:p-12 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 text-[#8C7A5E]">
            <FileText className="w-6 h-6" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">Legal Terms</span>
          </div>
          <h1 className="text-3xl font-serif-luxury font-bold text-[#111111]">
            Terms & Conditions of Service
          </h1>
          <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
            <p>
              Welcome to 19BeesKicks. By browsing, creating an account, or placing orders on this website, you agree to comply with and be bound by the following terms of operation.
            </p>
            <h3 className="text-base font-bold text-[#111111]">1. Pricing and Currency</h3>
            <p>
              All prices listed on 19BeesKicks are quoted in Pakistani Rupees (PKR) and include all applicable manufacturing costs. We reserve the right to modify prices for limited-batch artisanal drops without prior notice.
            </p>
            <h3 className="text-base font-bold text-[#111111]">2. Payment Integrity</h3>
            <p>
              Orders placed using JazzCash manual transfers require valid Transaction IDs matching our official account title: <strong>Abdul Samad (03238917805)</strong>. Fabricated or forged transaction numbers will result in automatic cancellation and permanent account restriction.
            </p>
          </div>
        </div>
      )}

      {/* PRIVACY POLICY */}
      {type === 'privacy' && (
        <div className="bg-white border border-[#EEEEEC] p-8 sm:p-12 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 text-[#8C7A5E]">
            <Shield className="w-6 h-6" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">Confidentiality</span>
          </div>
          <h1 className="text-3xl font-serif-luxury font-bold text-[#111111]">
            Privacy & Data Security Policy
          </h1>
          <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
            <p>
              19BeesKicks treats client information with the highest standard of confidentiality. We collect delivery names, phone numbers, and addresses solely for order fulfillment and courier dispatch.
            </p>
            <h3 className="text-base font-bold text-[#111111]">1. Information Usage</h3>
            <p>
              Your contact information is never traded, leased, or sold to third-party commercial advertisers. It is shared strictly with authorized courier logistics partners (e.g. TCS/Leopards) for delivery execution.
            </p>
            <h3 className="text-base font-bold text-[#111111]">2. Account Security</h3>
            <p>
              Customer login credentials and passwords are encrypted and safeguarded. You may request deletion of your account profile at any time by contacting 19beeskicks@gmail.com.
            </p>
          </div>
        </div>
      )}

      <div className="text-center pt-4">
        <button
          onClick={() => setCurrentPage('shop')}
          className="text-xs uppercase tracking-widest font-bold text-[#111111] hover:text-[#8C7A5E] underline cursor-pointer"
        >
          Return to Shopping
        </button>
      </div>

    </div>
  );
};
