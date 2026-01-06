import React from 'react';
import { Instagram, Phone, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  // We define the message here and encode it properly for the web
  const whatsappNumber = "919810241645";
  const message = "Hey Pop & Pout Team! I have a question.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-3xl font-bold tracking-tighter font-serif text-purple-500 mb-6 italic">Pop & Pout</h2>
            <p className="text-gray-400 mb-6 text-sm">
              Empowering women with pain-free precision grooming tools. Look flawless every single day with Pop & Pout.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-50 transition-colors hover:text-purple-600">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Policies Column */}
          <div>
            <h4 className="font-bold text-lg mb-6">Policies</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="/privacy-policy.html" className="hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="/shipping-policy.html" className="hover:text-white transition-colors text-sm">Shipping Policy</a></li>
              <li><a href="/terms.html" className="hover:text-white transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-bold text-lg mb-6">Customer Care</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-purple-500" /> 
                <a href="tel:+919810241645" className="hover:text-white font-bold transition-colors text-sm">+91 98102 41645</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-green-500" /> 
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 font-bold transition-colors text-sm">WhatsApp Us</a>
              </li>
              <li className="text-sm mt-2">Mon - Sat: 10AM - 7PM</li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <h4 className="font-bold text-lg mb-6">Stay Updated</h4>
            <p className="text-gray-400 mb-4 text-sm">Subscribe for grooming tips and exclusive offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 border-none rounded-l-xl px-4 py-3 w-full focus:ring-2 focus:ring-purple-500 text-sm" 
              />
              <button className="bg-purple-600 px-6 py-3 rounded-r-xl font-bold hover:bg-purple-700 transition-colors text-sm">
                GO
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© 2026 Pop & Pout India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
