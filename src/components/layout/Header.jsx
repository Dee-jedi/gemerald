import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Button from "../ui/CustomButton";
import logo from "../../assets/images/logo.jpg";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      className={`bg-[var(--color-bg)] shadow-md sticky top-0 z-50 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
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

        {/* Shop Now Button - right aligned (desktop only) */}
        <div className="hidden md:block">
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
