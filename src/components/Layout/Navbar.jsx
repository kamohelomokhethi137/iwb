import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from './authContext'; // Import your auth context

const bubbleVariants = {
  initial: { opacity: 0, y: 0 },
  animate: (i) => ({
    opacity: [0, 0.4, 0],
    y: [-10, -40, -80],
    transition: {
      duration: 6,
      delay: i * 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }),
};

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, logout } = useAuth(); // Get user and logout from auth context

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

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
    { path: "/contact", label: "Contact" }
  ];

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

  // Get links for current user role
  const getUserLinks = () => {
    if (!user) return [];
    return roleBasedLinks[user.role] || [];
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      {/* Animated bubbles behind the nav */}
      <div className="fixed top-0 left-0 w-full h-32 overflow-hidden z-40 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={bubbleVariants}
            initial="initial"
            animate="animate"
            className="absolute bottom-0 w-3 h-3 rounded-full bg-cyan-400 opacity-800"
            style={{
              left: `${20 + i * 20}%`,
              filter: 'blur(4px)'
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`fixed w-full z-50 top-0 border-b 
          ${isScrolled ? 'shadow-lg' : ''} 
          backdrop-blur-md bg-white/20 dark:bg-gray-900/20 border-white/10 dark:border-gray-700`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span
              className="self-center text-2xl font-bold text-gray-800 dark:text-white whitespace-nowrap"
              style={{ fontFamily: '"Orbitron", sans-serif' }}
            >
              IWB
            </span>
          </Link>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {user ? (
              <div className="relative ml-2">
                <button
                  onClick={toggleMenu}
                  className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    {user.name || user.email}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {user.role.replace('_', ' ')}
                  </span>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                    <button
                      onClick={logout}
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
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
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
              {/* Common navigation links */}
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

              {/* Role-specific navigation links */}
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
      </motion.nav>
    </div>
  );
}

export default Navbar;