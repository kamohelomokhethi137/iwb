// components/cart/CartItem.jsx
import { motion } from 'framer-motion';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';

const CartItem = ({ 
  item, 
  products = [], 
  onRemove, 
  onUpdateQuantity 
}) => {
  // Safely find the product
  const product = products.find(p => p.id === item.id) || item;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center py-4 border-b border-gray-200"
    >
      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden mr-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-product.jpg';
            e.target.className = 'w-full h-full object-contain p-2 bg-gray-100';
          }}
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{product.name}</h3>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <p className="font-bold text-gray-900 mt-1">R{product.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => onUpdateQuantity(product.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          aria-label="Decrease quantity"
        >
          <FaMinus size={12} />
        </button>
        
        <span className="mx-2 w-8 text-center">{item.quantity}</span>
        
        <button
          onClick={() => onUpdateQuantity(product.id, item.quantity + 1)}
          className="p-1 text-gray-500 hover:text-gray-700"
          aria-label="Increase quantity"
        >
          <FaPlus size={12} />
        </button>
      </div>

      <button
        onClick={() => onRemove(product.id)}
        className="ml-4 text-red-500 hover:text-red-700"
        aria-label="Remove item"
      >
        <FaTimes size={16} />
      </button>
    </motion.div>
  );
};

export default CartItem;