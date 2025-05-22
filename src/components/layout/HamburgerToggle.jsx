// src/components/layout/HamburgerToggle.jsx
import { motion } from "framer-motion";

const HamburgerToggle = ({ isOpen }) => {
  return (
    <div className="relative w-6 h-[19px]">
      {/* Top Line */}
      <motion.span
        className={`absolute block h-0.5 bg-[var(--color-text)] origin-center top-0 ${
          isOpen ? "w-full" : "w-4"
        }`}
        animate={isOpen ? { rotate: 45, y: 8.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Middle Line */}
      <motion.span
        className={`absolute block h-0.5 bg-[var(--color-text)] origin-center top-1/2 -translate-y-1/2 ${
          isOpen ? "w-full" : "w-5"
        }`}
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {/* Bottom Line */}
      <motion.span
        className="absolute block h-0.5 w-full bg-[var(--color-text)] origin-center bottom-0"
        animate={isOpen ? { rotate: -45, y: -8.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default HamburgerToggle;
