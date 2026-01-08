import React, { useState } from 'react';
import { Star, Truck, ShoppingCart, Zap, Users, Gift } from 'lucide-react';

const PRODUCT_IMAGES = ['/images/hero1.png', '/images/model-holding.png', '/images/model-mirror.png', '/images/product4.png', '/images/product5.png', '/images/product6.png'];

interface Props {
  packType: 'single' | 'duo';
  setPackType: (val: 'single' | 'duo') => void;
  onOrderClick: () => void;
}

const Hero: React.FC<Props> = ({ packType, setPackType, onOrderClick }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [viewers] = useState(Math.floor(Math.random() * 50) + 40);
  const price = packType === 'single' ? 299 : 500;

  return (
    <section className="pt-24 pb-12 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4">
          <div className="aspect-[3/2] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl">
            <img src={PRODUCT_IMAGES[activeImage]} className="w-full h-full object-cover" alt="Trimmer" />
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {PRODUCT_IMAGES.map((img, idx) => (
              <button key={idx} onClick={() => setActiveImage(idx)} className={`w-16 h-16 rounded-xl border-2 flex-shrink-0 ${activeImage === idx ? 'border-[#6B21A8]' : 'border-gray-100'}`}>
                <img src={img} className="w-full h-full object-cover rounded-lg" alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="bg-purple-50 text-[#6B21A8] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest"><Zap size={12} className="inline mr-1"/> Bestseller</div>
            <div className="bg-purple-50 text-[#6B21A8] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse"><Users size={12} className="inline mr-1"/> {viewers} Viewing</div>
          </div>
          <h1 className="text-4xl font-bold font-serif mb-6">Pop & Pout <span className="text-[#6B21A8]">2-in-1</span> Trimmer</h1>
          
          <div className="bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-100">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-5xl font-black text-[#6B21A8]">₹{price}</span>
              <span className="text-xl text-gray-400 line-through">₹1,499</span>
            </div>
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest flex items-center gap-1"><Gift size={14}/> Extra 10% OFF on UPI/Cards</p>
          </div>

          <div className="space-y-3 mb-8">
            <button onClick={() => setPackType('single')} className={`w-full p-6 rounded-2xl border-2 flex justify-between items-center ${packType === 'single' ? 'border-[#6B21A8] bg-purple-50' : 'bg-white border-gray-100'}`}>
              <span className="font-bold">Individual Pack</span>
              <span className="font-black text-xl">₹299</span>
            </button>
            <button onClick={() => setPackType('duo')} className={`w-full p-6 rounded-2xl border-2 flex justify-between items-center relative ${packType === 'duo' ? 'border-[#6B21A8] bg-purple-50' : 'bg-white border-gray-100'}`}>
              <div className="absolute top-0 right-0 bg-[#6B21A8] text-white text-[10px] px-2 py-1 rounded-bl-lg font-bold">BEST VALUE</div>
              <span className="font-bold">Duo Pack (Set of 2)</span>
              <span className="font-black text-xl">₹500</span>
            </button>
          </div>

          <button onClick={onOrderClick} className="w-full bg-black text-white py-6 rounded-3xl text-xl font-black shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform uppercase tracking-widest">
            Complete My Order <ShoppingCart />
          </button>
          <p className="text-center mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest"><Truck className="inline w-4 h-4 mr-1" /> Free Fast Delivery + Cash on Delivery</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
