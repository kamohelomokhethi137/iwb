import React from 'react';
import { motion } from 'framer-motion';
import NameField from '../fields/NameField';
import EmailField from '../fields/EmailField';
import PasswordField from '../fields/PasswordField';
import { containerVariants, itemVariants } from '../helpers';

const Step1BasicInfo = ({
  formData,
  handleChange,
  errors,
  showPassword,
  togglePasswordVisibility,
  handleStep1Continue,
  handleStrongPassword
}) => {
  return (
    <form>
      <motion.div variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <NameField 
            value={formData.name}
            onChange={handleChange}
            errors={errors}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <EmailField 
            value={formData.email}
            onChange={handleChange}
            errors={errors}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <PasswordField 
            showPassword={showPassword}
            toggleVisibility={togglePasswordVisibility}
            withConfirmation={true}
            mfaProtected={true}
            passwordValue={formData.password}
            passwordOnChange={handleChange}
            confirmPasswordValue={formData.confirmPassword}
            confirmPasswordOnChange={handleChange}
            errors={errors}
            onStrongPassword={handleStrongPassword}
          />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6">
        <motion.button
          type="button"
          onClick={handleStep1Continue}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
        >
          Continue
        </motion.button>
      </motion.div>
    </form>
  );
};

export default Step1BasicInfo;