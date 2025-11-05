"use client";
import { Suspense, useState } from "react";
import AnnouncementCard from "./AnnouncementCard";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { TopAnnouncementSkeleton } from "@/components/TopAnnouncementSkeleton";
import AnnouncementCardSkeleton from "@/components/AnnouncementCardSkeleton";

function datefn(str) {
  const date = new Date(str);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  return formattedDate;
}

export default function AnnouncementList({ announcements }) {
  const [topAnnounce, setTopAnnounce] = useState(announcements[0]);

  function setTop(val) {
    setTopAnnounce(val);
  }

  return (
    <>
      <Suspense fallback={<TopAnnouncementSkeleton />}>
        <div className="flex h-full overflow-y-scroll flex-col col-span-6 border-[1px]">
          <div className="px-4 relative">
            <div className="h-4 bg-white w-full sticky top-0"></div>
            <p className="text-sm text-gray-500 mb-2">{topAnnounce.author}</p>
            <Image
              width={500}
              height={300}
              alt={topAnnounce.title}
              src={topAnnounce.image}
              className="w-full h-56 object-scale-down rounded-md"
            />
            <div className="mt-3">
              <h2 className="text-xl font-semibold text-gray-800">
                {topAnnounce.title}
              </h2>
              <ReactMarkdown>{topAnnounce.message}</ReactMarkdown>
            </div>
            <div className="h-4 bg-white w-full sticky bottom-0"></div>
          </div>
        </div>
      </Suspense>

      <Suspense fallback={<AnnouncementCardSkeleton />}>
        <div
          className="flex h-full flex-col gap-3 items-center overflow-y-scroll col-span-6 lg:grid-cols-none"
          // onClick={top}
        >
          {announcements.map((announcement, i) => (
            <AnnouncementCard
              val={announcement}
              topAnnounce={topAnnounce}
              top={() => setTop(announcement)}
              key={i}
            />
          ))}
        </div>
      </Suspense>
    </>
  );
}
