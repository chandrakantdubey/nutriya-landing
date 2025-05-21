// src/components/Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
// import AnvisLogoWhite from '../assets/anvis-logo-white.svg';

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebookF />, href: "#", label: "Facebook" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
    { icon: <FaYoutube />, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 py-8 w-full mt-auto">
      {" "}
      {/* mt-auto for CtaSection */}
      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-y-6 md:gap-y-0">
          <div className="text-center md:text-left">
            {/* <img src={AnvisLogoWhite} alt="Anvis Logo" className="h-7 mb-2 mx-auto md:mx-0" /> */}
            <div className="text-2xl font-bold text-white mb-1">ANVIS</div>
            <p className="text-sm">
              © {new Date().getFullYear()} anvis. All Rights Reserved.
            </p>
          </div>
          <div className="flex space-x-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors duration-300 p-2.5 bg-gray-800 hover:bg-gray-700 rounded-full"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center text-sm gap-y-2">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
