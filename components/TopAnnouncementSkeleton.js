import { Skeleton } from "@/components/ui/skeleton";

export function TopAnnouncementSkeleton() {
  return (
    <div className="flex h-full overflow-y-scroll flex-col col-span-6 border border-green-800/40 rounded-md bg-gradient-to-b from-black via-green-950/20 to-black p-4 animate-pulse">
      {/* Sticky Top Spacer */}
      <div className="h-4 bg-transparent w-full sticky top-0"></div>

      {/* Author */}
      <Skeleton className="h-3 w-24 mb-2 bg-green-700/50 rounded" />

      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden rounded-md mb-4">
        <Skeleton className="absolute inset-0 bg-green-800/40" />
      </div>

      {/* Title */}
      <Skeleton className="h-5 w-3/4 bg-green-700/60 rounded mb-3" />

      {/* Message Body */}
      <div className="space-y-3">
        <Skeleton className="h-3 w-full bg-green-900/40 rounded" />
        <Skeleton className="h-3 w-5/6 bg-green-900/40 rounded" />
        <Skeleton className="h-3 w-4/6 bg-green-900/40 rounded" />
        <Skeleton className="h-3 w-3/4 bg-green-900/40 rounded" />
        <Skeleton className="h-3 w-2/3 bg-green-900/40 rounded" />
      </div>

      {/* Sticky Bottom Spacer */}
      <div className="h-4 bg-transparent w-full sticky bottom-0"></div>
    </div>
  );
}
