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
  typingSpeed = 90, // ms per char while typing
  deletingSpeed = 40, // ms per char while deleting
  pauseAfterTyping = 1400, // ms pause after full sentence
  tick = 50, // interval tick in ms (should divide speeds)
}) {
  const [index, setIndex] = useState(0); // which quote in array
  const [text, setText] = useState(""); // currently displayed substring
  const [cursorVisible, setCursorVisible] = useState(true);

  // refs to hold mutable values used by the interval (avoid re-subscribing)
  const phaseRef = useRef("typing"); // "typing" | "pause" | "deleting"
  const charIndexRef = useRef(0); // how many chars currently shown
  const pauseRef = useRef(0); // ms counted during pause

  // helper to clear and restart text when quotes prop changes (optional)
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
        // accumulate time until typingSpeed reached (tick may be smaller)
        // we'll use charIndexRef increments controlled by accumulated ticks
        // Instead of accumulating ms, we update charIndex when enough ticks pass
        // Use a small counter stored in pauseRef to measure ticks for typing
        pauseRef.current += tick;
        if (pauseRef.current >= typingSpeed) {
          pauseRef.current = 0;
          // add next character
          if (charIndexRef.current < currentQuote.length) {
            charIndexRef.current += 1;
            setText(currentQuote.slice(0, charIndexRef.current));
          }
          // if finished typing
          if (charIndexRef.current >= currentQuote.length) {
            phaseRef.current = "pause";
            pauseRef.current = 0;
          }
        }
      } else if (phase === "pause") {
        // accumulate ms until pauseAfterTyping then go to deleting
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
            // move to next quote
            phaseRef.current = "typing";
            setIndex((prev) => (prev + 1) % currentQuotes.length);
          }
        }
      }
    }, tick);

    return () => clearInterval(interval);
  }, [index, typingSpeed, deletingSpeed, pauseAfterTyping, tick]);

  // blinking cursor interval (separate)
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);

  // When the index changes (we advanced to next quote), reset charIndexRef
  useEffect(() => {
    const currentQuote = quotesRef.current[index] ?? "";
    charIndexRef.current = 0;
    pauseRef.current = 0;
    phaseRef.current = "typing";
    setText(""); // start fresh for the new quote
    // no cleanup needed here
  }, [index]);
  // transform skew-2
  return (
    <section className="relative bg-gradient-to-r max-w-5xl mx-auto lg:rounded-lg transform transition-all duration-500  from-green-950 to-black  my-24 text-center lg:py-14 py-12 lg:px-6 px-4 text-gray-200 overflow-hidden
       xl:bg-red-600 lg:bg-red-400 md:bg-blue-400 sm:bg-red-200
    ">
      {/* Brick pattern overlay */}
      {/* <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_30px]" /> */}

      <div className="relative max-w-5xl mx-auto min-h-[6rem] flex flex-col   h-full rounded-md text-start">
        {/* Side accent bar */}
        {/* <div className="w-1.5 h-20 bg-green-500 mb-5 rounded-full"></div> */}

        <div className="flex items-center gap-3 w-full mb-2">
          <QuoteIcon
            size={48}
            strokeWidth={1}
            className="text-green-600 mb-3"
          />

          <motion.h2
            className="text-3xl lg:text-4xl leading-[1] font-semibold  text-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {text}
            <motion.span
              aria-hidden
              className="ml-1 text-green-400"
              animate={{ opacity: cursorVisible ? 1 : 0 }}
              transition={{ duration: 0.12 }}
            >
              |  
            </motion.span>
          </motion.h2> 
        </div>

        <motion.p
          className="mt-auto text-sm text-green-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          — THE CREEDS
        </motion.p>
      </div>
    </section>
  );
}
