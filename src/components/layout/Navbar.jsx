import { NavLink } from "react-router-dom";
const Navbar = () => {
  const links = [
    { name: "Home", to: "/" },
    { name: "Products", to: "/products" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  const navLinkClass =
    "block px-4 py-2 text-[var(--color-text)] hover:text-[var(--color-wood)] transition-colors duration-300";

  return (
    <nav className="relative w-full" role="navigation">
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
    </nav>
  );
};

export default Navbar;
