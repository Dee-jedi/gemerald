import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Button from "../ui/CustomButton";
import logo from "../../assets/images/logo.jpg";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { cartItemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`bg-[var(--color-bg)] sticky top-0 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Border element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-soft-amber)] to-transparent opacity-10"></div>

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 relative">
        {/* Logo - left aligned */}
        <img
          src={logo}
          alt="Logo"
          className="w-12 h-12 object-cover rounded-full hover:opacity-80 transition-opacity duration-300"
          loading="lazy"
        />

        {/* Navbar - takes remaining space */}
        <div className="flex-1 px-4">
          <Navbar />
        </div>

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
