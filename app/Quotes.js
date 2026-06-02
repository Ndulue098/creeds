"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { QuoteIcon } from "lucide-react";

export default function Quote({
  quotes = [
    "The road to success is always under construction.",
    "We shape our buildings; thereafter they shape us.",
    "Safety and hard work form our foundation.",
    "We build more than structures—we build communities.",
    "Brick by brick, we build trust.",
  ],
  typingSpeed = 90,
  deletingSpeed = 40,
  pauseAfterTyping = 1400,
  tick = 50,
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const phaseRef = useRef("typing");
  const charIndexRef = useRef(0);
  const pauseRef = useRef(0);

  const quotesRef = useRef(quotes);

  useEffect(() => {
    quotesRef.current = quotes;
  }, [quotes]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentQuotes = quotesRef.current;
      const currentQuote = currentQuotes[index] ?? "";

      const phase = phaseRef.current;

      if (phase === "typing") {
        pauseRef.current += tick;

        if (pauseRef.current >= typingSpeed) {
          pauseRef.current = 0;

          if (charIndexRef.current < currentQuote.length) {
            charIndexRef.current += 1;
            setText(currentQuote.slice(0, charIndexRef.current));
          }

          if (charIndexRef.current >= currentQuote.length) {
            phaseRef.current = "pause";
            pauseRef.current = 0;
          }
        }
      } else if (phase === "pause") {
        pauseRef.current += tick;

        if (pauseRef.current >= pauseAfterTyping) {
          pauseRef.current = 0;
          phaseRef.current = "deleting";
        }
      } else if (phase === "deleting") {
        pauseRef.current += tick;

        if (pauseRef.current >= deletingSpeed) {
          pauseRef.current = 0;

          if (charIndexRef.current > 0) {
            charIndexRef.current -= 1;
            setText(currentQuote.slice(0, charIndexRef.current));
          }

          if (charIndexRef.current === 0) {
            phaseRef.current = "typing";
            setIndex((prev) => (prev + 1) % currentQuotes.length);
          }
        }
      }
    }, tick);

    return () => clearInterval(interval);
  }, [index, typingSpeed, deletingSpeed, pauseAfterTyping, tick]);

  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);

    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    charIndexRef.current = 0;
    pauseRef.current = 0;
    phaseRef.current = "typing";
    setText("");
  }, [index]);

  return (
    <section className="relative my-20 lg:my-28 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          max-w-6xl
          mx-auto
          overflow-hidden
          rounded-md
          border
          border-green-400/50
          bg-gradient-to-br
          from-[#f7faf7]
          via-white
          to-[#eef5ef]
          p-6
          sm:p-8
          lg:p-14
          shadow-[0_20px_80px_rgba(0,0,0,0.04)]
        "
      >
        {/* Decorative quote */}
        <QuoteIcon
          strokeWidth={1}
          className="
            absolute
            right-6
            top-6
            h-24
            w-24
            text-green-100
            lg:right-10
            lg:top-10
            lg:h-36
            lg:w-36
          "
        />

        {/* Accent line */}
        <div className="mb-8 h-px w-20 bg-green-600" />

        {/* Fixed-height content area */}
        <div className="min-h-[180px] lg:min-h-[220px] flex items-center">
          <h2
            className="
              relative
              z-10
              max-w-4xl
              text-left
              text-3xl
              sm:text-4xl
              lg:text-5xl
              xl:text-6xl
              font-serif
              leading-[1.08]
              tracking-[-0.04em]
              text-gray-900
            "
          >
            {text}

            <motion.span
              aria-hidden
              animate={{
                opacity: cursorVisible ? 1 : 0,
              }}
              transition={{
                duration: 0.1,
              }}
              className="ml-1 text-green-600"
            >
              ▌
            </motion.span>
          </h2>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center gap-4">
          <div className="h-px w-10 bg-green-600/40" />

          <p
            className="
              text-[11px]
              font-medium
              uppercase
              tracking-[0.35em]
              text-green-800
            "
          >
            THE CREEDS
          </p>
        </div>
      </motion.div>
    </section>
  );
}