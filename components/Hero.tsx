import React, { useState, useEffect } from 'react';
import { Star, Check, Truck, Clock, Package, Users, ShoppingCart, ShieldCheck, Flame, Zap, Gift } from 'lucide-react';

const PRODUCT_IMAGES = [
  '/images/hero1.png',
  '/images/model-holding.png',
  '/images/model-mirror.png',
  '/images/product4.png',
  '/images/product5.png',
  '/images/product6.png'
];

interface Props {
  onOrderClick: () => void;
  packType: 'single' | 'duo';
  setPackType: (type: 'single' | 'duo') => void;
}

const Hero: React.FC<Props> = ({ onOrderClick, packType, setPackType }) => {
  const [activeImage, setActiveImage] = useState(0);
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

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const price = packType === 'single' ? 299 : 500;

  return (
    <section className="pt-24 pb-12 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20">
        
        {/* Left: Product Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[3/2] bg-white rounded-3xl overflow-hidden border border-gray-100 flex items-center justify-center shadow-xl">
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
                  activeImage === idx ? 'border-[#6B21A8] ring-4 ring-purple-50' : 'border-gray-100 opacity-60'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Sales Copy & Pricing */}
        <div className="flex flex-col">
          <div className="space-y-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-100 rounded-full text-[#059669] text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                7-Day Replacement Guarantee
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-100 rounded-full text-[#6B21A8] text-[10px] font-black uppercase tracking-widest animate-pulse">
                <Users className="w-3.5 h-3.5" />
                {viewers} Viewing Now
              </div>
            </div>

            <h1 className="text-3xl md:text-[45px] font-bold text-[#1A1A1A] leading-[1.1] font-serif">
              Pop & Pout <span className="text-[#6B21A8]">2-in-1</span> Precision Trimmer
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm font-bold text-gray-500">4.9 (2,400+ Verified Indian Buyers)</span>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-gray-50 rounded-[32px] p-6 border border-gray-100 mb-8 relative overflow-hidden">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-5xl font-black text-[#6B21A8]">₹{price}</span>
              <div className="flex flex-col">
                <span className="text-xl text-gray-400 line-through font-medium">₹1,499</span>
                <span className="inline-flex bg-[#6B21A8] text-white px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  SAVE {packType === 'single' ? '80%' : '83%'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Clock className="w-4 h-4 text-[#6B21A8]" />
                Sale Ends In: <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-red-600 uppercase tracking-widest">
                <Flame className="w-3 h-3 animate-bounce" /> Stock: 14 Left
              </div>
            </div>
          </div>

          {/* Feature Bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              "Built-in LED Glow",
              "18K Gold-Plated Precision",
              "Painless & No Redness",
              "USB Fast Charging"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-50 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <Check className="w-3.5 h-3.5 stroke-[4]" />
                </div>
                <span className="text-sm font-bold text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Selection Buttons */}
          <div className="space-y-3 mb-8">
            <button 
              onClick={() => setPackType('single')}
              className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                packType === 'single' ? 'border-[#6B21A8] bg-purple-50 ring-2 ring-purple-100' : 'border-gray-100 bg-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${packType === 'single' ? 'border-[#6B21A8]' : 'border-gray-300'}`}>
                  {packType === 'single' && <div className="w-3 h-3 bg-[#6B21A8] rounded-full" />}
                </div>
                <span className="font-bold text-lg">Individual Pack</span>
              </div>
              <p className="font-black text-xl">₹299</p>
            </button>

            <button 
              onClick={() => setPackType('duo')}
              className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 relative overflow-hidden transition-all ${
                packType === 'duo' ? 'border-[#6B21A8] bg-purple-50 ring-2 ring-purple-100' : 'border-gray-100 bg-white'
              }`}
            >
              <div className="absolute top-0 right-0 bg-[#6B21A8] text-white text-[10px] px-3 py-1 font-black rounded-bl-xl uppercase tracking-tighter">Best Value</div>
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${packType === 'duo' ? 'border-[#6B21A8]' : 'border-gray-300'}`}>
                  {packType === 'duo' && <div className="w-3 h-3 bg-[#6B21A8] rounded-full" />}
                </div>
                <div>
                   <p className="font-bold text-lg">Duo Pack (Set of 2)</p>
                   <p className="text-[10px] text-[#6B21A8] font-bold uppercase tracking-widest">₹250 per unit</p>
                </div>
              </div>
              <p className="font-black text-xl">₹500</p>
            </button>
          </div>

          {/* Prepaid Offer */}
          <div className="bg-[#FEF3C7] border-2 border-dashed border-[#F59E0B] rounded-2xl p-4 mb-6 shadow-sm">
            <p className="text-[11px] font-black text-center text-[#92400E] uppercase tracking-widest flex items-center justify-center gap-2">
              ✨ PAY ONLINE & GET EXTRA 10% DISCOUNT ✨
            </p>
          </div>

          {/* CTA Button */}
          <button 
            onClick={onOrderClick}
            className="w-full bg-black text-white font-black py-6 rounded-[24px] text-xl hover:scale-[0.99] transition-all flex items-center justify-center gap-3 uppercase tracking-widest shadow-2xl"
          >
            Complete My Order <ShoppingCart className="w-6 h-6" />
          </button>
          
          <p className="text-center mt-4 text-[10px] font-bold text-gray-400 tracking-widest uppercase">
            <Truck className="inline w-4 h-4 mr-1" /> Fast Delivery India + Cash on Delivery
          </p>

          {/* Shipping Timeline */}
          <div className="flex justify-between items-center px-2 mt-8">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-[#6B21A8] mb-1"><Package size={20}/></div>
              <span className="text-[9px] font-bold text-gray-500">Ordered</span>
            </div>
            <div className="h-[2px] bg-purple-100 flex-1 mx-2" />
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-[#6B21A8] mb-1"><Truck size={20}/></div>
              <span className="text-[9px] font-bold text-gray-500">Shipped</span>
            </div>
            <div className="h-[2px] bg-purple-100 flex-1 mx-2" />
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-1"><Check size={20}/></div>
              <span className="text-[9px] font-bold text-gray-500">Delivered</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
