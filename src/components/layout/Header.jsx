import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import HamburgerToggle from "./HamburgerToggle";
import MobileMenu from "./MobileMenu";
import Button from "../ui/CustomButton";
import logo from "../../assets/images/logo.jpg";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useCart } from "../../context/CartContext";

const AuthSheet = lazy(() => import("../auth/AuthSheet"));

const HOLD_MS = 3000;

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const { cartItemCount } = useCart();
  const [isHolding, setIsHolding] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  // The sheet's code is only downloaded the first time it's opened.
  const [sheetLoaded, setSheetLoaded] = useState(false);
  const holdTimer = useRef(null);

  const cancelHold = () => {
    clearTimeout(holdTimer.current);
    setIsHolding(false);
  };

  const holdHandlers = {
    onPointerDown: (e) => {
      if (e.button !== 0) return;
      setIsHolding(true);
      holdTimer.current = setTimeout(() => {
        setIsHolding(false);
        navigator.vibrate?.(30);
        setSheetLoaded(true);
        setSheetOpen(true);
      }, HOLD_MS);
    },
    onPointerUp: cancelHold,
    onPointerLeave: cancelHold,
    onPointerCancel: cancelHold,
  };

  useEffect(() => () => clearTimeout(holdTimer.current), []);

  // Stop the browser's own long-press behaviour (context menu, text selection,
  // Chrome's Lens/search bar). React's touch listeners are passive and can't do
  // this, so attach a native one. Pointer events still fire for the hold timer.
  const logoRef = useRef(null);
  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    const prevent = (e) => e.preventDefault();
    el.addEventListener("touchstart", prevent, { passive: false });
    return () => el.removeEventListener("touchstart", prevent);
  }, []);

  const closeSheet = useCallback(() => setSheetOpen(false), []);

  const [menuOpen, setMenuOpen] = useState(false);
  // True from opening until the closing animation finishes, so the header
  // keeps its over-the-menu styling for the whole animation (no flash).
  const [menuShown, setMenuShown] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = () => {
    if (!menuOpen) setMenuShown(true);
    setMenuOpen((o) => !o);
  };
  const location = useLocation();
  // Close the menu whenever the page changes (including Back/Forward).
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 8);
      // Ignore tiny movements so the header doesn't flicker on small scrolls.
      if (Math.abs(currentScrollY - lastScrollY.current) < 8) return;
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[transform,background-color,backdrop-filter] duration-300 ease-out ${
        isVisible || menuShown ? "translate-y-0" : "-translate-y-full"
      } ${
        // Transparent at the top of the page (and over the open menu, which has
        // its own background); solid once the page is scrolled.
        isAtTop || menuShown
          ? "bg-transparent"
          : "bg-[var(--color-bg)]/85 backdrop-blur-md"
      }`}
    >
      {/* Border element */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-soft-amber)] to-transparent transition-opacity duration-300 ${
          isAtTop || menuShown ? "opacity-0" : "opacity-10"
        }`}
      ></div>

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 relative">
        {/* Logo - left aligned. Press and hold to open the sign-in sheet. */}
        <div
          ref={logoRef}
          {...holdHandlers}
          onContextMenu={(e) => e.preventDefault()}
          className="relative w-12 h-12 shrink-0 select-none [-webkit-touch-callout:none] [-webkit-tap-highlight-color:transparent] touch-none"
        >
          {/* A background image, not <img>, so Chrome's long-press image
              menu / Lens bar has nothing to latch onto. */}
          <div
            role="img"
            aria-label="Gemerald"
            className="w-12 h-12 rounded-full bg-cover bg-center hover:opacity-80 transition-opacity duration-300"
            style={{ backgroundImage: `url(${logo})` }}
          />
          <svg
            className="absolute -inset-1 w-14 h-14 -rotate-90 pointer-events-none"
            viewBox="0 0 56 56"
            aria-hidden="true"
          >
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="var(--color-wood)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              style={{
                strokeDashoffset: isHolding ? 0 : 1,
                opacity: isHolding ? 0.9 : 0,
                // Stay invisible for quick taps; only fill on a deliberate hold.
                transition: isHolding
                  ? `stroke-dashoffset ${HOLD_MS - 300}ms linear 300ms, opacity 150ms 300ms`
                  : "stroke-dashoffset 150ms, opacity 150ms",
              }}
            />
          </svg>
        </div>
        {sheetLoaded && (
          <Suspense fallback={null}>
            <AuthSheet open={sheetOpen} onClose={closeSheet} />
          </Suspense>
        )}

        {/* Navbar - takes remaining space (desktop links) */}
        <div className="flex-1 px-4">
          <Navbar />
        </div>

        {/* Mobile: cart + menu button */}
        <div className="flex items-center gap-1 md:hidden">
          <Link
            to="/cart"
            aria-label={`Cart${cartItemCount ? `, ${cartItemCount} items` : ""}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-text)] transition-colors active:text-[var(--color-wood)]"
          >
            <HiOutlineShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border border-[var(--color-bg)] bg-[var(--color-accent)] px-1 text-[10px] font-medium text-white">
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-full cursor-pointer [-webkit-tap-highlight-color:transparent]"
          >
            <HamburgerToggle isOpen={menuOpen} />
          </button>
        </div>
        <MobileMenu
          open={menuOpen}
          onClose={closeMenu}
          onClosed={() => setMenuShown(false)}
        />

        {/* Right side buttons - desktop only */}
        <div className="hidden md:flex items-center gap-6 md:flex-row-reverse">
          {/* Shopping Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2 text-[var(--color-text)] hover:text-[var(--color-wood)] transition-all duration-300"
          >
            <div className="relative">
              <HiOutlineShoppingCart className="w-7 h-7" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-accent)] text-white text-[10px] font-medium rounded-full h-5 w-5 flex items-center justify-center border border-[var(--color-card)]">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </div>
          </Link>

          {/* Shop Now Button */}
          <Link to="/products">
            <Button variant="primary" size="md">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
