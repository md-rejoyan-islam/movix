"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 5;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed h-screen  inset-0 z-[5000] bg-white flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-4 text-primary"
      >
        <Image
          src="/movix-logo.svg"
          alt="logo"
          width={220}
          height={220}
          priority
          className="w-48"
        />
      </motion.div>

      <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#af275b]"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-muted-foreground"
      >
        Loading amazing content...
      </motion.p>
    </div>
  );
}
