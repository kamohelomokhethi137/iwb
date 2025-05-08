import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import RatingStars from '../shared/RatingStars';
import CurrencyFormatter from '../shared/CurrencyFormatter';

const ProductCard = ({ 
  product, 
  wishlist, 
  toggleWishlist, 
  addToCart 
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-700 hover:border-teal-300 transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-2 right-2 p-2 rounded-full ${wishlist.includes(product.id) ? 'text-red-500 bg-white' : 'text-gray-400 bg-white'}`}
        >
          <FaHeart />
        </button>
        {product.stock < 5 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {product.stock > 0 ? `Only ${product.stock} left` : 'Out of stock'}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center">
            {product.categoryIcon}
            <span className="ml-2 text-sm font-medium">
              {product.category}
            </span>
          </span>
          <RatingStars rating={product.rating} />
        </div>
        
        <h3 className="text-lg font-semibold mb-1">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold">
            <CurrencyFormatter amount={product.price} />
          </span>
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${
              product.stock <= 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500'
            }`}
          >
            <FaShoppingCart className="mr-2" />
            {product.stock <= 0 ? 'Out of stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;