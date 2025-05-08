import { FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CartPreview = ({ cart, setShowCart }) => {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 z-10"
    >
      <div className="flex items-center">
        <FaShoppingCart className="text-teal-600 mr-2" />
        <span className="font-medium">
          {itemCount} item{itemCount !== 1 ? 's' : ''} in cart
        </span>
        <button 
          onClick={() => setShowCart(true)}
          className="ml-4 text-sm text-teal-600 hover:text-teal-400 underline"
        >
          View Cart
        </button>
      </div>
    </motion.div>
  );
};

export default CartPreview;