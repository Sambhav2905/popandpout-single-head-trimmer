
import React from 'react';
import { REVIEWS } from '../constants';
import { Star, CheckCircle } from 'lucide-react';

const Reviews: React.FC = () => {
  // Duplicate reviews to create a seamless loop
  const duplicatedReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">Customer Love</h2>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
          </div>
          <span className="font-bold text-2xl">4.9 / 5.0</span>
        </div>
        <p className="text-gray-500 text-lg">Based on 2,400+ verified purchases across India</p>
      </div>

      <div className="relative">
        <div className="animate-marquee-slow flex gap-6 px-4">
          {duplicatedReviews.map((review, idx) => (
            <div 
              key={`${review.id}-${idx}`} 
              className="w-[300px] md:w-[400px] bg-gray-50 p-8 rounded-[40px] border border-gray-100 flex flex-col h-full shrink-0 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 duration-500"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={review.avatar} alt="" className="w-12 h-12 rounded-full border-2 border-purple-100" />
                <div>
                  <h4 className="font-bold text-gray-900 leading-tight">{review.author}</h4>
                  <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase tracking-widest">
                    <CheckCircle className="w-3 h-3" />
                    Verified Buyer
                  </div>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-600 italic flex-grow leading-relaxed">"{review.text}"</p>
              <div className="mt-6 text-xs text-gray-400 font-bold uppercase tracking-widest">
                Posted {review.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
