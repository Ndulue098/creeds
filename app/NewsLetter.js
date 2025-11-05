"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";

export default function NewsLetter() {
  return (
 <section className="max-w-6xl mx-auto my-20 grid grid-cols-1 md:grid-cols-[55fr_45fr] lg:gap-10 sm:gap-5 items-stretch px-6
 xl:bg-red-600 lg:bg-red-400 md:bg-blue-400 sm:bg-red-200
 ">
  {/* Left Section */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="border border-green-200 rounded-lg lg:p-10 p-5 flex flex-col justify-center bg-gradient-to-br from-green-50 via-white to-green-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
  >
    <h2 className="lg:text-4xl text-2xl font-bold mb-4 text-green-900">
      Weekly Insight
    </h2>
    <p className="text-lg text-green-800 mb-3">
      Stay informed and inspired — straight to your inbox.
    </p>
    <p className="text-sm text-gray-600 leading-relaxed">
      Get fresh perspectives, creative sparks, and behind-the-scenes updates 
      from the Department of Building. Designed to keep you connected with what’s 
      shaping the builder’s world.
    </p>
  </motion.div>

  {/* Right Section */}
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="flex flex-col justify-center rounded-lg bg-gradient-to-br from-green-700 to-emerald-600 lg:p-10 p-5 text-white shadow-[0_8px_24px_rgba(0,128,0,0.2)]"
  >
    <h2 className="lg:text-3xl text-2xl  font-semibold mb-6">
      Sign Up for Our Newsletter
    </h2>

    <form className="flex flex-col lg:flex-row gap-3">
      <Input
        type="email"
        placeholder="Enter your email"
        className="bg-white text-gray-700 placeholder:text-gray-500 rounded-full px-4 py-2 border border-green-100 focus-visible:ring-2 focus-visible:ring-green-300 flex-1"
      />
      <Button
        type="submit"
        className="bg-green-900 hover:bg-green-800 text-white rounded-full px-6"
      >
        Subscribe
      </Button>
    </form>

    <p className="text-xs mt-4 text-green-100/80">
      No spam — just valuable updates every week.
    </p>
  </motion.div>
</section>

  );
}
