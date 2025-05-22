// src/components/Header.jsx
import { FiArrowUpRight } from "react-icons/fi";
import NutriaLogo from "../assets/nutria.svg";

const Header = ({ onNavigateToWaitlist, show }) => {
  const handleWaitlistClick = (e) => {
    e.preventDefault();
    if (onNavigateToWaitlist) {
      onNavigateToWaitlist();
    }
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-transparent">
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
        {show ? (
          <a
            onClick={handleWaitlistClick}
            href="#waitlist-form"
            className="cursor-pointer px-4 sm:py-2 border-2 border-gray-800 text-gray-800 rounded-full text-sm sm:text-base font-semibold hover:bg-gray-800 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center gap-2"
          >
            Join the Waitlist
            <FiArrowUpRight className="w-5 h-5" />
          </a>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
