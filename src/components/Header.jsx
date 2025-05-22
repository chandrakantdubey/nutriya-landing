// src/components/Header.jsx
import NutriaLogo from "../assets/nutria.svg";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16">
      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {NutriaLogo ? (
          <img
            src={NutriaLogo}
            alt="Nutria Logo"
            className="h-8 md:h-10 lg:h-12"
          />
        ) : (
          <div className="text-2xl font-bold text-gray-800">Nutria</div>
        )}
        {/* <button className="cursor-pointer text-sm border border-gray-700 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-700 hover:text-white transition-colors duration-300 flex items-center gap-1">
          Download App <span aria-hidden="true">↗</span>
        </button> */}
      </div>
    </header>
  );
};

export default Header;
