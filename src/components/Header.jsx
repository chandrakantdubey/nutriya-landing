// src/components/Header.jsx
import React from "react";
import AnvisLogo from "../assets/anvis-logo.svg"; // Uncomment if you have the logo

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <img src={AnvisLogo} alt="Anvis Logo" className="h-7" />
        {/* <div className="text-2xl font-bold text-gray-800">ANVIS</div>{" "} */}
        {/* Placeholder */}
        <button className="text-sm border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors duration-300 text-gray-700">
          Download App ↗
        </button>
      </div>
    </header>
  );
};

export default Header;
