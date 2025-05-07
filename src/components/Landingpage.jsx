import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';

// Import component images with descriptive names
import ramImage from '../assets/2.jpg';
import motherboardImage from '../assets/1.jpg';
import circuitBoardImage from '../assets/4.jpg';
import hardDriveImage from '../assets/3.jpg';

// Image data for the carousel
const componentImages = [
  {
    src: ramImage,
    alt: "Computer RAM memory modules",
    title: "RAM Memory",
    id: 'ram-memory'
  },
  {
    src: motherboardImage,
    alt: "Computer motherboard components",
    title: "Motherboards",
    id: 'motherboards'
  },
  {
    src: circuitBoardImage,
    alt: "Electronic circuit boards",
    title: "Circuit Boards",
    id: 'circuit-boards'
  },
  {
    src: hardDriveImage,
    alt: "Computer hard drives",
    title: "Hard Drives",
    id: 'hard-drives'
  }
];

// Simplified animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

// Feature component with simplified animation
const FeatureCard = ({ icon, title, description, index }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
    variants={fadeIn}
    transition={{ delay: index * 0.1 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 hover:border-teal-300 border border-transparent"
  >
    <div className="mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">
      {description}
    </p>
  </motion.div>
);

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Auto-rotate images with cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % componentImages.length);
    }, 5000); // Increased interval for better performance
    
    return () => clearInterval(interval);
  }, []);

  // Memoized toggle function
  const toggleDarkMode = useCallback(() => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  }, [darkMode]);

  // Handle image change
  const handleImageChange = useCallback((index) => {
    setCurrentImage(index);
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32"
          aria-labelledby="hero-heading"
        >
          {/* Background image with lazy loading */}
          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={componentImages[currentImage].id}
                src={componentImages[currentImage].src}
                alt={componentImages[currentImage].alt}
                loading="lazy"
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>
          
          {/* Gradient overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-700 opacity-80 dark:opacity-60 mix-blend-multiply"
            aria-hidden="true"
          />

          <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-7xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h1 
                id="hero-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Pioneering <span className="text-white underline decoration-teal-300 decoration-2">E-Waste</span> Solutions in Africa
              </h1>

              <motion.p
                variants={slideUp}
                className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10"
              >
                Innovative Wealth Builders is transforming electronic recycling in Southern Africa,
                starting from our home in Lesotho with a vision for continental impact.
              </motion.p>

              <motion.div
                variants={slideUp}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link
                  to="/services"
                  className="px-8 py-3 bg-white hover:bg-gray-100 text-teal-600 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  aria-label="Learn about our recycling services"
                >
                  Our Recycling Services
                </Link>
                <Link
                  to="/aboutus"
                  className="px-8 py-3 border-2 border-white text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-300"
                  aria-label="Learn our story"
                >
                  Our Story
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section 
          className="py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-800"
          aria-labelledby="about-heading"
        >
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                variants={slideUp}
              >
                <h2 
                  id="about-heading"
                  className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6"
                >
                  From Lesotho to Southern Africa
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Founded in 2024 by Kenneth with an initial capital of M100,000, IWB quickly established itself as a leader in electronic component recycling. Partnering with Shadrack, as co-CEO, we've grown to become pioneers in sustainable e-waste management.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Despite challenges like rising operational costs, we've expanded our reach beyond Lesotho, attracting investors and partners across the region. Our focus on RAM, hard drives, and motherboard components recycling is driving a new era of environmental responsibility.
                </p>
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg border-l-4 border-teal-500">
                  <p className="text-teal-700 dark:text-teal-300 font-medium">
                    "Our mission is to transform e-waste into economic opportunity while protecting Africa's environment for future generations."
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    - Kenneth & Shadrack, IWB Co-Founders
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                variants={slideUp}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                {/* Image Carousel Container */}
                <div 
                  className="bg-gradient-to-br from-teal-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg relative h-64 md:h-80 lg:h-96"
                  aria-label="Components we recycle carousel"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={componentImages[currentImage].id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img 
                        src={componentImages[currentImage].src} 
                        alt={componentImages[currentImage].alt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 text-center">
                        <span className="font-medium">{componentImages[currentImage].title}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Components label */}
                <div 
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md w-2/3"
                  role="group"
                  aria-label="Component selection"
                >
                  <h4 className="font-bold text-gray-800 dark:text-white mb-1">Components We Recycle</h4>
                  <div className="flex flex-wrap gap-2">
                    {componentImages.map((image, index) => (
                      <button 
                        key={image.id}
                        onClick={() => handleImageChange(index)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleImageChange(index);
                          }
                        }}
                        className={`bg-gradient-to-br from-teal-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 text-teal-800 dark:text-teal-300 text-xs px-2 py-1 rounded transition-all ${
                          currentImage === index ? 'ring-2 ring-teal-500' : ''
                        } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        aria-label={`Show ${image.title}`}
                        aria-pressed={currentImage === index}
                      >
                        {image.title}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section 
          className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800"
          aria-labelledby="features-heading"
        >
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 
                id="features-heading"
                className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
              >
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Technology</span> Platform
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Cloud-based solutions deployed on Microsoft Azure for maximum reliability and security
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-3 rounded-full w-12 h-12 flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  ),
                  title: "Secure Cloud Architecture",
                  description: "Deployed on Microsoft Azure with multi-factor authentication for all users."
                },
                {
                  icon: (
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-3 rounded-full w-12 h-12 flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  ),
                  title: "Automated Financial Reporting",
                  description: "Monthly income statements generated automatically with role-based access."
                },
                {
                  icon: (
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-3 rounded-full w-12 h-12 flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                  ),
                  title: "AI-Powered Query System",
                  description: "Automated responses to client inquiries based on previous solutions."
                },
                {
                  icon: (
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-3 rounded-full w-12 h-12 flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  ),
                  title: "Investment Portal",
                  description: "Dedicated access for investors to view financial performance."
                },
                {
                  icon: (
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-3 rounded-full w-12 h-12 flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  ),
                  title: "Role-Based Access",
                  description: "Granular permissions for sales, finance, developers, and partners."
                },
                {
                  icon: (
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-3 rounded-full w-12 h-12 flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                      </svg>
                    </div>
                  ),
                  title: "IWC Partner Integration",
                  description: "Seamless cloud environment access for our primary partner."
                }
              ].map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-16 md:py-24 lg:py-32 bg-gradient-to-r from-teal-500 to-blue-600"
          aria-labelledby="cta-heading"
        >
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 
                id="cta-heading"
                className="text-3xl md:text-4xl font-bold text-white mb-6"
              >
                Join Africa's E-Waste Revolution
              </h2>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
                Partner with IWB to transform electronic waste into sustainable opportunity.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/contact"
                  className="px-8 py-3 bg-white text-teal-600 hover:bg-gray-50 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  aria-label="Contact us to get started"
                >
                  Get Started
                </Link>
                <Link 
                  to="/about"
                  className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-300"
                  aria-label="Learn more about our company"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;