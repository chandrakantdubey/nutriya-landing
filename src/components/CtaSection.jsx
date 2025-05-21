// src/components/CtaSection.jsx
import { motion } from "framer-motion";
import Footer from "./Footer";
import appStoreBadge from "../assets/app-store.svg";
import googlePlayBadge from "../assets/google-play.svg";
import ctaPhones from "../assets/cta-phones.png";

const CtaSection = ({ isActive }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: isActive ? 0.2 : 0 },
    },
  };

  return (
    <div className="h-full w-full bg-gray-900 text-white flex flex-col justify-center items-center pt-20 px-4 sm:px-6 overflow-y-auto">
      {" "}
      {/* Removed justify-between, Footer handles its own space */}
      <motion.div
        className="flex-grow flex flex-col justify-center items-center text-center max-w-4xl mx-auto" // flex-grow allows Footer to be at bottom
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Available to Download
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl">
          Get started on your fitness journey today. Download our app from the
          App Store or Google Play and take the first step towards a healthier
          you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a href="#" className="hover:opacity-80 transition-opacity">
            <img
              src={appStoreBadge}
              alt="Download on the App Store"
              className="h-12 sm:h-14"
            />
          </a>
          <a href="#" className="hover:opacity-80 transition-opacity">
            <img
              src={googlePlayBadge}
              alt="Get it on Google Play"
              className="h-12 sm:h-14"
            />
          </a>
        </div>
        <img
          src={ctaPhones}
          alt="App mockups on phones"
          className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-4"
        />
      </motion.div>
      <Footer />
    </div>
  );
};

export default CtaSection;
