import { NavLink } from "react-router-dom";
import {
  HiHome,
  HiOutlineHome,
  HiShoppingBag,
  HiOutlineShoppingBag,
  HiInformationCircle,
  HiOutlineInformationCircle,
  HiMail,
  HiOutlineMail,
} from "react-icons/hi";

const MobileBottomNav = () => {
  const links = [
    {
      name: "Home",
      to: "/",
      activeIcon: <HiHome className="w-6 h-6" />,
      inactiveIcon: <HiOutlineHome className="w-6 h-6" />,
    },
    {
      name: "Products",
      to: "/products",
      activeIcon: <HiShoppingBag className="w-6 h-6" />,
      inactiveIcon: <HiOutlineShoppingBag className="w-6 h-6" />,
    },
    {
      name: "About",
      to: "/about",
      activeIcon: <HiInformationCircle className="w-6 h-6" />,
      inactiveIcon: <HiOutlineInformationCircle className="w-6 h-6" />,
    },
    {
      name: "Contact",
      to: "/contact",
      activeIcon: <HiMail className="w-6 h-6" />,
      inactiveIcon: <HiOutlineMail className="w-6 h-6" />,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-glass)] backdrop-blur-lg">
      {/* Your signature border element */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-soft-amber)] to-transparent opacity-10"></div>

      <div className="flex justify-around items-center py-3 px-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center px-2 py-1 rounded-lg transition-all duration-300 ${
                isActive
                  ? "text-[var(--color-wood)]"
                  : "text-[var(--color-text)] opacity-80 hover:opacity-100"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? link.activeIcon : link.inactiveIcon}
                <span className="text-xs font-medium mt-1">{link.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
