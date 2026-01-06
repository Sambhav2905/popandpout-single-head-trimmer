import React, { useState, useEffect } from 'react';
import { Star, Check, Truck, Clock, Package, Users, ShoppingCart, ShieldCheck, Flame, Zap } from 'lucide-react';

// Fixed paths: Added commas and removed spaces/missing extensions
const PRODUCT_IMAGES = [
  '/images/hero1.png',
  '/images/model-holding.png',
  '/images/model-mirror.png',
  '/images/product4.png',
  '/images/product5.png',
  '/images/product6.png'
];

const Hero: React.FC = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [packType, setPackType] = useState<'single' | 'duo'>('single');
  const [timeLeft, setTimeLeft] = useState(15795); 
  const [viewers, setViewers] = useState(Math.floor(Math.random() * (120 - 40 + 1)) + 40);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const viewerInterval = setInterval(() => {
      setViewers(prev => {
        const delta = Math.floor(Math.random() * 7) - 3;
        const newVal = prev + delta;
        return newVal < 30 ? 30 : newVal > 150 ? 150 : newVal;
      });
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(viewerInterval);
    };
  }, []);

  // --- RAZORPAY PAYMENT LOGIC ---
  const handlePayment = () => {
    const price = packType === 'single' ? 399 : 649;
    
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // REPLACE THIS with your key from Razorpay Dashboard
      amount: price * 100, // Razorpay takes amount in paise
      currency: "INR",
      name: "Pop & Pout",
      description: `${packType === 'single' ? 'Individual' : 'Duo'} Pack - Pop & Pout Trimmer`,
      image: "/images/hero1.png",
      handler: function (response: any) {
        alert("Payment Successful! Order ID: " + response.razorpay_payment_id);
        // You can redirect to a success page here
      },
      prefill: {
        name: "",
        email: "",
        contact: ""
      },
      theme: {
        color: "#6B21A8"
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isExpiringSoon = timeLeft < 3600;
  const isCriticallyLow = timeLeft < 600;

  return (
    <section className="pt-24 pb-12 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20">
        {/* Left: Images */}
        <div className="flex flex-col gap-4">
          <div className="zoom-container aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center cursor-zoom-in shadow-sm">
            <img 
              src={PRODUCT_IMAGES[activeImage]} 
              alt="Pop & Pout Trimmer" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {PRODUCT_IMAGES.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 md:w-24 aspect-square flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all shadow-sm ${
                  activeImage === idx ? 'border-[#6B21A8] ring-2 ring-purple-100' : 'border-gray-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="space-y-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-100 rounded-full text-[#059669] text-[11px] font-extrabold uppercase tracking-tight">
                <ShieldCheck className="w-3.5 h-3.5" />
                7-Day Money Back Guarantee
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-100 rounded-full text-[#6B21A8] text-[11px] font-extrabold uppercase tracking-tight animate-pulse">
                <Users className="w-3.5 h-3.5" />
                {viewers} Viewing Now
              </div>
            </div>

            <h1 className="text-3xl md:text-[40px] font-bold text-[#1A1A1A] leading-[1.15] font-serif">
              Pop & Pout Compact <span className="text-[#6B21A8]">Rechargeable</span> Trimmer
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm font-bold text-gray-500">4.9 (2,400+ Verified Purchases)</span>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100 mb-8 relative overflow-hidden">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-5xl font-black text-[#6B21A8] tracking-tighter">₹{packType === 'single' ? '499' : '749'}</span>
              <div className="flex flex-col">
                <span className="text-xl text-gray-400 line-through font-medium">₹{packType === 'single' ? '1,499' : '2,998'}</span>
                <span className="inline-flex bg-[#6B21A8] text-white px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">
                  SAVE {packType === 'single' ? '67%' : '75%'}
                </span>
              </div>
            </div>

            <div className={`flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm ${isExpiringSoon ? 'border-red-100 bg-red-50/30' : ''}`}>
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 text-[#6B21A8] ${isCriticallyLow ? 'text-red-500 animate-pulse' : ''}`} />
                <span className={`text-[13px] font-bold tracking-tight ${isCriticallyLow ? 'text-red-600' : 'text-gray-700'}`}>
                  Sale Ends in: <span className="font-mono text-[15px]">{formatTime(timeLeft)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Package Selection */}
          <div className="space-y-3 mb-8">
            <button 
              onClick={() => setPackType('single')}
              className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                packType === 'single' ? 'border-[#6B21A8] bg-purple-50' : 'border-gray-100 bg-white'
              }`}
            >
              <div>
                <p className="font-bold text-[#1A1A1A] text-lg">Individual Pack</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Buy 1 at ₹499</p>
              </div>
              <p className="font-black text-xl text-[#1A1A1A]">₹499</p>
            </button>

            <button 
              onClick={() => setPackType('duo')}
              className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 relative overflow-hidden transition-all ${
                packType === 'duo' ? 'border-[#6B21A8] bg-purple-50' : 'border-gray-100 bg-white'
              }`}
            >
              <div className="absolute top-0 right-0 bg-[#6B21A8] text-white text-[10px] px-3 py-1 font-black uppercase tracking-widest rounded-bl-xl">
                Best Value
              </div>
              <div>
                <p className="font-bold text-[#1A1A1A] text-lg">Duo Pack (Set of 2)</p>
                <p className="text-xs text-[#6B21A8] font-black uppercase tracking-wider">₹375 per unit</p>
              </div>
              <p className="font-black text-xl text-[#1A1A1A]">₹749</p>
            </button>
          </div>

          <button 
            onClick={handlePayment}
            className="w-full bg-black text-white font-black py-6 rounded-3xl text-xl hover:bg-gray-900 transition-all transform active:scale-[0.98] shadow-2xl uppercase tracking-widest flex items-center justify-center gap-3 group"
          >
            Complete Order <ShoppingCart className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-center mt-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <Truck className="w-4 h-4" /> Free Delivery Pan India + COD Available + 10% off on prepaid orders
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
