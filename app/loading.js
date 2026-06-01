"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#050505] flex items-center justify-center overflow-hidden">
      {/* ambient glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-green-400/5 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="text-center"
        >
          <h1 className="text-white font-semibold tracking-[0.45em] text-3xl md:text-5xl">
            CREED
          </h1>

          <p className="mt-3 text-white/40 uppercase tracking-[0.35em] text-xs">
            Student Journal
          </p>
        </motion.div>

        {/* Progress Line */}
        <div className="mt-10 w-48 overflow-hidden rounded-full h-[2px] bg-white/10">
          <motion.div
            className="h-full bg-green-400"
            initial={{ x: "-100%" }}
            animate={{ x: "250%" }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          className="mt-5 text-sm tracking-[0.25em] uppercase text-white/35"
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
        >
          Loading
        </motion.p>
      </div>
    </div>
  );
}