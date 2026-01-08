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
import CheckoutModal from './components/CheckoutModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packType, setPackType] = useState<'single' | 'duo'>('single');

  const currentPrice = packType === 'single' ? 299 : 500;

  return (
    <div className="min-h-screen bg-white flex flex-col relative pb-20 md:pb-0">
      <Navbar />
      <main className="flex-grow">
        <Hero 
          packType={packType} 
          setPackType={setPackType} 
          onOrderClick={() => setIsModalOpen(true)} 
        />
        <VideoReels />
        <FeaturesZigZag />
        <Comparison />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
      
      {/* Both components now use the same state */}
      <StickyCTA 
        price={currentPrice} 
        onOrderClick={() => setIsModalOpen(true)} 
      />
      
      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        packType={packType} 
      />
    </div>
  );
}

export default App;
