import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import heroCenterPhoneNew from "../assets/hero-center.png";
import heroBg from "../assets/hero-bg.png";
import { useRef, useState } from "react";
import Spark from "./Spark";

const HeroSection = ({ isActive, onNavigateToWaitlist }) => {
  const mainContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: isActive ? 0.3 : 0 },
    },
  };

  // Parent container for the phone image(s)
  // Its main role here is to delay the start of its children's animations
  const phoneContainerVariants = {
    hidden: {}, // No specific style, just for control
    visible: {
      transition: {
        // This delayChildren will apply to the phone image's animation start
        delayChildren: isActive ? 0.5 : 0, // Phone animation starts 0.5s after main content if active
      },
    },
  };

  // Variants for the phone image itself
  const phoneImageVariants = {
    hidden: {
      // Initial state before animation
      opacity: 0,
      y: 100, // Start further down
      scale: 0.8, // Start smaller
      rotate: -6, // Start slightly rotated
    },
    visible: {
      // Target state after animation
      opacity: 1,
      rotate: 0, // End rotation at 0

      // For y and scale, we define keyframes.
      // The animation will go from hidden.y to y[0], then cycle through y[1], y[2]...
      // Same for scale.
      y: [0, -8, 0, 5, 0], // Target y=0 for entry, then floats: 0 -> -8 -> 0 -> 5 -> 0
      scale: [1, 1.015, 1, 1.007, 1], // Target scale=1 for entry, then pulses

      transition: {
        // Transitions for properties that just "enter and settle"
        opacity: { duration: 0.7, ease: "easeOut" }, // Smooth fade-in
        rotate: { type: "spring", stiffness: 40, damping: 12, mass: 1.1 }, // Springy rotation

        // Transitions for properties that "enter and then loop" (y and scale)
        // The duration applies to one full cycle of the keyframe array.
        // The animation starts from the 'hidden' state value towards the first keyframe.
        y: {
          duration: 5.5, // How long one full float cycle takes ([0, -8, 0, 5, 0])
          ease: "easeInOut", // Smooth easing for the float
          repeat: Infinity, // Loop forever
          repeatType: "mirror", // Makes the animation go back and forth smoothly
        },
        scale: {
          duration: 5.5, // Match y's duration for synchronized pulsing
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        },
      },
    },
  };

  const [sparks, setSparks] = useState([]);
  const buttonRef = useRef(null); // To get button's position for sparks

  const createSparks = () => {
    if (!buttonRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    // Calculate center relative to the viewport initially
    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;

    const newSparks = Array.from({
      length: 20 + Math.floor(Math.random() * 10),
    }).map((_, i) => {
      // 20-30 sparks
      const angle = Math.random() * 360;
      const colorPalette = [
        "#FFD700",
        "#FFA500",
        "#FF8C00",
        "#FFFAFA",
        "#FFFACD",
      ]; // Gold, Orange, White sparks
      return {
        id: `spark-${Date.now()}-${i}`,
        x: 0, // We'll use the button ref's position directly in the Spark component for absolute positioning
        y: 0, // So these can be 0, or buttonRect.left etc. if Spark positions relatively.
        // For simplicity with absolute positioning in Spark, these values are less critical IF
        // the parent container for sparks is correctly positioned.
        // Let's position the sparks container instead.
        rotation: angle,
        size: Math.random() * 6 + 4, // 4px to 10px
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      };
    });
    setSparks((prevSparks) => [...prevSparks, ...newSparks]);
  };

  const removeSpark = (id) => {
    setSparks((prevSparks) => prevSparks.filter((spark) => spark.id !== id));
  };

  // Define tap animation state here for clarity
  const tapAnimation = {
    scale: 0.92,
    backgroundColor: "#F59E0B", // Amber-600 (a bright, energetic color)
    borderColor: "#F59E0B",
    color: "#1F2937", // Dark gray text for contrast
    boxShadow: [
      // Intense, short glow burst
      "0px 0px 60px 20px rgba(255, 193, 7, 0.9)", // Bright yellow/amber intense glow
      "0px 0px 0px 0px rgba(255, 193, 7, 0)", // Fade out glow quickly
    ],
    transition: {
      // Quick transitions for tap
      scale: { type: "spring", stiffness: 500, damping: 15, duration: 0.15 },
      backgroundColor: { duration: 0.1 },
      borderColor: { duration: 0.1 },
      color: { duration: 0.1 },
      boxShadow: { duration: 0.3, times: [0, 1] }, // Fast glow in and out
    },
  };

  const handleWaitlistClick = (e) => {
    e.preventDefault();
    createSparks(); // Create sparks on click
    if (onNavigateToWaitlist) {
      // Optionally delay navigation slightly to let animation play
      setTimeout(() => {
        onNavigateToWaitlist();
      }, 300); // 300ms delay
    }
  };

  return (
    <div className="relative h-full w-full flex flex-col justify-between items-center text-center overflow-hidden bg-white">
      {/* Background Image */}
      <motion.div
        className="absolute left-0 right-0 -top-[80px] inset-0 z-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={
          isActive
            ? {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 1.2,
                  delay: 0.1, // Keep this delay small for early background reveal
                  ease: [0.455, 0.03, 0.515, 0.955],
                },
              }
            : {}
        }
      >
        <img
          src={heroBg}
          alt="Abstract gradient background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none z-50 overflow-visible" // High z-index, allows sparks to go outside
        ref={buttonRef} // Use this ref to get position, but sparks will be appended here.
        // A bit tricky with ref here, as buttonRef should be on the button itself for getBoundingClientRect
        // Let's correct this: sparks should be in a container that covers the button.
      >
        <AnimatePresence>
          {sparks.map((spark) => (
            <Spark
              key={spark.id}
              x={
                buttonRef.current
                  ? buttonRef.current.getBoundingClientRect().left +
                    buttonRef.current.offsetWidth / 2 -
                    window.scrollX
                  : 0
              }
              y={
                buttonRef.current
                  ? buttonRef.current.getBoundingClientRect().top +
                    buttonRef.current.offsetHeight / 2 -
                    window.scrollY
                  : 0
              }
              rotation={spark.rotation}
              size={spark.size}
              color={spark.color}
              onAnimationComplete={() => removeSpark(spark.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
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

          {/* <a
            onClick={handleWaitlistClick}
            href="#waitlist-form"
            className="cursor-pointer mt-6 sm:mt-8 md:mt-10 px-6 py-3 sm:px-7 sm:py-3 border-2 border-gray-800 text-gray-800 rounded-full text-sm sm:text-base font-semibold hover:bg-gray-800 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center gap-2"
          >
            Join the Waitlist
            <FiArrowUpRight className="w-5 h-5" />
          </a> */}
          <motion.a
            ref={buttonRef} // Add ref to the button itself
            onClick={handleWaitlistClick} // Modified to call createSparks
            href="#waitlist-form"
            className="cursor-pointer mt-6 sm:mt-8 md:mt-10 px-6 py-3 sm:px-7 sm:py-3 border-2 border-gray-800 text-gray-800 rounded-full text-sm sm:text-base font-semibold hover:bg-gray-900 hover:text-yellow-300 transition-colors duration-150 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-60 flex items-center gap-2 relative overflow-hidden group"
            whileHover={{
              // Same hover animation as before
              scale: 1.08,
              x: [0, -2, 2, -2, 2, -1.5, 1.5, 0],
              y: [0, 1.5, -1.5, 1.5, -1.5, 1, -1, 0],
              boxShadow: [
                "0px 4px 12px rgba(30, 30, 30, 0.15)",
                "0px 0px 35px 8px rgba(255, 223, 100, 0.6)",
                "0px 0px 55px 15px rgba(255, 235, 150, 0.8)",
                "0px 0px 30px 6px rgba(255, 223, 100, 0.55)",
                "0px 4px 12px rgba(30, 30, 30, 0.15)",
              ],
            }}
            whileTap={tapAnimation} // Apply the defined tap animation
            transition={{
              default: { type: "spring", stiffness: 280, damping: 12 },
              x: { duration: 0.35, repeat: Infinity, ease: "easeInOut" },
              y: {
                duration: 0.35,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.03,
              },
              boxShadow: {
                duration: 1.0,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror",
              },
            }}
          >
            {/* Shine effects from before */}
            <motion.span /* ... Main Shine ... */
              className="absolute inset-0 block"
              initial={{ x: "-120%", skewX: "-25deg" }}
              whileHover={{ x: "120%" }}
              transition={{
                duration: 0.65,
                ease: [0.25, 1, 0.5, 1],
                delay: 0.05,
              }}
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, rgba(255,255,220,0.45) 40%, rgba(255,255,220,0.45) 60%, transparent 100%)",
              }}
              aria-hidden="true"
            />
            <motion.span /* ... Secondary Glint ... */
              className="absolute inset-0 block opacity-80"
              initial={{ x: "150%", skewX: "25deg", scaleY: 0.6 }}
              whileHover={{ x: "-150%" }}
              transition={{ duration: 0.5, ease: "linear", delay: 0.2 }}
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.8) 48%, rgba(255,255,255,0.8) 52%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            <span className="relative z-10">Join the Waitlist</span>

            <motion.div /* ... Icon Animation ... */
              className="relative z-10 inline-block ml-1"
              whileHover={{
                x: [0, 5, -4, 5, -3, 4, 0],
                y: [0, -5, 4, -5, 3, -4, 0],
                scale: [1, 1.3, 0.85, 1.25, 0.9, 1.15, 1],
                rotate: [0, 15, -12, 15, -10, 12, 0],
                transition: {
                  x: {
                    duration: 0.9,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  },
                  y: {
                    duration: 0.9,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: 0.04,
                  },
                  scale: {
                    duration: 0.75,
                    ease: "backInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  },
                  rotate: {
                    duration: 1.1,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  },
                },
              }}
            >
              <FiArrowUpRight className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div>

        {/* Phone Image Container */}
        <motion.div
          className="relative w-full flex justify-center items-end 
                     mt-auto pb-2 sm:pb-4" // Removed negative gaps as only one item shown
          variants={phoneContainerVariants} // This applies delayChildren
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
        >
          <motion.img
            src={heroCenterPhoneNew}
            alt="App screen main dashboard"
            className="relative z-20 md:w-auto md:max-w-[480px] lg:max-w-[740px] xl:max-w-[9000px] h-auto object-contain -bottom-[10px] md:-bottom-[20px] lg:-bottom-[30px] xl:-bottom-[40px]"
            variants={phoneImageVariants} // initial="hidden" and animate="visible" are implicitly applied
            // by the parent's animate state.
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
