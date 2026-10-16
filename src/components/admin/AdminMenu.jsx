import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ConfirmDialog from "../ui/ConfirmDialog";

// Edit/delete menu for a product. Renders nothing for non-admins.
const AdminMenu = ({ product, onDeleted, className = "", variant = "overlay" }) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!menuRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!isAdmin) return null;

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      const { deleteProduct } = await import("../../services/productAdmin");
      await deleteProduct(product);
      setConfirming(false);
      onDeleted?.(product);
    } catch (err) {
      console.error("Failed to delete product", err);
      setError("Couldn't delete this product. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const buttonStyles =
    variant === "overlay"
      ? "bg-black/55 backdrop-blur-md text-white hover:bg-black/75 border border-white/10"
      : "text-[var(--color-soft-amber)] hover:text-[var(--color-wood)] hover:bg-white/5";

  return (
    <div ref={menuRef} className={`relative ${className}`}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        aria-label="Product options"
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors cursor-pointer ${buttonStyles}`}
      >
        <MoreVertical className="h-[18px] w-[18px]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            className="absolute right-0 top-11 z-20 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1a]/95 backdrop-blur-md py-1 shadow-xl shadow-black/50"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            style={{ transformOrigin: "top right" }}
          >
            <button
              role="menuitem"
              onClick={() => navigate(`/admin/products/${product.id}/edit`)}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--color-text)] hover:bg-white/5 cursor-pointer"
            >
              <Pencil className="h-4 w-4 text-[var(--color-wood)]" />
              Edit
            </button>
            <button
              role="menuitem"
              onClick={() => {
                setOpen(false);
                setError(null);
                setConfirming(true);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={confirming}
        title={`Delete "${product.name}"?`}
        message="This permanently removes the product and its image. This can't be undone."
        confirmLabel="Delete"
        busy={deleting}
        error={error}
        onConfirm={handleDelete}
        onCancel={() => setConfirming(false)}
      />
    </div>
  );
};

export default AdminMenu;
