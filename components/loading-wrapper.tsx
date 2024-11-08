// app/LoadingWrapper.js
"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initialLoading, setInitialLoading] = useState(true);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 30) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 5;
        return Math.min(oldProgress + diff, 30);
      });
    }, 30);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Handle initial load
  useEffect(() => {
    // wait for 1.5s
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {initialLoading && (
        <div className="fixed inset-0 z-[1000] bg-background flex flex-col items-center justify-center">
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
              className="h-full bg-pink"
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
      )}

      {children}
    </>
  );
}
