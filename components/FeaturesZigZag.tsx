
import React from 'react';
import { FEATURES } from '../constants';

const FeaturesZigZag: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 font-serif">Illuminate Your Beauty Routine!</h2>
        <div className="space-y-24">
          {FEATURES.map((feat, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-20`}>
              <div className="flex-1 w-full">
                <div className="aspect-[4/5] md:aspect-square bg-gray-50 rounded-[40px] overflow-hidden border border-gray-100">
                  <img src={feat.img} alt={feat.title} className="w-full h-full object-cover p-4 md:p-12 transition-transform hover:scale-105 duration-700" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="text-[#6B21A8] font-bold text-sm tracking-widest uppercase mb-4 block">Feature 0{i+1}</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A1A1A]">{feat.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">{feat.desc}</p>
                <button className="inline-flex items-center gap-2 text-[#6B21A8] font-bold border-b-2 border-purple-200 pb-1 hover:border-[#6B21A8] transition-all">
                  LEARN MORE ABOUT THIS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesZigZag;
