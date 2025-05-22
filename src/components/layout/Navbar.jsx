import { useState } from "react";
import { NavLink } from "react-router-dom";
import HamburgerToggle from "./HamburgerToggle";
import MobileDrawer from "./MobileDrawer";

const links = [
  { name: "Home", to: "/" },
  { name: "Contact Us", to: "/contact" },
  { name: "About", to: "/about" },
];

const navLinkClass =
  "block px-4 py-2 text-[var(--color-text)] hover:text-[var(--color-wood)] transition-colors duration-300";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative w-full">
      {/* Desktop Links - centered */}
      <div className="hidden md:flex justify-center space-x-6">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              isActive
                ? `${navLinkClass} text-[var(--color-wood)]`
                : navLinkClass
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* Mobile Menu Toggle - positioned absolutely right */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 text-[var(--color-text)] focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <HamburgerToggle isOpen={isOpen} />
      </button>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isOpen} setIsOpen={setIsOpen} links={links} />
    </nav>
  );
};

export default Navbar;
