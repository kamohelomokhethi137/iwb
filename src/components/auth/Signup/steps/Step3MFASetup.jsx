import React, { useState, useEffect } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../services/firebase';

const Step3MFASetup = ({ 
  formData, 
  handleChange, 
  handleMFAVerify, 
  errors, 
  mfaVerified, 
  setStep, 
  isSubmitting, 
  handleSubmit 
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [recaptcha, setRecaptcha] = useState(null);

  useEffect(() => {
    // Initialize reCAPTCHA
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow sendSMS
        }
      }, auth);
      setRecaptcha(window.recaptchaVerifier);
    }
  }, []);

  const sendVerificationCode = async () => {
    try {
      const formattedPhone = `+${phoneNumber.replace(/\D/g, '')}`;
      const confirmation = await signInWithPhoneNumber(
        auth, 
        formattedPhone, 
        window.recaptchaVerifier
      );
      setVerificationId(confirmation.verificationId);
      alert('Verification code sent to your phone!');
    } catch (error) {
      console.error('Error sending verification code:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const verifyCode = async () => {
    try {
      if (!verificationId) {
        alert('Please send verification code first');
        return;
      }

      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      
      await auth.signInWithCredential(credential);
      handleMFAVerify(verificationCode);
    } catch (error) {
      console.error('Error verifying code:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Multi-Factor Authentication Setup
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Add an extra layer of security to your account
        </p>
      </div>

      <div className="space-y-4">
        {/* Phone Number Input */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-sm">
              +1
            </span>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="(555) 555-5555"
            />
          </div>
          <button
            onClick={sendVerificationCode}
            disabled={!phoneNumber}
            className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            Send Verification Code
          </button>
        </div>

        {/* Verification Code Input */}
        {verificationId && (
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Verification Code
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="verificationCode"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Enter 6-digit code"
              />
            </div>
            <button
              onClick={verifyCode}
              disabled={!verificationCode || verificationCode.length !== 6}
              className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300"
            >
              Verify Code
            </button>
          </div>
        )}

        {/* reCAPTCHA container (invisible) */}
        <div id="recaptcha-container"></div>

        {/* Navigation buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!mfaVerified || isSubmitting}
            className="ml-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : 'Complete Registration'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3MFASetup;