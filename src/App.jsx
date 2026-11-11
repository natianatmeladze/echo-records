import React from "react";
import { Routes, Route } from "react-router";
import Header from "./components/Header"; 
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Footer from "./components/Footer"
import AlbumDetails from "./components/AlbumDetails"; 

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0D]">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/album/:id" element={<AlbumDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;