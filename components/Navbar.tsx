import React from 'react';
import { Zap } from 'lucide-react';

const Navbar: React.FC = () => {
  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* High-Impact Announcement Bar */}
      <div className="relative overflow-hidden bg-black py-2.5 md:py-3 border-b border-white/10">
        <div className="absolute inset-0 opacity-90 animate-shimmer"></div>
        <div className="relative flex whitespace-nowrap overflow-hidden">
          <div className="animate-marquee inline-block flex items-center gap-8 text-[11px] md:text-sm font-black uppercase tracking-[0.2em] text-white">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-white fill-white" /> 
              NEW YEAR MEGA SALE IS LIVE 
            </span>
            <span className="text-white">•</span>
            <span className="text-white">GET EXTRA 10% OFF ON ALL PREPAID ORDERS</span>
            <span className="text-white">•</span>
            <span className="flex items-center gap-2 text-white">
               🔥 FREE EXPRESS DELIVERY PAN INDIA 
            </span>
            <span className="text-white">•</span>
            <span className="text-white">LIMITED STOCK AVAILABLE</span>
            <span className="text-white">•</span>
            {/* Repeated for loop */}
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-white fill-white" /> 
              NEW YEAR MEGA SALE IS LIVE 
            </span>
            <span className="text-white">•</span>
            <span className="text-white">GET EXTRA 10% OFF ON ALL PREPAID ORDERS</span>
          </div>
        </div>
      </div>

      <nav className="bg-white/95 backdrop-blur-md h-16 md:h-20 border-b border-gray-100 flex items-center px-4 md:px-8">
        {/* Left Side: Desktop Links */}
        <div className="flex-1 flex items-center">
          <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <button onClick={scrollToHero} className="hover:text-purple-700 transition-colors">Buy Now</button>
            <a href="#reviews" className="hover:text-purple-700 transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-purple-700 transition-colors">Support</a>
          </div>
        </div>
        
        {/* Center: Brand Logo */}
        <div className="flex-1 flex justify-center">
          <span onClick={scrollToHero} className="text-2xl md:text-3xl font-bold tracking-tighter text-[#1A1A1A] font-serif cursor-pointer italic group">
            Pop <span className="text-purple-600 group-hover:text-purple-400 transition-colors">&</span> Pout
          </span>
        </div>

        {/* Right Side: Empty to keep Logo Centered */}
        <div className="flex-1"></div>
      </nav>
    </div>
  );
};

export default Navbar;
