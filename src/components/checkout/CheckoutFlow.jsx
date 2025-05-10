import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import CheckoutProgress from './CheckoutProgress';
import ShippingForm from './ShippingForm';
import PaymentMethod from './PaymentMethod';
import OrderReview from './OrderReview';
import OrderSuccess from './OrderSuccess';

const CheckoutFlow = ({ 
  cart, 
  cartTotal, 
  showCheckout, 
  setShowCheckout,
  clearCart 
}) => {
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState(null);
  
  // Form data states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'South Africa',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Format card number as user types
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s+/g, '');
    if (value.length > 0) {
      value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    setFormData(prev => ({ ...prev, cardNumber: value }));
  };

  // Format expiry date as user types
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setFormData(prev => ({ ...prev, expiry: value }));
  };

  // Handle shipping form submission
  const handleShippingSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.address || !formData.city || !formData.postalCode) {
      setOrderError('Please fill in all required fields');
      return;
    }
    setOrderError(null);
    setCheckoutStep(2);
  };

  // Handle payment form submission
  const handlePaymentSubmit = () => {
    if (paymentMethod === 'card' && 
        (!formData.cardNumber || !formData.cardName || !formData.expiry || !formData.cvv)) {
      setOrderError('Please fill in all payment details');
      return;
    }
    setOrderError(null);
    setCheckoutStep(3);
  };

  // Handle order submission
  const handleOrderSubmit = async () => {
    setIsProcessing(true);
    setOrderError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCheckoutStep(4);
    } catch (error) {
      setOrderError('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle checkout completion
  const handleCheckoutComplete = () => {
    setShowCheckout(false);
    clearCart();
    setCheckoutStep(1);
    // Reset form data if needed
  };

  return (
    <AnimatePresence>
      {showCheckout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Checkout</h2>
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {checkoutStep < 4 && <CheckoutProgress checkoutStep={checkoutStep} />}

              {checkoutStep === 1 && (
                <ShippingForm 
                  formData={formData}
                  handleInputChange={handleInputChange}
                  orderError={orderError}
                  handleShippingSubmit={handleShippingSubmit}
                />
              )}
              
              {checkoutStep === 2 && (
                <PaymentMethod 
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  formData={formData}
                  handleCardNumberChange={handleCardNumberChange}
                  handleInputChange={handleInputChange}
                  handleExpiryChange={handleExpiryChange}
                  orderError={orderError}
                  handlePaymentSubmit={handlePaymentSubmit}
                  setCheckoutStep={setCheckoutStep}
                />
              )}
              
              {checkoutStep === 3 && (
                <OrderReview 
                  formData={formData}
                  paymentMethod={paymentMethod}
                  cart={cart}
                  cartTotal={cartTotal}
                  isProcessing={isProcessing}
                  orderError={orderError}
                  handleOrderSubmit={handleOrderSubmit}
                  setCheckoutStep={setCheckoutStep}
                />
              )}
              
              {checkoutStep === 4 && (
                <OrderSuccess 
                  formData={formData}
                  handleCheckoutComplete={handleCheckoutComplete}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutFlow;