import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import TabsSection from "./components/TabsSection";
// import HowToStartSection from "./components/HowToStartSection";
import CtaSection from "./components/CtaSection";

const sectionsConfig = [
  { id: "hero", Component: HeroSection },
  { id: "features", Component: FeaturesSection },
  { id: "tabs", Component: TabsSection, hasInternalScroll: true },
  // { id: "how-to-start", Component: HowToStartSection },
  { id: "cta", Component: CtaSection },
];

const HEADER_HEIGHT_REM = 4;

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);

  const appContainerRef = useRef(null);
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
    if (event.deltaY > 5) direction = "down";
    else if (event.deltaY < -5) direction = "up";
    else return;

    event.preventDefault(); // Prevent default only if we are handling the scroll

    const currentSectionConfig = sectionsConfig[activeIndex];
    let internalScrollHandled = false;

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
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 300);
      return;
    }

    // If not internal scroll, proceed with section change
    setIsScrolling(true);
    setScrollDirection(direction);

    let newIndex = activeIndex;
    if (direction === "down") {
      if (activeIndex < sectionsConfig.length - 1) newIndex = activeIndex + 1;
      else {
        setIsScrolling(false); // Reached end, release lock
        return;
      }
    } else {
      // direction === 'up'
      if (activeIndex > 0) newIndex = activeIndex - 1;
      else {
        setIsScrolling(false); // Reached start, release lock
        return;
      }
    }

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }

    setTimeout(() => setIsScrolling(false), 800); // Timeout for main section transitions
  };

  useEffect(() => {
    const container = appContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleScroll, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleScroll);
      }
    };
  }, [activeIndex, isScrolling]); // Re-add handleScroll if it's memoized or dependencies change

  const sectionVariants = {
    enter: (direction) => ({
      y: direction === "down" ? "100%" : "-100%", // Use percentage for full coverage
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.83, 0, 0.17, 1] },
    },
    exit: (direction) => ({
      zIndex: 0,
      y: direction === "down" ? "-100%" : "100%", // Use percentage
      opacity: 0,
      transition: { duration: 0.7, ease: [0.83, 0, 0.17, 1] },
    }),
  };

  const navigateToWaitlist = () => {
    const ctaSectionIndex = sectionsConfig.findIndex(
      (section) => section.id === "cta"
    );
    setActiveIndex(ctaSectionIndex);
  };

  return (
    <div
      ref={appContainerRef}
      className="h-screen w-screen overflow-hidden relative bg-white"
    >
      <Header
        onNavigateToWaitlist={navigateToWaitlist}
        show={activeIndex !== 0}
      />
      {/* Container for the scrollable sections, positioned below the header */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: `calc(100vh - ${HEADER_HEIGHT_REM}rem)`,
          top: `${HEADER_HEIGHT_REM}rem`,
        }}
      >
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
                className="absolute top-0 left-0 w-full h-full bg-white" // Each section fills this container
              >
                <Component
                  ref={sectionRefs.current[index]}
                  isActive={index === activeIndex}
                  onNavigateToWaitlist={navigateToWaitlist}
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
