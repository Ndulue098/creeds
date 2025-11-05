import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowUpRightIcon, CalendarDays, MapPin } from "lucide-react";
// import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import UpcomingEventCard from "./UpcomingEventCard";
import eventImg from "@/public/events.svg";
import { getEvent } from "@/data/postData";
import ModalEvent from "./ModalEvent";
import EventsList from "./EventsList";
import { Suspense } from "react";
import { EventsListSkeleton } from "@/components/EventListSkeleton";

export default async function UpcomingEvent() {
  const events = await getEvent();

  console.log("event", events);

  return (
    <section className="max-w-7xl mx-auto my-24 px-4 scroll-smooth" id="event">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 capitalize">
            Upcoming Events
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-md">
            Stay informed about the latest departmental activities, workshops,
            and gatherings. Don’t miss any opportunity to connect, learn, and
            grow with <span className="font-semibold text-primary">CREEDS</span>
            .
          </p>
        </div>
      </div>
      <div className="flex gap-12 ">
        <div className="flex lg:w-auto w-full">
          <Carousel className=" lg:min-w-3xl w-full">
            <CarouselContent className="flex">
              <Suspense fallback={<EventsListSkeleton/>}>
                <EventsList events={events} />
              </Suspense>
            </CarouselContent>
            <CarouselPrevious className="absolute -translate-x-[50%] -left-[0%]" />
            <CarouselNext className="absolute translate-x-[50%] right-[0%]" />
          </Carousel>
        </div>
        <div className="relative h-[24rem] lg:block hidden rounded-md flex-1 overflow-hidden">
          <Image
            src={eventImg}
            alt="form illustration"
            fill
            className="object-contain lg:block hidden  absolute object-center brightness-105"
          />
        </div>
      </div>
    </section>
  );
}

/* 

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowUpRightIcon, CalendarDays, MapPin } from "lucide-react";
// import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import UpcomingEventCard from "./UpcomingEventCard";
import eventImg from "@/public/events.svg";

export default function UpcomingEvent({ events = [] }) {
  const event = events[0] || {
    title: "Excursion to UNILAG",
    date: "Oct 28, 2025",
    location: "University of Lagos, Yaba",
    description:
      "Fresh perspectives, creative sparks, and behind-the-scenes updates — explore what’s new and what’s next from the Department of Building.",
    image: "/images/unilag.jpg",
  };

  return (
    <section className="max-w-7xl mx-auto mt-24 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 capitalize">
            Upcoming Events
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-md">
            Stay informed about the latest departmental activities, workshops,
            and gatherings. Don’t miss any opportunity to connect, learn, and
            grow with <span className="font-semibold text-primary">CREEDS</span>
            .
          </p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition">
          View All
        </button>
      </div>

      <div className="flex gap-12 items-center">
        <div className="flex">
          <Carousel className="bg-gray-100 dark:bg-gray-800/40 rounded-xl shadow-sm">
            <CarouselContent className="flex">
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 max-w-[18rem] h-[22rem] md:h-[24rem]">
                <UpcomingEventCard event={event} />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 max-w-[18rem] h-[22rem] md:h-[24rem]">
                <UpcomingEventCard event={event} />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 max-w-[18rem] h-[22rem] md:h-[24rem]">
                <UpcomingEventCard event={event} />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute -translate-x-[50%] -left-[0%]" />
            <CarouselNext className="absolute translate-x-[50%] right-[0%]" />
          </Carousel>
        </div>

        <div className="relative h-[24rem] flex-1 rounded-xl overflow-hidden shadow-md">
          <Image
            src={eventImg}
            alt="form illustration"
            fill
            className="object-cover absolute object-center brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">Plan Ahead</h3>
            <p className="text-sm text-gray-200 max-w-xs">
              Be part of every activity that shapes our community and learning
              experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


{
  /* <div className="flex-1 bg-amber-50 dark:bg-gray-800 max-w-[24rem] h-[24rem]  border-[1px] -translate-x-[4rem] p-6 md:p-8">

    

    <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
      {event.description}
    </p>

    <button className="mt-6 px-6 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all">
      Learn More
    </button>
  </div> 
}



*/

{
  /* <div className="flex-1 bg-amber-50 dark:bg-gray-800 max-w-[24rem] h-[24rem]  border-[1px] -translate-x-[4rem] p-6 md:p-8">

    

    <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
      {event.description}
    </p>

    <button className="mt-6 px-6 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all">
      Learn More
    </button>
  </div> */
}
