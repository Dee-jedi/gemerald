// src/components/layout/MobileDrawer.jsx
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/CustomButton"; // Custom button component

const drawerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const MobileDrawer = ({ isOpen, setIsOpen, links }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="drawer"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={drawerVariants}
          transition={{ duration: 0.3 }}
          className="absolute right-0 mt-6 w-64 rounded-xl bg-[var(--color-card)] shadow-2xl md:hidden z-[9999] p-4 border border-white/10 backdrop-blur-lg"
        >
          {/* Navigation Links */}
          <div className="space-y-2 mb-4">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `group block px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-white/5 text-[var(--color-wood)] font-medium"
                      : "text-[var(--color-text)] hover:bg-white/5"
                  }`
                }
              >
                <span className="flex items-center">
                  <span className="w-1 h-1 rounded-full bg-[var(--color-soft-amber)] mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {link.name}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-4"></div>

          {/* Shop Now Button */}
          <Link
            to="/products"
            onClick={() => setIsOpen(false)}
            className="block"
          >
            <Button
              variant="glass"
              size="md"
              className="w-full group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg
                  className="w-4 h-4 mr-2 opacity-70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Shop Now
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-soft-amber)/10] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </Button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
