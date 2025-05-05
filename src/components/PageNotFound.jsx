import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

const PageNotFound = () => {
  const controls = useAnimation();
  const particles = Array(15).fill(0);

  // Floating particles animation
  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        opacity: [0, 0.6, 0],
        transition: { duration: 4, repeat: Infinity, repeatType: "reverse" }
      });
    }, 300);
    return () => clearInterval(interval);
  }, [controls]);

  return (
    <motion.div
      className="not-found-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "2rem"
      }}
    >
      {/* Floating Particles Background */}
      <AnimatePresence>
        {particles.map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              x: [null, Math.random() * 400 - 200],
              y: [null, Math.random() * 400 - 200],
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }
            }}
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              backgroundColor: "rgba(0, 123, 255, 0.4)",
              borderRadius: "50%",
              zIndex: 0
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main 404 Text */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 10
        }}
      >
        <motion.h1
          style={{
            fontSize: "clamp(5rem, 15vw, 8rem)",
            fontWeight: 900,
            color: "#212529",
            margin: 0,
            textShadow: "4px 4px 0 rgba(0,0,0,0.1)",
            lineHeight: 1
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, -5, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          404
        </motion.h1>
      </motion.div>

      {/* Message Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{ textAlign: "center", margin: "2rem 0" }}
      >
        <motion.h2 
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            color: "#495057",
            marginBottom: "1rem"
          }}
          whileHover={{ scale: 1.02 }}
        >
          Oops! Page Not Found
        </motion.h2>
        <motion.p
          style={{
            fontSize: "1.1rem",
            color: "#6c757d",
            maxWidth: "500px",
            lineHeight: 1.6
          }}
          animate={{
            x: [0, -5, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          The page you're looking for might have been removed or doesn't exist.
        </motion.p>
      </motion.div>

      {/* Home Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.6 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 8px 20px rgba(0, 123, 255, 0.3)"
        }}
        whileTap={{ 
          scale: 0.95,
          boxShadow: "0 2px 5px rgba(0, 123, 255, 0.3)"
        }}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "0.75rem 2rem",
          borderRadius: "50px",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "1.1rem",
          boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
          zIndex: 1
        }}
        onClick={() => window.location.href = "/"}
      >
        Return Home
      </motion.div>
    </motion.div>
  );
};

export default PageNotFound;