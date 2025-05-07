import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { FaEnvelope, FaExclamationTriangle } from 'react-icons/fa';
import { baseUrl } from '../utils/service';
import { motion } from 'framer-motion';

const VerificationAccount = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  // Generate random bubbles for the background
  const bubbles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    opacity: Math.random() * 0.5 + 0.2
  }));

  const emailToken = searchParams.get('emailToken');
  const email = searchParams.get('email');

  const handleResendEmail = async () => {
    if (!email) return;

    try {
      await axios.post(`${baseUrl}/api/auth/resend-confirmation`, { email });

      enqueueSnackbar(
        <span className="flex items-center">
          <FaEnvelope className="text-blue-500 mr-2" />
          Confirmation email resent successfully!
        </span>,
        { variant: 'success', autoHideDuration: 3000 }
      );
    } catch (err) {
      enqueueSnackbar(
        <span className="flex items-center">
          <FaExclamationTriangle className="text-red-500 mr-2" />
          {err.response?.data?.message || 'Failed to resend confirmation email'}
        </span>,
        { variant: 'error', autoHideDuration: 3000 }
      );
    }
  };

  const handleEmailVerification = async () => {
    if (!emailToken) {
      const errorMessage = 'Email verification token not found!';
      setError(errorMessage);
      enqueueSnackbar(
        <span className="flex items-center">
          <FaExclamationTriangle className="text-red-500 mr-2" />
          {errorMessage}
        </span>,
        { variant: 'error' }
      );
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const result = await axios.patch(`${baseUrl}/api/auth/confirm-email`, {
        emailToken,
        email
      });

      const { status, message } = result.data;

      if (status === 'already_verified') {
        enqueueSnackbar(
          <span className="flex items-center">
            <FaEnvelope className="text-blue-500 mr-2" />
            {message}
          </span>,
          { variant: 'success', autoHideDuration: 3000 }
        );
        navigate('/login');
      } else if (status === 'success') {
        enqueueSnackbar(
          <span className="flex items-center">
            <FaEnvelope className="text-blue-500 mr-2" />
            {message}
          </span>,
          { variant: 'success', autoHideDuration: 3000 }
        );
        navigate('/login');
      }

    } catch (err) {
      const status = err.response?.data?.status;
      const message = err.response?.data?.message || 'Email verification failed';

      if (status === 'expired') {
        enqueueSnackbar(
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-red-500 mr-2" />
              <span>{message}</span>
            </div>
            <button
              onClick={handleResendEmail}
              className="ml-4 bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
              Resend
            </button>
          </div>,
          { variant: 'error', autoHideDuration: 5000 }
        );
      } else {
        enqueueSnackbar(
          <span className="flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-2" />
            {message}
          </span>,
          { variant: 'error', autoHideDuration: 3000 }
        );
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-900 to-gray-900 relative overflow-hidden">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-blue-400 opacity-20"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              bottom: -bubble.size,
            }}
            initial={{ y: 0 }}
            animate={{ y: -1000 }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-500 z-10"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center bg-gradient-to-b from-blue-900 to-gray-900 relative overflow-hidden">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-blue-400 opacity-20"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              bottom: -bubble.size,
            }}
            initial={{ y: 0 }}
            animate={{ y: -1000 }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        <div className="z-10">
          <h1 className="text-2xl font-bold text-red-500">Verification Failed</h1>
          <p className="mt-4 text-lg text-white">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-gradient-to-b from-blue-900 to-gray-900 relative overflow-hidden">
      {/* Animated bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-blue-400 opacity-20"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            bottom: -bubble.size,
          }}
          initial={{ y: 0 }}
          animate={{ y: -1000 }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      <div className="z-10">
        <h1 className="text-2xl font-bold text-white">Verify Your Email</h1>
        <p className="mt-4 text-gray-300">Please click the button below to verify your email address.</p>
        <button
          onClick={handleEmailVerification}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default VerificationAccount;