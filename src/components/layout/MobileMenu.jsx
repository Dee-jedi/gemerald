import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "../../lib/site";

const NAV_LINKS = [
  { name: "Home", to: "/" },
  { name: "Shop", to: "/products" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

const ease = [0.22, 1, 0.36, 1];

// The menu reveals as a circle growing from the menu button (2.25rem from the
// top-right corner, matching the header's px-4 + 40px button).
// A circle's % radius is relative to the viewport diagonal / √2, so 142% (just
// over √2) is the smallest circle that always covers the screen from the
// button. Anything bigger means the first part of closing changes nothing
// visible, which reads as a pause.
const CLIP_CLOSED = "circle(0% at calc(100% - 2.25rem) 2.25rem)";
const CLIP_OPEN = "circle(142% at calc(100% - 2.25rem) 2.25rem)";

// Items fade up on open only. They deliberately have no exit animation: the
// shrinking circle hides them, and fading them first made closing look like
// two separate steps.
const item = (i) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.08 + i * 0.06 } },
});

// Full-screen mobile menu. It sits below the header (z-40 vs z-50) so the
// logo, cart and the menu button (which morphs into a close icon) stay put.
// `onClosed` fires once the closing animation has fully finished.
const MobileMenu = ({ open, onClose, onClosed }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    // Move focus into the menu for keyboard and screen-reader users.
    const focusTimer = setTimeout(
      () => panelRef.current?.querySelector("a")?.focus({ preventScroll: true }),
      50
    );
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence onExitComplete={onClosed}>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          // Solid background: a backdrop blur flickers while clip-path animates.
          className="fixed inset-0 z-40 overflow-y-auto bg-[#0c0a09] will-change-[clip-path] md:hidden"
          initial={{ clipPath: CLIP_CLOSED }}
          animate={{
            clipPath: CLIP_OPEN,
            transition: { duration: 0.6, ease },
          }}
          exit={{
            // Explicit [from, to] keyframes: without them the exit starts from
            // the browser's computed clip-path, which comes back in px and
            // can't be interpolated with the rem template, so the menu vanished
            // in a single frame (the "blink").
            clipPath: [CLIP_OPEN, CLIP_CLOSED],
            // Ease in-out so the circle visibly closes back into the button.
            transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
          }}
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[var(--color-soft-amber)]/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-24 h-72 w-72 rounded-full bg-[var(--color-wood)]/10 blur-3xl" />

          <div className="relative flex min-h-full flex-col px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-28">
            {/* Page links */}
            <nav aria-label="Main">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li key={link.to} {...item(i)}>
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      onClick={onClose}
                      className="group flex items-baseline gap-4 border-b border-white/[0.06] py-4 focus:outline-none"
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className={`w-6 text-xs tabular-nums transition-colors ${
                              isActive ? "text-[var(--color-wood)]" : "text-white/30"
                            }`}
                          >
                            0{i + 1}
                          </span>
                          <span
                            className={`flex-1 font-serif text-[2.6rem] leading-none transition-colors group-focus-visible:text-[var(--color-wood)] ${
                              isActive
                                ? "text-[var(--color-wood)]"
                                : "text-[var(--color-text)] group-active:text-[var(--color-wood)]"
                            }`}
                          >
                            {link.name}
                          </span>
                          {isActive ? (
                            <span className="mb-2 h-1.5 w-1.5 self-center rounded-full bg-[var(--color-wood)]" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5 self-center text-white/25" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <motion.div {...item(NAV_LINKS.length)} className="mt-auto pt-10">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[var(--color-wood)] py-3.5 text-sm font-semibold text-[#1a1411] transition-colors active:bg-[#e8c9a0]"
              >
                <FaWhatsapp className="h-5 w-5" />
                Chat with us on WhatsApp
              </a>

              <p className="mt-5 text-center text-xs text-white/30">
                © {new Date().getFullYear()} Gemerald
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MobileMenu;
