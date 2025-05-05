

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from './Layout/Navbar';
import service1 from '../assets/2.jpg';
import service2 from '../assets/3.jpg';
import service3 from '../assets/4.jpg';

const Services = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 opacity-10 dark:opacity-5"></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <motion.div
            variants={containerVariants}
            className="text-center"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6"
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Services</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
            >
              Comprehensive e-waste solutions for businesses and individuals
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Business Sign In
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-600"
              >
                Individual Sign In
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Content */}
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl pb-16 md:pb-24 lg:pb-32">
        {/* Core Services */}
        <motion.section
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Our Core Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Specialized solutions for responsible e-waste management and component recycling
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "RAM Recycling",
                description: "Secure and environmentally responsible recycling of memory modules from all types of devices.",
                image: service1,
                icon: (
                  <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                )
              },
              {
                title: "Hard Drive Processing",
                description: "Complete data destruction and material recovery from HDDs and SSDs with certified security.",
                image: service2,
                icon: (
                  <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                )
              },
              {
                title: "Motherboard Recovery",
                description: "Advanced component extraction and precious metal reclamation from circuit boards.",
                image: service3,
                icon: (
                  <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                variants={fadeInVariants}
                whileHover="hover"
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              >
                <motion.div variants={cardHoverVariants}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-sm">
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="text-teal-600 dark:text-teal-400 font-medium flex items-center"
                    >
                      Learn more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Process Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          variants={containerVariants}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Our Recycling Process
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                A transparent, step-by-step approach to responsible e-waste management
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Collection",
                  description: "Secure pickup or drop-off of your e-waste materials"
                },
                {
                  step: "2",
                  title: "Sorting",
                  description: "Categorization by material type and component"
                },
                {
                  step: "3",
                  title: "Processing",
                  description: "Safe dismantling and material separation"
                },
                {
                  step: "4",
                  title: "Recovery",
                  description: "Refining and preparation for reuse"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInVariants}
                  className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm text-center"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-16">
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                    Ready to recycle your e-waste?
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Join hundreds of businesses and individuals who trust IWB with their electronic recycling needs.
                  </p>
                  
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Get Started as a Business
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-600"
                    >
                      Individual Recycling Portal
                    </motion.button>
                  </div>
                </motion.div>
              </div>
              
              <div className="hidden lg:block relative bg-gradient-to-br from-teal-100 to-blue-100 dark:from-gray-700 dark:to-gray-600">
                <div className="absolute inset-0 bg-[url('../assets/pattern.svg')] opacity-10 dark:opacity-5"></div>
                <motion.img
                  src={service2}
                  alt="Recycling process"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Partners Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Trusted By
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Organizations across Southern Africa rely on our e-waste solutions
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-8 md:gap-12 items-center"
          >
            {[
              { name: "Microsoft", logo: "M" },
              { name: "Azure", logo: "A" },
              { name: "EcoTech", logo: "E" },
              { name: "GreenAfrica", logo: "G" }
            ].map((partner, index) => (
              <motion.div 
                key={index}
                variants={fadeInVariants}
                className="w-24 h-24 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center text-3xl font-bold text-gray-700 dark:text-white"
                whileHover={{ scale: 1.1 }}
              >
                {partner.logo}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default Services;