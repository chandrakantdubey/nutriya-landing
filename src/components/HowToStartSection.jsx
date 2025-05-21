import { motion } from "framer-motion";
import step1 from "../assets/step-1.png";
import step2 from "../assets/step-2.png";
import step3 from "../assets/step-3.png";
import step4 from "../assets/step-4.png";

const steps = [
  // ... (your steps data)
  {
    id: 1,
    title: "Download the app",
    description: "You can download the app from App Store or Google Play Store",
    image: step1,
  },
  {
    id: 2,
    title: "Create & Personalized",
    description: "Create your account & set personalized your preferences!",
    image: step2,
  },
  {
    id: 3,
    title: "Start to live Fit and Healthy",
    description: "Your journey to a healthier lifestyle starts here.",
    image: step3,
  },
  {
    id: 4,
    title: "Analyze & Repeat!",
    description: "Gain valuable insights into your progress and performance.",
    image: step4,
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-white to-[#f9f7fb] flex flex-col justify-center items-center text-center py-10 sm:py-16 px-4 sm:px-6 overflow-y-auto">
      <motion.div
        className="w-full max-w-5xl mx-auto" // Content max width
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        <motion.span
          variants={itemVariants}
          className="text-xs uppercase tracking-wide bg-gray-200 text-gray-700 px-3 py-1 rounded-full mb-4 inline-block"
        >
          How to start
        </motion.span>
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-bold mb-2 text-gray-800"
        >
          Getting Started is Simple!
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-gray-500 text-base mb-10 sm:mb-12"
        >
          Easy step to start your workout.
        </motion.p>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="flex flex-col items-center text-center space-y-3 sm:space-y-4 p-2"
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-full max-w-[180px] sm:max-w-[200px] mx-auto rounded-xl shadow-lg mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-700">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 px-1">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowToStartSection;
