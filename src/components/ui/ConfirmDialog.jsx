import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  busy = false,
  error = null,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && !busy && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, busy, onCancel]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !busy && onCancel()}
          />
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className="relative w-full max-w-sm rounded-2xl bg-[var(--color-card)] border border-white/10 p-6 shadow-2xl shadow-black"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18 }}
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
            <h2
              id="confirm-title"
              className="text-center font-serif text-xl text-[var(--color-text)]"
            >
              {title}
            </h2>
            <p className="mt-2 text-center text-sm text-white/60">{message}</p>
            {error && (
              <p className="mt-3 text-center text-sm text-red-400">{error}</p>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={onCancel}
                disabled={busy}
                className="rounded-xl border border-white/10 py-2.5 text-sm font-medium text-[var(--color-text)] hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={busy}
                className="flex items-center justify-center rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-500 transition-colors cursor-pointer disabled:opacity-60"
              >
                {busy ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmDialog;
