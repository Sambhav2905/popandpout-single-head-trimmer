import React, { useState } from 'react';

const Hero: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '', pincode: '', city: '' });
  const [packType, setPackType] = useState<'single' | 'duo'>('single');

  const price = packType === 'single' ? 299 : 500;

  // 1. RAZORPAY ONLINE PAYMENT
  const handlePrepaid = () => {
    if (!orderData.name || !orderData.phone || !orderData.address) {
      alert("Please fill all delivery details first!");
      return;
    }

    const prepaidPrice = Math.round(price * 0.9); // 10% Discount for Prepaid
    
    const options = {
      key: "rzp_live_XXXXXXXXXXXXX", // Paste your LIVE KEY here
      amount: prepaidPrice * 100, 
      currency: "INR",
      name: "Pop & Pout",
      description: "Prepaid Order - 10% Discount Applied",
      image: "/images/hero1.png",
      handler: function (response: any) {
        alert("Order Placed! Payment ID: " + response.razorpay_payment_id);
        // Here: Send data to your Google Sheet
        saveToSheet(response.razorpay_payment_id, 'PREPAID', prepaidPrice);
      },
      prefill: { contact: orderData.phone, name: orderData.name },
      theme: { color: "#6B21A8" }
    };
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  // 2. CASH ON DELIVERY
  const handleCOD = () => {
    if (!orderData.name || !orderData.phone || !orderData.address) {
      alert("Please fill delivery details first!");
      return;
    }
    saveToSheet('COD-PENDING', 'COD', price);
    alert("COD Order Received! We will call you to confirm.");
  };

  // 3. SEND TO GOOGLE SHEET (Using SheetDB or similar)
  const saveToSheet = async (id: string, type: string, finalAmount: number) => {
    const data = { ...orderData, orderId: id, paymentType: type, total: finalAmount, date: new Date().toLocaleString() };
    
    // Replace with your SheetDB URL
    await fetch('https://sheetdb.io/api/v1/your-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [data] })
    });
    setShowModal(false);
  };

  return (
    <>
      {/* Your existing Hero UI */}
      <button onClick={() => setShowModal(true)} className="w-full bg-black text-white py-6 rounded-3xl text-xl font-black">
        COMPLETE ORDER - ₹{price}
      </button>

      {/* --- THE CHECKOUT MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4 font-serif">Delivery Address</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Full Name" className="w-full border p-3 rounded-xl" onChange={e => setOrderData({...orderData, name: e.target.value})} />
              <input type="tel" placeholder="Phone Number" className="w-full border p-3 rounded-xl" onChange={e => setOrderData({...orderData, phone: e.target.value})} />
              <textarea placeholder="Full Address (House No, Building, Street)" className="w-full border p-3 rounded-xl" onChange={e => setOrderData({...orderData, address: e.target.value})} />
              <div className="flex gap-2">
                <input type="text" placeholder="City" className="w-1/2 border p-3 rounded-xl" onChange={e => setOrderData({...orderData, city: e.target.value})} />
                <input type="text" placeholder="Pincode" className="w-1/2 border p-3 rounded-xl" onChange={e => setOrderData({...orderData, pincode: e.target.value})} />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button onClick={handlePrepaid} className="w-full bg-[#6B21A8] text-white py-4 rounded-xl font-bold">
                PAY ONLINE - ₹{Math.round(price * 0.9)} (Save 10%)
              </button>
              <button onClick={handleCOD} className="w-full bg-gray-100 text-black py-4 rounded-xl font-bold border border-gray-200">
                CASH ON DELIVERY - ₹{price}
              </button>
              <button onClick={() => setShowModal(false)} className="w-full text-gray-400 text-sm mt-2">Go Back</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
