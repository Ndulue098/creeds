"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { dateConvert } from "@/lib/utils";
import Image from "next/image";
// import imagesvg from "@/public/imagebg.svg"

export default function ModalEvent({ event, onclose }) {
  const isOpen = Boolean(event);

  return (
    <Dialog open={isOpen} onOpenChange={onclose}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-green-700">
            {event?.title || "Event"}
          </DialogTitle>
        </DialogHeader>

        {/* Event Image */}
        <div className="relative w-full h-60 rounded-md overflow-hidden ">
          {/* <Image fill src={imagesvg} alt="bg" className="absolute"/> */}
          {event?.image && (
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-contain object-center z-40"
            />
          )}

        </div>

        {/* Event Details */}
        <DialogDescription className="space-y-3 break-words">
          <div className="min-h-[100px] ">
            {event?.message && (
              <p className="text-gray-700 break-words whitespace-normal">{event.message}</p>
            )}
          </div>


          <p className="font-medium">
            📍 Location:
            <span className="text-green-700 ml-1">{event?.location}</span>
          </p>

          <p className="font-medium">
            📅 Date:
            <span className="text-green-700 ml-1">
              {event?.date && dateConvert(event.date)}
            </span>
          </p>
        </DialogDescription>

        <DialogFooter className="text-sm text-center text-gray-600">
          More details will be sent to your email.
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
