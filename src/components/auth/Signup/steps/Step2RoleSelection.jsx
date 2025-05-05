import React from 'react';
import { motion } from 'framer-motion';
import RoleSelectionModal from './RoleSelectionModal';

const Step2RoleSelection = ({
  formData,
  handleRoleSelect,
  errors,
  setStep,
  showRoleModal,
  setShowRoleModal
}) => {
  return (
    <>
      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onRoleSelect={(role) => {
          handleRoleSelect(role);
          setShowRoleModal(false);
        }}
        selectedRole={formData.role}
      />
      
      <div className="flex space-x-3">
        <motion.button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Back
        </motion.button>
        <motion.button
          type="button"
          onClick={() => setStep(3)}
          disabled={!formData.role}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all ${
            !formData.role ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          Continue
        </motion.button>
      </div>
    </>
  );
};

export default Step2RoleSelection;