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
              <div className="flex items-center gap-1.5 px-3 py-1 bg-
