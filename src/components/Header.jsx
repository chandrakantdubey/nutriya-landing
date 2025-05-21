// src/components/Header.jsx
import AnvisLogo from "../assets/anvis-logo.svg";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm h-16">
      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {AnvisLogo ? (
          <img src={AnvisLogo} alt="Nutria Logo" className="h-7 md:h-8" />
        ) : (
          <div className="text-2xl font-bold text-gray-800">Nutria</div>
        )}
        <button className="cursor-pointer text-sm border border-gray-700 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-700 hover:text-white transition-colors duration-300 flex items-center gap-1">
          Download App <span aria-hidden="true">↗</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
