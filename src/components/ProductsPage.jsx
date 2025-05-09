import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiHome,
  FiCpu,
  FiHardDrive,
  FiTrendingUp,
  FiDollarSign,
  FiTarget,
  FiBarChart2,
  FiBell,
  FiUser,
  FiChevronDown,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiFilter,
  FiRefreshCw
} from 'react-icons/fi';

// Mock data for charts
const mockData = {
  inventoryLevels: [
    { name: 'RAM', value: 50 },
    { name: 'Motherboards', value: 30 },
    { name: 'Storage', value: 40 },
    { name: 'Processors', value: 60 }
  ],
  salesTrends: [
    { date: '2023-01', sales: 200 },
    { date: '2023-02', sales: 250 },
    { date: '2023-03', sales: 300 },
    { date: '2023-04', sales: 350 }
  ],
  categoryDistribution: [
    { name: 'RAM', value: 25 },
    { name: 'Motherboards', value: 15 },
    { name: 'Storage', value: 20 },
    { name: 'Processors', value: 40 }
  ]
};

// Lazy-loaded chart components
const InventoryChart = React.lazy(() => import('./hardware/InventoryChart'));
const SalesChart = React.lazy(() => import('./hardware/SalesChart'));
const CategoryChart = React.lazy(() => import('./hardware/CategoryChart'));

const SalesDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    setLoading(false);
  }, []);

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
        stiffness: 400,
        damping: 20
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
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate when in view
  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  // Hardware menu items
  const menuItems = [
    { name: 'Inventory Overview', icon: <FiHome />, id: 'overview' },
    { name: 'CPU Metrics', icon: <FiCpu />, id: 'cpus' },
    { name: 'RAM Analytics', icon: <FiHardDrive />, id: 'ram' },
    { name: 'Storage Stats', icon: <FiHardDrive />, id: 'storage' },
    { name: 'Sales Trends', icon: <FiDollarSign />, id: 'sales' },
    { name: 'Category Targets', icon: <FiTarget />, id: 'targets' }
  ];

  // Hardware metrics data (fallback if no data)
  const hardwareMetrics = [
    { title: 'CPU Inventory', value: 50, change: '+10%', trend: 'up', target: 100 },
    { title: 'RAM Stock', value: 30, change: '-5%', trend: 'down', target: 50 },
    { title: 'Storage Units', value: 40, change: '+20%', trend: 'up' },
    { title: 'Defect Rate', value: '2%', change: '+1%', trend: 'up' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
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

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial="closed"
          animate={sidebarOpen ? "open" : "closed"}
          variants={sidebarVariants}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`fixed md:relative z-30 w-64 h-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mr-2">
                <FiCpu size={18} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">HardwarePulse</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <FiX size={20} />
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <motion.li
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left flex items-center p-3 rounded-lg transition-all ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500'
                        : darkMode 
                          ? 'hover:bg-gray-700 text-gray-300' 
                          : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <motion.span
                      animate={{
                        color: activeTab === item.id 
                          ? darkMode ? '#60A5FA' : '#3B82F6'
                          : darkMode ? '#CBD5E1' : '#64748B',
                        scale: activeTab === item.id ? 1.1 : 1
                      }}
                      transition={{ type: 'spring', stiffness: 500 }}
                      className="mr-3"
                    >
                      {item.icon}
                    </motion.span>
                    <span className="font-medium">{item.name}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <motion.header
          animate={{ 
            y: scrolled ? -5 : 0,
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            backgroundColor: scrolled 
              ? darkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(249, 250, 251, 0.8)'
              : darkMode ? 'rgb(17, 24, 39)' : 'rgb(249, 250, 251)',
            boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
          }}
          transition={{ duration: 0.3 }}
          className={`fixed w-full z-20 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 md:hidden"
              >
                <FiMenu size={20} />
              </button>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Hardware Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4 ml-auto">
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
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      <FiUser size={16} />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-gray-800"></span>
                  </div>
                  <span className="hidden md:inline text-gray-700 dark:text-gray-300">Hardware Team</span>
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
                      } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
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
          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`flex flex-wrap items-center justify-between mb-6 p-4 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                This Month
              </button>
              <button className="px-3 py-1 text-sm rounded-full bg-blue-500 text-white">
                All Categories
              </button>
              <button className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                By Warehouse
              </button>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <FiRefreshCw className="mr-1" /> Refresh Data
            </button>
          </motion.div>

          {/* Hardware Metrics Cards */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {hardwareMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl shadow-sm ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} relative overflow-hidden`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{metric.title}</h3>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{metric.value}</p>
                  <span className={`flex items-center text-sm font-medium ${
                    metric.trend === 'up' 
                      ? 'text-green-600 dark:text-green-400' 
                      : metric.trend === 'down'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {metric.change}
                    {metric.trend === 'up' ? (
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                      </svg>
                    ) : metric.trend === 'down' ? (
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    ) : null}
                  </span>
                </div>
                {metric.target && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{Math.round((metric.value / metric.target) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(metric.value / metric.target) * 100}%` }}
                        transition={{ duration: 1, type: 'spring' }}
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <React.Suspense fallback={<div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Inventory Levels</h3>
                  <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                    View All
                  </button>
                </div>
                <div className="h-64">
                  <InventoryChart darkMode={darkMode} data={mockData.inventoryLevels} />
                </div>
              </motion.div>
            </React.Suspense>

            <React.Suspense fallback={<div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Sales Trends</h3>
                  <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                    View All
                  </button>
                </div>
                <div className="h-64">
                  <SalesChart darkMode={darkMode} data={mockData.salesTrends} />
                </div>
              </motion.div>
            </React.Suspense>
          </div>

          {/* Full Width Chart */}
          <React.Suspense fallback={<div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-8`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Category Distribution</h3>
                <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                  View Details
                </button>
              </div>
              <div className="h-80">
                <CategoryChart darkMode={darkMode} data={mockData.categoryDistribution} />
              </div>
            </motion.div>
          </React.Suspense>

          {/* Recent Inventory Changes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Inventory Changes</h3>
              <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                See All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Component</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Category</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Change</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Status</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockData.recentChanges.map((change, i) => (
                    <tr key={i}>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>{change.component}</td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-800'
                      }`}>{change.category}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        {change.change}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          change.status === 'Received'
                            ? darkMode 
                              ? 'bg-green-900 text-green-200' 
                              : 'bg-green-100 text-green-800'
                            : change.status === 'Shipped'
                              ? darkMode 
                                ? 'bg-yellow-900 text-yellow-200' 
                                : 'bg-yellow-100 text-yellow-800'
                              : darkMode 
                                ? 'bg-blue-900 text-blue-200' 
                                : 'bg-blue-100 text-blue-800'
                        }`}>
                          {change.status}
                        </span>
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{change.time}</td>
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

export default SalesDashboard;