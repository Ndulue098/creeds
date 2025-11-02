// "use client"
import { Button } from "@/components/ui/button";
import { BookOpen, Building2, Users } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import NewsLetter from "./NewsLetter";
import UpcomingEvent from "./UpcomingEvent";
import Article from "./Article";
import Announcemen from "./Announcemen";
import Accordion from "./Accordion";
import Footer from "./Footer";
import Hero from "./Hero";
import Quote from "./Quotes";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Hero />
      <NewsLetter />
      <UpcomingEvent />
      <Quote />
      <Article />
      <Announcemen />
      <Accordion />
      <Footer />
    </div>
  );
}
