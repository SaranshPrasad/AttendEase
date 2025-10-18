import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from '../../assets/Logo.png'

const navItems = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const navLinkClasses =
  "block px-3 py-2 rounded-lg transition-colors duration-200 font-medium";
const activeNavLink = "text-[#0089df] bg-[#f4fafe] shadow font-bold";
const inactiveNavLink = "text-gray-700 hover:text-[#0089df] hover:bg-[#f4fafe]";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 shadow z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl flex justify-center items-center">
            <img src={Logo} alt="brandLogo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-xl sm:text-2xl text-[#0089df] italic">
            AttendEase
          </span>
        </div>

        {/* Navigation Links - Desktop Only */}
        <nav className="hidden lg:flex gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${navLinkClasses} ${
                  isActive ? activeNavLink : inactiveNavLink
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Auth Buttons - Desktop & Tablet */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="
              px-4 py-2 rounded-lg border border-gray-300 font-medium text-sm
              transition-all duration-200 
              text-gray-700 bg-white
              hover:bg-gray-50 hover:border-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#0089df]/20
              active:scale-95
            "
          >
            Sign In
          </Link>
          
          <Link
            to="/signup"
            className="
              px-4 py-2 rounded-lg font-medium text-sm
              transition-all duration-200 
              text-white bg-[#0089df] border border-[#0089df]
              hover:bg-[#0070c9] hover:shadow-lg hover:shadow-[#0089df]/25
              focus:outline-none focus:ring-2 focus:ring-[#0089df]/20
              active:scale-95
            "
          >
            Get Started
          </Link>
        </div>

        {/* Hamburger Button - Mobile & Tablet without nav */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0089df]/20 hover:bg-gray-100 transition-colors"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="h-6 w-6 text-[#0089df] transition-transform duration-200"
            style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <nav className="px-4 pb-4 pt-2 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-100">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "text-[#0089df] bg-[#f4fafe] shadow-sm font-semibold"
                    : "text-gray-700 hover:text-[#0089df] hover:bg-[#f4fafe] active:scale-95"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Mobile Auth Buttons - Only show on smaller screens */}
          <div className="md:hidden pt-4 space-y-3 border-t border-gray-200">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="
                block w-full text-center py-3 rounded-lg border border-gray-300 font-medium
                transition-all duration-200
                text-gray-700 bg-white
                hover:bg-gray-50 hover:border-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#0089df]/20
                active:scale-98
              "
            >
              Sign In to Your Account
            </Link>

            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="
                block w-full text-center py-3 rounded-lg font-medium
                transition-all duration-200
                text-white bg-[#0089df] border border-[#0089df]
                hover:bg-[#0070c9] hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-[#0089df]/20
                active:scale-98
              "
            >
              Get Started Today
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
