import React from 'react';
import { motion } from 'framer-motion';

const SecurityBubbles = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${
            i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-cyan-400'
          } opacity-30 dark:opacity-20`}
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            left: `${Math.random() * 100}%`,
            bottom: '-20px',
            filter: 'blur(1px)'
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: -window.innerHeight - 100,
            opacity: [0, Math.random() * 0.2 + 0.1, 0]
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

export default SecurityBubbles;
