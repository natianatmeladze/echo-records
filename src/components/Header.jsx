import { Link } from "react-router";
import logo from "../assets/echo-records.svg";
import { ShoppingBasket } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#0D0D0D]/90 border-2 border-zinc-800/80 px-6 py-4">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        <div className="flex justify-start items-center">
          <Link to="/">
            <img
              src={logo}
              alt="echo-records"
              className="h-14 w-auto object-contain"
            />
          </Link>
        </div>

        <nav className="flex justify-center items-center gap-8 text-[16px] font-medium text-zinc-400">
          <Link
            to="/"
            className="hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="hover:text-[#FF9F45] transition-colors"
          >
            Shop
          </Link>
          <Link
            to="/artists"
            className="hover:text-white transition-colors"
          >
            Artists
          </Link>
          <Link
            to="/about"
            className="hover:text-[#FF9F45] transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:text-white transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex justify-end items-center">
          <Link
            to="/cart"
            className="flex items-center gap-2 text-zinc-300 hover:text-[#FF9F45] transition-colors"
          >
            <ShoppingBasket className="w-6 h-6" />
            <span className="text-md font-medium">0</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
