import { motion } from "framer-motion";

export default function CircleLoader({ styles }: Readonly<{ styles: string }>) {
  return (
    <motion.div
      className={`w-16 h-16 border-4 border-sky-300/10   border-t-blue-500 rounded-full ${styles} `}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        ease: "linear",
        repeat: Infinity,
      }}
      aria-label="Loading"
    />
  );
}
