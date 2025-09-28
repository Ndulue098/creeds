"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { PenTool, Hammer, Building2, GraduationCap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react"

export default function PostBtn() {
  const [showCategories, setShowCategories] = useState(false);

const categories = [
  { label: "Design & Architecture", value: "design", icon: PenTool },
  { label: "Construction & Materials", value: "construction", icon: Hammer },
  { label: "Campus Life & Projects", value: "campus-life", icon: Building2 },
  { label: "Tips & Career Advice", value: "career", icon: GraduationCap },
];


   return (
    <div className="relative flex items-stretch gap-2">
  {/* Main Button */}
  <Button
    className="h-full rounded-md"
    onClick={() => setShowCategories((prev) => !prev)}
  >
    Add Post
  </Button>

  {/* Animated Slide-Out Categories */}
  <AnimatePresence>
    {showCategories && (
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "auto", opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-center gap-2 bg-black rounded-md px-2  shadow-lg"
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.value}
              href={`/admin-dashboard/new?category=${cat.value}`}
              className="flex items-center justify-center p-2 hover:bg-white/10 rounded-md transition"
              title={cat.label}
              onClick={() => setShowCategories(false)}
            >
              <Icon className="h-5 w-5 text-white hover:text-green-400 transition-colors" />
            </Link>
          );
        })}
      </motion.div>
    )}
  </AnimatePresence>
</div>
  );
}
