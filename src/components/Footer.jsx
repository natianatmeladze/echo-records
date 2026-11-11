import React, { useState } from "react";
import { Link } from "react-router";
import geolabLogo from "../assets/geolab-logo.svg"

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#0D0D0D] text-white border-t border-zinc-900 px-6 lg:px-16 pt-16 pb-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="flex flex-col gap-3">
            <h3 className="text-[#8B0000] font-bold text-lg tracking-wider uppercase">
              ECHO RECORDS
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-xs">
              Records pressed with care, shipped with sleeves intact.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase">
              Links
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-zinc-400">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/artists" className="hover:text-white transition-colors">
                  Artists
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase">
              Newsletter
            </h4>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-5 py-2 bg-white text-black text-xs font-semibold rounded-lg hover:bg-zinc-200 transition-colors uppercase tracking-wider cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase">
              Socials
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-zinc-400">
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Spotify
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © Echo Records. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <div className="h-10 w-auto flex items-center justify-center">
              <img src={geolabLogo} alt="GeoLab Logo" className="h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;