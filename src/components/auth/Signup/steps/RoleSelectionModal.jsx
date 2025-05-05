import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUserTie, FaChartLine, FaCode, FaFileAlt, FaUserLock, FaLock, FaCheck } from 'react-icons/fa';

// Animation variants
const modalVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    transition: {
      duration: 0.2
    }
  }
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const RoleSelectionModal = ({ isOpen, onClose, onRoleSelect, selectedRole }) => {
  const roles = [
    {
      id: 'SALES',
      name: 'Sales Personnel',
      icon: <FaUserTie className="text-blue-500 text-xl" />,
      description: 'Access sales dashboard and client queries',
      permissions: [
        'Read/write access to sales records',
        'Access client queries',
        'Max 3 users'
      ],
      limit: 3
    },
    {
      id: 'FINANCE',
      name: 'Finance Team',
      icon: <FaChartLine className="text-green-500 text-xl" />,
      description: 'View financial reports and income statements',
      permissions: [
        'Read/write access to financial data',
        'Generate income statements',
        'Max 3 users'
      ],
      limit: 3
    },
    {
      id: 'DEVELOPER',
      name: 'Developer',
      icon: <FaCode className="text-yellow-500 text-xl" />,
      description: 'Full access to application files',
      permissions: [
        'Full read/write access',
        'Application file access',
        'Max 3 users'
      ],
      limit: 3
    },
    {
      id: 'INVESTOR',
      name: 'Investor',
      icon: <FaFileAlt className="text-purple-500 text-xl" />,
      description: 'Read-only access to income statements',
      permissions: [
        'Read-only income statements',
        'No write permissions',
        'Unlimited users'
      ],
      limit: null
    },
    {
      id: 'IWC_PARTNER',
      name: 'IWC Partner',
      icon: <FaUserLock className="text-cyan-500 text-xl" />,
      description: 'Full solution access (except client queries)',
      permissions: [
        'Full system access',
        'Cloud environment integration',
        'No client query access'
      ],
      limit: null
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50"
            variants={backdropVariants}
            onClick={onClose}
          />
          
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Select Your Role
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                  <FaLock className="mr-2" />
                  <span>Your account will be permanently associated with this role</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose carefully based on your responsibilities. Role changes require admin approval.
                </p>
              </div>

              <div className="space-y-3">
                {roles.map((role) => (
                  <motion.div
                    key={role.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedRole === role.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => onRoleSelect(role.id)}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">{role.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-800 dark:text-white">
                            {role.name}
                          </h3>
                          {role.limit && (
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                              Max {role.limit}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {role.description}
                        </p>
                        <div className="mt-2 space-y-1">
                          {role.permissions.map((permission, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <FaCheck className="mr-1 text-green-500 text-xs" />
                              {permission}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={onClose}
                  disabled={!selectedRole}
                  className={`w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium ${
                    !selectedRole ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'
                  }`}
                >
                  Confirm Role Selection
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoleSelectionModal;