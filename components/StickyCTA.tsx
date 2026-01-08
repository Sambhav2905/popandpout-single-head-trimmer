import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';

interface Props { onOrderClick: () => void; price: number; }

const StickyCTA: React.FC<Props> = ({ onOrderClick, price }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsVisible(window.scrollY > 600); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 p-4 z-[900] md:hidden animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-black uppercase">Your Total</span>
          <p className="text-2xl font-black text-[#6B21A8]">₹{price}</p>
        </div>
        <button onClick={onOrderClick} className="flex-1 bg-black text-white font-black py-4 rounded-2xl shadow-xl text-sm uppercase tracking-widest flex items-center justify-center gap-2">
          Order Now <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
};

export default StickyCTA;
