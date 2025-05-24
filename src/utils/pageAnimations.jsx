// utils/pageAnimations.js
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const AnimatedPage = ({ children, className }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className={className}
      onAnimationComplete={() => {
        // Recheck scroll triggers (for Framer Motion + Intersection Observer)
        window.dispatchEvent(new Event("scroll"));
      }}
    >
      {children}
    </motion.div>
  );
};

export const scrollVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
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

export const ScrollAnimatedItem = ({
  children,
  className,
  amount = 0.2,
  initial = "offscreen",
  animate = "onscreen",
  variants = scrollVariants,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: amount,
    triggerOnce: true, // animate only the first time
  });

  useEffect(() => {
    if (inView) {
      controls.start(animate);
    }
  }, [controls, inView, animate]);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
