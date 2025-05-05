import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaShieldAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { checkPasswordStrength, validatePassword } from '../helpers';

const PasswordField = ({ 
  showPassword, 
  toggleVisibility, 
  withConfirmation, 
  mfaProtected,
  passwordValue,
  passwordOnChange,
  confirmPasswordValue,
  confirmPasswordOnChange,
  errors,
  onStrongPassword
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const passwordStrength = checkPasswordStrength(passwordValue);

  useEffect(() => {
    if (passwordStrength.isValid) {
      onStrongPassword();
    }
  }, [passwordStrength.isValid, onStrongPassword]);

  const passwordErrorMessage = isTouched ? validatePassword(passwordValue) : errors.password || '';

  return (
    <>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          {mfaProtected && (
            <span className="flex items-center text-xs text-blue-600 dark:text-blue-400">
              <FaShieldAlt className="mr-1" /> MFA Protected
            </span>
          )}
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="••••••••"
            required
            value={passwordValue}
            onChange={passwordOnChange}
            onBlur={() => setIsTouched(true)}
            className={`w-full px-4 py-2 rounded-lg border ${
              passwordErrorMessage ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10`}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {passwordValue && (
          <div className="mt-2 text-xs">
            <div className="grid grid-cols-2 gap-1">
              <div className="flex items-center">
                {passwordStrength.hasMinLength ? (
                  <FaCheck className="text-green-500 mr-1" />
                ) : (
                  <FaTimes className="text-red-500 mr-1" />
                )}
                <span className={passwordStrength.hasMinLength ? 'text-green-500' : 'text-gray-500'}>
                  Min 8 characters
                </span>
              </div>
              {/* Other password requirements... */}
            </div>
          </div>
        )}
        {passwordErrorMessage && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FaTimes className="mr-1" /> {passwordErrorMessage}
          </p>
        )}
      </div>

      {withConfirmation && (
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              required
              value={confirmPasswordValue}
              onChange={confirmPasswordOnChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10`}
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FaTimes className="mr-1" /> {errors.confirmPassword}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default PasswordField;