import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCheckCircle, FaArrowRight, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import SecurityBubbles from './animation/SecurityBubbles';
import { baseUrl } from '../utils/service';

const EmailConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useParams();
  const [email, setEmail] = useState(location.state?.email || '');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${baseUrl}/api/auth/confirm-email/${token}`);
          
          if (response.data.success) {
            setStatus('success');
            setEmail(response.data.email);
            
            toast.success(
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" size={20} />
                <span>Email verified successfully!</span>
              </div>,
              { position: "top-center", autoClose: 3000 }
            );
            
            if (response.data.approved && response.data.token) {
              localStorage.setItem('token', response.data.token);
              setTimeout(() => navigate('/dashboard'), 2000);
            }
          }
        } catch (err) {
          console.error('Verification failed:', err);
          setStatus('error');
          
          toast.error(
            <div className="flex items-center">
              <FaExclamationTriangle className="text-red-500 mr-2" size={20} />
              <span>{err.response?.data?.message || 'Email verification failed'}</span>
            </div>,
            { position: "top-center", autoClose: 3000 }
          );
        } finally {
          setLoading(false);
        }
      };
      
      verifyToken();
    }
  }, [token, navigate]);

  const handleResendEmail = async () => {
    if (!email) return;
    
    try {
      await axios.post(`${baseUrl}/api/auth/resend-confirmation`, { email });
      
      toast.success(
        <div className="flex items-center">
          <FaEnvelope className="text-blue-500 mr-2" size={20} />
          <span>Confirmation email resent successfully!</span>
        </div>,
        { position: "top-center", autoClose: 3000 }
      );
    } catch (err) {
      toast.error(
        <div className="flex items-center">
          <FaExclamationTriangle className="text-red-500 mr-2" size={20} />
          <span>{err.response?.data?.message || 'Failed to resend confirmation email'}</span>
        </div>,
        { position: "top-center", autoClose: 3000 }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 relative">
      <ToastContainer />
      <SecurityBubbles />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 z-10"
      >
        {loading ? (
          <div className="text-center py-8">
            <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
              <FaSpinner className="text-blue-500 text-4xl animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Verifying Email...</h1>
            <p className="text-gray-600 dark:text-gray-400">Please wait while we verify your email address</p>
          </div>
        ) : status === 'success' ? (
          <div className="text-center py-8">
            <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
              <FaCheckCircle className="text-green-500 dark:text-green-400 text-4xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Email Verified!</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your email {email} has been successfully verified.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center"
            >
              Continue to Login <FaArrowRight className="ml-2" />
            </button>
          </div>
        ) : status === 'error' ? (
          <div className="text-center py-8">
            <div className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <FaExclamationTriangle className="text-red-500 dark:text-red-400 text-4xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Verification Failed</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The verification link is invalid or has expired.
            </p>
            {email && (
              <button
                onClick={handleResendEmail}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center mb-4"
              >
                <FaEnvelope className="mr-2" /> Resend Verification Email
              </button>
            )}
            <button
              onClick={() => navigate('/login')}
              className="w-full px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
              <FaEnvelope className="text-blue-500 dark:text-blue-400 text-4xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Confirm Your Email</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We've sent a confirmation link to <span className="font-medium">{email || 'your email'}</span>.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                Didn't receive the email?
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Check your spam folder or click below to resend
              </p>
            </div>
            <button
              onClick={handleResendEmail}
              disabled={!email}
              className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center ${!email ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FaEnvelope className="mr-2" /> Resend Confirmation Email
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full mt-4 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Back to Login
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default EmailConfirmation;