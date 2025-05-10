import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMemory, 
  FaProjectDiagram, 
  FaHdd, 
  FaMicrochip,
  FaLaptop,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaSearch,
  FaTimes
} from 'react-icons/fa';
import Navbar from './Layout/Navbar';
import ProductFilters from './products/ProductFilters';
import CartPreview from './cart/CartPreview';
import CartModal from './cart/CartModal';
import CheckoutFlow from './checkout/CheckoutFlow';
import LoadingSpinner from './ui/LoadingSpinner';
import ErrorMessage from './ui/ErrorMessage';

const API_BASE_URL = 'https://iwb-server.onrender.com';

const categoryIcons = {
  RAM: <FaMemory className="text-blue-500" size={24} />,
  Motherboards: <FaProjectDiagram className="text-purple-500" size={24} />,
  Storage: <FaHdd className="text-yellow-500" size={24} />,
  Processors: <FaMicrochip className="text-red-500" size={24} />,
  Laptops: <FaLaptop className="text-green-500" size={24} />
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative"
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover transition-opacity duration-300"
          style={{ opacity: isHovered ? 0.9 : 1 }}
          onError={(e) => {
            e.target.src = '/placeholder-product.jpg';
            e.target.className = 'w-full h-48 object-contain p-4 bg-gray-100';
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md z-10"
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isInWishlist ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-400 hover:text-red-400" />
          )}
        </button>
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-white px-3 py-1 rounded-full text-sm font-bold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center mb-2">
          {product.categoryIcon}
          <span className="ml-2 text-sm text-gray-600">{product.category}</span>
        </div>

        <h3 className="font-bold text-lg mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-lg">R{product.price.toFixed(2)}</span>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock <= 0}
          className={`w-full py-2 rounded-md font-medium transition-colors ${
            product.stock > 0
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </motion.div>
  );
};

const ProductGrid = ({ products, onAddToCart, onToggleWishlist, wishlist }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isInWishlist={wishlist.includes(product.id)}
        />
      ))}
    </div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('newest');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Memoized fetch function
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      
      const data = await response.json();
      const productsWithIcons = data.products.map(product => ({
        ...product,
        id: product._id || product.id,
        categoryIcon: categoryIcons[product.category] || null,
        createdAt: product.createdAt || new Date().toISOString()
      }));
      
      setProducts(productsWithIcons);
      setFilteredProducts(productsWithIcons);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      );
    }
    
    // Sort
    result.sort((a, b) => {
      switch (sortOption) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm, sortOption]);

  // Cart operations
  const addToCart = useCallback((product) => {
    if (product.stock <= 0) return;
    
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateCartItem = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, []);

  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  // Clear cart after successful checkout
  const clearCart = () => {
    setCart([]);
  };

  // Calculate totals
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-24">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
            Sustainable Tech Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            High-quality recycled and refurbished components
          </p>
        </motion.div>

        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortOption={sortOption}
          onSortChange={setSortOption}
          onClear={clearSearch}
        />

        {loading ? (
          <div className="flex justify-center mt-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <ErrorMessage 
            message={`Error loading products: ${error}`}
            onRetry={fetchProducts}
          />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <FaSearch className="mx-auto text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="text-gray-500 mt-1">
              {searchTerm || selectedCategory !== 'All' ? (
                <>
                  Try adjusting your search or 
                  <button 
                    onClick={clearSearch}
                    className="text-blue-600 hover:text-blue-800 ml-1"
                  >
                    clear filters
                  </button>
                </>
              ) : (
                "We couldn't find any products matching your criteria"
              )}
            </p>
          </div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        )}
      </main>

      <CartPreview 
        itemCount={cartItemCount}
        total={cartTotal}
        onShowCart={() => setShowCartModal(true)}
      />

      <AnimatePresence>
        {showCartModal && (
          <CartModal
            cart={cart}
            products={products}
            total={cartTotal}
            onClose={() => setShowCartModal(false)}
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateCartItem}
            onCheckout={() => {
              setShowCartModal(false);
              if (cart.length > 0) {
                setShowCheckout(true);
              }
            }}
            emptyCartMessage={
              <div className="flex flex-col items-center py-8">
                <FaShoppingCart className="text-gray-300 text-4xl mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                <p className="text-gray-500 mt-1">Start shopping to add items</p>
                <button
                  onClick={() => setShowCartModal(false)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Continue Shopping
                </button>
              </div>
            }
          />
        )}
      </AnimatePresence>

      <CheckoutFlow
        cart={cart}
        cartTotal={cartTotal}
        showCheckout={showCheckout}
        setShowCheckout={setShowCheckout}
        clearCart={clearCart}
      />
    </div>
  );
};

export default ProductsPage;