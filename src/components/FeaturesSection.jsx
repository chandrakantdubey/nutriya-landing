import SectionWrapper from "./SectionWrapper";
import {
  FaRunning,
  FaAppleAlt,
  FaMobileAlt,
  FaHeartbeat,
  FaTint,
  FaCheckCircle,
} from "react-icons/fa";

const features = [
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

const FeaturesSection = () => {
  return (
    <SectionWrapper>
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Everything You Need to Stay Fit,
          <br className="hidden sm:block" /> in One App
        </h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow hover:shadow-lg transition"
            >
              <div className="mb-3">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button className="border border-black px-4 py-2 rounded-full text-sm hover:bg-black hover:text-white transition">
            Macro Goals
          </button>
          <button className="border border-black px-4 py-2 rounded-full text-sm hover:bg-black hover:text-white transition">
            Habit Tracker
          </button>
          <button className="border border-black px-4 py-2 rounded-full text-sm hover:bg-black hover:text-white transition">
            Progress Tracking
          </button>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default FeaturesSection;
