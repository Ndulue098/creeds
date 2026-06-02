"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AuthBtn from "./AuthBtn";

export default function Nav() {
  const pathname = usePathname();

  const [heroInView, setHeroInView] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) {
      setHeroInView(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      {
        rootMargin: "-80px 0px 0px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    {
      name: "Articles",
      link: "/blog-posts",
    },
    {
      name: "Events",
      link: "/#event",
    },
    {
      name: "Announcements",
      link: "/#announcement",
    },
  ];

  const mobileContainer = {
    hidden: {
      opacity: 0,
      x: "-100%",
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.25,
      },
    },
  };

  const mobileItem = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <>
      <nav
        className={`${
          pathname === "/"
            ? "fixed top-0 left-0 w-full z-20"
            : "sticky top-0 left-0 w-full z-20"
        }`}
      >
        <div
          className={`
            transition-all
            duration-500
            ${
              heroInView
                ? "border-b-2 border-green-400/40 bg-black/70"
                : "bg-black/95 backdrop-blur-sm border-green-400/40"
            }
            border-b
          `}
        >
          <div className="max-w-[95rem] mx-auto px-6 md:px-10">
            <div className="h-20 flex items-center justify-between">
              {/* Logo */}
              <Link
                href="/"
                className="flex flex-col justify-center leading-none"
              >
                <span
                  className="
                    text-[0.95rem]
                    font-semibold
                    tracking-[0.4em]
                    uppercase
                    text-white
                  "
                >
                  CREED
                </span>

                <span
                  className="
                    mt-1
                    text-[9px]
                    uppercase
                    tracking-[0.3em]
                    text-white/40
                  "
                >
                  Student Journal
                </span>
              </Link>

              {/* Desktop Nav */}
              <ul className="hidden md:flex items-center gap-10">
                {navLinks.map((link) => {
                  const active = pathname === link.link;

                  return (
                    <li key={link.name}>
                      <Link
                        href={link.link}
                        className={`
                          text-sm
                          tracking-wide
                          transition-colors
                          duration-300
                          ${
                            active
                              ? "text-green-400"
                              : "text-white/60 hover:text-white"
                          }
                        `}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Desktop Auth */}
              <div className="hidden md:flex items-center">
                <div className="border-l border-white/10 pl-6">
                  <AuthBtn />
                </div>
              </div>

              {/* Mobile Button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="
                  md:hidden
                  text-white
                "
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="
                fixed
                inset-0
                z-40
                bg-black/70
                backdrop-blur-sm
              "
            />

            <motion.div
              variants={mobileContainer}
              initial="hidden"
              animate="show"
              exit="exit"
              className="
                fixed
                top-0
                left-0
                z-50
                h-screen
                w-[85%]
                max-w-[320px]
                bg-black
                border-r
                border-white/10
                px-6
                py-8
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white tracking-[0.4em] text-sm font-semibold">
                    CREED
                  </p>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-white/40">
                    Student Journal
                  </p>
                </div>

                <button onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              <div className="mt-10 border-t border-white/10 pt-8">
                <motion.div
                  variants={mobileContainer}
                  className="flex flex-col"
                >
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.name}
                      variants={mobileItem}
                    >
                      <Link
                        href={link.link}
                        onClick={() => setMobileOpen(false)}
                        className="
                          block
                          py-4
                          text-lg
                          text-white/70
                          hover:text-green-400
                          transition-colors
                        "
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  variants={mobileItem}
                  className="mt-10 border-t border-white/10 pt-8"
                >
                  <AuthBtn />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}