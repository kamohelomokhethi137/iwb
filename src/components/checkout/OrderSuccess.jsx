import React from 'react';

const OrderSuccess = ({ formData, handleCheckoutComplete }) => (
  <div className="text-center py-8">
    <div className="text-green-500 text-5xl mb-4">✓</div>
    <h3 className="text-2xl font-bold mb-2">Order Confirmed!</h3>
    <p className="text-gray-400 mb-6">
      Thank you for your purchase. A confirmation has been sent to {formData.email}.
    </p>
    <button
      onClick={handleCheckoutComplete}
      className="bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-teal-700 transition-colors"
    >
      Continue Shopping
    </button>
  </div>
);

export default OrderSuccess;