import { motion } from "framer-motion";
import {
  FaRunning,
  FaAppleAlt,
  FaMobileAlt,
  FaHeartbeat,
  FaTint,
  FaCheckCircle,
} from "react-icons/fa";

const features = [
  // ... (your features data)
  {
    icon: <FaRunning className="text-2xl text-blue-500" />,
    title: "Smarter Tracking, Zero Effort",
    desc: "Get moving smarter, not harder. Our app gives you effortless daily tracking with zero fuss.",
  },
  {
    icon: <FaAppleAlt className="text-2xl text-purple-500" />,
    title: "Protein - Eat Smarter",
    desc: "Plan meals with purpose. Log smarter food choices, get personalized insights.",
  },
  {
    icon: <FaMobileAlt className="text-2xl text-pink-500" />,
    title: "Your Wellness, One Tap Away",
    desc: "Health data simplified. Access workouts, nutrition, and sleep stats instantly.",
  },
  {
    icon: <FaHeartbeat className="text-2xl text-yellow-500" />,
    title: "Improve Recovery",
    desc: "Monitor energy levels and adjust workouts based on recovery data.",
  },
  {
    icon: <FaTint className="text-2xl text-cyan-500" />,
    title: "Stay Hydrated, Stay Energized",
    desc: "Water tracking that keeps you alert, energetic, and in control of your goals.",
  },
  {
    icon: <FaCheckCircle className="text-2xl text-green-500" />,
    title: "Build Lasting Habits",
    desc: "Daily goals, reminders, and feedback to help build routines that stick.",
  },
];

const FeaturesSection = ({ isActive }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: isActive ? 0.2 : 0 },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-center py-10 sm:py-16 px-4 sm:px-6 overflow-y-auto bg-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        className="w-full max-w-5xl mx-auto" // Content max width
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-semibold mb-5 text-gray-800"
        >
          Everything You Need to Stay Fit,
          <br className="hidden sm:block" /> in One App
        </motion.h2>
        <motion.div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-50 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-3">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-1 text-gray-700">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {["AI Photo Scan", "Calorie Tracker", "Progress Tracking"].map(
            (text) => (
              <button
                key={text}
                className="border border-gray-300 px-5 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300"
              >
                {text}
              </button>
            )
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturesSection;
