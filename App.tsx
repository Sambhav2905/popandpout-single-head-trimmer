import React, { useState } from 'react';
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
import CheckoutModal from './components/CheckoutModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packType, setPackType] = useState<'single' | 'duo'>('single');

  const openCheckout = (type?: 'single' | 'duo') => {
    if (type) setPackType(type);
    setIsModalOpen(true);
  };

  const currentPrice = packType === 'single' ? 299 : 500;

  return (
    <div className="min-h-screen bg-white flex flex-col relative pb-20 md:pb-0">
      <Navbar />
      
      <main className="flex-grow">
        <Hero 
          onOrderClick={() => openCheckout()} 
          packType={packType} 
          setPackType={setPackType} 
        />
        
        <VideoReels />
        <FeaturesZigZag />
        
        {/* Mid-page Banner - Opens Duo Pack directly */}
        <section className="bg-[#6B21A8] py-24 text-white text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 font-serif leading-tight">Join The Pop & Pout Beauty Revolution</h2>
            <button 
              onClick={() => openCheckout('duo')} 
              className="bg-white text-[#6B21A8] px-12 py-5 rounded-2xl font-bold text-xl hover:bg-purple-50 transition-all transform hover:scale-105 shadow-2xl uppercase tracking-widest"
            >
              BUY NOW - ₹500
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
      
      {/* Dynamic Sticky CTA */}
      <StickyCTA 
        onOrderClick={() => openCheckout()} 
        currentPrice={currentPrice} 
      />

      {/* Centralized Modal */}
      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        packType={packType}
      />
    </div>
  );
}

export default App;
