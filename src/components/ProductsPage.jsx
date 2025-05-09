import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaMemory, FaProjectDiagram, FaHdd, FaMicrochip } from 'react-icons/fa';
import Navbar from './Layout/Navbar';
import ProductFilters from './products/ProductFilters';
import ProductGrid from './products/ProductGrid';
import CartPreview from './cart/CartPreview';
import CartModal from './cart/CartModal';
import CheckoutProgress from './checkout/CheckoutProgress';
import ShippingForm from './checkout/ShippingForm';
import PaymentMethod from './checkout/PaymentMethod';
import OrderReview from './checkout/OrderReview';
import OrderSuccess from './checkout/OrderSuccess';
import MotherImage from '../assets/mother.jpg';
import SSDImage from '../assets/ssd.jpg';
import CPUImage from '../assets/cpu.jpg';

// Preload images
const preloadImages = () => {
  const images = [MotherImage, SSDImage, CPUImage];
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Product data with initial stock values (5 items)
const initialProducts = [
  {
    id: 1,
    name: "DDR4 RAM 16GB (Used)",
    category: "RAM",
    price: 899.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "16GB DDR4 RAM modules tested and certified for performance.",
    stock: 5,
    categoryIcon: <FaMemory className="text-blue-500" size={24} />
  },
  {
    id: 2,
    name: "Refurbished Motherboard",
    category: "Motherboards",
    price: 1750.50,
    rating: 4.2,
    image: MotherImage,
    description: "Various models available. Fully tested with warranty.",
    stock: 5,
    categoryIcon: <FaProjectDiagram className="text-purple-500" size={24} />
  },
  {
    id: 3,
    name: "1TB SSD (Refurbished)",
    category: "Storage",
    price: 685.99,
    rating: 4.0,
    image: SSDImage,
    description: "1TB SSD with full diagnostic testing.",
    stock: 5,
    categoryIcon: <FaHdd className="text-yellow-500" size={24} />
  },
  {
    id: 4,
    name: "Intel Core i7 CPU",
    category: "Processors",
    price: 1175.00,
    rating: 4.3,
    image: CPUImage,
    description: "Tested processors with excellent value.",
    stock: 5,
    categoryIcon: <FaMicrochip className="text-red-500" size={24} />
  },
];

// Simplified animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

const slideIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const ProductsPage = () => {
  // Preload images on component mount
  useEffect(() => {
    preloadImages();
  }, []);

  // State and data initialization
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('featured');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  
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

    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      )
    );
  };

  // Remove from cart and restore stock
  const removeFromCart = (productId, quantity) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
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
    
    if (stockChange > 0 && product.stock < stockChange) return;

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, stock: p.stock - stockChange } : p
      )
    );
  };

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  // Calculate total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Format card number as user types
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s+/g, '');
    if (value.length > 16) value = value.substr(0, 16);
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    setFormData(prev => ({ ...prev, cardNumber: value }));
  };

  // Format expiry date as user types
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.substr(0, 4);
    if (value.length > 2) value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    setFormData(prev => ({ ...prev, expiry: value }));
  };

  // Submit order to backend
  const submitOrder = async () => {
    setIsProcessing(true);
    setOrderError('');
    
    try {
      const orderData = {
        customer: formData,
        payment: {
          method: paymentMethod,
          ...(paymentMethod === 'card' && {
            cardLastFour: formData.cardNumber.slice(-4),
            cardType: getCardType(formData.cardNumber)
          })
        },
        items: cart,
        total: cartTotal,
        date: new Date().toISOString()
      };

      console.log('Order submitted:', orderData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOrderSuccess(true);
      setCart([]);
      setIsProcessing(false);
      
    } catch (error) {
      console.error('Order error:', error);
      setOrderError('Failed to process order. Please try again.');
      setIsProcessing(false);
    }
  };

  // Determine card type
  const getCardType = (number) => {
    const num = number.replace(/\s+/g, '');
    if (/^4/.test(num)) return 'Visa';
    if (/^5[1-5]/.test(num)) return 'Mastercard';
    if (/^3[47]/.test(num)) return 'American Express';
    return 'Unknown';
  };

  // Separate validation functions for each step
  const validateShipping = () => {
    if (!formData.firstName || !formData.lastName) {
      return 'Please enter your full name';
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      return 'Please enter a valid email address';
    }
    if (!formData.address || !formData.city || !formData.postalCode) {
      return 'Please complete your shipping address';
    }
    return null;
  };

  const validatePayment = () => {
    if (paymentMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s+/g, '').length < 16) {
        return 'Please enter a valid card number (16 digits)';
      }
      if (!formData.cardName) {
        return 'Please enter the name on your card';
      }
      if (!formData.expiry || !/^\d{2}\/\d{2}$/.test(formData.expiry)) {
        return 'Please enter a valid expiry date (MM/YY)';
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        return 'Please enter a valid CVV (3-4 digits)';
      }
    }
    return null;
  };

  // Updated checkout navigation
  const nextStep = () => {
    let error = null;
    
    if (checkoutStep === 1) {
      error = validateShipping();
    } else if (checkoutStep === 2) {
      error = validatePayment();
    }

    if (error) {
      setOrderError(error);
      return;
    }
    
    setCheckoutStep(prev => prev + 1);
    setOrderError('');
  };

  const prevStep = () => {
    setCheckoutStep(prev => prev - 1);
    setOrderError('');
  };

  const resetCheckout = () => {
    setShowCheckout(false);
    setCheckoutStep(1);
    setOrderSuccess(false);
    setOrderError('');
  };

  const closeModal = () => {
    setShowCart(false);
    if (showCheckout) resetCheckout();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar /> 
      <div className="max-w-7xl mx-auto pt-24 px-4">
        {/* Header with optimized animation */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Sustainable Tech Marketplace
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl">
            High-quality recycled and refurbished components
          </p>
        </motion.div>

        {/* Search and Filter - no animation */}
        <ProductFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortOption={sortOption}
          setSortOption={setSortOption}
          categories={categories}
        />

        {/* Products Grid with optimized animation */}
        {sortedProducts.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <ProductGrid
              products={sortedProducts}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          </motion.div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center py-12"
          >
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-gray-400">Adjust your search criteria</p>
          </motion.div>
        )}

        {/* Cart Preview with optimized animation */}
        {cart.length > 0 && !showCart && (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
          >
            <CartPreview cart={cart} setShowCart={setShowCart} />
          </motion.div>
        )}

        {/* Cart Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={slideIn}
              className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <CartModal
                showCart={showCart}
                closeModal={closeModal}
                cart={cart}
                products={products}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                cartTotal={cartTotal}
                setShowCheckout={setShowCheckout}
              />
            </motion.div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={slideIn}
              className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center border-b pb-4 border-gray-700">
                  <h2 className="text-2xl font-bold">Checkout</h2>
                  <button 
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                {orderSuccess ? (
                  <OrderSuccess formData={formData} closeModal={closeModal} />
                ) : (
                  <>
                    <CheckoutProgress checkoutStep={checkoutStep} />
                    
                    {checkoutStep === 1 && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={slideIn}
                      >
                        <ShippingForm
                          formData={formData}
                          handleInputChange={handleInputChange}
                          nextStep={nextStep}
                          orderError={orderError}
                        />
                      </motion.div>
                    )}

                    {checkoutStep === 2 && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={slideIn}
                      >
                        <PaymentMethod
                          paymentMethod={paymentMethod}
                          setPaymentMethod={setPaymentMethod}
                          formData={formData}
                          handleCardNumberChange={handleCardNumberChange}
                          handleInputChange={handleInputChange}
                          handleExpiryChange={handleExpiryChange}
                          prevStep={prevStep}
                          nextStep={nextStep}
                          orderError={orderError}
                        />
                      </motion.div>
                    )}

                    {checkoutStep === 3 && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={slideIn}
                      >
                        <OrderReview
                          formData={formData}
                          paymentMethod={paymentMethod}
                          cart={cart}
                          cartTotal={cartTotal}
                          prevStep={prevStep}
                          submitOrder={submitOrder}
                          isProcessing={isProcessing}
                          orderError={orderError}
                        />
                      </motion.div>
                    )}
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