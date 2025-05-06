import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from './Layout/Navbar';
import contactImage from '../assets/recycle.png';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
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
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Touch</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
            >
              We'd love to hear from you about e-waste recycling, partnerships, or any inquiries
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Content */}
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl pb-16 md:pb-24 lg:pb-32">
        {/* Contact Form Section */}
        <motion.section
          ref={ref}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                Send Us a Message
              </h2>
              
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-6"
                >
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </motion.div>
              ) : submitStatus === 'error' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6"
                >
                  Something went wrong. Please try again later.
                </motion.div>
              ) : null}
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <motion.div variants={fadeInVariants}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    />
                  </motion.div>
                  
                  <motion.div variants={fadeInVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    />
                  </motion.div>
                  
                  <motion.div variants={fadeInVariants}>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    ></textarea>
                  </motion.div>
                  
                  <motion.div variants={fadeInVariants}>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </motion.div>
                </div>
              </form>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="relative h-full min-h-64 md:min-h-80 lg:min-h-96 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-blue-100 dark:from-gray-700 dark:to-gray-600">
                <img
                  src={contactImage}
                  alt="Contact us"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Info Section */}
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
                Other Ways to Reach Us
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Find our locations or connect through different channels
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Headquarters",
                  description: "123 Tech Park, Maseru, Lesotho",
                  icon: (
                    <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  action: (
                    <motion.a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      className="text-teal-600 dark:text-teal-400 font-medium flex items-center justify-center"
                    >
                      View on map
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  )
                },
                {
                  title: "Contact Info",
                  description: "info@iwb.co.ls\n+266 57736313",
                  icon: (
                    <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  action: (
                    <motion.a
                      href="mailto:info@iwb.co.ls"
                      whileHover={{ scale: 1.03 }}
                      className="text-teal-600 dark:text-teal-400 font-medium flex items-center justify-center"
                    >
                      Email us
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </motion.a>
                  )
                },
                {
                  title: "Business Hours",
                  description: "Mon-Fri: 8AM - 5PM\nSat: 9AM - 1PM\nSun: Closed",
                  icon: (
                    <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  action: (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className="text-teal-600 dark:text-teal-400 font-medium flex items-center justify-center"
                    >
                      Download calendar
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </motion.button>
                  )
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInVariants}
                  className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm text-center"
                >
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line">{item.description}</p>
                  {item.action}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Quick answers to common questions about our services
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "What types of e-waste do you accept?",
                answer: "We accept all types of electronic waste including computers, laptops, mobile devices, and their components like RAM, hard drives, and motherboards."
              },
              {
                question: "Is there a fee for e-waste recycling?",
                answer: "For most consumer electronics, our services are free. For large quantities or special items, please contact us for a quote."
              },
              {
                question: "How do you ensure data security?",
                answer: "We follow strict data destruction protocols including physical destruction of storage media and certified wiping processes for reusable components."
              },
              {
                question: "Do you offer pickup services?",
                answer: "Yes, we offer scheduled pickup services for businesses and bulk disposals. Contact us to arrange a pickup."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                variants={fadeInVariants}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-sm overflow-hidden"
              >
                <details className="group">
                  <summary className="list-none cursor-pointer">
                    <div className="px-6 py-4 flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        {faq.question}
                      </h3>
                      <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ContactPage;