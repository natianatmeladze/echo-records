import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";
import AlbumDetails from "./components/AlbumDetails";
import Artists from "./pages/Artists";
import ArtistDetails from "./pages/ArtistDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import ScrollProgress from "./components/ScrollProgress";

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.28, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D]">
      <ScrollProgress />
      <Header />
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />
            <Route
              path="/shop"
              element={
                <PageWrapper>
                  <Shop />
                </PageWrapper>
              }
            />
            <Route
              path="/album/:id"
              element={
                <PageWrapper>
                  <AlbumDetails />
                </PageWrapper>
              }
            />
            <Route
              path="/artists"
              element={
                <PageWrapper>
                  <Artists />
                </PageWrapper>
              }
            />
            <Route
              path="/artists/:id"
              element={
                <PageWrapper>
                  <ArtistDetails />
                </PageWrapper>
              }
            />
            <Route
              path="/about"
              element={
                <PageWrapper>
                  <About />
                </PageWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <PageWrapper>
                  <Contact />
                </PageWrapper>
              }
            />
            <Route
              path="/cart"
              element={
                <PageWrapper>
                  <Cart />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default App;