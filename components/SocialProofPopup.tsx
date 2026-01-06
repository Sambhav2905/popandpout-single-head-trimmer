
import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

const RECENT_PURCHASES = [
  { name: 'Priya', city: 'Mumbai' },
  { name: 'Ananya', city: 'Delhi' },
  { name: 'Sneha', city: 'Bangalore' },
  { name: 'Mehak', city: 'Chandigarh' },
  { name: 'Ritu', city: 'Pune' },
  { name: 'Kavita', city: 'Ahmedabad' }
];

const SocialProofPopup: React.FC = () => {
  const [purchaseIndex, setPurchaseIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDelayedShow, setIsDelayedShow] = useState(false);

  useEffect(() => {
    // Initial delay before showing the first popup
    const initialDelay = setTimeout(() => {
      setIsDelayedShow(true);
      setIsVisible(true);
    }, 3000);

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setPurchaseIndex(prev => (prev + 1) % RECENT_PURCHASES.length);
        setIsVisible(true);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  if (!isDelayedShow) return null;

  return (
    <div className={`fixed z-[80] left-4 md:left-8 transition-all duration-700 transform 
      ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}
      bottom-24 md:bottom-8`} // Higher bottom on mobile to clear StickyCTA
    >
      <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-purple-100 shadow-[0_10px_40px_rgba(0,0,0,0.1)] px-5 py-3.5 rounded-[24px] max-w-[280px] md:max-w-none">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-[#6B21A8]">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </div>
        
        <div className="flex flex-col">
          <p className="text-[11px] md:text-[13px] text-gray-600 leading-snug">
            <span className="font-black text-[#6B21A8]">{RECENT_PURCHASES[purchaseIndex].name}</span> from <span className="font-bold text-gray-900">{RECENT_PURCHASES[purchaseIndex].city}</span> just ordered!
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Verified Purchase</span>
            <span className="text-[9px] text-gray-300">•</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">2 mins ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofPopup;
