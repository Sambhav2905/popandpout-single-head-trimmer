import React, { useState } from 'react';
import { X, Check, ShieldCheck, Lock } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  packType: 'single' | 'duo';
}

const CheckoutModal: React.FC<Props> = ({ isOpen, onClose, packType }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  if (!isOpen) return null;

  // --- CONFIGURATION ---
  const RAZORPAY_KEY = "rzp_live_S0YispXD1jHCAR";
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzRV9BBd1rdZTHkVsV9qIp5O1MtY3a9Sz2quyXEk1ak9w0Q2NuqSeZjMJzgPRVdXLhH/exec";

  // --- PRICING ---
  const price = packType === 'single' ? 299 : 500;
  const prepaidPrice = Math.round(price * 0.9);

  // --- UPDATED VALIDATION ---
  // name.length >= 2 allows "Om", "Jo", or just a First Name
  const isFormValid = 
    formData.name.trim().length >= 2 && 
    /^[6-9]\d{9}$/.test(formData.phone) && 
    formData.address.trim().length >= 5 && // Lowered for short addresses
    formData.city.trim().length >= 2 &&
    formData.pincode.trim().length === 6;

  // --- SAVE TO GOOGLE SHEETS ---
  const saveOrderToSheet = async (orderId: string, payType: string, finalAmt: number) => {
    const data = {
      ...formData,
      paymentType: payType,
      amount: finalAmt,
      product: packType === 'single' ? 'Individual Pack' : 'Duo Pack (Buy 2)',
      orderId: orderId,
      date: new Date().toLocaleString()
    };

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setStatus('success');
    } catch (error) {
      console.error("Storage Error:", error);
      setStatus('success');
    }
  };

  // --- PAYMENT HANDLERS ---
  const handlePrepaid = () => {
    setStatus('loading');

    const options = {
      key: RAZORPAY_KEY,
      amount: prepaidPrice * 100, 
      currency: "INR",
      name: "Pop & Pout India",
      description: `${packType === 'single' ? 'Individual' : 'Duo'} Pack Order`,
      image: "/images/hero1.png",
      prefill: {
        name: formData.name,
        contact: formData.phone
      },
      theme: { color: "#6B21A8" },
      handler: async function (response: any) {
        await saveOrderToSheet(response.razorpay_payment_id, 'PREPAID', prepaidPrice);
      },
      modal: {
        ondismiss: function() {
          setStatus('idle');
        }
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handleCOD = async () => {
    setStatus('loading');
    await saveOrderToSheet('COD-ORDER', 'COD', price);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 px-4 py-6 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-[32px] p-6 relative shadow-2xl my-auto">
        
        {status === 'success' ? (
          <div className="text-center py-8 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} strokeWidth={3} />
            </div>
            <h3 className="text-3xl font-bold font-serif mb-2 text-black">Order Placed!</h3>
            <p className="text-gray-500 mb-8 px-4">We've received your details. Our team will WhatsApp you shortly to confirm shipping.</p>
            <button 
              onClick={onClose} 
              className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
            >
              Back to Store
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold font-serif text-black">Delivery Details</h3>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">Fast Pan-India Shipping</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="text-gray-400" size={24} />
              </button>
            </div>

            <div className="space-y-3">
              <input 
                autoComplete="off"
                type="text" 
                placeholder="Full Name" 
                className="w-full border border-gray-200 rounded-xl p-4 text-base text-black focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
              
              <input 
                autoComplete="off"
                type="tel" 
                inputMode="tel"
                maxLength={10}
                placeholder="10-Digit Mobile Number" 
                className="w-full border border-gray-200 rounded-xl p-4 text-base text-black focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                onChange={e => setFormData({...formData, phone: e.target.value})} 
              />

              <textarea 
                autoComplete="off"
                placeholder="Complete Address" 
                className="w-full border border-gray-200 rounded-xl p-4 h-24 text-base text-black focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                onChange={e => setFormData({...formData, address: e.target.value})} 
              />

              <div className="flex gap-2">
                <input 
                  autoComplete="off"
                  type="text" 
                  placeholder="City" 
                  className="w-1/2 border border-gray-200 rounded-xl p-4 text-base text-black focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  onChange={e => setFormData({...formData, city: e.target.value})} 
                />
                <input 
                  autoComplete="off"
                  type="tel" 
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Pincode" 
                  className="w-1/2 border border-gray-200 rounded-xl p-4 text-base text-black focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  onChange={e => setFormData({...formData, pincode: e.target.value})} 
                />
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button 
                disabled={!isFormValid || status === 'loading'}
                onClick={handlePrepaid} 
                className={`w-full py-5 rounded-2xl font-black text-white flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  isFormValid ? 'bg-[#6B21A8] shadow-lg shadow-purple-200' : 'bg-gray-300 cursor-not-allowed opacity-70'
                }`}
              >
                {status === 'loading' ? 'Processing...' : `PAY ONLINE - ₹${prepaidPrice} (10% OFF)`}
                {isFormValid && status !== 'loading' && <ShieldCheck size={18} />}
              </button>

              <button 
                disabled={!isFormValid || status === 'loading'}
                onClick={handleCOD} 
                className={`w-full py-4 rounded-2xl font-bold border-2 transition-all active:scale-95 ${
                  isFormValid ? 'bg-white border-black text-black' : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                CASH ON DELIVERY - ₹{price}
              </button>

              {!isFormValid && (
                <p className="text-[10px] text-center text-red-400 font-black uppercase tracking-widest mt-2">Fill all fields to unlock</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
