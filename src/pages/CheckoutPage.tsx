import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, CheckCircle2, Copy, Upload, ArrowRight, Truck, AlertCircle } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    clearCart,
    user,
    setCurrentPage,
    formatPKR,
    setActiveTrackingOrder,
    showToast,
    siteSettings,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon
  } = useShop();

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address?.street || '');
  const [city, setCity] = useState(user?.address?.city || 'Karachi');
  const [postalCode, setPostalCode] = useState(user?.address?.postalCode || '');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Coupon code input state
  const [couponInput, setCouponInput] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  // Payment Method Selection
  const [paymentMethod, setPaymentMethod] = useState<'jazzcash' | 'easypaisa' | 'bank_transfer' | 'cod'>('jazzcash');
  const [transactionId, setTransactionId] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  
  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const FREE_SHIPPING_THRESHOLD = siteSettings?.freeShippingThreshold || 15000;
  const standardFee = siteSettings?.standardShippingFee || 250;
  const shipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : standardFee;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shipping);

  const pakistaniCities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Abbottabad',
    'Bahawalpur'
  ];

  const jcNumber = siteSettings?.jazzcashAccountNumber || '03238917805';
  const jcTitle = siteSettings?.jazzcashAccountTitle || 'Abdul Samad';

  const handleCopyJazzCash = () => {
    navigator.clipboard.writeText(jcNumber);
    setCopiedAccount(true);
    showToast(`JazzCash Number ${jcNumber} copied to clipboard`);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  const handleApplyCouponCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setApplyingCoupon(true);
    await applyCoupon(couponInput.trim());
    setApplyingCoupon(false);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
        showToast('Payment screenshot attached successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      showToast('Please fill out all required customer & delivery fields.');
      return;
    }

    if (paymentMethod === 'jazzcash' && !transactionId.trim()) {
      showToast('Please enter your JazzCash Transaction ID (TID) to verify payment.');
      return;
    }

    if (cart.length === 0) {
      showToast('Your shopping bag is empty.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        userId: user?.id,
        customer: {
          fullName,
          email: email || 'client@19beeskicks.com',
          phone,
          address,
          city,
          postalCode: postalCode || '00000',
          notes: deliveryNotes
        },
        items: cart.map(item => ({
          productId: item.productId,
          productName: item.product.name,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.product.price
        })),
        paymentMethod,
        couponCode: appliedCoupon?.code || undefined,
        discountAmount: discountAmount || 0,
        paymentDetails: {
          transactionId: transactionId.trim() || undefined,
          screenshotUrl: screenshotPreview || undefined
        }
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success && data.order) {
        setCompletedOrder(data.order);
        clearCart();
        showToast(`Order ${data.order.orderNumber} successfully placed!`);
      } else {
        showToast(data.message || 'Failed to place order.');
      }
    } catch {
      showToast('Network error placing order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // SUCCESS RECEIPT VIEW
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white border border-[#EEEEEC] p-8 sm:p-12 shadow-lg space-y-8">
          
          <div className="text-center space-y-3 pb-8 border-b border-[#EEEEEC]">
            <div className="w-16 h-16 bg-[#F8F8F6] text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold">
              Order Confirmed & Stored
            </span>
            <h1 className="text-3xl font-serif-luxury font-bold text-[#111111]">
              Thank You for Your Order
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
              Your luxury footwear order has been securely logged into our database. An SMS confirmation will be sent to <strong>{completedOrder.customer.phone}</strong>.
            </p>
          </div>

          {/* Reference Block */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F8F8F6] border border-[#EEEEEC] text-xs">
            <div>
              <span className="text-neutral-500 block">Order ID</span>
              <span className="font-mono font-bold text-[#111111] text-sm">{completedOrder.orderNumber}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">Payment Method</span>
              <span className="font-bold text-[#111111] uppercase">{completedOrder.payment.method}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">Payment Status</span>
              <span className="font-semibold text-amber-700 uppercase">
                {completedOrder.payment.status}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block">Grand Total</span>
              <span className="font-mono font-bold text-[#111111] text-sm">{formatPKR(completedOrder.total)}</span>
            </div>
          </div>

          {/* JazzCash Verification Notice if applicable */}
          {completedOrder.payment.method === 'jazzcash' && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>JazzCash Manual Verification in Progress</span>
              </div>
              <p>
                Our accounting team will verify Transaction ID <strong>{completedOrder.payment.transactionId}</strong> against JazzCash account <strong>Abdul Samad (03238917805)</strong> within 15–30 minutes during business hours.
              </p>
            </div>
          )}

          {/* Itemized summary */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-3">
              Ordered Footwear ({completedOrder.items.length})
            </h3>
            <div className="space-y-3 divide-y divide-[#EEEEEC]">
              {completedOrder.items.map((it: any, i: number) => (
                <div key={i} className="pt-3 first:pt-0 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3">
                    <img src={it.image} alt="" className="w-12 h-12 object-cover bg-neutral-100" />
                    <div>
                      <div className="font-semibold text-[#111111]">{it.productName}</div>
                      <div className="text-neutral-500">Size: EU {it.size} · Color: {it.color} · Qty: {it.quantity}</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-[#111111]">{formatPKR(it.price * it.quantity)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="p-4 bg-[#F8F8F6] border border-[#EEEEEC] text-xs space-y-1">
            <span className="font-bold text-neutral-800 uppercase tracking-wider block">Delivery Destination</span>
            <p className="text-neutral-600">
              {completedOrder.customer.fullName} · {completedOrder.customer.phone}<br />
              {completedOrder.customer.address}, {completedOrder.customer.city} {completedOrder.customer.postalCode}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setActiveTrackingOrder(completedOrder.orderNumber)}
              className="flex-1 bg-[#111111] text-white py-3 px-6 text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
            >
              <Truck className="w-4 h-4 text-[#D8C7AE]" />
              <span>Track Live Delivery Status</span>
            </button>
            <button
              onClick={() => setCurrentPage('home')}
              className="border border-[#111111] text-[#111111] py-3 px-6 text-xs uppercase tracking-widest font-semibold hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold block mb-1">
          Secure Order Terminal
        </span>
        <h1 className="text-3xl font-serif-luxury font-bold text-[#111111]">
          Checkout & Payment
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Customer Details + Payment Channel (8 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* SECTION 1: Customer Details */}
          <div className="bg-white p-6 sm:p-8 border border-[#EEEEEC] shadow-sm space-y-6">
            <h2 className="text-base font-serif-luxury font-bold text-[#111111] pb-3 border-b border-[#EEEEEC] flex items-center justify-between">
              <span>1. Customer & Delivery Address</span>
              <span className="text-xs font-sans text-neutral-400 font-normal">Delivery within Pakistan</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Hamza Khan"
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="e.g. 0300 1234567"
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. hamza@gmail.com"
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                  City *
                </label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none focus:border-[#111111] cursor-pointer"
                >
                  {pakistaniCities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                Complete Street Address (House/Shop #, Street, Area) *
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="e.g. House 42, Street 8, Phase 5, DHA"
                className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  placeholder="e.g. 54000"
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                  Special Delivery Instructions
                </label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={e => setDeliveryNotes(e.target.value)}
                  placeholder="e.g. Call before arrival"
                  className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Payment Method */}
          <div className="bg-white p-6 sm:p-8 border border-[#EEEEEC] shadow-sm space-y-6">
            <h2 className="text-base font-serif-luxury font-bold text-[#111111] pb-3 border-b border-[#EEEEEC]">
              2. Payment Channel
            </h2>

            {/* Selector Radio Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'jazzcash', title: 'JazzCash', subtitle: 'Instant Manual' },
                { id: 'cod', title: 'Cash on Delivery', subtitle: 'Doorstep Cash' },
                { id: 'easypaisa', title: 'Easypaisa', subtitle: 'Wallet Transfer' },
                { id: 'bank_transfer', title: 'Bank Transfer', subtitle: 'Direct IBAN' }
              ].map(method => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`p-3 text-left border transition-all cursor-pointer ${
                    paymentMethod === method.id
                      ? 'border-[#111111] bg-[#111111] text-white shadow'
                      : 'border-[#EEEEEC] bg-[#F8F8F6] text-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  <div className="text-xs font-bold">{method.title}</div>
                  <div className={`text-[10px] mt-0.5 ${paymentMethod === method.id ? 'text-[#D8C7AE]' : 'text-neutral-500'}`}>
                    {method.subtitle}
                  </div>
                </button>
              ))}
            </div>

            {/* JAZZCASH DEDICATED MANUAL VERIFICATION CARD */}
            {paymentMethod === 'jazzcash' && (
              <div className="bg-[#FAF8F5] border border-[#D8C7AE] p-6 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#D8C7AE]/40">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8C7A5E] font-bold block">
                      JazzCash Merchant Verification
                    </span>
                    <h3 className="text-base font-serif-luxury font-bold text-[#111111]">
                      Official Account Details
                    </h3>
                  </div>
                  <span className="font-mono font-bold text-sm bg-[#111111] text-white px-2.5 py-1">
                    Payable: {formatPKR(grandTotal)}
                  </span>
                </div>

                {/* Account Details Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 border border-[#EEEEEC] text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[11px]">Account Title</span>
                    <span className="font-bold text-sm text-[#111111]">{jcTitle}</span>
                  </div>

                  <div>
                    <span className="text-neutral-500 block text-[11px]">JazzCash Mobile Number</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-base text-[#111111]">{jcNumber}</span>
                      <button
                        type="button"
                        onClick={handleCopyJazzCash}
                        className="p-1 text-neutral-500 hover:text-black cursor-pointer"
                        title="Copy JazzCash Number"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      {copiedAccount && <span className="text-[10px] text-emerald-700 font-semibold">Copied!</span>}
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Instructions */}
                <div className="space-y-1.5 text-xs text-neutral-700">
                  <div className="font-bold text-[#111111]">How to Complete Your JazzCash Payment:</div>
                  <ol className="list-decimal list-inside space-y-1 text-neutral-600 pl-1">
                    <li>Open your JazzCash App or dial <strong>*786#</strong></li>
                    <li>Choose <strong>Send Money</strong> → <strong>To JazzCash Account</strong></li>
                    <li>Enter Recipient: <strong>{jcNumber}</strong> (Verify Title: <strong>{jcTitle}</strong>)</li>
                    <li>Enter Amount: <strong>{formatPKR(grandTotal)}</strong></li>
                    <li>Enter your MPIN to confirm payment</li>
                    <li>Enter the 10-12 digit <strong>Transaction ID (TID)</strong> below to verify your order</li>
                  </ol>
                </div>

                {/* Transaction ID & Screenshot Upload Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-neutral-800 block mb-1">
                      JazzCash Transaction ID (TID) *
                    </label>
                    <input
                      type="text"
                      required
                      value={transactionId}
                      onChange={e => setTransactionId(e.target.value)}
                      placeholder="e.g. 018491823901"
                      className="w-full bg-white border border-[#D8C7AE] p-2.5 text-xs font-mono font-bold text-[#111111] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-neutral-800 block mb-1">
                      Payment Screenshot (Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer bg-white border border-[#D8C7AE] px-3 py-2 text-xs flex items-center gap-1.5 hover:bg-neutral-50 text-neutral-700 font-medium">
                        <Upload className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotChange}
                          className="hidden"
                        />
                      </label>
                      {screenshotPreview && (
                        <span className="text-[11px] text-emerald-700 font-semibold">Screenshot Attached</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-500 italic">
                  Note: Payment status will be logged as PENDING until verified by 19Bees Admin. Orders are dispatched immediately upon verification.
                </div>
              </div>
            )}

            {/* CASH ON DELIVERY DETAILS */}
            {paymentMethod === 'cod' && (
              <div className="p-4 bg-[#F8F8F6] border border-[#EEEEEC] space-y-2 text-xs text-neutral-700">
                <div className="font-bold text-[#111111]">Cash on Delivery (COD) Terms:</div>
                <p>
                  Pay the full balance of <strong>{formatPKR(grandTotal)}</strong> directly to the courier representative when the parcel arrives at your doorstep. Our team will verify your phone number before dispatch.
                </p>
              </div>
            )}

            {/* EASYPAISA DETAILS */}
            {paymentMethod === 'easypaisa' && (
              <div className="p-4 bg-[#F8F8F6] border border-[#EEEEEC] space-y-2 text-xs text-neutral-700">
                <div className="font-bold text-[#111111]">Easypaisa Wallet Transfer:</div>
                <p>
                  Transfer <strong>{formatPKR(grandTotal)}</strong> to Easypaisa Account: <strong>03282158299</strong> (Title: <strong>19BeesKicks</strong>). Enter Transaction ID below.
                </p>
                <input
                  type="text"
                  value={transactionId}
                  onChange={e => setTransactionId(e.target.value)}
                  placeholder="Enter Easypaisa TID"
                  className="w-full bg-white border border-[#EEEEEC] p-2 text-xs font-mono"
                />
              </div>
            )}

            {/* BANK TRANSFER DETAILS */}
            {paymentMethod === 'bank_transfer' && (
              <div className="p-4 bg-[#F8F8F6] border border-[#EEEEEC] space-y-2 text-xs text-neutral-700">
                <div className="font-bold text-[#111111]">Direct Bank Transfer (Meezan Bank):</div>
                <p>
                  Account Title: <strong>19BeesKicks Luxury Footwear</strong><br />
                  IBAN: <strong>PK89MEZN0001928374829102</strong><br />
                  Branch: DHA Phase 5, Lahore
                </p>
                <input
                  type="text"
                  value={transactionId}
                  onChange={e => setTransactionId(e.target.value)}
                  placeholder="Enter Bank Transfer Reference Number"
                  className="w-full bg-white border border-[#EEEEEC] p-2 text-xs font-mono"
                />
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Order Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 border border-[#EEEEEC] shadow-sm space-y-6 sticky top-28">
            <h2 className="text-base font-serif-luxury font-bold text-[#111111] pb-3 border-b border-[#EEEEEC]">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>

            {/* Itemized list */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1 divide-y divide-[#EEEEEC]">
              {cart.map((item, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex gap-3 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-14 object-cover bg-neutral-100 shrink-0 border border-[#EEEEEC]"
                  />
                  <div className="flex-1 text-xs">
                    <h4 className="font-semibold text-[#111111] line-clamp-1">{item.product.name}</h4>
                    <span className="text-neutral-500">Size {item.size} · {item.color} · Qty {item.quantity}</span>
                  </div>
                  <span className="font-mono font-bold text-xs text-[#111111]">
                    {formatPKR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Input Box */}
            <div className="pt-4 border-t border-[#EEEEEC]">
              <div className="text-xs font-semibold text-neutral-700 mb-1.5 flex items-center justify-between">
                <span>Promotional Voucher / Coupon</span>
                <span className="text-[10px] text-neutral-400 font-mono">e.g. WELCOME10, BEES2000</span>
              </div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-800">
                  <div>
                    <span className="font-bold font-mono">{appliedCoupon.code}</span>
                    <span className="ml-2 text-[11px] text-emerald-600">
                      ({appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.discountValue}% OFF` : `-${formatPKR(appliedCoupon.discountValue)}`})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-rose-600 hover:text-rose-800 font-bold text-xs cursor-pointer ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Enter Coupon Code"
                    className="flex-1 bg-[#F8F8F6] border border-[#EEEEEC] px-3 py-2 text-xs font-mono uppercase tracking-wider outline-none focus:border-[#111111]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCouponCode}
                    disabled={applyingCoupon || !couponInput.trim()}
                    className="bg-[#111111] text-white px-4 py-2 text-xs uppercase tracking-wider font-bold hover:bg-[#333333] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {applyingCoupon ? '...' : 'Apply'}
                  </button>
                </div>
              )}
            </div>

            {/* Financial math */}
            <div className="space-y-2 pt-4 border-t border-[#EEEEEC] text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-[#111111]">{formatPKR(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="font-mono font-bold">-{formatPKR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Standard Delivery (Pakistan)</span>
                <span className="font-mono font-semibold text-[#111111]">
                  {shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPKR(shipping)}
                </span>
              </div>
              <div className="pt-3 border-t border-[#EEEEEC] flex justify-between text-base font-bold text-[#111111]">
                <span>Payable Amount</span>
                <span className="font-mono text-lg">{formatPKR(grandTotal)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#111111] text-white py-4 px-6 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#333333] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              <span>{submitting ? 'Creating Order in Database...' : 'Confirm & Place Order'}</span>
              <ArrowRight className="w-4 h-4 text-[#D8C7AE]" />
            </button>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Official 19BeesKicks Warranty & Authenticity</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};
