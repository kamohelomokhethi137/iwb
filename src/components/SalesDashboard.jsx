import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiHome,
  FiUsers,
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

// Lazy-loaded chart components
const LeadsChart = React.lazy(() => import('./sales/LeadsChart'));
const RevenueChart = React.lazy(() => import('./sales/RevenueChart'));
const ConversionChart = React.lazy(() => import('./sales/ConversionChart'));

const SalesDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
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

  // Sales menu items
  const menuItems = [
    { name: 'Sales Overview', icon: <FiHome />, id: 'overview' },
    { name: 'Leads', icon: <FiUsers />, id: 'leads' },
    { name: 'Conversions', icon: <FiTrendingUp />, id: 'conversions' },
    { name: 'Pipeline Tracker', icon: <FiDollarSign />, id: 'pipeline' },
    { name: 'Revenue Charts', icon: <FiBarChart2 />, id: 'revenue' },
    { name: 'Team Targets', icon: <FiTarget />, id: 'targets' }
  ];

  // Sales metrics data
  const salesMetrics = [
    { title: 'Leads This Week', value: 142, change: '+18%', trend: 'up', target: 150 },
    { title: 'Deals Closed', value: 28, change: '+5%', trend: 'up', target: 30 },
    { title: 'Monthly Revenue', value: '$245,382', change: '+12%', trend: 'up' },
    { title: 'Conversion Rate', value: '19%', change: '+3%', trend: 'up' }
  ];

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
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
          className={`fixed md:relative z-30 w-64 h-full ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-xl`}
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mr-2">
                <FiTrendingUp size={18} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">SalesPulse</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
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
                          ? 'hover:bg-slate-700 text-slate-300' 
                          : 'hover:bg-slate-100 text-slate-700'
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
       {/* Top Navigation */}
<motion.header
  animate={{ 
    y: scrolled ? -5 : 0,
    backdropFilter: scrolled ? 'blur(10px)' : 'none',
    backgroundColor: scrolled 
      ? darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(248, 250, 252, 0.8)'
      : darkMode ? 'rgb(15, 23, 42)' : 'rgb(248, 250, 252)',
    boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'
  }}
  transition={{ duration: 0.3 }}
  className={`fixed w-full z-20 border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}
>
  <div className="flex items-center justify-between px-4 py-3">
    <div className="flex items-center">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="mr-4 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 md:hidden"
      >
        <FiMenu size={20} />
      </button>
      <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        Sales Dashboard
      </h1>
    </div>

    {/* Updated Icons Container */}
    <div className="flex items-center space-x-4 ml-auto">  {/* Added ml-auto here */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
      >
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      <div className="relative">
        <button
          onClick={() => setHasNotifications(false)}
          className="p-2 rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 relative"
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
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-slate-800"></span>
          </div>
          <span className="hidden md:inline text-slate-700 dark:text-slate-300">Sales Team</span>
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
                darkMode ? 'bg-slate-800' : 'bg-white'
              } border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}
            >
              <a
                href="#"
                className={`block px-4 py-2 text-sm ${
                  darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Your Profile
              </a>
              <a
                href="#"
                className={`block px-4 py-2 text-sm ${
                  darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Settings
              </a>
              <a
                href="#"
                className={`block px-4 py-2 text-sm ${
                  darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-100'
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
              darkMode ? 'bg-slate-800' : 'bg-white'
            } shadow-sm border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}
          >
            <div className="flex items-center space-x-2">
              <FiFilter className="text-slate-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filters:</span>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                This Month
              </button>
              <button className="px-3 py-1 text-sm rounded-full bg-blue-500 text-white">
                My Team
              </button>
              <button className="px-3 py-1 text-sm rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                By Region
              </button>
            </div>
            <button className="flex items-center text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
              <FiRefreshCw className="mr-1" /> Refresh Data
            </button>
          </motion.div>

          {/* Sales Metrics Cards */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {salesMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl shadow-sm ${
                  darkMode ? 'bg-slate-800' : 'bg-white'
                } border ${darkMode ? 'border-slate-700' : 'border-slate-200'} relative overflow-hidden`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{metric.title}</h3>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">{metric.value}</p>
                  <span className={`flex items-center text-sm font-medium ${
                    metric.trend === 'up' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
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
                {metric.target && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>{Math.round((metric.value / metric.target) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
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
            <React.Suspense fallback={<div className="h-80 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-slate-800' : 'bg-white'} border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Leads Overview</h3>
                  <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                    View All
                  </button>
                </div>
                <div className="h-64">
                  <LeadsChart darkMode={darkMode} />
                </div>
              </motion.div>
            </React.Suspense>

            <React.Suspense fallback={<div className="h-80 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-slate-800' : 'bg-white'} border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Revenue Trends</h3>
                  <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                    View All
                  </button>
                </div>
                <div className="h-64">
                  <RevenueChart darkMode={darkMode} />
                </div>
              </motion.div>
            </React.Suspense>
          </div>

          {/* Full Width Chart */}
          <React.Suspense fallback={<div className="h-80 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-slate-800' : 'bg-white'} border ${darkMode ? 'border-slate-700' : 'border-slate-200'} mb-8`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Conversion Funnel</h3>
                <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                  View Details
                </button>
              </div>
              <div className="h-80">
                <ConversionChart darkMode={darkMode} />
              </div>
            </motion.div>
          </React.Suspense>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-slate-800' : 'bg-white'} border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Activities</h3>
              <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                See All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                <thead>
                  <tr>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>Deal</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>Client</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>Amount</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>Stage</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>Last Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {[...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${
                        darkMode ? 'text-white' : 'text-slate-800'
                      }`}>Deal #{i + 1001}</td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm ${
                        darkMode ? 'text-slate-300' : 'text-slate-800'
                      }`}>Client {['Acme Inc', 'Globex Corp', 'Initech', 'Umbrella', 'Wayne Ent'][i]}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        M{(i + 1) * 12500}.00
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          i % 3 === 0 
                            ? darkMode 
                              ? 'bg-green-900 text-green-200' 
                              : 'bg-green-100 text-green-800'
                            : i % 2 === 0
                              ? darkMode 
                                ? 'bg-yellow-900 text-yellow-200' 
                                : 'bg-yellow-100 text-yellow-800'
                              : darkMode 
                                ? 'bg-blue-900 text-blue-200' 
                                : 'bg-blue-100 text-blue-800'
                        }`}>
                          {['Closed', 'Negotiation', 'Proposal', 'Qualified', 'New'][i]}
                        </span>
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm ${
                        darkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}>{i + 1} day{i !== 0 ? 's' : ''} ago</td>
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