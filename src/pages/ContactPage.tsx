import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MessageSquare, CheckCircle2, Clock, MapPin, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Footwear Sizing & Inquiry');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        showToast('Message received! Our concierge team will reach out shortly.');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        showToast(data.message || 'Failed to send message.');
      }
    } catch {
      showToast('Network error submitting contact request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold block">
          Client Concierge
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#111111]">
          Contact 19BeesKicks
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
          We are dedicated to providing seamless bespoke support for sizing consultations, bespoke orders, and order delivery inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Contact Info Channels & Direct Action Buttons (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#EEEEEC] p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-base font-serif-luxury font-bold text-[#111111] pb-3 border-b border-[#EEEEEC]">
              Direct Communication Channels
            </h3>

            {/* Direct WhatsApp Button */}
            <div className="p-4 bg-[#FAF8F5] border border-[#D8C7AE] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111111]">WhatsApp Concierge</h4>
                  <p className="text-xs text-neutral-600">+92 328 2158299</p>
                </div>
              </div>
              <p className="text-xs text-neutral-600">
                Instant chat for real-time sizing assistance, parcel tracking, or payment confirmation screenshots.
              </p>
              <a
                href="https://wa.me/923282158299"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#111111] text-white py-2.5 px-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Email & Phone Cards */}
            <div className="space-y-4 text-xs text-neutral-700">
              <a
                href="mailto:19beeskicks@gmail.com"
                className="flex items-center gap-3 p-3 bg-[#F8F8F6] border border-[#EEEEEC] hover:border-black transition-colors"
              >
                <Mail className="w-4 h-4 text-[#8C7A5E] shrink-0" />
                <div>
                  <span className="font-bold text-[#111111] block">Business Email</span>
                  <span>19beeskicks@gmail.com</span>
                </div>
              </a>

              <a
                href="tel:+923282158299"
                className="flex items-center gap-3 p-3 bg-[#F8F8F6] border border-[#EEEEEC] hover:border-black transition-colors"
              >
                <Phone className="w-4 h-4 text-[#8C7A5E] shrink-0" />
                <div>
                  <span className="font-bold text-[#111111] block">Direct Telephone</span>
                  <span>+92 328 2158299</span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 bg-[#F8F8F6] border border-[#EEEEEC]">
                <Clock className="w-4 h-4 text-[#8C7A5E] shrink-0" />
                <div>
                  <span className="font-bold text-[#111111] block">Concierge Hours</span>
                  <span>Monday – Saturday: 10:00 AM – 9:00 PM PKT</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#F8F8F6] border border-[#EEEEEC]">
                <MapPin className="w-4 h-4 text-[#8C7A5E] shrink-0" />
                <div>
                  <span className="font-bold text-[#111111] block">Distribution Hub</span>
                  <span>Karachi & Lahore Fulfillment Centers, Pakistan</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#EEEEEC] p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-base font-serif-luxury font-bold text-[#111111] pb-3 border-b border-[#EEEEEC]">
            Send an Inquiry
          </h3>

          {submitted ? (
            <div className="p-8 bg-[#FAF8F5] border border-[#D8C7AE] text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <h4 className="text-lg font-serif-luxury font-bold text-[#111111]">
                Thank you for contacting 19BeesKicks
              </h4>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                Your message has been safely saved in our database. An atelier representative will review and reply via WhatsApp or email.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs uppercase font-bold text-[#111111] underline cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Saad Alvi"
                    className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. +92 300 0000000"
                    className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. saad@gmail.com"
                    className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none focus:border-[#111111] cursor-pointer"
                  >
                    <option value="Footwear Sizing & Inquiry">Footwear Sizing & Inquiry</option>
                    <option value="Order Tracking Update">Order Tracking Update</option>
                    <option value="JazzCash Payment Verification">JazzCash Payment Verification</option>
                    <option value="Exchange or Return Request">Exchange or Return Request</option>
                    <option value="Wholesale & Corporate Orders">Wholesale & Corporate Orders</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="How may our concierge team assist you today?"
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#111111] text-white py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#333333] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-[#D8C7AE]" />
                <span>{loading ? 'Submitting to Database...' : 'Send Message'}</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
