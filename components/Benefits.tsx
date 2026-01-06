
import React from 'react';
import { FEATURES } from '../constants';

const Benefits: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-rose-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-rose-100 flex flex-col items-center text-center transform transition-transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
