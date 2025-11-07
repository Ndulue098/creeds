"use client";
import { Building2Icon } from "lucide-react";
import Link from "next/link";
import AuthBtn from "./AuthBtn";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

// className="max-w-[90rem] mx-auto px-6 py-4 mt-3 flex items-center justify-between
//           bg-gradient-to-r from-green-700/30 to-emerald-600/20
//           backdrop-blur-md border border-emerald-800/40
//           rounded-xl text-emerald-100 shadow-[0_0_10px_rgba(0,0,0,0.2)] transition-all"
// >
export default function Nav() {
  const pathname = usePathname();
  // const [hash,setHash]=useState("")
  // useEffect(() => {
  //   setHash(window.location.hash);

  //   const onHashChange = () => setHash(window.location.hash);
  //   window.addEventListener("hashchange", onHashChange);

  //   return () => window.removeEventListener("hashchange", onHashChange);
  // }, []);
  // console.log("pathname",pathname);
  // console.log("hash",hash);

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
  //  bg-gradient-to-r from-green-100/80 via-white to-green-100/80
  return (
    //  from-green-700 to-emerald-600 backdrop-blur-md

    <nav
      className={`absolute top-0 left-0 w-full z-50 `}
    >
      <div
        className={`${
          pathname === "/" && "shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
        } max-w-[90rem] mx-auto md:px-6 px-3 sm:py-4 py-3 md:mt-3 mt-0 flex items-center justify-between
        bg-green-100/80 border border-green-300/60 md:rounded-lg text-green-900 transition-all`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg tracking-wide text-green-800 hover:text-green-600 transition"
        >
          <Building2Icon className="w-6 h-6 text-green-800" />
          <span>CREED</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10 text-sm font-medium  ">
          {navLinks.map((navLink, id) => (
            <li key={id}>
              <Link
                href={navLink.link}
                scroll={true}
                className={`${
                  pathname === navLink.link
                    ? "text-green-500"
                    : "text-green-800"
                } hover:text-green-500 transition-colors duration-200`}
              >
                {navLink.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Button (Desktop) */}
        <div className="hidden md:block">
          <AuthBtn />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-green-400 text-green-700"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            {/* <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(0,100,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,100,0,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" /> */}

            <SheetContent
              side="left"
              className="w-[250px] bg-green-50 bg-gradient-to-b from-green-50 via-white to-green-100"
            >
              <SheetHeader>
                <SheetTitle
                  className="text-green-800 md:mt-3 mt-0 py-4 flex px-3 border-y border-green-300/60  font-bold text-lg items-center
                 gap-2  tracking-wide  hover:text-green-600 transition bg-green-100/80
                "
                >
                  <Building2Icon className="w-6 h-6 text-green-800" />
                  CREED
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col mt-6 space-y-4 text-green-800 ">
                {navLinks.map((navLink, id) => (
                  <Link
                    key={id}
                    href={navLink.link}
                    className={`${
                      pathname === navLink.link
                        ? "text-green-600 font-semibold"
                        : "hover:text-green-600"
                    } transition-colors duration-200 hover:bg-green-100 p-2 px-3`}
                  >
                    {navLink.name}
                  </Link>
                ))}

                <div className="pt-6 border-t px-4 border-green-200">
                  <AuthBtn />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
