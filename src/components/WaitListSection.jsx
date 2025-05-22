// src/components/WaitlistSection.jsx
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowUpRight,
  // FiCheckCircle, // Not used in current benefits, can remove if not needed elsewhere
  FiGift,
  FiStar,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import Spark from "./Spark";
import tabBg from "../assets/hero-bg.png"; // Your background image

const WaitlistSection = ({ isActive }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [sparks, setSparks] = useState([]);
  // Create separate refs for each button if they can independently trigger sparks
  // or ensure only one button's ref is active for spark creation at a time.
  // For now, assuming the main animated button is the primary spark trigger.
  const animatedButtonRef = useRef(null); // Ref for the highly animated button
  const formButtonRef = useRef(null); // Ref for the simple form's button

  const createSparks = (targetButtonRef) => {
    // Accept a ref to know which button was clicked
    if (!targetButtonRef || !targetButtonRef.current) return;
    const newSparks = Array.from({
      length: 25 + Math.floor(Math.random() * 10),
    }).map((_, i) => {
      const angle = Math.random() * 360;
      const colorPalette = [
        "#FFD700",
        "#FFA500",
        "#FF8C00",
        "#FFFAFA",
        "#FFFACD",
        "#F59E0B",
      ];
      return {
        id: `spark-waitlist-${Date.now()}-${i}`,
        rotation: angle,
        size: Math.random() * 7 + 5,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        // Store button center for this spark batch
        buttonCenterX:
          targetButtonRef.current.getBoundingClientRect().left +
          targetButtonRef.current.offsetWidth / 2 -
          window.scrollX,
        buttonCenterY:
          targetButtonRef.current.getBoundingClientRect().top +
          targetButtonRef.current.offsetHeight / 2 -
          window.scrollY,
      };
    });
    setSparks((prevSparks) => [...prevSparks, ...newSparks]);
  };

  const removeSpark = (id) => {
    setSparks((prevSparks) => prevSparks.filter((spark) => spark.id !== id));
  };

  const handleFormSubmit = async (eventOrEmailValue, triggeredByButtonRef) => {
    let currentEmail = email;
    if (typeof eventOrEmailValue === "string") {
      currentEmail = eventOrEmailValue;
    } else if (
      eventOrEmailValue &&
      typeof eventOrEmailValue.preventDefault === "function"
    ) {
      eventOrEmailValue.preventDefault();
    }

    if (!currentEmail.trim() || !/\S+@\S+\.\S+/.test(currentEmail.trim())) {
      setSubmitMessage("Please enter a valid email address.");
      setMessageType("error");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");
    setMessageType("");
    if (triggeredByButtonRef) {
      // Only create sparks if a button ref is provided
      createSparks(triggeredByButtonRef);
    }

    try {
      console.log(
        "Submitting email to waitlist (WaitlistSection):",
        currentEmail
      );
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitMessage("You're on the list! Get ready for awesome perks.");
      setMessageType("success");
      setEmail("");
    } catch (error) {
      console.error("Waitlist submission error:", error);
      setSubmitMessage(
        error.message || "Something went wrong. Please try again."
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: (
        <FiZap className="w-6 h-6 text-amber-500 group-hover:text-amber-600 transition-colors" />
      ),
      text: "Exclusive Early Bird Access",
      bgColor: "bg-amber-50", // Light amber
      hoverBgColor: "hover:bg-amber-100",
      borderColor: "border-amber-200",
      textColor: "text-amber-700",
    },
    {
      icon: (
        <FiGift className="w-6 h-6 text-rose-500 group-hover:text-rose-600 transition-colors" />
      ),
      text: "Special Launch Discounts & Offers",
      bgColor: "bg-rose-50", // Light rose
      hoverBgColor: "hover:bg-rose-100",
      borderColor: "border-rose-200",
      textColor: "text-rose-700",
    },
    {
      icon: (
        <FiStar className="w-6 h-6 text-sky-500 group-hover:text-sky-600 transition-colors" />
      ),
      text: "Bonus Content for First Movers",
      bgColor: "bg-sky-50", // Light sky blue
      hoverBgColor: "hover:bg-sky-100",
      borderColor: "border-sky-200",
      textColor: "text-sky-700",
    },
    {
      icon: (
        <FiUsers className="w-6 h-6 text-teal-500 group-hover:text-teal-600 transition-colors" />
      ),
      text: "Join Our Insider Community",
      bgColor: "bg-teal-50", // Light teal
      hoverBgColor: "hover:bg-teal-100",
      borderColor: "border-teal-200",
      textColor: "text-teal-700",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: isActive ? 0.2 : 0, ease: "easeOut" },
    },
  };

  const itemVariants = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: (isActive ? 0.4 : 0) + delay,
        ease: "easeOut",
      },
    },
  });

  const animatedButtonTapAnimation = {
    scale: 0.92,
    backgroundColor: "#F59E0B", // amber-600
    borderColor: "#F59E0B",
    color: "#111827", // gray-900
    boxShadow: [
      "0px 0px 60px 20px rgba(255, 193, 7, 0.9)",
      "0px 0px 0px 0px rgba(255, 193, 7, 0)",
    ],
    transition: {
      scale: { type: "spring", stiffness: 500, damping: 15, duration: 0.15 },
      backgroundColor: { duration: 0.1 },
      borderColor: { duration: 0.1 },
      color: { duration: 0.1 },
      boxShadow: { duration: 0.3, times: [0, 1] },
    },
  };

  return (
    <motion.section
      className="h-full w-full py-20 sm:py-28 relative overflow-hidden text-gray-800" // Changed text color for light bg
      variants={sectionVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      id="join-waitlist-section"
    >
      {/* Background Image */}
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
          src={tabBg}
          alt="Abstract background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Sparks Container - ensure it covers the area of buttons */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
        <AnimatePresence>
          {sparks.map((spark) => (
            <Spark
              key={spark.id}
              x={spark.buttonCenterX} // Use stored center X
              y={spark.buttonCenterY} // Use stored center Y
              rotation={spark.rotation}
              size={spark.size}
              color={spark.color}
              onAnimationComplete={() => removeSpark(spark.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6 text-gray-900" // Darker text for light bg
          variants={itemVariants(0)}
        >
          Unlock the Future of Fitness.
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12" // Darker text
          variants={itemVariants(0.15)}
        >
          Join our waitlist today and be the first to experience a revolutionary
          approach to achieving your health goals. Plus, enjoy exclusive perks!
        </motion.p>

        {/* Benefits List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 max-w-5xl mx-auto mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className={`group flex items-start space-x-3 p-5 rounded-xl shadow-lg border transition-all duration-300 ease-in-out transform hover:scale-105 ${benefit.bgColor} ${benefit.hoverBgColor} ${benefit.borderColor}`}
              variants={itemVariants(0.3 + index * 0.1)}
            >
              <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
              <p className={`${benefit.textColor} font-medium`}>
                {benefit.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Waitlist Form */}
        <motion.div
          className="w-full max-w-xl mx-auto mb-10"
          variants={itemVariants(0.7)}
        >
          <form
            onSubmit={(e) => handleFormSubmit(e, formButtonRef)} // Pass the form button ref
            className="flex w-full bg-white rounded-full overflow-hidden shadow-xl focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-opacity-75 transition-all duration-300 border border-gray-300"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (submitMessage) {
                  setSubmitMessage("");
                  setMessageType("");
                }
              }}
              className="flex-grow px-5 sm:px-6 py-4 text-gray-800 placeholder-gray-500 focus:outline-none bg-transparent text-base sm:text-lg"
              required
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-6 sm:px-8 py-4 transition-colors duration-300 text-base sm:text-lg whitespace-nowrap"
              ref={formButtonRef} // Assign ref to the form's submit button
            >
              {isSubmitting ? "Joining..." : "Get Early Access"}
            </button>
          </form>
          {submitMessage && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-sm text-center ${
                messageType === "success" ? "text-green-600" : "text-red-600" // Adjusted for light bg
              }`}
            >
              {submitMessage}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className="text-center my-8 sm:my-12"
          variants={itemVariants(0.8)}
        >
          <span className="text-gray-600 text-sm uppercase tracking-wider">
            Or Join With Style
          </span>
        </motion.div>

        {/* Highly Animated CTA Button */}
        <motion.div
          className="flex justify-center"
          variants={itemVariants(0.9)}
        >
          <motion.button
            ref={animatedButtonRef} // Assign ref to this button
            onClick={() => {
              if (email.trim()) {
                handleFormSubmit(email, animatedButtonRef); // Pass this button's ref
              } else {
                setSubmitMessage(
                  "Please enter your email in the field above first!"
                );
                setMessageType("error");
                // Optionally find and focus the email input
                const emailInput = document.querySelector(
                  'input[type="email"][aria-label="Email Address for Waitlist"]'
                );
                if (emailInput) emailInput.focus();
              }
            }}
            className="cursor-pointer px-8 py-4 border-2 border-amber-500 text-amber-600 rounded-full text-lg font-semibold hover:bg-amber-500 hover:text-gray-900 transition-colors duration-150 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-60 flex items-center gap-2.5 relative overflow-hidden group"
            // Hover/Tap animations (same as before, ensure colors match light theme if needed)
            whileHover={{
              scale: 1.08,
              x: [0, -2, 2, -2, 2, -1.5, 1.5, 0],
              y: [0, 1.5, -1.5, 1.5, -1.5, 1, -1, 0],
              color: "#78350F", // amber-900 for hover text
              borderColor: "#D97706", // amber-600
              backgroundColor: "#FCD34D", // amber-300
              boxShadow: [
                "0px 4px 12px rgba(202, 138, 4, 0.3)", // Softer base for light theme
                "0px 0px 35px 8px rgba(251, 191, 36, 0.7)", // Amber-400 glow
                "0px 0px 55px 15px rgba(252, 211, 77, 0.85)", // Amber-300 glow
                "0px 0px 30px 6px rgba(251, 191, 36, 0.65)",
                "0px 4px 12px rgba(202, 138, 4, 0.3)",
              ],
            }}
            whileTap={animatedButtonTapAnimation} // This tap animation should already be good for light theme
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
              color: { duration: 0.15 },
              borderColor: { duration: 0.15 },
              backgroundColor: { duration: 0.15 },
            }}
          >
            {/* Shine effects */}
            <motion.span
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
                  "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.6) 60%, transparent 100%)",
              }}
              aria-hidden="true"
            />
            <motion.span
              className="absolute inset-0 block opacity-80"
              initial={{ x: "150%", skewX: "25deg", scaleY: 0.6 }}
              whileHover={{ x: "-150%" }}
              transition={{ duration: 0.5, ease: "linear", delay: 0.2 }}
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.95) 48%, rgba(255,255,255,0.95) 52%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            <span className="relative z-10">Claim Your Spot!</span>
            <motion.div
              className="relative z-10 inline-block ml-1"
              whileHover={{
                /* Icon animation */ x: [0, 5, -4, 5, -3, 4, 0],
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
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WaitlistSection;
