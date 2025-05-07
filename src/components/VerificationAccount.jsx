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
  const [text, setText] = useState('');
  const [fullText, setFullText] = useState('Verify Your Email');
  const { enqueueSnackbar } = useSnackbar();

  const emailToken = searchParams.get('emailToken');
  const email = searchParams.get('email');

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
    return () => clearInterval(typing);
  }, [fullText]);

  // Particle.js configuration (same as before)
  const particlesConfig = { /* ... */ };

  // Verification Badge SVG Component
  const VerificationBadge = () => (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="mx-auto mb-8"
    >
      {/* Animated circle border */}
      <motion.circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="8"
        strokeDasharray="565.48"
        strokeDashoffset="565.48"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />
      
      {/* Shield background */}
      <motion.path
        d="M100 20L20 50V90C20 135 50 170 100 180C150 170 180 135 180 90V50L100 20Z"
        fill="#EFF6FF"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      {/* Checkmark */}
      <motion.path
        d="M70 100L90 120L130 80"
        fill="none"
        stroke="#10B981"
        strokeWidth="12"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      />
      
      {/* Pulsing effect */}
      <motion.circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        initial={{ scale: 1, opacity: 0.7 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeOut"
        }}
      />
    </motion.svg>
  );

  const handleResendEmail = async () => { /* ... */ };
  const handleEmailVerification = async () => { /* ... */ };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 relative overflow-hidden">
        <Particles params={particlesConfig} className="absolute inset-0" />
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="mx-auto h-32 w-32 border-4 border-blue-500 border-t-transparent rounded-full mb-6"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-blue-600 font-medium text-xl"
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
          <VerificationBadge />
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold text-green-600 mb-4"
          >
            Email Verified!
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 mb-8 text-lg"
          >
            Your account is now ready to use. Redirecting...
          </motion.p>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="h-2 bg-green-200 rounded-full overflow-hidden mx-auto max-w-md"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 1 }}
              className="h-full bg-green-500"
            />
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
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex items-center justify-center h-32 w-32 rounded-full bg-red-100 mb-8"
          >
            <FaExclamationTriangle className="text-red-500 text-5xl" />
          </motion.div>
          <h1 className="text-3xl font-bold text-red-500 mb-4">Verification Failed</h1>
          <p className="mt-4 text-lg max-w-md">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="mt-6 bg-blue-500 text-white py-3 px-8 rounded-lg shadow-lg text-lg font-medium"
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
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mx-auto mb-10"
        >
          <VerificationBadge />
        </motion.div>
        
        <motion.h1 
          className="text-4xl font-bold text-gray-800 mb-6 min-h-[60px]"
        >
          {text}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-1"
          >
            |
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-600 mb-8 text-lg"
        >
          Click below to verify {email}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 5px 20px rgba(59, 130, 246, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEmailVerification}
            className="relative bg-blue-500 hover:bg-blue-600 text-white py-4 px-10 rounded-xl shadow-xl text-lg font-medium overflow-hidden w-full max-w-xs mx-auto"
          >
            <span className="relative z-10">Verify Email</span>
            <motion.span
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-blue-600 opacity-30"
              style={{ 
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
              }}
            />
          </motion.button>
        </motion.div>

        {email && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 text-gray-500"
          >
            Didn't receive the email?{' '}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResendEmail}
              className="text-blue-500 font-medium underline"
            >
              Resend
            </motion.button>
          </motion.p>
        )}
      </motion.div>
      
    </div>
  );
};

export default VerificationAccount;
