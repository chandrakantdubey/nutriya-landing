import { motion } from "framer-motion";
import {
  FaRunning,
  FaAppleAlt,
  FaMobileAlt,
  FaHeartbeat,
  FaTint,
  FaCheckCircle,
} from "react-icons/fa";
import ai from "../assets/ai.png";
import protien from "../assets/protien.png";
import dumbbell from "../assets/dumbbell.png";
import sleep from "../assets/sleep.png";
import gymBottle from "../assets/gym-bottle.png";
import healthApp from "../assets/health-app.png";
import ctaBg from "../assets/cta-bg.png";

const features = [
  {
    icon: <img src={ai} className="text-2xl object-cover text-blue-500" />,
    title: "Smarter Tracking, Zero Effort",
    desc: "Get moving smarter, not harder. Nutria AI gives you effortless daily tracking with zero fuss.",
  },
  {
    icon: (
      <img src={protien} className="text-2xl object-cover text-purple-500" />
    ),
    title: "Eat Smarter",
    desc: "Plan meals with purpose. Log smarter food choices, get personalized insights.",
  },
  {
    icon: (
      <img
        src={dumbbell}
        className="text-2xl object-cover scale-[1.25] text-pink-500"
      />
    ),
    title: "Your Wellness, One Tap Away",
    desc: "Health data simplified. Access workouts, nutrition, and sleep stats instantly.",
  },
  {
    icon: (
      <img
        src={sleep}
        className="text-2xl object-cover scale-[0.9] text-yellow-500"
      />
    ),
    title: "Improve Recovery",
    desc: "Monitor your energy levels and adjust workouts based on recovery data integrated with Apple Watch, Garmin, Fitbit, or WHOOP.",
  },
  {
    icon: (
      <img
        src={gymBottle}
        className="text-2xl object-cover scale-[1.25] text-cyan-500"
      />
    ),
    title: "Stay Hydrated, Stay Energized",
    desc: "Water tracking that keeps you alert, energetic, and in control of your goals.",
  },
  {
    icon: (
      <img
        src={healthApp}
        className="text-2xl object-cover scale-[1.5] text-green-500"
      />
    ),
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
    <div className="h-full w-full flex flex-col justify-center items-center text-center py-10 sm:py-8 px-4 sm:px-6 overflow-y-auto bg-white">
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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        className="w-full max-w-5xl mx-auto z-10" // Content max width
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  font-semibold mb-5 text-gray-800"
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
                className="bg-blue-50 text-gray-700 px-4 py-2 rounded-full shadow-md text-sm mb-6 hover:bg-gray-50 transition"
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
