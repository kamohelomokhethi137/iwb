import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CartItem from './CartItem';
import CurrencyFormatter from '../shared/CurrencyFormatter';

const CartModal = ({ 
  showCart, 
  closeModal, 
  cart, 
  products, 
  removeFromCart, 
  updateQuantity, 
  cartTotal, 
  setShowCheckout 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-4 border-gray-700">
            <h2 className="text-2xl font-bold">Your Shopping Cart</h2>
            <button 
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-300"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-700">
                {cart.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    products={products}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                  />
                ))}
              </div>

              <div className="border-t mt-4 pt-4 border-gray-700">
                <div className="flex justify-between text-lg font-medium mb-2">
                  <span>Subtotal</span>
                  <CurrencyFormatter amount={cartTotal} />
                </div>
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>Shipping calculated at checkout</span>
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="mt-2 w-full bg-teal-600 text-white py-3 px-4 rounded-md text-lg font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CartModal;