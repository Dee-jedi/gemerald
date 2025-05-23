import { motion } from "framer-motion";

// Scroll-triggered variants
export const scrollVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
    transition: { duration: 0.3 },
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 60,
      duration: 0.5,
    },
  },
};

// Enhanced AnimatedItem component with scroll detection
export const ScrollAnimatedItem = ({ children, className, amount = 0.2 }) => (
  <motion.div
    initial="offscreen"
    whileInView="onscreen"
    viewport={{ once: true, amount }}
    variants={scrollVariants}
    className={className}
  >
    {children}
  </motion.div>
);

// Your existing pageVariants and AnimatedPage can remain the same
export const pageVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

export const AnimatedPage = ({ children, className }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={pageVariants}
    className={className}
  >
    {children}
  </motion.div>
);
