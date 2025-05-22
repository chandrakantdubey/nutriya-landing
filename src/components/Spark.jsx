import { motion } from "framer-motion";

const Spark = ({ x, y, rotation, size, color, onAnimationComplete }) => {
  const initialX = Math.random() * 60 - 30; // Random initial offset for more natural burst
  const initialY = Math.random() * 60 - 30;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, // Center of the button (passed as prop)
        top: y, // Center of the button (passed as prop)
        width: size,
        height: size,
        backgroundColor: color,
        transformOrigin: "center center",
      }}
      initial={{
        x: initialX,
        y: initialY,
        scale: 0.2,
        opacity: 1,
        rotate: Math.random() * 360, // Random initial rotation
      }}
      animate={{
        x:
          initialX +
          (Math.random() * 150 - 75) * (Math.random() < 0.5 ? 1 : -1), // Spread outwards
        y:
          initialY +
          (Math.random() * 150 - 75) * (Math.random() < 0.5 ? 1 : -1), // Spread outwards
        scale: [0.3, 1.2, 0.1], // Pop and shrink
        opacity: [1, 0.8, 0],
        rotate: rotation + (Math.random() * 180 - 90),
      }}
      transition={{
        duration: 0.6 + Math.random() * 0.4, // Random duration
        ease: "easeOut",
        // times: [0, 0.7, 1] // Control timing of scale/opacity keyframes
      }}
      onAnimationComplete={onAnimationComplete} // Callback to remove spark
    />
  );
};

export default Spark;
