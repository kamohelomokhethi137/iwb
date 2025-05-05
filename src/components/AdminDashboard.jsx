import React, { useState} from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
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

// Icons (using Material Icons as example)
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WarningIcon from '@mui/icons-material/Warning';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', type: 'consumer', status: 'active', creditScore: 720 },
    { id: 2, name: 'Acme Lending', email: 'acme@lending.com', type: 'lender', status: 'active', portfolio: '$15M' },
    { id: 3, name: 'Sarah Johnson', email: 'sarah@example.com', type: 'consumer', status: 'active', creditScore: 680 },
    { id: 4, name: 'Prime Capital', email: 'prime@capital.com', type: 'lender', status: 'suspended', portfolio: '$8M' },
    { id: 5, name: 'Mike Brown', email: 'mike@example.com', type: 'consumer', status: 'inactive', creditScore: 710 }
  ]);

  const [loans, setLoans] = useState([
    { id: 'L-1001', borrower: 'John Smith', lender: 'Acme Lending', amount: '$25,000', status: 'active', date: '2023-06-15' },
    { id: 'L-1002', borrower: 'Sarah Johnson', lender: 'Prime Capital', amount: '$15,000', status: 'defaulted', date: '2023-05-20' },
    { id: 'L-1003', borrower: 'Mike Brown', lender: 'Acme Lending', amount: '$35,000', status: 'paid', date: '2023-04-10' },
    { id: 'L-1004', borrower: 'John Smith', lender: 'Prime Capital', amount: '$50,000', status: 'active', date: '2023-06-01' }
  ]);

  const [complaints, setComplaints] = useState([
    { id: 1, user: 'John Smith', type: 'dispute', status: 'open', date: '2023-06-10' },
    { id: 2, user: 'Sarah Johnson', type: 'service', status: 'resolved', date: '2023-05-15' },
    { id: 3, user: 'Mike Brown', type: 'fraud', status: 'investigating', date: '2023-06-05' }
  ]);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Charts data
  const userDistributionData = {
    labels: ['Consumers', 'Lenders', 'Admins'],
    datasets: [{
      data: [1250, 42, 5],
      backgroundColor: ['#3B82F6', '#10B981', '#6366F1']
    }]
  };

  const loanStatusData = {
    labels: ['Active', 'Paid', 'Defaulted', 'Pending'],
    datasets: [{
      data: [850, 1200, 75, 150],
      backgroundColor: ['#3B82F6', '#10B981', '#EF4444', '#F59E0B']
    }]
  };

  const creditScoreDistribution = {
    labels: ['300-579', '580-669', '670-739', '740-799', '800-850'],
    datasets: [{
      label: 'Consumers',
      data: [50, 250, 400, 300, 250],
      backgroundColor: '#3B82F6'
    }]
  };

  const portfolioGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Total Portfolio Value ($M)',
      data: [120, 135, 142, 155, 165, 180],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.3
    }]
  };

  const removeUser = (userId) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' } 
        : user
    ));
  };

  const resolveComplaint = (complaintId) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId 
        ? { ...complaint, status: 'resolved' } 
        : complaint
    ));
  };

  // Responsive components
  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Total Users</h3>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">1,297</p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">42 lenders, 1,250 consumers</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Active Loans</h3>
          <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">850</p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">$125M in active loans</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Open Complaints</h3>
          <p className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">12</p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">2 high priority</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">System Health</h3>
          <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">100%</p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">All systems operational</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">User Distribution</h3>
          <div className="h-64">
            <Doughnut 
              data={userDistributionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: window.innerWidth < 1024 ? 'bottom' : 'right'
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Loan Status</h3>
          <div className="h-64">
            <Pie 
              data={loanStatusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: window.innerWidth < 1024 ? 'bottom' : 'right'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
        <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Portfolio Growth</h3>
        <div className="h-64">
          <Line 
            data={portfolioGrowthData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: false
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );

  const UsersTab = () => (
    <div className="bg-white rounded-lg shadow dark:bg-gray-800 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">User Management</h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Manage all system users</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-3 py-2 sm:px-6 sm:py-3">ID</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">Name</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">Email</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">Type</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">Status</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">Details</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-3 py-3 sm:px-6 sm:py-4 font-medium text-gray-900 dark:text-white">{user.id}</td>
                <td className="px-3 py-3 sm:px-6 sm:py-4">{user.name}</td>
                <td className="px-3 py-3 sm:px-6 sm:py-4 truncate max-w-[100px] sm:max-w-none">{user.email}</td>
                <td className="px-3 py-3 sm:px-6 sm:py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.type === 'lender' 
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {user.type}
                  </span>
                </td>
                <td className="px-3 py-3 sm:px-6 sm:py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : user.status === 'suspended'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-3 py-3 sm:px-6 sm:py-4">
                  {user.type === 'consumer' ? `Score: ${user.creditScore}` : `Portfolio: ${user.portfolio}`}
                </td>
                <td className="px-3 py-3 sm:px-6 sm:py-4 space-x-1 sm:space-x-2">
                  <button 
                    onClick={() => toggleUserStatus(user.id)}
                    className={`text-xs sm:text-sm px-2 sm:px-3 py-1 rounded ${
                      user.status === 'active' 
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {user.status === 'active' ? 'Suspend' : 'Activate'}
                  </button>
                  <button 
                    onClick={() => removeUser(user.id)}
                    className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const LoansTab = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Loan Portfolio</h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">All active and historical loans</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-3 py-2 sm:px-6 sm:py-3">Loan ID</th>
                <th className="px-3 py-2 sm:px-6 sm:py-3">Borrower</th>
                <th className="px-3 py-2 sm:px-6 sm:py-3">Lender</th>
                <th className="px-3 py-2 sm:px-6 sm:py-3">Amount</th>
                <th className="px-3 py-2 sm:px-6 sm:py-3">Status</th>
                <th className="px-3 py-2 sm:px-6 sm:py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-3 py-3 sm:px-6 sm:py-4 font-medium text-gray-900 dark:text-white">{loan.id}</td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4">{loan.borrower}</td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4">{loan.lender}</td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4">{loan.amount}</td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      loan.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : loan.status === 'defaulted'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4">{loan.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Credit Score Distribution</h3>
          <div className="h-64">
            <Bar 
              data={creditScoreDistribution}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Loan Status Analytics</h3>
          <div className="h-64">
            <Doughnut 
              data={loanStatusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: window.innerWidth < 1024 ? 'bottom' : 'right'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const ComplaintsTab = () => (
    <div className="bg-white rounded-lg shadow dark:bg-gray-800 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Complaint Management</h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Review and resolve user complaints</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-3 py-2 sm:px-6 sm:py-3">ID</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">User</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">Type</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">Status</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">Date</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-3 py-3 sm:px-6 sm:py-4 font-medium text-gray-900 dark:text-white">{complaint.id}</td>
                <td className="px-3 py-3 sm:px-6 sm:py-4">{complaint.user}</td>
                <td className="px-3 py-3 sm:px-6 sm:py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    complaint.type === 'dispute' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : complaint.type === 'fraud'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {complaint.type}
                  </span>
                </td>
                <td className="px-3 py-3 sm:px-6 sm:py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    complaint.status === 'resolved' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : complaint.status === 'investigating'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="px-3 py-3 sm:px-6 sm:py-4">{complaint.date}</td>
                <td className="px-3 py-3 sm:px-6 sm:py-4">
                  {complaint.status !== 'resolved' && (
                    <button 
                      onClick={() => resolveComplaint(complaint.id)}
                      className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex items-center justify-between pl-2.5 mb-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">
              Admin Dashboard
            </span>
            <button 
              onClick={toggleSidebar}
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <CloseIcon />
            </button>
          </div>
          
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  setActiveTab('overview');
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`flex items-center w-full p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white ${
                  activeTab === 'overview' ? 'bg-gray-200 dark:bg-gray-700' : ''
                }`}
              >
                <DashboardIcon className="mr-3" />
                <span>Overview</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('users');
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`flex items-center w-full p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white ${
                  activeTab === 'users' ? 'bg-gray-200 dark:bg-gray-700' : ''
                }`}
              >
                <PeopleIcon className="mr-3" />
                <span>User Management</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('loans');
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`flex items-center w-full p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white ${
                  activeTab === 'loans' ? 'bg-gray-200 dark:bg-gray-700' : ''
                }`}
              >
                <MonetizationOnIcon className="mr-3" />
                <span>Loan Portfolio</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('complaints');
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`flex items-center w-full p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white ${
                  activeTab === 'complaints' ? 'bg-gray-200 dark:bg-gray-700' : ''
                }`}
              >
                <WarningIcon className="mr-3" />
                <span>Complaints</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Navbar */}
        <nav className="fixed top-0 right-0 left-0 z-30 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 lg:left-64">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <button 
                  onClick={toggleSidebar}
                  className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <MenuIcon />
                </button>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  {activeTab === 'overview' && 'System Overview'}
                  {activeTab === 'users' && 'User Management'}
                  {activeTab === 'loans' && 'Loan Portfolio'}
                  {activeTab === 'complaints' && 'Complaint Management'}
                </h1>
              </div>
              <div className="flex items-center">
                <button className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                  <NotificationsIcon />
                </button>
                <div className="flex items-center ml-3">
                  <div>
                    <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                      <img className="w-8 h-8 rounded-full" src="https://via.placeholder.com/150" alt="Admin" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content area */}
        <main className="h-full flex-1 mt-14 p-4">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'loans' && <LoansTab />}
          {activeTab === 'complaints' && <ComplaintsTab />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;