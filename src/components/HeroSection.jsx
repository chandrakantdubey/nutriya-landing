// src/components/HeroSection.jsx
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import heroCenterPhone from "../assets/hero-center.png";
import heroLeftPhone from "../assets/hero-left.png";
import heroRightPhone from "../assets/hero-right.png";

const HeroSection = ({ isActive }) => {
  const mainContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: isActive ? 0.3 : 0 },
    },
  };

  const phoneContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2, delayChildren: isActive ? 0.5 : 0 },
    },
  };

  // yBase: vertical offset from items-end, scaleBase: initial scale, delay: animation delay
  const phoneVariants = (yBase = 0, scaleBase = 1, delay = 0) => ({
    hidden: { opacity: 0, y: 50 + yBase, scale: scaleBase * 0.9 },
    visible: {
      opacity: 1,
      y: yBase,
      scale: scaleBase,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: isActive ? delay : 0,
      },
    },
  });

  const blobVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1, // Control final opacity here or on the blob's style
      scale: 1,
      transition: { duration: 1.2, ease: "circOut", delay: isActive ? 0.6 : 0 }, // Slightly longer and later
    },
  };

  return (
    <div className="relative h-full flex flex-col justify-center items-center text-center pt-24 pb-10 px-4 overflow-hidden bg-white">
      {/* Text Content */}
      <motion.div
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        className="flex flex-col items-center relative z-10" // z-10 to be above potential global background elements if any
      >
        <motion.h1
          variants={mainContentVariants}
          className="text-5xl sm:text-6xl lg:text-[64px] leading-tight font-bold text-black"
        >
          Your Fitness. Your Way.
          <br className="hidden sm:block" /> One Smart App
        </motion.h1>
        <motion.p
          variants={mainContentVariants}
          className="text-gray-600 mt-6 text-lg sm:text-xl max-w-xl md:max-w-2xl mx-auto"
        >
          Track your steps and calories effortlessly. Stay motivated, every step
          of the way.
        </motion.p>
        <motion.button
          variants={mainContentVariants}
          className="mt-10 px-7 py-3 border-2 border-black text-black rounded-lg text-base font-semibold hover:bg-black hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center gap-2"
        >
          Explore More <FiArrowUpRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Phone Images Container */}
      {/* This container is relative, and the blob will be absolutely positioned within it but behind the phones. */}
      <motion.div
        className="relative mt-12 sm:mt-16 flex justify-center items-end gap-0" // items-end aligns phones at their bottom
        variants={phoneContainerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {/* Purple Background Blob - Positioned INSIDE phone container, behind phones */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" // Centered within this parent
          variants={blobVariants} // Use same overall container variants or dedicated blob variants
          // No initial/animate here if inheriting from parent, or use dedicated blobVariants
        >
          {/* For debugging blob visibility: remove/reduce blur, increase opacity, use bright color */}
          <div
            className="w-[400px] h-[400px] sm:w-[500px] md:w-[600px] lg:w-[700px] 
                            aspect-square bg-purple-200/40 rounded-full filter blur-3xl opacity-90"
          >
            {/* If using aspect-square, only width or height is needed, e.g., w-[500px] aspect-square */}
          </div>
        </motion.div>

        {/* Phone Images - these need to be z-10 or higher relative to the blob's z-0 if blob is sibling */}
        {/* Or, if blob is z-0, phones with no z-index (auto) will naturally be on top if they come after blob in DOM */}

        {/* Left Phone - Ensure it has a higher z-index than the blob or relies on DOM order */}
        <motion.img
          src={heroLeftPhone}
          alt="Left phone"
          className="relative z-10 w-[130px] sm:w-[160px] md:w-[180px] lg:w-[198px]"
          variants={phoneVariants(15, 0.95, 0.4)} // y:15 (slightly lower), scale:0.95, delay:0.4s
        />
        {/* Center Phone - Ensure it has a higher z-index */}
        <motion.img
          src={heroCenterPhone}
          alt="Center phone"
          className="relative z-20 w-[180px] sm:w-[220px] md:w-[250px] lg:w-[760px] mx-[-20px] sm:mx-[-25px] md:mx-[-30px]" // Negative margin for overlap
          variants={phoneVariants(0, 1, 0.2)} // y:0 (baseline), scale:1, delay:0.2s
        />
        {/* Right Phone - Ensure it has a higher z-index */}
        <motion.img
          src={heroRightPhone}
          alt="Right phone"
          className="relative z-10 w-[130px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
          variants={phoneVariants(15, 0.95, 0.4)} // y:15 (slightly lower), scale:0.95, delay:0.4s
        />
      </motion.div>
    </div>
  );
};

export default HeroSection;
