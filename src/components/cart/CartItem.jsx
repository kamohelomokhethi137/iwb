import { FaTrash } from 'react-icons/fa';
import CurrencyFormatter from '../shared/CurrencyFormatter';

const CartItem = ({ 
  item, 
  products, 
  removeFromCart, 
  updateQuantity 
}) => {
  return (
    <div className="py-4 flex flex-col sm:flex-row">
      <div className="flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name}
          className="h-24 w-24 object-cover rounded"
        />
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-6 flex-grow">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">{item.name}</h3>
          <button 
            onClick={() => removeFromCart(item.id, item.quantity)}
            className="text-gray-400 hover:text-red-500"
          >
            <FaTrash />
          </button>
        </div>
        <p className="mt-1 text-sm">{item.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1, item.quantity)}
              className="px-2 py-1 border rounded-l-md border-gray-600 bg-gray-700 text-white"
            >
              -
            </button>
            <span className="px-4 py-1 border-t border-b border-gray-600 text-white">
              {item.quantity}
            </span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1, item.quantity)}
              disabled={products.find(p => p.id === item.id)?.stock <= 0}
              className={`px-2 py-1 border rounded-r-md border-gray-600 ${
                products.find(p => p.id === item.id)?.stock <= 0
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-700 text-white'
              }`}
            >
              +
            </button>
          </div>
          <p className="text-lg font-medium">
            <CurrencyFormatter amount={item.price * item.quantity} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;