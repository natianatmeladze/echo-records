import React, { useState } from "react";
import { Link } from "react-router";
import geolabLogo from "../assets/geolab-logo.svg";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#0D0D0D] text-white border-t border-zinc-800 px-6 lg:px-16 pt-16 pb-12">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-14">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="max-w-xs flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              ECHO RECORDS
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Records pressed with care, shipped with sleeves intact.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Links
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-zinc-400">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/artists"
                  className="hover:text-white transition-colors"
                >
                  Artists
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Newsletter
            </h4>
            {subscribed ? (
              <p className="text-xs text-emerald-400 py-2">
                Thanks for subscribing to Echo Records!
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex items-center gap-2 w-full sm:w-80"
              >
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-transparent border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#F5F5F0] hover:bg-white text-black text-xs font-medium transition-colors cursor-pointer shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Socials
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-zinc-400">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Spotify
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
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

        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} Echo Records. All rights reserved.</p>

          <a
            href="https://geolab.edu.ge"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Geolab"
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <img
              src={geolabLogo}
              alt="Geolab Logo"
              className="h-15 w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;