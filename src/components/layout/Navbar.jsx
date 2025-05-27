// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const links = [
    { name: "Home", to: "/" },
    { name: "Products", to: "/products" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  const { cartItemCount } = useCart();

  const navLinkClass =
    "block px-4 py-2 text-[var(--color-text)] hover:text-[var(--color-wood)] transition-colors duration-300";

  return (
    <nav className="relative w-full" role="navigation">
      {/* Desktop Links */}
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

      {/* Cart Icon */}
      <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2">
        <NavLink
          to="/cart"
          className="relative p-2 text-[var(--color-text)] hover:text-[var(--color-wood)] transition-all duration-300"
        >
          <div className="relative">
            <HiOutlineShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--color-accent)] text-white text-[10px] font-medium rounded-full h-5 w-5 flex items-center justify-center border border-[var(--color-card)]">
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </span>
            )}
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
