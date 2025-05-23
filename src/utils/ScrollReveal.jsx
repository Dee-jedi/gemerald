import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const ScrollReveal = ({
  children,
  className,
  animation = { y: 100, opacity: 0 },
  duration = 1,
  threshold = 0.1,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: threshold,
  });

  return (
    <motion.div
      ref={ref}
      initial={animation}
      animate={{
        y: inView ? 0 : animation.y,
        opacity: inView ? 1 : animation.opacity,
      }}
      transition={{
        y: {
          type: "spring",
          stiffness: 50,
          damping: 25,
          duration: duration,
        },
        opacity: { duration: duration, ease: "easeOut" },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
