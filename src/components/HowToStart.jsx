import step1 from "../assets/step-1.png";
import step2 from "../assets/step-2.png";
import step3 from "../assets/step-3.png";
import step4 from "../assets/step-4.png";
export default function HowToStart() {
  const steps = [
    {
      id: 1,
      title: "Download the app",
      description:
        "You can download the app from App Store or Google Play Store",
      image: step1, // Example: tab-1-l
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

  return (
    <section className="w-full bg-gradient-to-br from-white to-[#f9f7fb] py-20 px-6">
      <div className="max-w-[1366px] mx-auto text-center">
        <span className="text-xs uppercase tracking-wide bg-gray-100 text-gray-800 px-3 py-1 rounded-full mb-4 inline-block">
          How to start
        </span>
        <h2 className="text-4xl font-bold mb-2">Getting Started is Simple!</h2>
        <p className="text-gray-500 text-base mb-12">
          Easy step to start your workout.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center space-y-4"
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-full max-w-[220px] mx-auto rounded-xl shadow-lg"
              />
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
