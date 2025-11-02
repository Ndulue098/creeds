"use client"
import { useState } from "react";
import AccordionList from "./AccordionList";

const faqData = [
  {
    id: 1,
    title: "Are Building Technologists the same as Architects?",
    description:
      "No. Architects focus on the design and aesthetics of buildings, while Building Technologists ensure the structure is technically sound, safe, and properly constructed on-site.",
  },
  {
    id: 2,
    title: "Do Building Technologists design buildings?",
    description:
      "Yes, they prepare working drawings, structural details, and construction documentation. However, architectural approval for major public projects may require a licensed architect depending on regulations.",
  },
  {
    id: 3,
    title: "What does a Building Technologist actually do?",
    description:
      "They oversee materials, construction methods, site supervision, quality control, and ensure architectural designs are safely executed during construction.",
  },
  {
    id: 5,
    title:
      "What’s the difference between Building Technology and Civil Engineering?",
    description:
      "Civil Engineers handle large infrastructures like bridges and roads. Building Technologists focus mainly on residential, commercial, and industrial buildings.",
  },
  {
    id: 7,
    title: "Why do people confuse Building Technologists with Architects?",
    description:
      "Both work on buildings, but architects mainly design, while building technologists specialize in construction and technical execution.",
  },
  {
    id: 8,
    title: "Is Building Technology a professional course?",
    description:
      "Yes. It involves construction science, structural concepts, building materials, and project management — all vital to the built environment.",
  },
];

export default function Accordion() {
  const [isOpen, setIsOpen] = useState(null);

  return (
    <div className="max-w-4xl mx-auto w-full my-24 px-4">
  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-10 text-center">
    Common Questions
  </h2>

  <div className="divide-y divide-emerald-200 dark:divide-emerald-800 border border-emerald-200 dark:border-emerald-800 rounded-2xl bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm shadow-md">
    {faqData.map((data) => (
      <AccordionList
        key={data.id}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        data={data}
      />
    ))}
  </div>
</div>
  );
}

