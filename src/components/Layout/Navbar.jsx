import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Common navigation links
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/aboutus", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/products", label: "Products" },
    { path: "/contact", label: "Contact" }
  ];

  // Role-specific dashboard paths
  const roleDashboardPaths = {
    SALES: "/sales-dashboard",
    FINANCE: "/finance-dashboard",
    INVESTOR: "/investor-portal",
    DEVELOPER: "/dev-console",
    IWC_PARTNER: "/partner-dashboard"
  };

  // Role-specific navigation links
  const roleBasedLinks = {
    SALES: [
      { path: "/sales-dashboard", label: "Sales Dashboard" },
      { path: "/client-queries", label: "Client Queries" }
    ],
    FINANCE: [
      { path: "/finance-dashboard", label: "Financial Reports" },
      { path: "/income-statements", label: "Income Statements" }
    ],
    INVESTOR: [
      { path: "/investor-portal", label: "Investor Portal" }
    ],
    DEVELOPER: [
      { path: "/dev-console", label: "Developer Console" }
    ],
    IWC_PARTNER: [
      { path: "/partner-dashboard", label: "Partner Dashboard" },
      { path: "/analytics", label: "Analytics" }
    ]
  };

  // Get dashboard path based on user role
  const getDashboardPath = () => {
    if (!user) return '/';
    return roleDashboardPaths[user.role] || '/';
  };

  // Handle dashboard navigation
  const handleDashboardClick = () => {
    const dashboardPath = getDashboardPath();
    setIsMenuOpen(false);
    navigate(dashboardPath);
  };

  // Get links for current user role
  const getUserLinks = () => {
    if (!user) return [];
    return roleBasedLinks[user.role] || [];
  };

  // Generate user initials for avatar
  const getUserInitials = () => {
    if (!user) return '';
    const nameParts = user.name ? user.name.split(' ') : user.email.split('@')[0].split('.');
    return nameParts
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  // Get avatar color based on user role
  const getAvatarColor = () => {
    if (!user) return 'bg-gray-400';
    const roleColors = {
      SALES: 'bg-blue-500',
      FINANCE: 'bg-green-500',
      INVESTOR: 'bg-purple-500',
      DEVELOPER: 'bg-yellow-500',
      IWC_PARTNER: 'bg-teal-500'
    };
    return roleColors[user.role] || 'bg-indigo-500';
  };

  return (
    <nav 
      className={`fixed w-full z-50 top-0 border-b transition-all duration-300
        ${isScrolled ? 'shadow-lg' : ''} 
        backdrop-blur-md bg-white/20 dark:bg-gray-900/20 border-white/10 dark:border-gray-700`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link 
          to="/" 
          className="flex items-center space-x-3 rtl:space-x-reverse group"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-8 h-8 text-teal-500"
          >
            <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clipRule="evenodd" />
          </svg>
          <span 
            className="self-center text-2xl font-bold text-gray-800 dark:text-white whitespace-nowrap"
            style={{ fontFamily: '"Orbitron", sans-serif' }}
          >
            IWB
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full ${getAvatarColor()} flex items-center justify-center text-white font-bold`}>
                    {getUserInitials()}
                  </div>
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name || user.email.split('@')[0]}
                  </p>
                </div>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name || user.email}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.role.replace('_', ' ')}
                    </p>
                  </div>
                  <button
                    onClick={handleDashboardClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Take me to Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors flex items-center"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 dark:text-gray-400 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 ml-2"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>

        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 dark:border-gray-700 rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:md:bg-transparent">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className="block py-2 px-3 text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent md:hover:text-cyan-700 md:p-0 md:dark:hover:text-cyan-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {user && getUserLinks().map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className="block py-2 px-3 text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent md:hover:text-cyan-700 md:p-0 md:dark:hover:text-cyan-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;