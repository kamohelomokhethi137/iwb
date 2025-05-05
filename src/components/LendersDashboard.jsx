import React, { useState } from 'react';
import LenderPortfolio from './lender/LenderPortfolio';
import LoanApplications from './lender/LoanApplications';
import BorrowerAnalysis from './lender/BorrowerAnalysis';
import RiskAssessment from './lender/RiskAssessment';
import LenderSettings from './lender/LenderSettings';
import LenderNavBar from './lender/LenderNavBar';
import LenderSidebar from './lender/LenderSidebar';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function LenderDashboard() {
  const lenderProfile = {
    name: 'Acme Lending',
    email: 'lending@acme.com',
    avatar: 'https://via.placeholder.com/150',
    institutionType: 'Commercial Bank',
    totalPortfolio: 'M15,750,000'
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('portfolio');
  const [showNewLoanModal, setShowNewLoanModal] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const saveSettings = async (settingsData) => {
    try {
      const response = await fetch('/api/lender/save-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData),
      });

      if (!response.ok) throw new Error('Failed to save settings');

      const data = await response.json();
      console.log('Lender settings saved:', data);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving lender settings:', error);
      alert('Failed to save settings');
    }
  };

  const LenderQuickActions = () => (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow dark:bg-gray-800 mb-4 sm:mb-6">
      <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button 
          onClick={() => setShowNewLoanModal(true)}
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Create New Loan
        </button>
        <button 
          onClick={() => setActiveTab('applications')}
          className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Review Applications
        </button>
        <button 
          onClick={() => setActiveTab('risk')}
          className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Risk Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('reports')}
          className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Generate Reports
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <LenderSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lenderProfile={lenderProfile}
      />
      
      <div className="flex-1 flex flex-col">
        <LenderNavBar 
          toggleSidebar={toggleSidebar} 
          activeTab={activeTab}
          lenderProfile={lenderProfile}
        />

        <main className="h-full flex-1 mt-16 p-4 sm:ml-64">
          <AnimatePresence mode="wait">
            {activeTab === 'portfolio' && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <LenderQuickActions />
                <LenderPortfolio />
              </motion.div>
            )}

            {activeTab === 'applications' && (
              <motion.div
                key="applications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <LoanApplications />
              </motion.div>
            )}

            {activeTab === 'analysis' && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <BorrowerAnalysis />
              </motion.div>
            )}

            {activeTab === 'risk' && (
              <motion.div
                key="risk"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <RiskAssessment />
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <LenderSettings saveSettings={saveSettings} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* New Loan Modal */}
      {showNewLoanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Create New Loan Product</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              setShowNewLoanModal(false);
            }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loan Type</label>
                <select className="w-full border rounded-lg p-2 text-sm dark:bg-gray-700 dark:border-gray-600" required>
                  <option value="">Select loan type</option>
                  <option value="personal">Personal Loan</option>
                  <option value="mortgage">Mortgage</option>
                  <option value="auto">Auto Loan</option>
                  <option value="business">Business Loan</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Interest Rate (%)</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="w-full border rounded-lg p-2 text-sm dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Term (months)</label>
                <input 
                  type="number" 
                  className="w-full border rounded-lg p-2 text-sm dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setShowNewLoanModal(false)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Loan Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LenderDashboard;