import React from 'react';
import { FaTimes } from 'react-icons/fa';

const NameField = ({ value, onChange, errors }) => {
  return (
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Full Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Kamohelo mokhethi"
        required
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 rounded-lg border ${
          errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      />
      {errors.name && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <FaTimes className="mr-1" /> {errors.name}
        </p>
      )}
    </div>
  );
};

export default NameField;