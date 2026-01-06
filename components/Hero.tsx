import React, { useState } from 'react';
// ... other imports

const Hero: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '', pincode: '' });
  const [packType, setPackType] = useState<'single' | 'duo'>('single');

  const price = packType === 'single' ? 299 : 500;

  // 1. ONLINE PAYMENT (RAZORPAY)
  const handlePrepaid = () => {
    const prepaidPrice = Math.round(price * 0.9); // 10% Discount
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: prepaidPrice * 100,
      currency: "INR",
      name: "Pop & Pout",
      description: "Prepaid Order - 10% Discount Applied",
      handler: async function (response: any) {
        saveOrder(response.razorpay_payment_id, 'PREPAID', prepaidPrice);
      },
      prefill: { contact: orderData.phone, name: orderData.name }
    };
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  // 2. COD ORDER
  const handleCOD = () => {
    saveOrder('PENDING', 'COD', price);
  };

  // 3. SAVE TO GOOGLE SHEETS
  const saveOrder = async (paymentId: string, type: string, finalPrice: number) => {
    const data = {
      ...orderData,
      id: paymentId,
      type: type,
      total: finalPrice,
      product: packType === 'single' ? '1x Trimmer' : '2x Trimmer',
      date: new Date().toLocaleString()
    };

    // Replace with your SheetDB or Formspree URL
    await fetch('https://sheetdb.io/api/v1/your-api-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [data] })
    });

    alert("Order Placed Successfully!");
    setShowModal(false);
  };

  return (
    <section>
      {/* ... your existing product UI ... */}
      
      <button 
        onClick={() => setShowModal(true)}
        className="w-full bg-black text-white font-black py-6 rounded-3xl text-xl"
      >
        COMPLETE ORDER - ₹{price}
      </button>

      {/* --- SHIPPING & PAYMENT MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 font-serif">Delivery Details</h3>
            
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border p-3 rounded-xl" 
                onChange={e => setOrderData({...orderData, name: e.target.value})} />
              <input type="tel" placeholder="Phone Number" className="w-full border p-3 rounded-xl" 
                onChange={e => setOrderData({...orderData, phone: e.target.value})} />
              <textarea placeholder="Full Address (House No, Street, Area)" className="w-full border p-3 rounded-xl" 
                onChange={e => setOrderData({...orderData, address: e.target.value})} />
              <input type="text" placeholder="Pincode" className="w-full border p-3 rounded-xl" 
                onChange={e => setOrderData({...orderData, pincode: e.target.value})} />
            </div>

            <div className="mt-8 space-y-3">
              <button onClick={handlePrepaid} className="w-full bg-[#6B21A8] text-white py-4 rounded-xl font-bold">
                PAY ONLINE - ₹{Math.round(price * 0.9)} (Save 10%)
              </button>
              <button onClick={handleCOD} className="w-full bg-gray-100 text-black py-4 rounded-xl font-bold border border-gray-200">
                CASH ON DELIVERY - ₹{price}
              </button>
              <button onClick={() => setShowModal(false)} className="w-full text-gray-400 text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
