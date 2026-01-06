
import React, { useEffect, useState } from 'react';

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-[90] md:hidden animate-in slide-in-from-bottom duration-300 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Price</span>
          <p className="text-xl font-bold text-[#6B21A8]">₹499.00</p>
        </div>

        <button className="flex-1 bg-black text-white font-bold py-4 rounded-xl shadow-lg shadow-gray-200 active:scale-95 transition-all text-sm uppercase tracking-widest">
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default StickyCTA;
