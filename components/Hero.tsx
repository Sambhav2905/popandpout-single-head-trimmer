import React, { useState, useEffect } from 'react';
import { Star, Check, Truck, Clock, ShoppingCart, ShieldCheck, Zap, X, Gift, Users } from 'lucide-react';

const PRODUCT_IMAGES = [
  '/images/hero1.png',
  '/images/model-holding.png',
  '/images/model-mirror.png',
  '/images/product4.png',
  '/images/product5.png',
  '/images/product6.png'
];

const Hero: React.FC = () => {
  // --- EMBEDDED CONFIGURATION ---
  const RAZORPAY_KEY = "rzp_live_S0YispXD1jHCAR";
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzRV9BBd1rdZTHkVsV9qIp5O1MtY3a9Sz2quyXEk1ak9w0Q2NuqSeZjMJzgPRVdXLhH/exec";

  // UI States
  const [activeImage, setActiveImage] = useState(0);
  const [packType, setPackType] = useState<'single' | 'duo'>('single');
  const [showModal, setShowModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  // Live Counter State
  const [viewers, setViewers] = useState(Math.floor(Math.random() * (120 - 40 + 1)) + 40);

  // Form Data
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '', pincode: '', city: '' });

  // Pricing Logic
  const price = packType === 'single' ? 299 : 500;
  const prepaidPrice = Math.round(price * 0.9); // 10% Discount applied automatically

  // Live Counter Effect (The "Jitter" logic)
  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setViewers(prev => {
        const delta = Math.floor(Math.random() * 7) - 3; // -3 to +3 jitter
        const newVal = prev + delta;
        return newVal < 30 ? 30 : newVal > 150 ? 150 : newVal;
      });
    }, 3000);
    return () => clearInterval(viewerInterval);
  }, []);

  // --- ORDER HANDLING ---
  const saveOrderToSheet = async (id: string, type: string, finalPrice: number) => {
    setOrderStatus('loading');
    const data = {
      name: orderData.name,
      phone: orderData.phone,
      address: orderData.address,
      pincode: orderData.pincode,
      city: orderData.city,
      orderId: id,
      paymentType: type,
      amount: finalPrice,
      product: packType === 'single' ? '1x Pop & Pout Trimmer' : '2x Trimmer (Duo Pack)',
    };

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setOrderStatus('success');
    } catch (err) {
      console.error("Sheet Error:", err);
      // Fallback to success UI so user isn't stuck
      setOrderStatus('success');
    }
  };

  const handlePrepaid = () => {
    if (!orderData.name || orderData.phone.length < 10 || !orderData.address || !orderData.pincode) {
      alert("Please fill complete delivery details.");
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: prepaidPrice * 100, 
      currency: "INR",
      name: "Pop & Pout",
      description: `Prepaid Order: ${packType === 'single' ? 'Individual' : 'Duo'} Pack`,
      image: "/images/hero1.png",
      handler: (res: any) => {
        saveOrderToSheet(res.razorpay_payment_id, 'PREPAID', prepaidPrice);
      },
      prefill: { name: orderData.name, contact: orderData.phone },
      theme: { color: "#6B21A8" }
    };
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handleCOD = () => {
    if (!orderData.name || orderData.phone.length < 10 || !orderData.address || !orderData.pincode) {
      alert("Please fill complete delivery details.");
      return;
    }
    saveOrderToSheet('COD-PENDING', 'COD', price);
  };

  return (
    <section className="pt-24 pb-12 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20">
        {/* Left: Professional Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[3/2] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl">
            <img src={PRODUCT_IMAGES[activeImage]} className="w-full h-full object-cover" alt="Premium Trimmer" />
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {PRODUCT_IMAGES.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)} 
                className={`w-20 aspect-square rounded-xl border-2 flex-shrink-0 transition-all ${activeImage === idx ? 'border-[#6B21A8] scale-105 shadow-md' : 'border-gray-100 opacity-70'}`}
              >
                <img src={img} className="w-full h-full object-cover rounded-lg" alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Sales Info */}
        <div className="flex flex-col">
          <div className="mb-6">
             <div className="flex flex-wrap items-center gap-3 mb-4">
               <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-[#6B21A8] text-[10px] font-black uppercase tracking-widest rounded-full">
                 <Zap className="w-3 h-3 fill-current" /> India's Most Loved Grooming Tool
               </div>
               {/* LIVE COUNTER ADDED BACK HERE */}
               <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-100 rounded-full text-[#6B21A8] text-[10px] font-black uppercase tracking-widest animate-pulse">
                  <Users className="w-3.5 h-3.5" />
                  {viewers} Viewing Now
               </div>
             </div>

             <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight text-[#1A1A1A]">
               Pop & Pout <span className="text-[#6B21A8]">Compact</span> Trimmer
             </h1>
             <div className="flex items-center gap-2 mt-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm font-bold text-gray-500">4.9 (2,400+ Verified Buyers)</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-[32px] p-6 mb-8 border border-gray-100">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-5xl font-black text-[#6B21A8]">₹{price}</span>
              <span className="text-xl text-gray-400 line-through">₹1,499</span>
            </div>
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest flex items-center gap-1">
              <Gift className="w-3.5 h-3.5" /> Extra 10% OFF Applied on UPI/Cards
            </p>
          </div>

          {/* Pricing Selector */}
          <div className="space-y-3 mb-8">
            <button onClick={() => setPackType('single')} className={`w-full p-6 rounded-2xl border-2 flex justify-between items-center transition-all ${packType === 'single' ? 'border-[#6B21A8] bg-purple-50 shadow-md ring-2 ring-purple-100' : 'bg-white border-gray-100'}`}>
              <span className="font-bold text-lg">Individual Pack</span>
              <span className="font-black text-xl">₹299</span>
            </button>
            <button onClick={() => setPackType('duo')} className={`w-full p-6 rounded-2xl border-2 flex justify-between items-center relative transition-all ${packType === 'duo' ? 'border-[#6B21A8] bg-purple-50 shadow-md ring-2 ring-purple-100' : 'bg-white border-gray-100'}`}>
              <div className="absolute top-0 right-0 bg-[#6B21A8] text-white text-[10px] px-3 py-1 font-bold rounded-bl-xl">SAVE 83%</div>
              <span className="font-bold text-lg">Duo Pack (Buy 2)</span>
              <span className="font-black text-xl">₹500</span>
            </button>
          </div>

          <button onClick={() => setShowModal(true)} className="w-full bg-black text-white py-6 rounded-[24px] text-xl font-black shadow-2xl hover:scale-[0.99] transition-transform flex items-center justify-center gap-3 uppercase tracking-widest active:scale-95">
            Complete My Order <ShoppingCart className="w-6 h-6" />
          </button>
          <p className="text-center mt-4 text-[10px] font-bold text-gray-400 tracking-widest uppercase">
            <Truck className="inline w-4 h-4 mr-1" /> Free Fast Delivery + Cash on Delivery
          </p>
        </div>
      </div>

      {/* --- CHECKOUT MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-[40px] p-8 w-full max-w-md relative shadow-2xl overflow-y-auto max-h-[95vh]">
            {orderStatus === 'success' ? (
              <div className="text-center py-10 animate-in zoom-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 stroke-[3]" />
                </div>
                <h3 className="text-3xl font-bold font-serif mb-2">Order Received!</h3>
                <p className="text-gray-500 mb-8">We've added your order to our shipping list. Get ready to glow!</p>
                <button onClick={() => {setShowModal(false); setOrderStatus('idle');}} className="w-full bg-black text-white py-4 rounded-2xl font-bold">Back to Store</button>
              </div>
            ) : (
              <>
                <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black"><X /></button>
                <h3 className="text-2xl font-bold mb-6 font-serif">Delivery Details</h3>
                <div className="space-y-4">
                  <input type="text" placeholder="Full Name" className="w-full border rounded-xl p-4 outline-none focus:ring-2 ring-purple-200" onChange={e => setOrderData({...orderData, name: e.target.value})} />
                  <input type="tel" placeholder="Mobile Number" className="w-full border rounded-xl p-4 outline-none focus:ring-2 ring-purple-200" onChange={e => setOrderData({...orderData, phone: e.target.value})} />
                  <textarea placeholder="House No, Building, Street, Area" className="w-full border rounded-xl p-4 h-24 outline-none focus:ring-2 ring-purple-200 resize-none" onChange={e => setOrderData({...orderData, address: e.target.value})} />
                  <div className="flex gap-2">
                    <input type="text" placeholder="City" className="w-1/2 border rounded-xl p-4 outline-none focus:ring-2 ring-purple-200" onChange={e => setOrderData({...orderData, city: e.target.value})} />
                    <input type="text" placeholder="Pincode" className="w-1/2 border rounded-xl p-4 outline-none focus:ring-2 ring-purple-200" onChange={e => setOrderData({...orderData, pincode: e.target.value})} />
                  </div>
                </div>
                <div className="mt-8 space-y-3">
                  <button onClick={handlePrepaid} className="w-full bg-[#6B21A8] text-white py-5 rounded-2xl font-black shadow-lg shadow-purple-200 hover:bg-purple-700 transition-colors">
                    {orderStatus === 'loading' ? 'Processing...' : `PAY ONLINE - ₹${prepaidPrice} (10% OFF)`}
                  </button>
                  <button onClick={handleCOD} className="w-full bg-gray-100 text-gray-500 py-4 rounded-2xl font-bold border border-gray-100 hover:bg-gray-100 transition-colors">
                    ORDER CASH ON DELIVERY - ₹{price}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
