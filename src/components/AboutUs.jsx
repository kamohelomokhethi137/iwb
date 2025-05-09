import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import recycle from '../assets/recycle.png';
import aboutUsImage from '../assets/about.jpg';
import Navbar from './Layout/Navbar';

const AboutUs = () => {
  // Simple fade-in animation variant
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Section wrapper component with in-view detection
  const AnimatedSection = ({ children, threshold = 0.1, className = '' }) => {
    const [ref, inView] = useInView({
      threshold,
      triggerOnce: true
    });

    return (
      <motion.section
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              when: "beforeChildren"
            }
          }
        }}
        className={className}
      >
        {children}
      </motion.section>
    );
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <AnimatedSection 
        threshold={0.2} 
        className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 px-6 lg:px-8"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 opacity-10 dark:opacity-5"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6"
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Story</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
            >
              From humble beginnings to becoming pioneers in African e-waste recycling
            </motion.p>
          </div>
        </div>
      </AnimatedSection>

      {/* About Content */}
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl pb-16 md:pb-24 lg:pb-32 space-y-20 md:space-y-24 lg:space-y-28">
        {/* Founding Story */}
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeIn} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Founding Vision
              </h2>
              <motion.p 
                variants={fadeIn}
                className="text-gray-600 dark:text-gray-300"
              >
                IWB was founded in 2024 by Kenneth with an initial capital of M100,000. What began as a small operation in Lesotho quickly grew into a pioneering force in electronic waste recycling across Southern Africa.
              </motion.p>
              <motion.p 
                variants={fadeIn}
                className="text-gray-600 dark:text-gray-300"
              >
                During his journey to secure funding and expand operations, Kenneth partnered with Shadrack, who joined as co-CEO. Together, they built IWB into a leader in sustainable technology recycling.
              </motion.p>
              <motion.div 
                variants={fadeIn}
                className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg border-l-4 border-teal-500"
              >
                <p className="text-teal-700 dark:text-teal-300 font-medium">
                  "Our vision was simple: transform e-waste from an environmental burden into economic opportunity while protecting Africa's future."
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  - Kenneth & Shadrack, IWB Co-Founders
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-blue-100 dark:from-gray-700 dark:to-gray-600">
                <img
                  src={aboutUsImage} 
                  alt="IWB Founders"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Mission Section */}
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              variants={fadeIn}
              className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg order-last lg:order-first"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-blue-100 dark:from-gray-700 dark:to-gray-600">
                <img
                  src={recycle} 
                  alt="E-waste recycling process"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Our Core Mission
              </h2>
              <motion.p 
                variants={fadeIn}
                className="text-gray-600 dark:text-gray-300"
              >
                IWB specializes in recycling computer components including RAM, hard drives, and motherboard parts. Our mission is to provide environmentally responsible solutions for electronic waste while creating economic value.
              </motion.p>
              <motion.p 
                variants={fadeIn}
                className="text-gray-600 dark:text-gray-300"
              >
                By 2025, we had established ourselves as one of the pioneers of electronic recycling in Southern Africa, overcoming challenges like rising operational costs, transportation logistics, and market education.
              </motion.p>
              <ul className="space-y-3">
                {[
                  "RAM memory module recycling",
                  "Hard drive processing and data destruction",
                  "Motherboard component recovery",
                  "Sustainable material reclamation"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={fadeIn}
                    custom={index}
                    className="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Growth Section */}
        <AnimatedSection>
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 space-y-10">
            <motion.div variants={fadeIn} className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Growth & Expansion
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Market Penetration",
                  description: "By 2025, IWB became a recognized leader in e-waste recycling across Southern Africa, overcoming significant market barriers.",
                  icon: (
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-3 rounded-full w-12 h-12 flex items-center justify-center text-white mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: "Investor Interest",
                  description: "Our sustainable model attracted investors and partners from across the region, enabling expansion beyond Lesotho.",
                  icon: (
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-3 rounded-full w-12 h-12 flex items-center justify-center text-white mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: "Technology Platform",
                  description: "We developed a cloud-based solution deployed on Microsoft Azure to manage operations efficiently across multiple locations.",
                  icon: (
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-3 rounded-full w-12 h-12 flex items-center justify-center text-white mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                  )
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  custom={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm space-y-3"
                >
                  {item.icon}
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AboutUs;
