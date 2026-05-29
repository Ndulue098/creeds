"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const stats = [
  { value: "4+", label: "Departments" },
  { value: "200+", label: "Students" },
  { value: "50+", label: "Articles" },
];

const IMAGE_URL =
  "https://images.unsplash.com/photo-1672954766776-cf2d157222b3?w=1600&auto=format&fit=crop&q=80";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={IMAGE_URL}
          alt="Construction worker"
          fill
          priority
          className="object-cover object-center scale-105"
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />

        {/* Green tint */}
        <div className="absolute inset-0 bg-green-950/30 mix-blend-multiply" />
      </div>

      {/* Ambient green glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-green-400/10 blur-3xl rounded-full" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
        }}
      />

      {/* Main Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 flex min-h-screen items-center justify-center px-6 sm:px-10"
      >
        <div className="w-full max-w-5xl text-center">
          {/* Eyebrow */}
          <motion.div variants={fadeUp} custom={0}>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2 backdrop-blur-xl">
              <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />

              <span className="text-[10px] uppercase tracking-[0.35em] text-white/70">
                Creeds · Student Journal
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="
              font-serif
              text-[3.2rem]
              leading-[0.95]
              tracking-[-0.05em]
              text-[#F5F5F0]
              sm:text-[4.5rem]
              md:text-[5.5rem]
              xl:text-[7rem]
            "
          >
            Beyond
            <span className="mx-3 text-green-400">Bricks</span>
            &
            <br />
            Beams.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-sm
              leading-relaxed
              text-white/65
              sm:text-base
              md:text-lg
            "
          >
            Creeds is the voice of our department — documenting ideas,
            architecture, innovation, campus culture, and the future of the
            builder’s craft through thoughtful stories and scholarly insight.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="
              mt-12
              flex
              flex-col
              items-center
              justify-center
              gap-4
              sm:flex-row
            "
          >
            <Link href="/blog-posts">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="
                  min-w-[200px]
                  rounded-md
                  border
                  border-green-400/20
                  bg-green-500
                  px-8
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-black
                  transition-all
                  duration-500
                "
              >
                View Articles
              </motion.button>
            </Link>

            <Link href="/#announcement">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="
                  min-w-[200px]
                  rounded-md
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-8
                  py-4
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-white
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:border-green-400/30
                "
              >
                Announcements
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="
              mt-16
              flex
              flex-wrap
              items-center
              justify-center
              gap-8
              sm:gap-16
            "
          >
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="border-l border-white/10 pl-5 text-left"
              >
                <p className="text-3xl font-light text-white sm:text-4xl">
                  {value}
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}  