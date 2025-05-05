import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { validateEmail } from '../helpers';

const EmailField = ({ value, onChange, errors }) => {
  const [isTouched, setIsTouched] = useState(false);
  const errorMessage = isTouched ? validateEmail(value) : errors.email || '';

  return (
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Email Address
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="your@email.com"
        required
        value={value}
        onChange={onChange}
        onBlur={() => setIsTouched(true)}
        className={`w-full px-4 py-2 rounded-lg border ${
          errorMessage ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      />
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <FaTimes className="mr-1" /> {errorMessage}
        </p>
      )}
    </div>
  );
};

export default EmailField;