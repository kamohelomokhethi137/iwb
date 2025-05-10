import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';
import CartItem from './CartItem';

const CartModal = ({
  cart = [],
  products = [],
  total = 0,
  onClose = () => {},
  onRemoveItem = () => {},
  onUpdateQuantity = () => {},
  onCheckout = () => {},
  emptyCartMessage = <p className="text-center text-gray-500">Your cart is empty.</p>,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Your Cart ({cart.length})</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Close cart"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              emptyCartMessage
            ) : (
              <ul className="divide-y divide-gray-200">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <CartItem
                        item={item}
                        product={products.find((p) => p.id === item.id) || item}
                        onRemove={onRemoveItem}
                        onUpdateQuantity={onUpdateQuantity}
                      />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-bold">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-300"
              >
                <FaShoppingCart className="inline-block mr-2" />
                Checkout
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CartModal;
