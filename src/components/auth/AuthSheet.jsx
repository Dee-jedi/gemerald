import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { LogOut, ShieldCheck, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const friendlyError = (err) => {
  switch (err?.code) {
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return null;
    case "auth/unauthorized-domain":
      return "This domain isn't authorised for sign-in yet.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      return "Sign-in failed. Please try again.";
  }
};

const AuthSheet = ({ open, onClose }) => {
  const { user, role, isAdmin, signInWithGoogle, signOut } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;
    setError(null);
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSignIn = async () => {
    setBusy(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    setBusy(true);
    try {
      await signOut();
      onClose();
    } finally {
      setBusy(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={user ? "Account" : "Sign in"}
            className="absolute bottom-0 left-0 right-0 mx-auto max-w-md rounded-t-3xl bg-[var(--color-card)] border-t border-x border-[color-mix(in_srgb,var(--color-wood),transparent_80%)] px-6 pt-3 pb-[calc(2rem+env(safe-area-inset-bottom))] shadow-2xl shadow-black"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) onClose();
            }}
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/20" />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {user ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover border border-[var(--color-border)]"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-xl font-serif">
                      {(user.displayName || user.email || "?")[0].toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-serif text-lg text-[var(--color-text)] truncate">
                      {user.displayName || "Signed in"}
                    </p>
                    <p className="text-sm text-white/50 truncate">
                      {user.email}
                    </p>
                    <span
                      className={`mt-1.5 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                        isAdmin
                          ? "bg-[rgba(222,184,135,0.15)] text-[var(--color-wood)]"
                          : "bg-white/5 text-white/50"
                      }`}
                    >
                      {isAdmin && <ShieldCheck className="w-3 h-3" />}
                      {role ?? "user"}
                    </span>
                  </div>
                </div>

                {!isAdmin && (
                  <p className="text-sm text-white/50">
                    You're signed in, but this account doesn't have admin
                    access.
                  </p>
                )}

                <button
                  onClick={handleSignOut}
                  disabled={busy}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                <div>
                  <h2 className="font-serif text-2xl text-[var(--color-text)]">
                    Welcome back
                  </h2>
                  <p className="mt-1 text-sm text-white/50">
                    Sign in to manage the Gemerald collection.
                  </p>
                </div>

                <button
                  onClick={handleSignIn}
                  disabled={busy}
                  className="w-full flex items-center justify-center gap-3 rounded-xl bg-white py-3.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer disabled:opacity-60"
                >
                  {busy ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-400 border-t-transparent" />
                  ) : (
                    <FcGoogle className="w-5 h-5" />
                  )}
                  Continue with Google
                </button>

                {error && <p className="text-sm text-red-400">{error}</p>}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default AuthSheet;
