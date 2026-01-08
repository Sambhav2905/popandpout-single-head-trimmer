import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface Props { isOpen: boolean; onClose: () => void; packType: 'single' | 'duo'; }

const CheckoutModal: React.FC<Props> = ({ isOpen, onClose, packType }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', pincode: '', city: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  if (!isOpen) return null;

  const price = packType === 'single' ? 299 : 500;
  const prepaidPrice = Math.round(price * 0.9);

  // SIMPLE BUT STRICT VALIDATION
  const isReady = formData.name.length > 2 && formData.phone.length === 10 && formData.address.length > 5 && formData.pincode.length === 6;

  const handleOrder = async (payType: string, finalAmt: number) => {
    setStatus('loading');
    const data = { ...formData, paymentType: payType, amount: finalAmt, product: packType, orderId: payType === 'COD' ? 'COD-PENDING' : 'PREPAID-INIT' };
    
    // Using your exact URL
    await fetch("https://script.google.com/macros/s/AKfycbzRV9BBd1rdZTHkVsV9qIp5O1MtY3a9Sz2quyXEk1ak9w0Q2NuqSeZjMJzgPRVdXLhH/exec", {
      method: 'POST', mode: 'no-cors', body: JSON.stringify(data)
    });

    if (payType === 'PREPAID') {
      const options = {
        key: "rzp_live_S0YispXD1jHCAR",
        amount: finalAmt * 100,
        currency: "INR",
        name: "Pop & Pout",
        prefill: { name: formData.name, contact: formData.phone },
        theme: { color: "#6B21A8" },
        handler: () => setStatus('success')
      };
      new (window as any).Razorpay(options).open();
    } else {
      setStatus('success');
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 px-4 py-6 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-[32px] p-6 relative shadow-2xl my-auto">
        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={32}/></div>
            <h3 className="text-2xl font-bold mb-6">Order Placed!</h3>
            <button onClick={onClose} className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest">Back to Store</button>
          </div>
        ) : (
          <>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400"><X /></button>
            <h3 className="text-xl font-bold mb-6 font-serif">Delivery Details</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border border-gray-200 rounded-xl p-4 text-base" onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="tel" inputMode="tel" maxLength={10} placeholder="Mobile Number" className="w-full border border-gray-200 rounded-xl p-4 text-base" onChange={e => setFormData({...formData, phone: e.target.value})} />
              <textarea placeholder="Complete Address" className="w-full border border-gray-200 rounded-xl p-4 h-24 text-base" onChange={e => setFormData({...formData, address: e.target.value})} />
              <div className="flex gap-2">
                <input type="text" placeholder="City" className="w-1/2 border border-gray-200 rounded-xl p-4 text-base" onChange={e => setFormData({...formData, city: e.target.value})} />
                <input type="tel" inputMode="numeric" maxLength={6} placeholder="Pincode" className="w-1/2 border border-gray-200 rounded-xl p-4 text-base" onChange={e => setFormData({...formData, pincode: e.target.value})} />
              </div>
            </div>
            <div className="mt-8 space-y-3">
              <button disabled={!isReady || status === 'loading'} onClick={() => handleOrder('PREPAID', prepaidPrice)} className={`w-full py-5 rounded-2xl font-black text-white ${isReady ? 'bg-[#6B21A8] shadow-lg' : 'bg-gray-300'}`}>
                {status === 'loading' ? 'Processing...' : `PAY ONLINE - ₹${prepaidPrice}`}
              </button>
              <button disabled={!isReady || status === 'loading'} onClick={() => handleOrder('COD', price)} className={`w-full py-4 rounded-2xl font-bold border-2 ${isReady ? 'bg-white text-black' : 'bg-gray-50 text-gray-300'}`}>
                CASH ON DELIVERY - ₹{price}
              </button>
              {!isReady && <p className="text-[10px] text-center text-gray-400 uppercase font-bold tracking-widest">Complete form to unlock buttons</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default CheckoutModal;
