import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiActivity,
  FiBarChart2,
  FiBriefcase,
  FiClock,
  FiDatabase,
  FiDollarSign,
  FiHome,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiTrendingUp,
  FiUser,
  FiX,
  FiBell,
  FiSearch
} from 'react-icons/fi';

const IWCDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Navigation items (excluding client queries and webpages)
  const navItems = [
    { id: 'overview', name: 'Overview', icon: <FiHome /> },
    { id: 'analytics', name: 'Analytics', icon: <FiActivity /> },
    { id: 'reports', name: 'Reports', icon: <FiBarChart2 /> },
    { id: 'transactions', name: 'Transactions', icon: <FiDollarSign /> },
    { id: 'portfolio', name: 'Portfolio', icon: <FiBriefcase /> },
    { id: 'history', name: 'History', icon: <FiClock /> },
    { id: 'data', name: 'Data Warehouse', icon: <FiDatabase /> },
    { id: 'settings', name: 'Settings', icon: <FiSettings /> }
  ];

  // Sample metrics data
  const metrics = [
    { title: 'Total Assets', value: 'M4.8B', change: '+2.4%', trend: 'up' },
    { title: 'Active Accounts', value: '1,248', change: '+3.1%', trend: 'up' },
    { title: '30d Volume', value: 'M382M', change: '-1.2%', trend: 'down' },
    { title: 'Partner Score', value: '94.7', change: '+0.5', trend: 'up' }
  ];

  // Sample recent activity
  const recentActivity = [
    { id: 1, action: 'Portfolio Update', entity: 'Global Equity Fund', time: '2 min ago', status: 'completed' },
    { id: 2, action: 'Data Sync', entity: 'Client Records', time: '15 min ago', status: 'completed' },
    { id: 3, action: 'Report Generated', entity: 'Q2 Performance', time: '1 hour ago', status: 'completed' },
    { id: 4, action: 'System Maintenance', entity: 'Database', time: '3 hours ago', status: 'pending' }
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="fixed lg:relative z-30 w-72 h-full bg-gray-900 text-gray-100 shadow-xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
              <FiBriefcase className="text-white" />
            </div>
            <span className="text-xl font-semibold">IWC Partner</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <motion.li
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left flex items-center p-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button className="flex items-center w-full p-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg">
            <FiLogOut className="mr-3" />
            <span>Log Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="fixed w-full z-20 bg-white bg-opacity-90 backdrop-blur-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 text-gray-500 hover:text-gray-700 lg:hidden"
              >
                <FiMenu size={20} />
              </button>
              <h1 className="text-xl font-semibold capitalize">{activeTab}</h1>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative text-gray-500 hover:text-gray-700"
              >
                <FiBell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <FiUser className="text-gray-600" />
                  </div>
                  <span className="hidden md:inline font-medium">Partner Admin</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      userMenuOpen ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Log out
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pt-20 pb-6 px-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <h3 className="text-sm font-medium text-gray-500 mb-1">{metric.title}</h3>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
                  <span
                    className={`flex items-center text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {metric.change}
                    {metric.trend === 'up' ? (
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Performance Overview</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
                    Monthly
                  </button>
                  <button className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
                    Quarterly
                  </button>
                </div>
              </div>
              {/* Chart Placeholder */}
              <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                Performance Chart Area
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <motion.div
                    key={activity.id}
                    whileHover={{ x: 5 }}
                    className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <FiClock className="text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.entity}</p>
                      <div className="flex items-center mt-1">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            activity.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {activity.status}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Data Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Portfolio Holdings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Asset
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Allocation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <motion.tr
                      key={item}
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                      className="cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Asset {item}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {['Equity', 'Fixed Income', 'Alternative', 'Cash', 'Commodities'][item - 1]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        M{(item * 2500000).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item * 5}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item % 2 === 0
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item % 2 === 0 ? '+3.2%' : '-1.5%'}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-right">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View All Holdings →
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default IWCDashboard;