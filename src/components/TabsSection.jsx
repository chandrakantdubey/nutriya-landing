// src/components/TabsSection.jsx
import React, { useState, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import tab1L from "../assets/tab-1-l.png";
import tab1S from "../assets/tab-1-s.png";
import tab2L from "../assets/tab-2-l.png";
import tab2S from "../assets/tab-2-s.png";
import tab3L from "../assets/tab-3-l.png";
import tab3S from "../assets/tab-3-s.png";

const tabsData = [
  {
    id: "ai-photo-scan",
    title: "Snap a Photo,\nLog a Meal Instantly",
    description:
      "Forget searching and typing—just take a photo of your meal, and let the app’s AI detect and log the food for you. It's the fastest and smartest way to track what you eat with accuracy and ease.",
    largeImg: tab3L,
    smallImg: tab3S,
    originalButtonText: "AI Photo Scan",
  }, // Note: Images were swapped in original prompt, used tab3 for AI
  {
    id: "calorie-tracker",
    title: "Know What You Eat,\nStay on Track",
    description:
      "By using this app, you can easily log your meals, track daily calorie intake, and stay in control of your nutrition. Whether you're trying to lose weight or fuel your workouts, our calorie tracker helps you make smarter food choices with less effort.",
    largeImg: tab2L,
    smallImg: tab2S,
    originalButtonText: "Calorie Tracker",
  },
  {
    id: "progress-tracking",
    title: "See Your Health\nImprove Over Time",
    description:
      "Track your daily steps, calories, and habits all in one place. This app turns your activity into simple charts and insights, so you can see how far you've come and stay motivated to reach your goals—day after day.",
    largeImg: tab1L,
    smallImg: tab1S,
    originalButtonText: "Progress Tracking",
  }, // Note: Images were swapped
];

const TabsSection = forwardRef(({ isActive }, ref) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeTabContent = tabsData[activeTabIndex];

  useImperativeHandle(ref, () => ({
    handleInternalScroll: (deltaY) => {
      if (deltaY > 0) {
        // Scrolling down
        if (activeTabIndex < tabsData.length - 1) {
          setActiveTabIndex((prev) => prev + 1);
          return true; // Scroll consumed
        }
      } else if (deltaY < 0) {
        // Scrolling up
        if (activeTabIndex > 0) {
          setActiveTabIndex((prev) => prev - 1);
          return true; // Scroll consumed
        }
      }
      return false; // Scroll not consumed (at boundary)
    },
  }));

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const sectionOverallVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { delay: isActive ? 0.3 : 0, duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="h-full w-full bg-gradient-to-br from-purple-50 via-white to-purple-100 flex flex-col justify-center items-center pt-20 pb-10 px-4 sm:px-6 overflow-y-auto"
      variants={sectionOverallVariants}
      initial="initial"
      animate={isActive ? "animate" : "initial"}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center w-full">
        <motion.div
          className="mb-10 flex flex-wrap justify-center space-x-1 sm:space-x-2 bg-white p-1 rounded-full shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={
            isActive
              ? { opacity: 1, y: 0, transition: { delay: 0.4 } }
              : { opacity: 0, y: -20 }
          }
        >
          {tabsData.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabIndex(idx)}
              className={clsx(
                "px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500",
                activeTabIndex === idx
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {tab.originalButtonText}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabContent.id}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col lg:flex-row items-center justify-around gap-8 lg:gap-12 w-full"
          >
            <div className="text-center lg:text-left max-w-md lg:max-w-lg order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-semibold whitespace-pre-line mb-4 text-gray-800">
                {activeTabContent.title}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                {activeTabContent.description}
              </p>
            </div>
            <div className="relative order-1 lg:order-2">
              <motion.img
                src={activeTabContent.largeImg}
                alt="Main content"
                className="w-[260px] sm:w-[300px] lg:w-[340px] rounded-2xl shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.1 },
                }}
              />
              <motion.img
                src={activeTabContent.smallImg}
                alt="Highlight"
                className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 w-20 h-20 sm:w-24 sm:h-24 rounded-lg shadow-xl border-4 border-white object-cover"
                initial={{ scale: 0.5, opacity: 0, x: 20, y: 20 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.3 },
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

export default TabsSection;
