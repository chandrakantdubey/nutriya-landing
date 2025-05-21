import { motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaBehance,
} from "react-icons/fa";

import appStoreBadgeWhite from "../assets/app-store.svg";
import googlePlayBadgeWhite from "../assets/google-play.svg";
import ctaPhoneMain from "../assets/cta-phone-main.png";
import ctaPhoneSecondary from "../assets/cta-phone-secondary.png";
import NutriaLogoColor from "../assets/anvis-logo.svg";
import React from "react";

// Simple Sparkle component
const Sparkle = ({
  top,
  left,
  size = "w-1.5 h-1.5",
  delay = 0,
  duration = 2,
}) => (
  <motion.div
    className={`absolute ${size} bg-white rounded-full opacity-0 pointer-events-none`}
    style={{ top, left }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
    transition={{
      duration: duration + Math.random() * 1,
      repeat: Infinity,
      repeatType: "loop",
      delay: delay + Math.random() * 0.8,
      ease: "easeInOut",
    }}
  />
);

const CtaSection = ({ isActive }) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: isActive ? 0.1 : 0 },
    },
  };

  const textAboveCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: isActive ? 0.2 : 0 },
    },
  };

  const darkCardContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: isActive ? 0.4 : 0,
        staggerChildren: 0.15,
      },
    },
  };

  const footerContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: isActive ? 0.6 : 0,
        staggerChildren: 0.1,
      },
    },
  };

  const socialLinks = [
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaFacebookF />, href: "#", label: "Facebook" },
    { icon: <FaTwitter />, href: "#", label: "Twitter / X" },
    { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
    { icon: <FaYoutube />, href: "#", label: "YouTube" },
    { icon: <FaBehance />, href: "#", label: "Behance" },
  ];

  return (
    <motion.div
      className="h-full w-full flex flex-col justify-between items-center relative overflow-hidden" // justify-between to push footer to bottom
      style={{ backgroundColor: "#FFF0E5" }} // Light Peach/Orange background for the whole section
      variants={sectionVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      {/* Content Area Above the Dark Card and Footer */}
      <div className="w-full max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 lg:pt-20 flex-grow flex flex-col justify-center items-center text-center">
        {/* Text Above Dark Card */}
        <motion.div
          className="max-w-3xl mb-8 md:mb-12 lg:mb-10" // Adjusted bottom margin to control space to dark card
          variants={textAboveCardVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
        >
          <button className="bg-white text-gray-700 px-4 py-2 rounded-full shadow-md text-sm mb-6 hover:bg-gray-50 transition">
            About Us
          </button>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry.
          </p>
        </motion.div>
      </div>

      {/* --- Dark Card Container (Fixed height on desktop, holds CTA and Phone Images) --- */}
      {/* This container sits above the footer part naturally in the flex flow */}
      <div className="w-full flex justify-center items-end relative">
        <motion.div
          className="relative w-full max-w-[1300px] bg-[#1C1C1E] rounded-t-[40px] sm:rounded-t-[60px] lg:rounded-t-[80px] px-6 sm:px-10 lg:px-16 pt-10 pb-16 md:pb-20 lg:pb-24" // Added more padding bottom
          style={{
            height: "auto",
            minHeight: "300px",
            md: { height: "366px" },
          }} // Use auto height for mobile, fixed for md+
          // For Tailwind JIT, you might need to define h-[366px] if it's not standard
          // On desktop (md and up), use fixed height: md:h-[366px]
          // For mobile, allow height to be auto or set a min-height
          initial={{
            y: "30%",
            opacity: 0,
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
          }}
          animate={
            isActive
              ? {
                  y: 0,
                  opacity: 1,
                  borderTopLeftRadius: "80px",
                  borderTopRightRadius: "80px",
                  transition: {
                    duration: 0.8,
                    delay: 0.3,
                    ease: [0.25, 1, 0.5, 1],
                  },
                }
              : {}
          }
        >
          {/* Sparkles */}
          <Sparkle top="15%" left="10%" />{" "}
          <Sparkle top="25%" left="40%" size="w-1 h-1" />
          <Sparkle top="60%" left="5%" />{" "}
          <Sparkle top="70%" left="35%" size="w-2 h-2" />
          <Sparkle top="30%" left="80%" /> <Sparkle top="85%" left="60%" />
          <div className="flex flex-col lg:flex-row items-center justify-between h-full">
            {/* Left Content: Text and Buttons */}
            <motion.div
              className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 z-10"
              variants={darkCardContentVariants}
              initial="hidden"
              animate={isActive ? "visible" : "hidden"}
            >
              <motion.h2
                variants={darkCardContentVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 sm:mb-10"
              >
                Something Healthy
                <br />
                Is Cooking
              </motion.h2>
              <motion.div
                variants={darkCardContentVariants}
                className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4"
              >
                <a href="#" className="hover:opacity-90 transition-opacity">
                  <img
                    src={appStoreBadgeWhite}
                    alt="Download on the App Store"
                    className="h-12 sm:h-14"
                  />
                </a>
                <a href="#" className="hover:opacity-90 transition-opacity">
                  <img
                    src={googlePlayBadgeWhite}
                    alt="Get it on Google Play"
                    className="h-12 sm:h-14"
                  />
                </a>
              </motion.div>
            </motion.div>

            {/* Right Content: Phone Mockups - Positioned absolutely relative to the dark card's parent for overflow */}
            {/* The container for phones should be outside the dark card if they need to overflow freely based on its edge */}
          </div>
        </motion.div>
        {/* Phone mockups positioned absolutely relative to the outer .w-full.flex.justify-center.items-end.relative container */}
        {/* This allows them to be placed based on the bottom edge of the dark card */}
        <div
          className="absolute bottom-0 right-0 lg:right-[calc(50%-650px+50px)] /* Adjust for centering within 1300px */
                       w-auto h-auto /* Let images define size */
                       flex items-end justify-center 
                       pointer-events-none /* So they don't interfere with card clicks */
                       pr-0 md:pr-4 lg:pr-8 pb-0" // Add some padding from edge if needed
        >
          <motion.img
            src={ctaPhoneSecondary} // Smaller, behind
            alt="App interface secondary view"
            className="relative z-0 w-[150px] sm:w-[180px] md:w-[220px] lg:w-[260px] xl:w-[300px]
                           transform translate-x-[10%] -translate-y-[5%] md:-translate-y-[10%] pointer-events-auto"
            initial={{ x: 50, opacity: 0, y: 20 }}
            animate={
              isActive
                ? {
                    x: 0,
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.9, duration: 0.7, ease: "easeOut" },
                  }
                : {}
            }
          />
          <motion.img
            src={ctaPhoneMain} // Larger, in front
            alt="App interface main view"
            className="relative z-10 w-[170px] sm:w-[200px] md:w-[250px] lg:w-[290px] xl:w-[340px]
                           transform -translate-x-[20%] -translate-y-[0%] md:-translate-y-[5%] pointer-events-auto"
            initial={{ x: 50, opacity: 0, y: 20 }}
            animate={
              isActive
                ? {
                    x: 0,
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.8, duration: 0.7, ease: "easeOut" },
                  }
                : {}
            }
          />
        </div>
      </div>

      {/* --- Footer Part (on the light peach background, below the dark card) --- */}
      <motion.div
        className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center py-8 sm:py-10 text-gray-700"
        variants={footerContentVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        <motion.div className="mb-6 sm:mb-8" variants={footerContentVariants}>
          {NutriaLogoColor ? (
            <img
              src={NutriaLogoColor}
              alt="Nutria Logo"
              className="h-10 sm:h-12"
            />
          ) : (
            <div className="text-3xl font-bold text-orange-600">Nutria</div>
          )}
        </motion.div>
        <motion.div
          className="flex flex-wrap justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8"
          variants={footerContentVariants}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-orange-500 transition-colors duration-300 p-2.5 bg-white hover:bg-orange-50 rounded-full shadow-sm hover:shadow-md"
              aria-label={link.label}
            >
              {React.cloneElement(link.icon, { size: 20 })}
            </a>
          ))}
        </motion.div>
        <motion.div
          className="w-full pt-6 sm:pt-8 border-t border-orange-200 flex flex-col sm:flex-row justify-between items-center text-sm gap-y-3 sm:gap-y-0"
          variants={footerContentVariants}
        >
          <p className="text-gray-600">
            © {new Date().getFullYear()} Nutria, All Rights Reserved.
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            <a href="#" className="hover:text-orange-600 transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-orange-600 transition-colors">
              Privacy Policy
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CtaSection;
