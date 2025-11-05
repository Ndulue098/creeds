"use client"
import { CarouselItem } from "@/components/ui/carousel";
import ModalEvent from "./ModalEvent";
import UpcomingEventCard from "./UpcomingEventCard";
import { useState } from "react";

export default function EventsList({events}){

  const [selectedEvent,setSelectedEvent]=useState(null);
  function openEvent(event){
    
    setSelectedEvent(event)
  }

  function closeModal(){
    setSelectedEvent(null)
  }

  console.log(selectedEvent);
   

  return (
    <>
      {events?.map((event) => (
        <CarouselItem
          key={event.id}
          className="md:basis-1/2 lg:basis-1/3 max-w-[18rem] h-[22rem] md:h-[24rem]"
        >
          <UpcomingEventCard event={event} onOpen={()=>openEvent(event)} />
        </CarouselItem>
      ))}

      {
        selectedEvent && (
        <ModalEvent event={selectedEvent} onclose={closeModal} />
      )
      }

    </>
  );
}
