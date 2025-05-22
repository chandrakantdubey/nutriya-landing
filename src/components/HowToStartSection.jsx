import { motion } from "framer-motion";
// Ensure these asset paths are correct relative to this component file
import downloadIcon from "../assets/download-green.png";
import heartIcon from "../assets/heart-orange.png";
import analyzeIcon from "../assets/analyze-blue.png";
import howToImage from "../assets/how-to.png"; // The image that animates from bottom
import heroBg from "../assets/hero-bg.png"; // The background image

const stepsData = [
  {
    id: 1,
    title: "Download App\n& Register",
    description: (
      <>
        You can download the app from
        <br />
        App Store or{" "}
        <span className="underline font-medium">Google Play Store</span>
      </>
    ),
    icon: downloadIcon,
    bgColor: "#CAFEA9", // green
  },
  {
    id: 2,
    title: "Start to live Fit\nand Healthy",
    description: "Your journey to a healthier\nlifestyle starts here.",
    icon: heartIcon,
    bgColor: "#FFD9BC", // orange
  },
  {
    id: 3,
    title: "Analyze &\nRepeat!",
    description: "Gain valuable insights into your\nprogress and performance.",
    icon: analyzeIcon,
    bgColor: "#E0F4FF", // blue
  },
];

const HowToStartSection = ({ isActive }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: isActive ? 0.3 : 0 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 }, // Slightly increased y for more noticeable entry
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, duration: 0.5 },
    },
  };

  const imageVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        duration: 0.8,
        delay: isActive ? 0.3 + stepsData.length * 0.15 : 0,
      },
    },
  };

  return (
    <div className="w-full bg-white flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-4 overflow-hidden">
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
      <motion.div
        className="w-full max-w-6xl mx-auto z-10" // Increased max-width for the whole section
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        <motion.span
          variants={itemVariants}
          className="text-xs uppercase tracking-wider bg-gray-100 text-gray-600 px-4 py-2 rounded-full mb-6 inline-block font-medium"
        >
          How to start
        </motion.span>
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900"
        >
          Getting Started is Simple!
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-gray-500 text-lg mb-12 sm:mb-16 max-w-xl mx-auto"
        >
          Easy step to start your workout.
        </motion.p>

        {/* Steps Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-8 mb-16 md:mb-24 items-start">
          {stepsData.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className={`relative`}
            >
              {/* Colored Card */}
              <div
                className="relative rounded-[28px] p-7 text-left shadow-lg h-full flex flex-col justify-between min-h-[260px] sm:min-h-[280px]"
                style={{ backgroundColor: step.bgColor }}
              >
                {/* Card content wrapper */}
                <div>
                  <img
                    src={step.icon}
                    alt="" // Decorative icon
                    className="absolute top-6 right-6 w-9 h-9 sm:w-10 sm:h-10"
                  />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 whitespace-pre-line leading-tight pr-10">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {step.id === 1 && (
                  <span className="absolute bottom-6 right-7 text-5xl sm:text-6xl font-extrabold text-black opacity-40 select-none">
                    01
                  </span>
                )}
              </div>
              {step.id !== 1 && (
                <span className="absolute bottom-6 right-7 text-5xl sm:text-6xl font-extrabold text-black opacity-40 select-none">
                  {String(step.id).padStart(2, "0")}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="w-full flex justify-center"
          variants={imageVariants}
        >
          <img
            src={howToImage}
            alt="App interface demonstration"
            className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-2xl" // Adjusted max-width and added shadow
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowToStartSection;
