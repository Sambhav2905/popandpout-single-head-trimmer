
import React from 'react';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6" />
            <h2 className="text-xl font-bold">Your Cart</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-gray-50">
          {/* Free Shipping Progress */}
          <div className="w-full mb-12">
            <p className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-tight">You are ₹1,299 away from Free Shipping!</p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#6B21A8] w-[20%] transition-all" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm w-full">
            <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium mb-6">Your cart is currently empty.</p>
            <button 
              onClick={onClose}
              className="w-full bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-900 transition-all"
            >
              START SHOPPING <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 border-t bg-white">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Estimated Total</span>
            <span className="text-2xl font-bold">₹0.00</span>
          </div>
          <button className="w-full bg-gray-100 text-gray-400 font-bold py-5 rounded-2xl cursor-not-allowed">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
