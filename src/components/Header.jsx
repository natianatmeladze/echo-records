import { useState } from "react";
import { Link } from "react-router";
import logo from "../assets/echo-records.svg";
import { ShoppingBasket, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0D0D0D]/90 border-b border-zinc-800/80 px-6 py-4 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center md:grid md:grid-cols-3">
        <div className="flex justify-start items-center">
          <Link to="/" onClick={closeMenu}>
            <img
              src={logo}
              alt="echo-records"
              className="h-11 sm:h-14 w-auto object-contain"
            />
          </Link>
        </div>

        <nav className="hidden md:flex justify-center items-center gap-8 text-[16px] font-medium text-zinc-400">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/shop" className="hover:text-[#8B0000] transition-colors">
            Shop
          </Link>
          <Link to="/artists" className="hover:text-white transition-colors">
            Artists
          </Link>
          <Link to="/about" className="hover:text-[#8B0000] transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex justify-end items-center gap-5">
          <Link
            to="/cart"
            onClick={closeMenu}
            className="flex items-center gap-2 text-zinc-300 hover:text-[#8B0000] transition-colors"
          >
            <ShoppingBasket className="w-6 h-6" />
            <span className="text-md font-medium">{totalItems}</span>
          </Link>

          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="md:hidden text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-zinc-800/80 mt-4 pt-4 flex flex-col gap-4 text-base font-medium text-zinc-400"
          >
            <Link
              to="/"
              onClick={closeMenu}
              className="hover:text-white transition-colors py-1"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={closeMenu}
              className="hover:text-[#8B0000] transition-colors py-1"
            >
              Shop
            </Link>
            <Link
              to="/artists"
              onClick={closeMenu}
              className="hover:text-white transition-colors py-1"
            >
              Artists
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="hover:text-[#8B0000] transition-colors py-1"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="hover:text-white transition-colors py-1"
            >
              Contact
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;