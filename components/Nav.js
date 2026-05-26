"use client";

import { Building2Icon, Menu } from "lucide-react";
import Link from "next/link";
import AuthBtn from "./AuthBtn";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";

export default function Nav() {
  const pathname = usePathname();

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

  return (
    <nav
      className={`${
        pathname === "/"
          ? "fixed top-0 left-0 w-full z-50"
          : "sticky top-0 left-0 w-full z-50"
      }`}
    >
      <div className="max-w-[95rem] mx-auto px-4 md:px-8 pt-4">
        {/* NAV CONTAINER */}
        <div
          className="
            relative
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-white/10
            bg-black/30
            px-5
            py-4
            backdrop-blur-2xl
            shadow-[0_8px_40px_rgba(0,0,0,0.35)]
            overflow-hidden
          "
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/[0.08] via-transparent to-green-400/[0.05]" />

          {/* subtle border glow */}
          <div className="absolute inset-0 rounded-2xl border border-green-400/10 pointer-events-none" />

          {/* LOGO */}
          <Link
            href="/"
            className="
              relative
              z-10
              flex
              items-center
              gap-3
              group
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-green-400/20
                bg-green-400/10
                backdrop-blur-xl
                transition-all
                duration-500
                group-hover:bg-green-400
                group-hover:scale-105
              "
            >
              <Building2Icon className="h-5 w-5 text-green-400 group-hover:text-black transition-colors duration-500" />
            </div>

            <div className="flex flex-col gap-1.5 leading-none">
              <span
                className="
                  text-[0.9rem]
                  font-semibold
                  tracking-[0.35em]
                  text-white
                "
              >
                CREED
              </span>

              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                Student Journal
              </span>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <ul
            className="
              hidden
              md:flex
              items-center
              gap-2
              
              p-2
            "
          >
            {navLinks.map((navLink, id) => {
              const active = pathname === navLink.link;

              return (
                <li key={id}>
                  <Link
                    href={navLink.link}
                    scroll={true}
                    className={`
                      relative
                      px-5
                      py-2
                      rounded-md
                      text-sm
                      font-medium
                      tracking-wide
                      transition-all
                      duration-300
                      ${
                        active
                          ? "bg-green-400 text-black "
                          : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                      }
                    `}
                  >
                    {navLink.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* DESKTOP BUTTON */}
          <div className="hidden md:block relative z-10">
            <div
              className="
                rounded-md
                border
                border-green-400/20
                bg-green-400/10
                p-1
                px-2.5
                backdrop-blur-xl
              "
            >
              <AuthBtn />
            </div>
          </div>

          {/* MOBILE MENU */}
          <div className="md:hidden relative z-10">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    text-white
                    backdrop-blur-xl
                    hover:bg-green-400
                    hover:text-black
                    transition-all
                    duration-300
                  "
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="
                  w-[300px]
                  border-r
                  border-white/10
                  bg-[#050505]/95
                  backdrop-blur-3xl
                  text-white
                  p-0
                "
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-green-400/[0.08] via-transparent to-transparent" />

                {/* Header */}
                <SheetHeader className="relative z-10 border-b border-white/10 p-6">
                  <SheetTitle
                    className="
                      flex
                      items-center
                      gap-3
                      text-white
                    "
                  >
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-green-400
                      "
                    >
                      <Building2Icon className="h-5 w-5 text-black" />
                    </div>

                    <div className="text-left">
                      <p className="text-sm tracking-[0.35em] font-semibold">
                        CREED
                      </p>

                      <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">
                        Student Journal
                      </p>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                {/* Links */}
                <div className="relative z-10 flex flex-col px-4 py-6">
                  {navLinks.map((navLink, id) => {
                    const active = pathname === navLink.link;

                    return (
                      <Link
                        key={id}
                        href={navLink.link}
                        className={`
                          group
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          px-4
                          py-4
                          text-sm
                          tracking-wide
                          transition-all
                          duration-300
                          mb-2
                          ${
                            active
                              ? "bg-green-400 text-black"
                              : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                          }
                        `}
                      >
                        {navLink.name}

                        <span
                          className={`
                            h-2
                            w-2
                            rounded-full
                            transition-all
                            duration-300
                            ${
                              active
                                ? "bg-black"
                                : "bg-white/20 group-hover:bg-green-400"
                            }
                          `}
                        />
                      </Link>
                    );
                  })}

                  {/* Auth */}
                  <div className="mt-6 border-t border-white/10 pt-6">
                    <div
                      className="
                        rounded-2xl
                        border
                        border-green-400/10
                        bg-green-400/5
                        p-2
                      "
                    >
                      <AuthBtn />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
