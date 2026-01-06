
import React from 'react';
import { Check, X } from 'lucide-react';

const Comparison: React.FC = () => {
  const comparisonData = [
    { label: 'Adjustable LED Light', v: true, o: false },
    { label: 'USB Rechargeable', v: true, o: false },
    { label: 'Precise Head System', v: true, o: false },
    { label: 'Painless Micro-Blades', v: true, o: false },
    { label: 'Dermatologically Safe', v: true, o: false }
  ];

  return (
    <section className="py-24 bg-[#FDFCFD] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 font-serif px-2">Why Pop & Pout Stands Out</h2>
        
        <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden w-full mx-auto">
          {/* Main Table Structure with horizontal scroll for mobile safety */}
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="min-w-[320px] md:min-w-0 w-full">
              {/* Header Row - Using a 4-column grid */}
              <div className="grid grid-cols-4 bg-[#F9F5FF] border-b border-purple-100/50">
                <div className="col-span-2 p-4 md:p-10 flex items-center">
                  <span className="text-[10px] md:text-sm font-black text-[#6B21A8] uppercase tracking-[0.25em] md:tracking-[0.3em]">Key Advantages</span>
                </div>
                <div className="col-span-1 p-2 md:p-10 flex flex-col items-center justify-center border-x border-purple-50">
                  <span className="text-[10px] md:text-lg font-bold text-[#6B21A8] text-center leading-tight font-serif italic">Pop & Pout</span>
                </div>
                <div className="col-span-1 p-2 md:p-10 flex items-center justify-center">
                  <span className="text-[10px] md:text-lg font-bold text-gray-400 text-center leading-tight font-serif italic">Others</span>
                </div>
              </div>

              {/* Data Rows */}
              <div className="divide-y divide-gray-50">
                {comparisonData.map((row, i) => (
                  <div key={i} className="grid grid-cols-4 hover:bg-purple-50/20 transition-colors group">
                    <div className="col-span-2 p-4 md:p-10 flex items-center">
                      <span className="text-[11px] md:text-lg font-bold text-gray-700 leading-tight group-hover:text-[#6B21A8] transition-colors">{row.label}</span>
                    </div>
                    <div className="col-span-1 p-2 md:p-10 flex justify-center items-center border-x border-gray-50">
                      <div className="w-6 h-6 md:w-11 md:h-11 bg-green-50 rounded-full flex items-center justify-center text-green-500 shadow-sm border border-green-100 transform group-hover:scale-110 transition-transform">
                        <Check className="w-3.5 h-3.5 md:w-6 md:h-6 stroke-[3.5]" />
                      </div>
                    </div>
                    <div className="col-span-1 p-2 md:p-10 flex justify-center items-center">
                      <div className="w-6 h-6 md:w-11 md:h-11 flex items-center justify-center text-gray-200">
                        <X className="w-4 h-4 md:w-7 md:h-7 stroke-[1.5]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer Branding */}
          <div className="bg-[#FAFAFA] py-4 md:py-6 px-4 md:px-8 border-t border-gray-100 flex items-center justify-center gap-2 md:gap-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#6B21A8] rounded-full animate-pulse"></div>
            <span className="text-[8px] md:text-sm font-black text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.3em]">Precision Grooming Standard 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
