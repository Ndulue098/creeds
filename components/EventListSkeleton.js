import { Skeleton } from "@/components/ui/skeleton";
import { CarouselItem } from "@/components/ui/carousel";

export function EventsListSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <CarouselItem
          key={i}
          className="md:basis-1/2 lg:basis-1/3 max-w-[18rem] h-[22rem] md:h-[24rem]"
        >
          <div className="relative w-full h-full overflow-hidden shadow-md rounded-lg border border-green-600 bg-gradient-to-b from-green-100/40 to-black/10">
            <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
            <div className="absolute bottom-0 left-0 p-3 w-full space-y-2">
              <Skeleton className="h-6 w-3/4 bg-green-700/50" />
              <Skeleton className="h-4 w-1/2 bg-green-600/50" />
              <Skeleton className="h-4 w-1/3 bg-green-600/50" />
            </div>
          </div>
        </CarouselItem>
      ))}
    </>
  );
}
