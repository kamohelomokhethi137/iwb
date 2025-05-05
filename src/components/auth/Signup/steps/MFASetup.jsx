import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import { getAuth, RecaptchaVerifier, multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator } from 'firebase/auth';
import { auth } from '../../services/firebase';

const MFASetup = ({ onVerify, error, currentUser }) => {
  const [code, setCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [localError, setLocalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [recaptcha, setRecaptcha] = useState(null);

  // Initialize reCAPTCHA
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'mfa-recaptcha-container',
        { size: 'invisible' },
        auth
      );
      setRecaptcha(window.recaptchaVerifier);
    }
  }, []);

  const startMFAEnrollment = async () => {
    setIsLoading(true);
    setLocalError('');

    try {
      // Get the current user's multi-factor session
      const mfaSession = await multiFactor(currentUser).getSession();
      
      // Send verification code to user's phone
      const phoneInfoOptions = {
        phoneNumber,
        session: mfaSession
      };

      const phoneAuthProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneAuthProvider.verifyPhoneNumber(
        phoneInfoOptions,
        window.recaptchaVerifier
      );

      setVerificationId(verificationId);
      alert('Verification code sent to your phone!');
    } catch (err) {
      console.error('MFA enrollment error:', err);
      setLocalError(err.message || 'Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyMFA = async () => {
    setIsLoading(true);
    setLocalError('');

    try {
      // Create phone auth credential
      const cred = PhoneAuthProvider.credential(verificationId, code);
      const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

      // Enroll the user with MFA
      await multiFactor(currentUser).enroll(multiFactorAssertion, 'Phone Number');
      
      setIsVerified(true);
      onVerify({
        method: 'phone',
        phoneNumber,
        verifiedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('MFA verification error:', err);
      setLocalError(err.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!verificationId) {
      if (!phoneNumber) {
        setLocalError('Please enter your phone number');
        return;
      }
      startMFAEnrollment();
    } else {
      if (!code || code.length !== 6) {
        setLocalError('Please enter a valid 6-digit code');
        return;
      }
      verifyMFA();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6"
    >
      <div className="flex items-center mb-2">
        <FaShieldAlt className="text-blue-600 dark:text-blue-400 mr-2" />
        <h3 className="font-medium text-blue-800 dark:text-blue-200">
          Multi-Factor Authentication Setup
        </h3>
      </div>
      
      {!isVerified ? (
        <>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
            Add an extra layer of security to your account with phone verification.
          </p>
          
          <form onSubmit={handleSubmit}>
            {!verificationId ? (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <div className="flex">
                  <select className="px-3 py-2 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l bg-gray-50 dark:bg-gray-700">
                    <option>+1</option>
                    <option>+44</option>
                    <option>+91</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="(555) 555-5555"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r bg-white dark:bg-gray-800"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setCode(value);
                    setLocalError('');
                  }}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-center text-lg tracking-widest"
                />
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 rounded transition-colors flex items-center justify-center ${
                isLoading
                  ? 'bg-blue-400 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  {verificationId ? 'Verifying...' : 'Sending Code...'}
                </>
              ) : verificationId ? (
                'Verify Code'
              ) : (
                'Send Verification Code'
              )}
            </button>
          </form>
          
          {/* reCAPTCHA container (invisible) */}
          <div id="mfa-recaptcha-container"></div>
          
          {(localError || error) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center"
            >
              <FaTimes className="mr-1" /> {localError || error}
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center text-green-600 dark:text-green-400"
        >
          <FaCheck className="mr-2" />
          <span>MFA successfully enabled!</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MFASetup;