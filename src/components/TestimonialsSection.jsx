// src/components/TestimonialsSection.jsx
import { motion } from "framer-motion";
import avatar1 from "../assets/testimonials/avatar-1.png";
import avatar2 from "../assets/testimonials/avatar-2.png";
import avatar3 from "../assets/testimonials/avatar-3.png";

const testimonials = [
  {
    name: "Tom K.",
    role: "Fitness Enthusiast",
    avatar: avatar1,
    quote:
      "This app has revolutionized my fitness journey! The tracking is seamless and the insights are incredibly helpful. Highly recommend!",
  },
  {
    name: "James R.",
    role: "Busy Professional",
    avatar: avatar2,
    quote:
      "Finally, a fitness app that understands my busy schedule. Quick logging, smart reminders, and I've seen a big difference.",
  },
  {
    name: "Amelia F.",
    role: "Marathon Runner",
    avatar: avatar3,
    quote:
      "The personalized workout plans and recovery tracking are fantastic. It's like having a personal coach in my pocket. My performance!",
  },
];

const TestimonialsSection = ({ isActive }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: isActive ? 0.3 : 0 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="h-full w-full bg-gray-900 text-white flex flex-col justify-center items-center pt-20 pb-10 px-4 sm:px-6 overflow-y-auto">
      <motion.div
        className="w-full max-w-5xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-semibold mb-3"
        >
          See what clients think about Us
        </motion.h2>
        <motion.div
          variants={itemVariants}
          className="h-1 w-20 bg-purple-500 mx-auto mb-10 sm:mb-12"
        ></motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center text-center"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-5 border-2 border-purple-400 object-cover"
              />
              <p className="text-gray-300 text-sm italic mb-5 leading-relaxed h-24 overflow-hidden">
                "{testimonial.quote}"
              </p>
              <h3 className="font-semibold text-lg mt-auto">
                {testimonial.name}
              </h3>
              <p className="text-purple-400 text-xs">{testimonial.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TestimonialsSection;
