// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RootLayout from "./layouts/RootLayout";
// import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import TabsSection from "./components/TabsSection";
import HowToStartSection from "./components/HowToStartSection";
// import TestimonialsSection from "./components/TestimonialsSection";
import CtaSection from "./components/CtaSection";

const sectionsConfig = [
  { id: "hero", Component: HeroSection },
  { id: "features", Component: FeaturesSection },
  { id: "tabs", Component: TabsSection, hasInternalScroll: true },
  { id: "how-to-start", Component: HowToStartSection },
  // { id: "testimonials", Component: TestimonialsSection },
  { id: "cta", Component: CtaSection },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null); // 'up' or 'down'

  const appContainerRef = useRef(null);
  // Correctly initialize refs for components that might need it (like TabsSection)
  const sectionRefs = useRef(
    sectionsConfig.map((config) =>
      config.hasInternalScroll ? React.createRef() : null
    )
  );

  const handleScroll = (event) => {
    if (isScrolling) {
      event.preventDefault();
      return;
    }

    let direction = null;
    if (event.deltaY > 5) direction = "down"; // Add a small threshold
    else if (event.deltaY < -5) direction = "up"; // Add a small threshold
    else return; // No significant vertical scroll

    event.preventDefault();
    setIsScrolling(true);
    setScrollDirection(direction);

    const currentSectionConfig = sectionsConfig[activeIndex];
    let internalScrollHandled = false;

    // Check if the current section has internal scroll and if its ref exists and has the method
    if (
      currentSectionConfig.hasInternalScroll &&
      sectionRefs.current[activeIndex] &&
      sectionRefs.current[activeIndex].current &&
      typeof sectionRefs.current[activeIndex].current.handleInternalScroll ===
        "function"
    ) {
      internalScrollHandled = sectionRefs.current[
        activeIndex
      ].current.handleInternalScroll(event.deltaY);
    }

    if (internalScrollHandled) {
      // If internal scroll was handled (e.g., tab changed), reset scrolling lock sooner
      setTimeout(() => setIsScrolling(false), 300); // Adjust timing as needed for tab changes
      return;
    }

    let newIndex = activeIndex;
    if (direction === "down") {
      if (activeIndex < sectionsConfig.length - 1) newIndex = activeIndex + 1;
      else {
        setIsScrolling(false);
        return;
      }
    } else {
      // direction === 'up'
      if (activeIndex > 0) newIndex = activeIndex - 1;
      else {
        setIsScrolling(false);
        return;
      }
    }

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
    // Timeout for main section transitions
    // This needs to be roughly the duration of your animation or slightly longer
    setTimeout(() => setIsScrolling(false), 800); // Increased slightly from 700ms animation
  };

  useEffect(() => {
    const container = appContainerRef.current;
    if (container) {
      // Use { passive: false } to allow preventDefault()
      container.addEventListener("wheel", handleScroll, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleScroll);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isScrolling]); // Add handleScroll to dependencies or memoize it if it changes too often

  const sectionVariants = {
    enter: (direction) => ({
      y: direction === "down" ? "100vh" : "-100vh",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
      // Corrected easing: using "easeInOutQuint"
      transition: { duration: 0.7, ease: [0.83, 0, 0.17, 1] },
    },
    exit: (direction) => ({
      zIndex: 0,
      y: direction === "down" ? "-100vh" : "100vh",
      opacity: 0,
      // Corrected easing: using "easeInOutQuint"
      transition: { duration: 0.7, ease: [0.83, 0, 0.17, 1] },
    }),
  };

  return (
    <>
      <div
        ref={appContainerRef}
        className="h-screen w-screen overflow-hidden relative bg-white"
      >
        {" "}
        {/* Changed bg-gray-100 to bg-white for consistency */}
        <AnimatePresence initial={false} custom={scrollDirection} mode="wait">
          {sectionsConfig.map(({ id, Component }, index) =>
            index === activeIndex ? (
              <motion.div
                key={id}
                custom={scrollDirection}
                variants={sectionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute top-0 left-0 w-full h-full flex flex-col" // Removed pt-16 here, RootLayout or Section content should handle header spacing
              >
                {/* RootLayout is now inside the motion.div to be part of the transitioning content */}
                <RootLayout>
                  <Component
                    // Pass ref only if it was created for this section
                    ref={sectionRefs.current[index]}
                    isActive={index === activeIndex}
                  />
                </RootLayout>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
