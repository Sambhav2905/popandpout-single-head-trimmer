import React, { useState } from 'react';
import { X, Check, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  packType: 'single' | 'duo';
}

const CheckoutModal: React.FC<Props> = ({ isOpen, onClose, packType }) => {
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '', pincode: '', city: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const RAZORPAY_KEY = "rzp_live_S0YispXD1jHCAR";
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzRV9BBd1rdZTHkVsV9qIp5O1MtY3a9Sz2quyXEk1ak9w0Q2NuqSeZjMJzgPRVdXLhH/exec";

  const price = packType === 'single' ? 299 : 500;
  const prepaidPrice = Math.round(price * 0.9);

  // STRICT VALIDATION
  const isFormValid = 
    orderData.name.trim().length > 2 && 
    /^[6-9]\d{9}$/.test(orderData.phone) && // Validates 10-digit Indian Mobile
    orderData.address.trim().length > 10 && 
    orderData.city.trim().length > 2 &&
    orderData.pincode.trim().length === 6;

  const saveOrder = async (id: string, type: string, finalPrice: number) => {
    setStatus('loading');
    const data = { ...orderData, orderId: id, paymentType: type, amount: finalPrice, product: packType === 'single' ? '1x Trimmer' : '2x Trimmer' };
    try {
      await fetch(GOOGLE_SHEET_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
      setStatus('success');
    } catch (e) { setStatus('success'); }
  };

  const handlePrepaid = () => {
    const options = {
      key: RAZORPAY_KEY,
      amount: prepaidPrice * 100,
      currency: "INR",
      name: "Pop & Pout",
      handler: (res: any) => saveOrder(res.razorpay_payment_id, 'PREPAID', prepaidPrice),
      prefill: { name: orderData.name, contact: orderData.phone },
      theme: { color: "#6B21A8" }
    };
    new (window as any).Razorpay(options).open();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-white rounded-[40px] p-8 w-full max-w-md relative shadow-2xl overflow-y-auto max-h-[95vh]">
        {status === 'success' ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><Check size={40} strokeWidth={3}/></div>
            <h3 className="text-2xl font-bold font-serif mb-2">Order Confirmed!</h3>
            <p className="text-gray-500 mb-8">We'll WhatsApp you shortly.</p>
            <button onClick={onClose} className="w-full bg-black text-white py-4 rounded-2xl font-bold">Back to Store</button>
          </div>
        ) : (
          <>
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black"><X /></button>
            <h3 className="text-2xl font-bold mb-6 font-serif">Delivery Details</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border rounded-xl p-4 outline-none focus:ring-2 ring-purple-200" onChange={e => setOrderData({...orderData, name: e.target.value})} />
              <input type="tel" maxLength={10} placeholder="10-Digit Mobile Number" className="w-full border rounded-xl p-4 outline-none focus:ring-2 ring-purple-200" onChange={e => setOrderData({...orderData, phone: e.target.value})} />
              <textarea placeholder="House No, Street, Area" className="w-full border rounded-xl p-4 h-24 outline-none focus:ring-2 ring-purple-200 resize-none" onChange={e => setOrderData({...orderData, address: e.target.value})} />
              <div className="flex gap-2">
                <input type="text" placeholder="City" className="w-1/2 border rounded-xl p-4 outline-none focus:ring-2 ring-purple-200" onChange={e => setOrderData({...orderData, city: e.target.value})} />
                <input type="tel" maxLength={6} placeholder="Pincode" className="w-1/2 border rounded-xl p-4 outline-none focus:ring-2 ring-purple-200" onChange={e => setOrderData({...orderData, pincode: e.target.value})} />
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button 
                disabled={!isFormValid || status === 'loading'}
                onClick={handlePrepaid} 
                className={`w-full py-5 rounded-2xl font-black text-white transition-all ${isFormValid ? 'bg-[#6B21A8] shadow-lg shadow-purple-200' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                {status === 'loading' ? 'Processing...' : `PAY ONLINE - ₹${prepaidPrice} (10% OFF)`}
              </button>
              <button 
                disabled={!isFormValid || status === 'loading'}
                onClick={() => saveOrder('COD-PENDING', 'COD', price)} 
                className={`w-full py-4 rounded-2xl font-bold transition-all ${isFormValid ? 'bg-white text-black border-2 border-gray-100' : 'bg-gray-50 text-gray-300 cursor-not-allowed'}`}
              >
                CASH ON DELIVERY - ₹{price}
              </button>
              {!isFormValid && <p className="text-[10px] text-center text-red-400 font-bold uppercase tracking-widest mt-2">Fill all fields to unlock payment</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
