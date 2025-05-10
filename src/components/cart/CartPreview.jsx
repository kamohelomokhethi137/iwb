import { FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CartPreview = ({ itemCount = 0, total = 0, onShowCart }) => {
  // Don't show if cart is empty
  if (itemCount <= 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-700 z-50 cursor-pointer"
      onClick={onShowCart}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <FaShoppingCart className="text-teal-400 text-xl" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        </div>
        <div className="text-right">
          <p className="text-white font-medium">
            {itemCount} item{itemCount !== 1 ? 's' : ''}
          </p>
          <p className="text-teal-400 font-bold">
            R{total.toFixed(2)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CartPreview;