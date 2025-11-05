"use client";
import { Building2Icon } from "lucide-react";
import Link from "next/link";
import AuthBtn from "./AuthBtn";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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

    <nav className={`${pathname==="/blog-posts"||"/blogPost"&&""} ${pathname==="/"&&"fixed"}  top-0 left-0 w-full z-50`}>
      <div
        className={`${pathname==="/"&&"shadow-[0_4px_20px_rgba(0,0,0,0.1)]"} max-w-[90rem] mx-auto px-6 py-4 mt-3 flex items-center justify-between 
                
                bg-green-100/80 
                 border border-green-300/60 
                rounded-lg text-green-900  transition-all`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg tracking-wide text-green-800 hover:text-green-600 transition"
        >
          <Building2Icon className="w-6 h-6 text-green-800" />
          <span>CREED</span>
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-10 text-sm font-medium">
          {navLinks.map((navLink,id) => (
            <li key={id}>
              <Link
                href={navLink.link}
                scroll={true}
                className={`${pathname===navLink.link?"text-green-500":"text-green-800"} hover:text-green-500 transition-colors duration-200`}
              >
                {navLink.name}
              </Link>
            </li>
          ))}

        </ul>

        {/* Auth Button */}
        <div>
          <AuthBtn />
        </div>
      </div>
    </nav>
  );
}
