import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

// Assets
import heroCenterPhoneNew from "../assets/hero-center.png";
import heroLeftPhoneNew from "../assets/hero-left.png";
import heroRightPhoneNew from "../assets/hero-right.png";
import heroBg from "../assets/hero-bg.png";

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

  return (
    <div className="relative h-full w-full flex flex-col justify-between items-center text-center overflow-hidden bg-white">
      <motion.div
        className="absolute left-0 right-0 inset-0 z-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={
          isActive
            ? {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 1.2,
                  delay: 0.1,
                  ease: [0.455, 0.03, 0.515, 0.955],
                },
              }
            : {}
        }
      >
        <img
          src={heroBg}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Main content container (text and phones) */}
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 md:pt-12 z-10">
        <motion.div
          className="flex flex-col items-center justify-center"
          variants={mainContentVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
        >
          <h1 className="text-[40px] sm:text-[40px] md:text-[52px] lg:text-[60px] font-bold text-gray-900 leading-tight xl:leading-snug">
            Your Fitness. Your Way. One Smart App
          </h1>
          <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg md:text-xl mx-auto">
            Track your steps and calories effortlessly. Stay motivated, every
            step of the way.
          </p>
          <button className="cursor-pointer mt-6 sm:mt-8 md:mt-10 px-6 py-3 sm:px-7 sm:py-3 border-2 border-gray-800 text-gray-800 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-800 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center gap-2">
            Explore More <FiArrowUpRight className="w-5 h-5" />
          </button>
        </motion.div>

        <motion.div
          className="relative w-full flex justify-center items-end 
                     gap-[-2%] sm:gap-[-3%] md:gap-[-5%] lg:gap-[-6%] {/* Adjusted negative gaps slightly, test these values */}
                     mt-auto pb-2 sm:pb-4"
          variants={phoneContainerVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
        >
          <motion.img
            src={heroLeftPhoneNew}
            alt="App screen diet tracking"
            className="relative z-10 w-[28%] sm:w-[25%] md:w-auto md:max-w-[220px] lg:max-w-[260px] xl:max-w-[300px] h-auto object-contain transform translate-y-[3%] sm:translate-y-[2%]"
            variants={phoneVariants(0.05, 1, 0.2)}
          />
          <motion.img
            src={heroCenterPhoneNew}
            alt="App screen main dashboard"
            className="relative z-20 w-[40%] sm:w-[35%] md:w-auto md:max-w-[280px] lg:max-w-[540px] xl:max-w-[700px] h-auto object-contain -bottom-[20px] md:-bottom-[20px] lg:-bottom-[30px] xl:-bottom-[50px]" // Removed -bottom-[50px] for now, rely on items-end and natural flow. Add back if precise offset is crucial and test.
            variants={phoneVariants(0, 1, 0)}
          />
          <motion.img
            src={heroRightPhoneNew}
            alt="App screen daily stats"
            className="relative z-10 w-[28%] sm:w-[25%] md:w-auto md:max-w-[220px] lg:max-w-[260px] xl:max-w-[300px] h-auto object-contain transform translate-y-[3%] sm:translate-y-[2%]"
            variants={phoneVariants(0.05, 1, 0.2)}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
