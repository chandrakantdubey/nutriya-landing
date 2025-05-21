import { useState } from "react";
import clsx from "clsx";
import tab1L from "../assets/tab-1-l.png";
import tab1S from "../assets/tab-1-s.png";
import tab2L from "../assets/tab-2-l.png";
import tab2S from "../assets/tab-2-s.png";
import tab3L from "../assets/tab-3-l.png";
import tab3S from "../assets/tab-3-s.png";

const tabs = [
  {
    id: "photo-scan",
    title: "Snap a Photo,\nLog a Meal Instantly",
    description:
      "Forget searching and typing—just take a photo of your meal, and let the app’s AI detect and log the food for you.",
    largeImg: tab1L,
    smallImg: tab1S,
  },
  {
    id: "calorie-tracker",
    title: "Know What You Eat,\nStay on Track",
    description:
      "By using this app, you can easily log meals, track calories, and stay in control of your nutrition.",
    largeImg: tab2L,
    smallImg: tab2S,
  },
  {
    id: "progress-tracking",
    title: "See Your Health\nImprove Over Time",
    description:
      "Track your steps, calories, and habits in one place. See insights and stay motivated day after day.",
    largeImg: tab3L,
    smallImg: tab3S,
  },
];

export default function TabsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = tabs[activeIndex];

  return (
    <section className="w-full bg-gradient-to-br from-white to-purple-50 py-20 px-6">
      <div className="max-w-[1366px] mx-auto flex flex-col items-center">
        {/* Tabs */}
        <div className="mb-10 flex space-x-4 bg-white p-1 rounded-full shadow-md">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveIndex(idx)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeIndex === idx
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {tab.id
                .split("-")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Text */}
          <div className="text-center lg:text-left max-w-xl">
            <h2 className="text-4xl font-semibold whitespace-pre-line mb-4">
              {activeTab.title}
            </h2>
            <p className="text-gray-600 text-lg">{activeTab.description}</p>
          </div>

          {/* Images */}
          <div className="relative">
            <img
              src={activeTab.largeImg}
              alt="Main content"
              className="w-[320px] sm:w-[360px] lg:w-[400px]"
            />
            <img
              src={activeTab.smallImg}
              alt="Highlight"
              className="absolute -bottom-6 -right-6 w-24 h-24 rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
