
import React from 'react';
// Added RefreshCw to the imports
import { ShieldCheck, ArrowRight, Award, RefreshCw } from 'lucide-react';

const GuaranteeSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#F3E8FF]">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#6B21A8] rounded-full text-white mb-8 shadow-xl shadow-purple-200">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif text-[#1A1A1A]">7-Day Money Back Guarantee</h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          We are so confident that you'll love the Pop & Pout 2-in-1 Trimmer that we offer a <strong>No-Questions-Asked 7-Day Money Back Guarantee</strong>. If you are not satisfied, we'll refund your money.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border border-purple-100 flex items-center gap-4 text-left">
            <Award className="w-10 h-10 text-[#6B21A8] shrink-0" />
            <span className="font-bold text-gray-800 leading-tight">Authentic Brand Products</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-purple-100 flex items-center gap-4 text-left">
            <ShieldCheck className="w-10 h-10 text-[#6B21A8] shrink-0" />
            <span className="font-bold text-gray-800 leading-tight">Secured & Encrypted Payments</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-purple-100 flex items-center gap-4 text-left">
            {/* Correctly using RefreshCw from lucide-react */}
            <RefreshCw className="w-10 h-10 text-[#6B21A8] shrink-0" />
            <span className="font-bold text-gray-800 leading-tight">Hassle-Free Returns & Refunds</span>
          </div>
        </div>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-3 bg-[#6B21A8] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-[#581c87] transition-all transform hover:scale-105 shadow-xl shadow-purple-300 uppercase tracking-widest"
        >
          Try It Risk-Free <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default GuaranteeSection;
