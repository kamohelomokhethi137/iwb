import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiHome,
  FiDollarSign,
  FiTrendingUp,
  FiPieChart,
  FiBarChart2,
  FiFileText,
  FiSettings,
  FiBell,
  FiUser,
  FiChevronDown,
  FiMenu,
  FiX,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import RevenueChart from './Finance/RevenueChart';
import ExpenseChart from './Finance/ExpenseChart';
import CashFlowChart from './Finance/CashFlowChart';

const FinanceDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar open by default on large screens
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
        damping: 10
      }
    }
  };

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };

  // Handle scroll for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate when in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Finance menu items
  const menuItems = [
    { name: 'Overview', icon: <FiHome /> },
    { name: 'Income Statements', icon: <FiDollarSign /> },
    { name: 'Expenses', icon: <FiTrendingUp /> },
    { name: 'Cash Flow', icon: <FiPieChart /> },
    { name: 'Forecasting', icon: <FiBarChart2 /> },
    { name: 'Reports & Analytics', icon: <FiFileText /> },
    { name: 'Settings', icon: <FiSettings /> }
  ];

  // Financial metrics data
  const financialMetrics = [
    { title: 'Net Income', value: 'M245,382', change: '+12%', trend: 'up' },
    { title: 'Monthly Expenses', value: 'M128,450', change: '-5%', trend: 'down' },
    { title: 'Revenue YTD', value: 'M1.2M', change: '+18%', trend: 'up' },
    { title: 'Forecast Accuracy', value: '92%', change: '+3%', trend: 'up' }
  ];

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50 text-gray-800'}`}>
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Always visible on large screens */}
      <motion.aside
        initial={false}
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed md:relative z-30 w-64 h-full ${darkMode ? 'bg-gray-800' : 'bg-white border-r border-gray-200'} shadow-lg`}
      >
        <div className={`flex items-center justify-between p-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white mr-2">
              <FiDollarSign size={18} />
            </div>
            <span className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>IWB Finance</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href="#"
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-700 text-gray-300' 
                      : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <span className={`mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <motion.header
          animate={{ 
            boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
            y: scrolled ? -5 : 0
          }}
          transition={{ duration: 0.3 }}
          className={`fixed w-full z-20 ${darkMode ? 'bg-gray-800' : 'bg-white border-b border-gray-200'}`}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 md:hidden"
              >
                <FiMenu size={20} />
              </button>
              <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Financial Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>

              <div className="relative">
                <button
                  onClick={() => setHasNotifications(false)}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 relative"
                >
                  <FiBell size={20} />
                  {hasNotifications && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                    />
                  )}
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <FiUser size={16} />
                  </div>
                  <span className={`hidden md:inline ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Finance Team</span>
                  <FiChevronDown className={`transition-transform ${userMenuOpen ? 'transform rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 ${
                        darkMode ? 'bg-gray-800' : 'bg-white'
                      }`}
                    >
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm ${
                          darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm ${
                          darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Settings
                      </a>
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm ${
                          darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Sign out
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pt-16 pb-4 px-4 md:px-6">
          {/* Financial Metrics Cards */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {financialMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl shadow-sm ${
                  darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
                } border-l-4 ${metric.trend === 'up' ? 'border-green-500' : 'border-red-500'}`}
              >
                <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                  {metric.title}
                </h3>
                <div className="flex items-end justify-between">
                  <p className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {metric.value}
                  </p>
                  <span className={`flex items-center text-sm ${
                    metric.trend === 'up' 
                      ? darkMode 
                        ? 'text-green-400' 
                        : 'text-green-600'
                      : darkMode 
                        ? 'text-red-400' 
                        : 'text-red-600'
                  }`}>
                    {metric.change}
                    {metric.trend === 'up' ? (
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Revenue Overview
              </h3>
              <div className="h-64">
                <RevenueChart darkMode={darkMode} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Expense Breakdown
              </h3>
              <div className="h-64">
                <ExpenseChart darkMode={darkMode} />
              </div>
            </motion.div>
          </div>

          {/* Full Width Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`p-6 rounded-xl shadow-sm mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Cash Flow Analysis
            </h3>
            <div className="h-80">
              <CashFlowChart darkMode={darkMode} />
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Recent Transactions
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Date</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Description</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Category</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Amount</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-800'
                      }`}>2023-06-{10 + i}</td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-800'
                      }`}>Transaction #{i + 1001}</td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-800'
                      }`}>
                        {['Office Supplies', 'Software', 'Salaries', 'Marketing', 'Utilities'][i]}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <span className={i % 3 === 0 ? 
                          (darkMode ? 'text-green-400' : 'text-green-600') : 
                          (darkMode ? 'text-red-400' : 'text-red-600')}>
                          {i % 3 === 0 ? '+' : '-'}M{(i + 1) * 2450}.00
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          i % 2 === 0 
                            ? darkMode 
                              ? 'bg-green-900 text-green-200' 
                              : 'bg-green-100 text-green-800'
                            : darkMode 
                              ? 'bg-yellow-900 text-yellow-200' 
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {i % 2 === 0 ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default FinanceDashboard;