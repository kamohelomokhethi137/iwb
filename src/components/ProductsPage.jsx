import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaShoppingCart, 
  FaHeart, 
  FaStar, 
  FaRegStar, 
  FaSearch, 
  FaFilter,
  FaMemory,
  FaMicrochip,
  FaHdd,
  FaServer,
  FaPlug,
  FaDesktop,
  FaProjectDiagram,
  FaTimes,
  FaTrash
} from 'react-icons/fa';
import Navbar from './Layout/Navbar'; // Import the Navbar component

// Product data with initial stock values
const initialProducts = [
  {
    id: 1,
    name: "DDR4 RAM Modules (Used)",
    category: "RAM",
    price: 899.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "16GB DDR4 RAM modules tested and certified for performance. Perfect for upgrades or repairs.",
    stock: 12
  },
  {
    id: 2,
    name: "Refurbished Motherboards",
    category: "Motherboards",
    price: 1750.50,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Various models available. Fully tested with 6-month warranty. Ideal for budget builds.",
    stock: 8
  },
  {
    id: 3,
    name: "Recycled Circuit Boards",
    category: "Circuit Boards",
    price: 245.00,
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Assorted circuit boards for parts or educational purposes. Sold by weight.",
    stock: 25
  },
  {
    id: 4,
    name: "Refurbished Hard Drives",
    category: "Storage",
    price: 685.99,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "500GB-1TB drives with full diagnostic testing. Great for secondary storage.",
    stock: 15
  },
  {
    id: 5,
    name: "Used CPUs (Various Models)",
    category: "Processors",
    price: 1175.00,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1587202372775-e229f1723e1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Tested processors from i3 to i7 generations. Excellent value for money.",
    stock: 10
  },
  {
    id: 6,
    name: "Power Supply Units",
    category: "PSUs",
    price: 585.50,
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1603732551681-2e91159b9dc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "450W-650W PSUs with full testing. Reliable power for your projects.",
    stock: 7
  },
  {
    id: 7,
    name: "Laptop LCD Screens",
    category: "Displays",
    price: 1299.00,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Various sizes available. Perfect for laptop repairs and replacements.",
    stock: 9
  },
  {
    id: 8,
    name: "Server Components Bundle",
    category: "Servers",
    price: 2999.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Complete set of server components for homelab enthusiasts.",
    stock: 4
  }
];

const categoryIcons = {
  RAM: <FaMemory className="text-blue-500" size={24} />,
  Motherboards: <FaProjectDiagram className="text-purple-500" size={24} />,
  "Circuit Boards": <FaProjectDiagram className="text-green-500" size={24} />,
  Storage: <FaHdd className="text-yellow-500" size={24} />,
  Processors: <FaMicrochip className="text-red-500" size={24} />,
  PSUs: <FaPlug className="text-orange-500" size={24} />,
  Displays: <FaDesktop className="text-indigo-500" size={24} />,
  Servers: <FaServer className="text-teal-500" size={24} />
};

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('featured');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  // Get unique categories
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return a.id - b.id; // Default sort (featured)
  });

  // Add to cart and reduce stock
  const addToCart = (product) => {
    if (product.stock <= 0) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // Check if we have enough stock
        if (existingItem.quantity >= product.stock) return prevCart;
        
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Reduce stock
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      )
    );
  };

  // Remove from cart and restore stock
  const removeFromCart = (productId, quantity) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    
    // Restore stock
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, stock: p.stock + quantity } : p
      )
    );
  };

  // Update quantity and adjust stock
  const updateQuantity = (productId, newQuantity, oldQuantity) => {
    if (newQuantity < 1) return;
    
    const stockChange = newQuantity - oldQuantity;
    const product = products.find(p => p.id === productId);
    
    // Check if we have enough stock
    if (stockChange > 0 && product.stock < stockChange) return;

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    // Adjust stock
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, stock: p.stock - stockChange } : p
      )
    );
  };

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  // Calculate total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Render star rating
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= Math.floor(rating) ? 
        <FaStar key={i} className="text-yellow-400" /> : 
        <FaRegStar key={i} className="text-yellow-400" />
      );
    }
    return stars;
  };

  // Format currency (ZAR)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar /> 
      <div className="max-w-7xl mx-auto pt-24 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold sm:text-4xl"
          >
            Sustainable Tech Marketplace
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-3 max-w-2xl mx-auto text-xl"
          >
            High-quality recycled and refurbished electronic components
          </motion.p>
        </div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8 bg-gray-800 p-4 rounded-lg shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <FaFilter className="text-gray-400 mr-2" />
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md bg-gray-700 text-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md bg-gray-700 text-white"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {sortedProducts.map((product) => (
              <motion.div
                key={product.id}
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
                    aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
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
                      {categoryIcons[product.category]}
                      <span className="ml-2 text-sm font-medium">
                        {product.category}
                      </span>
                    </span>
                    <div className="flex items-center">
                      {renderRating(product.rating)}
                      <span className="ml-1 text-sm">
                        ({product.rating})
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold">
                      {formatCurrency(product.price)}
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
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-medium mb-2">
              No products found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {/* Cart Preview */}
        {cart.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 z-10"
          >
            <div className="flex items-center">
              <FaShoppingCart className="text-teal-600 mr-2" />
              <span className="font-medium">
                {cart.reduce((total, item) => total + item.quantity, 0)} item{cart.length !== 1 ? 's' : ''} in cart
              </span>
              <button 
                onClick={() => setShowCart(true)}
                className="ml-4 text-sm text-teal-600 hover:text-teal-400 underline"
              >
                View Cart
              </button>
            </div>
          </motion.div>
        )}

        {/* Cart Modal */}
        {showCart && (
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
                    onClick={() => setShowCart(false)}
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
                        <div key={item.id} className="py-4 flex flex-col sm:flex-row">
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
                                {formatCurrency(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t mt-4 pt-4 border-gray-700">
                      <div className="flex justify-between text-lg font-medium mb-2">
                        <span>Subtotal</span>
                        <span>{formatCurrency(cartTotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400 mb-4">
                        <span>Shipping calculated at checkout</span>
                      </div>
                      <button
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
        )}
      </div>
    </div>
  );
};

export default ProductsPage;