import React from 'react';
import CurrencyFormatter from '../shared/CurrencyFormatter';

const OrderReview = ({ 
  formData, 
  paymentMethod, 
  cart, 
  cartTotal, 
  isProcessing, 
  orderError, 
  handleOrderSubmit,
  setCheckoutStep 
}) => {
  const getCardType = (number) => {
    const num = number.replace(/\s+/g, '');
    if (/^4/.test(num)) return 'Visa';
    if (/^5[1-5]/.test(num)) return 'Mastercard';
    if (/^3[47]/.test(num)) return 'American Express';
    return 'Unknown';
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Review Your Order</h3>
      <div className="bg-gray-700 rounded-md p-4 mb-6">
        <h4 className="font-medium mb-3">Shipping Information</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Name:</div>
          <div className="font-medium">{formData.firstName} {formData.lastName}</div>
          <div>Email:</div>
          <div className="font-medium">{formData.email}</div>
          <div>Address:</div>
          <div className="font-medium">{formData.address}</div>
          <div>City:</div>
          <div className="font-medium">{formData.city}</div>
          <div>Postal Code:</div>
          <div className="font-medium">{formData.postalCode}</div>
          <div>Country:</div>
          <div className="font-medium">{formData.country}</div>
        </div>
      </div>

      <div className="bg-gray-700 rounded-md p-4 mb-6">
        <h4 className="font-medium mb-3">Payment Method</h4>
        {paymentMethod === 'card' ? (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Payment:</div>
            <div className="font-medium">Credit/Debit Card</div>
            <div>Card Number:</div>
            <div className="font-medium">•••• •••• •••• {formData.cardNumber.slice(-4)}</div>
            <div>Card Type:</div>
            <div className="font-medium">{getCardType(formData.cardNumber)}</div>
            <div>Expiry:</div>
            <div className="font-medium">{formData.expiry}</div>
          </div>
        ) : (
          <div className="text-sm">
            <div className="font-medium mb-1">Bank Transfer</div>
            <p className="text-gray-400">
              Please complete your payment to the provided bank details.
            </p>
          </div>
        )}
      </div>

      <div className="bg-gray-700 rounded-md p-4 mb-6">
        <h4 className="font-medium mb-3">Order Summary</h4>
        <div className="divide-y divide-gray-600">
          {cart.map(item => (
            <div key={item.id} className="py-3 flex justify-between">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-400">
                  {item.quantity} × <CurrencyFormatter amount={item.price} />
                </div>
              </div>
              <div className="font-medium">
                <CurrencyFormatter amount={item.price * item.quantity} />
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-600 pt-3 mt-3">
          <div className="flex justify-between font-medium">
            <div>Total</div>
            <CurrencyFormatter amount={cartTotal} />
          </div>
        </div>
      </div>

      {orderError && (
        <div className="mt-4 text-red-500 text-sm">{orderError}</div>
      )}

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setCheckoutStep(2)}
          className="bg-gray-700 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleOrderSubmit}
          disabled={isProcessing}
          className={`flex items-center justify-center bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-teal-700 transition-colors ${isProcessing ? 'opacity-75' : ''}`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Place Order'
          )}
        </button>
      </div>
    </div>
  );
};

export default OrderReview;