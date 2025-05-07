import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { FaEnvelope, FaExclamationTriangle, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-particles-js';
import { baseUrl } from '../utils/service';

const VerificationAccount = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const emailToken = searchParams.get('emailToken');
  const email = searchParams.get('email');

  // Particle.js configuration
  const particlesConfig = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#3b82f6"
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#3b82f6",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  };

  const handleResendEmail = async () => {
    if (!email) return;

    try {
      await axios.post(`${baseUrl}/api/auth/resend-confirmation`, { email });

      enqueueSnackbar(
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center"
        >
          <FaEnvelope className="text-blue-500 mr-2" />
          Confirmation email resent successfully!
        </motion.span>,
        { variant: 'success', autoHideDuration: 3000 }
      );
    } catch (err) {
      enqueueSnackbar(
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center"
        >
          <FaExclamationTriangle className="text-red-500 mr-2" />
          {err.response?.data?.message || 'Failed to resend confirmation email'}
        </motion.span>,
        { variant: 'error', autoHideDuration: 3000 }
      );
    }
  };

  const handleEmailVerification = async () => {
    if (!emailToken) {
      const errorMessage = 'Email verification token not found!';
      setError(errorMessage);
      enqueueSnackbar(
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center"
        >
          <FaExclamationTriangle className="text-red-500 mr-2" />
          {errorMessage}
        </motion.span>,
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
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center"
          >
            <FaEnvelope className="text-blue-500 mr-2" />
            {message}
          </motion.span>,
          { variant: 'success', autoHideDuration: 3000 }
        );
        navigate('/login');
      } else if (status === 'success') {
        setVerified(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }

    } catch (err) {
      const status = err.response?.data?.status;
      const message = err.response?.data?.message || 'Email verification failed';

      if (status === 'expired') {
        enqueueSnackbar(
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center">
              <FaExclamationTriangle className="text-red-500 mr-2" />
              <span>{message}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResendEmail}
              className="ml-4 bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
              Resend
            </motion.button>
          </motion.div>,
          { variant: 'error', autoHideDuration: 5000 }
        );
      } else {
        enqueueSnackbar(
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center"
          >
            <FaExclamationTriangle className="text-red-500 mr-2" />
            {message}
          </motion.span>,
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
      <div className="flex justify-center items-center h-screen bg-gray-50 relative overflow-hidden">
        <Particles params={particlesConfig} className="absolute inset-0" />
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-500"></div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-blue-600 font-medium"
          >
            Verifying your email...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 relative overflow-hidden">
        <Particles params={particlesConfig} className="absolute inset-0" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6"
          >
            <FaCheck className="text-green-500 text-4xl" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-green-600 mb-2"
          >
            Email Verified!
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 mb-6"
          >
            Your email has been successfully verified. Redirecting to login...
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="h-1 bg-green-200 rounded-full overflow-hidden"
          >
            <div className="h-full bg-green-500 animate-pulse"></div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center bg-gray-50 relative overflow-hidden">
        <Particles params={particlesConfig} className="absolute inset-0" />
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6"
          >
            <FaExclamationTriangle className="text-red-500 text-4xl" />
          </motion.div>
          <h1 className="text-3xl font-bold text-red-500 mb-4">Verification Failed</h1>
          <p className="mt-4 text-lg max-w-md">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md"
          >
            Go to Login
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-gray-50 relative overflow-hidden">
      <Particles params={particlesConfig} className="absolute inset-0" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md w-full px-6"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 mb-6"
        >
          <FaEnvelope className="text-blue-500 text-3xl" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Verify Your Email</h1>
        <p className="text-gray-600 mb-8">Please click the button below to verify your email address.</p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEmailVerification}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg transition-colors duration-300 w-full max-w-xs mx-auto"
        >
          Verify Email
        </motion.button>

        {email && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-gray-500"
          >
            Didn't receive the email?{' '}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResendEmail}
              className="text-blue-500 font-medium"
            >
              Resend
            </motion.button>
          </motion.p>
        )}
      </motion.div>
    </div>
  );
  //demo
};

export default VerificationAccount;