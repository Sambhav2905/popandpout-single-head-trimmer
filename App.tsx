
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesZigZag from './components/FeaturesZigZag';
import VideoReels from './components/VideoReels';
import Comparison from './components/Comparison';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import GuaranteeSection from './components/GuaranteeSection';
import SocialProofPopup from './components/SocialProofPopup';

function App() {
  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const badges = [
    { t: 'Free Shipping India', i: '🚚' },
    { t: 'Cash on Delivery', i: '💵' },
    { t: '1 Year Warranty', i: '🛡️' },
    { t: 'Easy Returns', i: '🔄' },
    { t: 'Dermatologically Tested', i: '✨' }
  ];

  // Duplicate for seamless marquee
  const displayBadges = [...badges, ...badges];

  return (
    <div className="min-h-screen bg-white flex flex-col relative pb-20 md:pb-0">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Trust Badges */}
        <section className="bg-gray-50 py-8 border-y border-gray-100 overflow-hidden">
          <div className="flex gap-8 md:justify-center animate-marquee md:animate-none whitespace-nowrap">
            {displayBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-2.5 font-bold text-[10px] md:text-xs uppercase tracking-widest text-gray-500">
                <span className="text-lg md:text-xl">{badge.i}</span> {badge.t}
              </div>
            ))}
          </div>
        </section>

        <VideoReels />

        <FeaturesZigZag />
        
        {/* Mid-page Banner */}
        <section className="bg-[#6B21A8] py-24 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 font-serif leading-tight">Join The Pop & Pout Beauty Revolution</h2>
            <p className="text-purple-100 text-xl mb-12 max-w-2xl mx-auto">
              Trusted by 50,000+ Indian women. Get yours today with our exclusive Duo Pack offer!
            </p>
            <button onClick={scrollToHero} className="bg-white text-[#6B21A8] px-12 py-5 rounded-2xl font-bold text-xl hover:bg-purple-50 transition-all transform hover:scale-105 shadow-2xl uppercase tracking-widest">
              BUY NOW - ₹499
            </button>
          </div>
        </section>

        <Comparison />
        
        <GuaranteeSection />

        <Reviews />
        <FAQ />
      </main>

      <Footer />
      <SocialProofPopup />
      <StickyCTA />
    </div>
  );
}

export default App;
