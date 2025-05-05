import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiDollarSign,
  FiPieChart,
  FiFileText,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  Title,
  Tooltip,
  Legend
);

// Currency formatter for ZAR
const formatZAR = (value) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

const InvestorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('income-statements');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [expandedMonths, setExpandedMonths] = useState([]);

  // Sample monthly income data (values in ZAR)
  const monthlyData = [
    {
      month: 'January 2023',
      revenue: 125000, // 1,250,000 USD * 18.5 (example conversion rate)
      expenses: 25000,
      operatingIncome: 74000,
      netIncome: 59200,
      details: {
        productSales: 166500,
        serviceRevenue: 64750,
        salaries: 832500,
        marketing: 22200,
        operations: 33300,
        taxes: 14800
      }
    },
    {
      month: 'February 2023',
      revenue: 21800,
      expenses: 1510,
      operatingIncome: 6600,
      netIncome: 5300,
      details: {
        productSales: 15000,
        serviceRevenue: 6100,
        salaries: 8100,
        marketing: 20000,
        operations: 35000,
        taxes: 1300
      }
    },
    {
      month: 'March 2023',
      revenue: 24420000,
      expenses: 162800,
      operatingIncome: 81400,
      netIncome: 64750,
      details: {
        productSales: 17570,
        serviceRevenue: 68400,
        salaries: 85100,
        marketing: 24000,
        operations: 35100,
        taxes: 1570
      }
    }
  ];

  // Toggle month expansion
  const toggleMonth = (month) => {
    if (expandedMonths.includes(month)) {
      setExpandedMonths(expandedMonths.filter(m => m !== month));
    } else {
      setExpandedMonths([...expandedMonths, month]);
    }
  };

  // Chart data for revenue trend
  const revenueChartData = {
    labels: monthlyData.map(item => item.month.split(' ')[0]),
    datasets: [
      {
        label: 'Revenue',
        data: monthlyData.map(item => item.revenue),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  // Chart data for income/expenses
  const incomeExpenseData = {
    labels: monthlyData.map(item => item.month.split(' ')[0]),
    datasets: [
      {
        label: 'Revenue',
        data: monthlyData.map(item => item.revenue),
        backgroundColor: '#10B981',
        borderRadius: 4
      },
      {
        label: 'Expenses',
        data: monthlyData.map(item => item.expenses),
        backgroundColor: '#3B82F6',
        borderRadius: 4
      },
      {
        label: 'Net Income',
        data: monthlyData.map(item => item.netIncome),
        backgroundColor: '#6366F1',
        borderRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#1F2937',
          font: {
            weight: '600'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatZAR(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280'
        }
      },
      y: {
        grid: {
          color: 'rgba(209, 213, 219, 0.5)'
        },
        ticks: {
          color: '#6B7280',
          callback: function(value) {
            return 'R' + (value / 1000000).toFixed(1) + 'M'; // Changed to millions with R prefix
          }
        }
      }
    }
  };

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
        className="fixed lg:relative z-30 w-64 h-full bg-white shadow-xl border-r border-gray-200"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center text-white">
              <FiDollarSign size={18} />
            </div>
            <span className="text-xl font-semibold">Investor Portal</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            <motion.li
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => setActiveTab('income-statements')}
                className={`w-full text-left flex items-center p-3 rounded-lg transition-all ${
                  activeTab === 'income-statements'
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <FiDollarSign className="mr-3" />
                <span>Income Statements</span>
              </button>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => setActiveTab('investments')}
                className={`w-full text-left flex items-center p-3 rounded-lg transition-all ${
                  activeTab === 'investments'
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <FiPieChart className="mr-3" />
                <span>Investments</span>
              </button>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                className="w-full text-left flex items-center p-3 rounded-lg transition-all opacity-50 cursor-not-allowed"
                disabled
              >
                <FiFileText className="mr-3" />
                <span>Reports</span>
              </button>
            </motion.li>
          </ul>
        </nav>
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
              <h1 className="text-xl font-semibold">Income Statements</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <FiUser className="text-gray-600" />
                  </div>
                  <span className="hidden md:inline">Investor</span>
                  {userMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                    >
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile Settings
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <FiLogOut className="mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pt-20 pb-6 px-6">
          {/* Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
              <p className="text-2xl font-bold text-gray-800">
                {formatZAR(monthlyData.reduce((sum, month) => sum + month.revenue, 0))}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Expenses</h3>
              <p className="text-2xl font-bold text-gray-800">
                {formatZAR(monthlyData.reduce((sum, month) => sum + month.expenses, 0))}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Net Income</h3>
              <p className="text-2xl font-bold text-green-600">
                {formatZAR(monthlyData.reduce((sum, month) => sum + month.netIncome, 0))}
              </p>
            </div>
          </motion.div>

          {/* Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trend</h3>
              <div className="h-64">
                <Line data={revenueChartData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Income vs Expenses</h3>
              <div className="h-64">
                <Bar data={incomeExpenseData} options={chartOptions} />
              </div>
            </div>
          </motion.div>

          {/* Income Statements Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Monthly Income Statements</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Month
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expenses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Operating Income
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Income
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {monthlyData.map((monthData, index) => (
                    <React.Fragment key={index}>
                      <motion.tr
                        whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                        className="cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {monthData.month}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatZAR(monthData.revenue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatZAR(monthData.expenses)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatZAR(monthData.operatingIncome)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {formatZAR(monthData.netIncome)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => toggleMonth(monthData.month)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {expandedMonths.includes(monthData.month) ? 'Hide Details' : 'Show Details'}
                          </button>
                        </td>
                      </motion.tr>
                      {expandedMonths.includes(monthData.month) && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td colSpan="6" className="px-6 py-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-gray-800 mb-2">Revenue Breakdown</h4>
                                <ul className="space-y-1">
                                  <li className="flex justify-between text-sm">
                                    <span className="text-gray-500">Product Sales</span>
                                    <span>
                                      {formatZAR(monthData.details.productSales)}
                                    </span>
                                  </li>
                                  <li className="flex justify-between text-sm">
                                    <span className="text-gray-500">Service Revenue</span>
                                    <span>
                                      {formatZAR(monthData.details.serviceRevenue)}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800 mb-2">Expense Breakdown</h4>
                                <ul className="space-y-1">
                                  <li className="flex justify-between text-sm">
                                    <span className="text-gray-500">Salaries</span>
                                    <span>
                                      {formatZAR(monthData.details.salaries)}
                                    </span>
                                  </li>
                                  <li className="flex justify-between text-sm">
                                    <span className="text-gray-500">Marketing</span>
                                    <span>
                                      {formatZAR(monthData.details.marketing)}
                                    </span>
                                  </li>
                                  <li className="flex justify-between text-sm">
                                    <span className="text-gray-500">Operations</span>
                                    <span>
                                      {formatZAR(monthData.details.operations)}
                                    </span>
                                  </li>
                                  <li className="flex justify-between text-sm">
                                    <span className="text-gray-500">Taxes</span>
                                    <span>
                                      {formatZAR(monthData.details.taxes)}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-right">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View All Statements →
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default InvestorDashboard;