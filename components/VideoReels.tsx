import React, { useState } from 'react';
import { REELS } from '../constants';
import { Play, X, ShieldCheck } from 'lucide-react';

const VideoReels: React.FC = () => {
  // CHANGED: We now store the whole reel object so we can access the videoUrl
  const [selectedReel, setSelectedReel] = useState<typeof REELS[0] | null>(null);

  const duplicatedReels = [...REELS, ...REELS, ...REELS];

  return (
    <section id="reels" className="py-24 bg-[#FDFCFD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 font-serif">Loved by 50,000+ Women</h2>
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-[#6B21A8]" />
          <p className="text-[#6B21A8] font-bold text-sm uppercase tracking-widest">India's #1 Choice for Painless Grooming</p>
        </div>
      </div>

      <div className="relative group/marquee">
        <div className="animate-marquee-slow flex gap-6 px-4 hover:[animation-play-state:paused] cursor-pointer">
          {duplicatedReels.map((reel, idx) => (
            <div 
              key={`${reel.id}-${idx}`} 
              onClick={() => setSelectedReel(reel)} // CHANGED: Passing the whole reel
              className="flex-shrink-0 w-72 h-[480px] md:w-[320px] md:h-[560px] relative rounded-[40px] overflow-hidden group shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <img 
                src={reel.thumbnail} 
                alt={reel.title} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-115"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-purple-900/80"></div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mb-6 border border-white/30 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-[#6B21A8] group-hover:border-transparent group-active:scale-95">
                  <Play className="w-6 h-6 text-white fill-current transition-transform duration-500 group-hover:translate-x-0.5" />
                  <div className="absolute inset-0 rounded-full bg-white/40 animate-ping opacity-0 group-hover:opacity-100"></div>
                </div>
                
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="text-white font-bold text-2xl mb-2 font-serif">{reel.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <p className="text-purple-200 text-xs font-bold uppercase tracking-widest">Verified Results</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal / Lightbox */}
      {selectedReel && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300" 
            onClick={() => setSelectedReel(null)}
          />
          
          <div className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/10">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedReel(null)}
              className="absolute top-6 right-6 z-20 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* CHANGED: Real Video Player instead of Placeholder Image */}
            <div className="w-full h-full relative">
              <video 
                src={selectedReel.videoUrl} 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                playsInline
                controls // Allows users to unmute/scrub
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Modal Bottom Branding */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent pointer-events-none">
               <span className="text-white font-serif font-bold text-xl italic">Pop & Pout</span>
               <p className="text-purple-300 text-xs font-bold uppercase tracking-tighter">Shop this look below</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoReels;
