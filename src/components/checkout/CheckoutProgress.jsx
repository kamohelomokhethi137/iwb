import React from 'react';

const CheckoutProgress = ({ checkoutStep }) => (
  <div className="flex justify-between mb-8 relative">
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${checkoutStep >= 1 ? 'bg-teal-600' : 'bg-gray-700'}`}>
        <span className="text-white">1</span>
      </div>
      <span className={`mt-2 text-sm ${checkoutStep >= 1 ? 'text-teal-400' : 'text-gray-500'}`}>Shipping</span>
    </div>
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${checkoutStep >= 2 ? 'bg-teal-600' : 'bg-gray-700'}`}>
        <span className="text-white">2</span>
      </div>
      <span className={`mt-2 text-sm ${checkoutStep >= 2 ? 'text-teal-400' : 'text-gray-500'}`}>Payment</span>
    </div>
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${checkoutStep >= 3 ? 'bg-teal-600' : 'bg-gray-700'}`}>
        <span className="text-white">3</span>
      </div>
      <span className={`mt-2 text-sm ${checkoutStep >= 3 ? 'text-teal-400' : 'text-gray-500'}`}>Confirmation</span>
    </div>
    <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-700 -z-10">
      <div 
        className={`h-full bg-teal-600 transition-all duration-300 ${checkoutStep >= 3 ? 'w-full' : checkoutStep >= 2 ? 'w-2/3' : 'w-1/3'}`}
      ></div>
    </div>
  </div>
);

export default CheckoutProgress;