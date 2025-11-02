"use client";
import {
  ArrowUpRightIcon,
  Building2Icon,
  CalendarDays,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ModalEvent from "./ModalEvent";

function dateConvert(str) {
  const date = new Date(str);
  const formatted = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  return formatted;
}

export default function UpcomingEventCard({ event,onOpen }) {
  // const [open, setOpen] = useState(false);

  // const nameName=event?.name[0]
  // console.log(nameName); 

  return (
    <>
      {/* <Link href={`/event/${event.id}`} scroll={false}> */}
        <div className="flex-1" onClick={onOpen}>
          {/* <div className="flex-1" onChange={setOpen(prev=>!prev)}> */}
          {/* Event Image */}
          <div className="relative w-full max-w-[18rem] h-[22rem] md:h-[24rem] overflow-hidden shadow-md rounded-lg border border-green-600">
            <div className="relative w-full overflow-auto h-full group">
              <Image
                src={event.image}
                alt={event.title}
                width={600}
                height={400}
                className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 ease-in-out origin-center "
              />

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none"></div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
            {/* Overlapping text content */}
            <div className="absolute bottom-0 left-0 p-2  text-white">
              <h3 className="text-2xl leading-[1.5rem] font-semibold mb-2 drop-shadow-md">
                {event.title}
              </h3>
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4 text-green-400" />
                  <span>{dateConvert(event.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-green-400" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-2 text-green-400 hover:text-green-300 transition">
                <ArrowUpRightIcon className="h-4 w-4" />
                <small className="font-medium cursor-pointer">Read More</small>
              </div>
            </div>
          </div>
        </div>
      {/* </Link> */}
    </>
  );
}
