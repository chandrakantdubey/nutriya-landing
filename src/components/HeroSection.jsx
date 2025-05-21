import SectionWrapper from "./SectionWrapper";
import heroCenterPhone from "../assets/hero-center.png";
import heroLeftPhone from "../assets/hero-left.png";
import heroRightPhone from "../assets/hero-right.png";

const HeroSection = () => {
  return (
    <SectionWrapper>
      <section className="text-center">
        <div className="flex justify-end pr-6">
          <button className="text-sm border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 transition">
            Download App ↗
          </button>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mt-10">
          Your Fitness. Your Way. One Smart App
        </h1>
        <p className="text-gray-500 mt-4 text-lg">
          Track your steps and calories effortlessly. Stay motivated, every step
          of the way.
        </p>

        <button className="mt-6 px-6 py-3 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition">
          Explore More →
        </button>

        {/* Phone Images */}
        <div className="relative mt-16 flex justify-center items-end gap-4">
          <img
            src={heroLeftPhone}
            alt="Left phone"
            className="w-[160px] sm:w-[200px] translate-y-6 sm:translate-y-10"
          />
          <img
            src={heroCenterPhone}
            alt="Center phone"
            className="w-[180px] sm:w-[240px] z-10"
          />
          <img
            src={heroRightPhone}
            alt="Right phone"
            className="w-[160px] sm:w-[200px] translate-y-6 sm:translate-y-10"
          />
        </div>
      </section>
    </SectionWrapper>
  );
};

export default HeroSection;
