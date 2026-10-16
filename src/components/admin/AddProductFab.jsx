import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AddProductFab = () => {
  const { isAdmin } = useAuth();
  if (!isAdmin) return null;

  return (
    <motion.div
      className="fixed right-5 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] md:right-8 md:bottom-8 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <Link
        to="/admin/products/new"
        aria-label="Add product"
        title="Add product"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-lg shadow-black/50 ring-1 ring-white/10 hover:bg-[var(--color-soft-amber)] transition-colors"
      >
        <Plus className="h-7 w-7" />
      </Link>
    </motion.div>
  );
};

export default AddProductFab;
