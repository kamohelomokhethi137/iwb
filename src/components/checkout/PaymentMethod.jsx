import React from 'react';
import { FaCreditCard, FaLock } from 'react-icons/fa';

const PaymentMethod = ({ 
  paymentMethod, 
  setPaymentMethod, 
  formData, 
  handleCardNumberChange, 
  handleInputChange, 
  handleExpiryChange, 
  orderError, 
  handlePaymentSubmit,
  setCheckoutStep 
}) => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
    <div className="mb-6">
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={() => setPaymentMethod('card')}
          className={`flex-1 py-3 px-4 rounded-md border ${paymentMethod === 'card' ? 'border-teal-500 bg-teal-900 bg-opacity-20' : 'border-gray-600'}`}
        >
          <div className="flex items-center justify-center">
            <FaCreditCard className="mr-2" />
            <span>Credit/Debit Card</span>
          </div>
        </button>
        <button
          onClick={() => setPaymentMethod('bank')}
          className={`flex-1 py-3 px-4 rounded-md border ${paymentMethod === 'bank' ? 'border-teal-500 bg-teal-900 bg-opacity-20' : 'border-gray-600'}`}
        >
          <div className="flex items-center justify-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/South_African_Reserve_Bank_logo.svg" 
              alt="Bank Transfer" 
              className="h-5 mr-2"
            />
            <span>Bank Transfer</span>
          </div>
        </button>
      </div>

      {paymentMethod === 'card' && (
        <div className="bg-gray-700 p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCreditCard className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className="pl-10 w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Name on Card</label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="4"
                  className="pl-10 w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'bank' && (
        <div className="bg-gray-700 p-4 rounded-md">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Bank Transfer Details</h4>
              <p className="text-gray-400 text-sm">
                Please use the following details for your bank transfer:
              </p>
            </div>
            <div className="bg-gray-800 p-3 rounded-md">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Bank Name:</div>
                <div className="font-medium">Standard Bank</div>
                <div>Account Name:</div>
                <div className="font-medium">EcoTech Solutions</div>
                <div>Account Number:</div>
                <div className="font-medium">0123456789</div>
                <div>Branch Code:</div>
                <div className="font-medium">051001</div>
                <div>Reference:</div>
                <div className="font-medium">ORDER#{Math.floor(Math.random() * 1000000)}</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Your order will be processed once payment is received.
            </p>
          </div>
        </div>
      )}
    </div>

    {orderError && (
      <div className="mt-4 text-red-500 text-sm">{orderError}</div>
    )}

    <div className="mt-6 flex justify-between">
      <button
        onClick={() => setCheckoutStep(1)}
        className="bg-gray-700 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-colors"
      >
        Back
      </button>
      <button
        onClick={handlePaymentSubmit}
        className="bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-teal-700 transition-colors"
      >
        Review Order
      </button>
    </div>
  </div>
);

export default PaymentMethod;