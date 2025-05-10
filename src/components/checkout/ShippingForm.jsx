import React from 'react';
import { FaUser, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ShippingForm = ({ formData, handleInputChange, orderError, handleShippingSubmit }) => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">First Name</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaUser className="text-gray-400" />
          </div>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="pl-10 w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="pl-10 w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaMapMarkerAlt className="text-gray-400" />
          </div>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="pl-10 w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Country</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="South Africa">South Africa</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Australia">Australia</option>
          <option value="Germany">Germany</option>
        </select>
      </div>
    </div>
    {orderError && (
      <div className="mt-4 text-red-500 text-sm">{orderError}</div>
    )}
    <div className="mt-6 flex justify-end">
      <button
        onClick={handleShippingSubmit}
        className="bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-teal-700 transition-colors"
      >
        Continue to Payment
      </button>
    </div>
  </div>
);

export default ShippingForm;