import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DeveloperDashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [systemStatus, setSystemStatus] = useState({
    database: 'Operational',
    api: 'Operational',
    auth: 'Operational',
    backups: 'Last 2 hours ago'
  });

  const developerPermissions = [
    'Dashboard', 
    'System Config', 
    'API Logs', 
    'Database', 
    'Backups', 
    'Settings'
  ];

  const dashboardMetrics = {
    activeUsers: 42,
    apiCalls: '1,842/hr',
    storageUsed: '78GB/120GB',
    lastDeploy: '2 hours ago'
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const selectTab = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const renderMainContent = () => {
    switch(activeTab) {
      case 'System Config': return <SystemConfigView />;
      case 'API Logs': return <ApiLogsView />;
      case 'Database': return <DatabaseView />;
      case 'Backups': return <BackupsView />;
      case 'Settings': return <SettingsView />;
      default: return <DashboardView metrics={dashboardMetrics} systemStatus={systemStatus} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Mobile menu button with more spacing */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-blue-400 hover:text-blue-300 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed z-40 h-full w-64 bg-gray-800 shadow-lg mobile-menu"
          >
            <div className="p-4 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-md mr-2"></div>
                <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                  IWB Dev
                </span>
              </div>
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <nav>
                <ul>
                  {developerPermissions.map((item, index) => (
                    <motion.li 
                      key={index}
                      whileHover={{ x: 5, backgroundColor: 'rgba(45, 55, 72, 0.5)' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => selectTab(item)}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 mr-3 ${
                          index % 2 === 0 ? 'text-blue-400' : 
                          index % 3 === 0 ? 'text-green-400' : 'text-pink-400'
                        }`}>
                          <TabIcon tab={item} />
                        </div>
                        <span className={activeTab === item ? 'text-blue-400 font-medium' : 'text-gray-300'}>
                          {item}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  D
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Developer</p>
                  <p className="text-xs text-gray-400">IWB Tech Team</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <motion.div
          animate={{ width: 240 }}
          className="bg-gray-800 shadow-lg flex flex-col h-full"
        >
          <div className="p-4 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-md mr-2"></div>
              <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                IWB Dev
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav>
              <ul>
                {developerPermissions.map((item, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5, backgroundColor: 'rgba(45, 55, 72, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-3 cursor-pointer"
                    onClick={() => selectTab(item)}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 mr-3 ${
                        index % 2 === 0 ? 'text-blue-400' : 
                        index % 3 === 0 ? 'text-green-400' : 'text-pink-400'
                      }`}>
                        <TabIcon tab={item} />
                      </div>
                      <span className={activeTab === item ? 'text-blue-400 font-medium' : 'text-gray-300'}>
                        {item}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                D
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Developer</p>
                <p className="text-xs text-gray-400">IWB Tech Team</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation - Adjusted spacing for mobile */}
        <header className="bg-gray-800 shadow-sm z-10">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <div className="flex items-center ml-16 md:ml-0"> {/* Increased from ml-12 to ml-16 */}
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                {activeTab}
              </h1>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <button className="p-2 rounded-full text-blue-400 hover:text-blue-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button className="p-2 rounded-full text-pink-400 hover:text-pink-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-850">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderMainContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

// Tab Icon Component
const TabIcon = ({ tab }) => {
  const iconProps = {
    className: "w-6 h-6",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  };

  switch(tab) {
    case 'Dashboard':
      return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
    case 'System Config':
      return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    case 'API Logs':
      return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
    case 'Database':
      return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>;
    case 'Backups':
      return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>;
    case 'Settings':
      return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>;
    default:
      return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
  }
};

// View Components
const DashboardView = ({ metrics, systemStatus }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
      Developer Dashboard
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Object.entries(metrics).map(([key, value], index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-blue-400"
        >
          <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">
            {key.split(/(?=[A-Z])/).join(' ')}
          </h3>
          <p className="text-2xl font-bold text-blue-400">{value}</p>
        </motion.div>
      ))}
    </div>

    <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
      <h3 className="text-xl font-bold mb-4 text-blue-400">System Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(systemStatus).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between py-2 border-b border-gray-700">
            <span className="text-gray-300 capitalize">{key}:</span>
            <span className={`font-medium ${
              value === 'Operational' ? 'text-green-400' : 
              value.includes('ago') ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-blue-400">Quick Actions</h3>
      <div className="flex flex-wrap gap-4">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-medium transition-colors">
          Run Backup
        </button>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md text-white font-medium transition-colors">
          Check Logs
        </button>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-md text-white font-medium transition-colors">
          API Status
        </button>
        <button className="px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded-md text-white font-medium transition-colors">
          Clear Cache
        </button>
      </div>
    </div>
  </div>
);

const SystemConfigView = () => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-blue-400">System Configuration</h2>
    <div className="space-y-4">
      <div className="p-4 bg-gray-750 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-green-400">Cloud Services</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Azure Connection:</span>
            <span className="text-green-400">Active</span>
          </div>
          <div className="flex items-center justify-between">
            <span>AWS Backup:</span>
            <span className="text-green-400">Enabled</span>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-750 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-blue-400">API Settings</h3>
        {/* API settings content */}
      </div>
    </div>
  </div>
);

const ApiLogsView = () => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-blue-400">API Logs</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Endpoint</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {[...Array(5)].map((_, i) => (
            <tr key={i}>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{new Date().toLocaleTimeString()}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">/api/v1/query</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400">200</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const DatabaseView = () => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-blue-400">Database Management</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-4 bg-gray-750 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-green-400">Collections</h3>
        <ul className="space-y-2">
          <li className="flex items-center justify-between py-2 border-b border-gray-700">
            <span>Products</span>
            <span className="text-gray-400">1,842 records</span>
          </li>
          <li className="flex items-center justify-between py-2 border-b border-gray-700">
            <span>Services</span>
            <span className="text-gray-400">328 records</span>
          </li>
        </ul>
      </div>
      <div className="p-4 bg-gray-750 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-blue-400">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-medium transition-colors">
            Backup Now
          </button>
          <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-md text-white font-medium transition-colors">
            Optimize Indexes
          </button>
        </div>
      </div>
    </div>
  </div>
);

const BackupsView = () => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-blue-400">Backup Management</h2>
    <div className="space-y-6">
      <div className="p-4 bg-gray-750 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-green-400">Recent Backups</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {[...Array(3)].map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{new Date().toLocaleDateString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">Full</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400">Completed</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-4 bg-gray-750 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-blue-400">Backup Settings</h3>
        {/* Backup settings content */}
      </div>
    </div>
  </div>
);

const SettingsView = () => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-blue-400">Developer Settings</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-4 bg-gray-750 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-green-400">Account</h3>
        {/* Account settings */}
      </div>
      <div className="p-4 bg-gray-750 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-blue-400">Preferences</h3>
        {/* Preference settings */}
      </div>
    </div>
  </div>
);

export default DeveloperDashboard;