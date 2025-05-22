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
import ctaPhoneMain from "../assets/cta-tilt.png";
import ctaPhoneSecondary from "../assets/cta-straight.png";
import NutriaLogoColor from "../assets/nutria.svg";
import React, { useState } from "react";
import ctaBg from "../assets/cta-bg.png";
import anvisLogo from "../assets/anvis-logo.svg";

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

  const formGroupVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        // If this is a child of a staggered container, its delay is handled by staggerChildren
        // If it needs its own delay relative to parent, adjust here:
        // delay: isActive ? (darkCardContentVariants.visible.transition.delay + 0.15) : 0
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

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setSubmitMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage("");
    setMessageType("");

    // --- REPLACE THIS WITH YOUR ACTUAL API CALL ---
    try {
      console.log("Submitting email to waitlist:", email);
      // Example:
      // const response = await fetch('YOUR_API_ENDPOINT/join-waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      // if (!response.ok) {
      //   const errorData = await response.json().catch(() => ({ message: 'Submission failed. Please try again.' }));
      //   throw new Error(errorData.message || 'Submission failed. Please try again.');
      // }
      // const data = await response.json();
      // console.log('Waitlist success:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitMessage("Thanks for joining the waitlist! We'll be in touch.");
      setMessageType("success");
      setEmail(""); // Clear input on success
    } catch (error) {
      console.error("Waitlist submission error:", error);
      setSubmitMessage(
        error.message || "Something went wrong. Please try again."
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
    // --- END OF API CALL PLACEHOLDER ---
  };

  return (
    <motion.div
      className="h-full w-full flex flex-col justify-between items-center relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
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
          src={ctaBg}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="w-full max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col justify-center items-center text-center z-10">
        <motion.div
          variants={textAboveCardVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
        >
          <button className="bg-white text-gray-700 px-4 py-2 rounded-full shadow-md text-sm mb-6 hover:bg-gray-50 transition">
            About Us
          </button>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-4xl">
            Simplify your wellness with smart tracking for nutrition, workouts,
            and recovery. Build lasting habits, get personalized insights, and
            achieve your health goals effortlessly. Live energized.
          </p>
          {/* <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-6xl">
            Experience effortless wellness with smart, personalized tracking.
            From nutrition and workouts to recovery and hydration, we help you
            build lasting habits and achieve your goals—without the fuss. Gain
            valuable insights, boost your energy, and take control. Your journey
            to a healthier, more vibrant you, simplified.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-6xl">
            We empower your wellness journey with effortless daily tracking for
            workouts, nutrition, and sleep. Get personalized insights for
            smarter food choices, monitor recovery, stay hydrated, and build
            lasting habits with purposeful goals. It's simplified health,
            helping you live smarter, not harder, and achieve routines that
            stick.
          </p> */}
        </motion.div>
      </div>

      <div className="w-full flex justify-center items-end relative z-10">
        <motion.div
          className="relative w-full max-w-[1200px] max-h-[300px] bg-[#131313] rounded-[40px] sm:rounded-[60px] lg:rounded-[80px] px-6 sm:px-10 lg:px-16 flex flex-col justify-center" // Added more padding bottom
          style={{
            height: "auto",
            minHeight: "300px",
            md: { height: "366px" },
          }}
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
          <Sparkle top="5%" left="5%" size="w-1 h-1" duration={2.2} />
          <Sparkle top="8%" left="15%" size="w-2 h-2" duration={1.8} />
          <Sparkle top="12%" left="25%" size="w-1.5 h-1.5" duration={2} />
          <Sparkle top="15%" left="40%" size="w-1 h-1" duration={1.5} />
          <Sparkle top="10%" left="60%" size="w-2 h-2" duration={2.3} />
          <Sparkle top="8%" left="75%" size="w-1.5 h-1.5" duration={1.9} />
          <Sparkle top="15%" left="85%" size="w-1 h-1" duration={2.1} />
          <Sparkle top="20%" left="10%" size="w-1.5 h-1.5" duration={1.7} />
          <Sparkle top="25%" left="30%" size="w-1 h-1" duration={2.4} />
          <Sparkle top="22%" left="50%" size="w-2 h-2" duration={1.6} />
          <Sparkle top="28%" left="70%" size="w-1.5 h-1.5" duration={2.2} />
          <Sparkle top="25%" left="90%" size="w-1 h-1" duration={1.8} />
          <Sparkle top="35%" left="5%" size="w-2 h-2" duration={2} />
          <Sparkle top="32%" left="25%" size="w-1 h-1" duration={1.9} />
          <Sparkle top="38%" left="45%" size="w-1.5 h-1.5" duration={2.3} />
          <Sparkle top="35%" left="65%" size="w-1 h-1" duration={1.7} />
          <Sparkle top="40%" left="80%" size="w-2 h-2" duration={2.1} />
          <Sparkle top="45%" left="15%" size="w-1.5 h-1.5" duration={1.8} />
          <Sparkle top="48%" left="35%" size="w-1 h-1" duration={2.2} />
          <Sparkle top="42%" left="55%" size="w-2 h-2" duration={1.6} />
          <Sparkle top="50%" left="75%" size="w-1.5 h-1.5" duration={2} />
          <Sparkle top="55%" left="10%" size="w-1 h-1" duration={1.9} />
          <Sparkle top="58%" left="30%" size="w-2 h-2" duration={2.3} />
          <Sparkle top="52%" left="50%" size="w-1.5 h-1.5" duration={1.7} />
          <Sparkle top="60%" left="70%" size="w-1 h-1" duration={2.1} />
          <Sparkle top="65%" left="25%" size="w-2 h-2" duration={1.8} />
          <Sparkle top="62%" left="45%" size="w-1.5 h-1.5" duration={2.2} />
          <Sparkle top="68%" left="65%" size="w-1 h-1" duration={1.6} />
          <Sparkle top="70%" left="85%" size="w-2 h-2" duration={2} />
          <Sparkle top="75%" left="5%" size="w-1.5 h-1.5" duration={1.9} />

          <div className="flex flex-col align-center lg:flex-row items-center justify-between h-full">
            <motion.div
              className="w-full lg:w-2/3 text-center lg:text-left mb-10 lg:mb-0 z-10"
              variants={darkCardContentVariants}
              initial="hidden"
              animate={isActive ? "visible" : "hidden"}
            >
              <motion.h2
                variants={darkCardContentVariants}
                className="text-4xl sm:text-5xl lg:text-[60px] font-normal text-white leading-tight mb-2"
              >
                Something Healthy
                <br />
                Is Cooking
              </motion.h2>
              {/* --- JOIN WAITLIST FORM START --- */}
              <motion.div
                id="waitlist-form"
                variants={formGroupVariants} // This group will animate as part of the stagger if darkCardContentVariants has staggerChildren
                className="w-full max-w-sm mx-auto lg:mx-0 mt-2" // Max width for the form area
              >
                <h3 className="text-xl sm:text-xl text-white font-semibold mb-4 text-center lg:text-left">
                  Join Waitlist
                </h3>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-5 bg-white rounded-full overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-opacity-75 transition-all duration-300"
                >
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="col-span-3 px-5 sm:px-6 py-2 text-gray-800 placeholder-gray-500 focus:outline-none bg-transparent text-base sm:text-lg"
                    required
                    disabled={isSubmitting}
                    aria-label="Email Address for Waitlist"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="col-span-2 bg-[#5A5A5A] hover:bg-[#4A4A4A] text-white font-semibold px-6 sm:px-8 py-2 transition-colors duration-300 text-base sm:text-lg whitespace-nowrap rounded-full flex items-center justify-center cursor-pointer"
                  >
                    {isSubmitting ? "Joining..." : "Join"}
                  </button>
                </form>
                {submitMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-3 text-sm text-center lg:text-left ${
                      messageType === "success"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {submitMessage}
                  </motion.p>
                )}
              </motion.div>
              {/* --- JOIN WAITLIST FORM END --- */}
            </motion.div>
          </div>
        </motion.div>

        <div
          className="absolute -bottom-60 right-0 lg:right-[calc(50%-650px+50px)]
                       w-auto h-auto
                       flex items-end justify-center 
                       pointer-events-none 
                       pr-0 md:pr-4 lg:pr-8 pb-0"
        >
          <motion.img
            src={ctaPhoneSecondary}
            alt="App interface secondary view"
            className="relative z-0 w-[120px] sm:w-[140px] md:w-[180px] lg:w-[200px] xl:w-[240px]
                           transform translate-x-[100%] -translate-y-[5%] md:-translate-y-[10%] pointer-events-auto"
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
            src={ctaPhoneMain}
            alt="App interface main view"
            className="relative z-10 w-[150px] sm:w-[180px] md:w-[220px] lg:w-[240px] xl:w-[280px]
                           transform -translate-x-[50%] -translate-y-[0%] md:-translate-y-[5%] pointer-events-auto"
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
        className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center pt-8 pb-4 sm:pt-10 text-gray-700 z-10"
        variants={footerContentVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {/* <motion.div className="mb-6 sm:mb-8" variants={footerContentVariants}>
          {NutriaLogoColor ? (
            <img
              src={NutriaLogoColor}
              alt="Nutria Logo"
              className="h-10 sm:h-12"
            />
          ) : (
            <div className="text-3xl font-bold text-orange-600">Nutria</div>
          )}
        </motion.div> */}
        {/* <motion.div
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
        </motion.div> */}
        <motion.div className="mb-2" variants={footerContentVariants}>
          <div className="text-xl font-bold text-orange-600">
            Design and developed by
          </div>
        </motion.div>
        <motion.div
          className="flex flex-wrap justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8"
          variants={footerContentVariants}
        >
          {NutriaLogoColor ? (
            <img src={anvisLogo} alt="Nutria Logo" className="h-10 sm:h-12" />
          ) : (
            <div className="text-3xl font-bold text-orange-600">Nutria</div>
          )}
        </motion.div>
        <motion.div
          className="w-full pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-sm gap-y-3 sm:gap-y-0"
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
