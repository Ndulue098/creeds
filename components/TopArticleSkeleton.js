import { Skeleton } from "@/components/ui/skeleton";

export function TopArticleSkeleton() {
  return (
    <div className="grid grid-cols-2 mb-6 gap-6 animate-pulse">
      {/* Left — Image placeholder */}
      <div className="relative h-[24rem] w-full overflow-hidden rounded-lg border border-green-600 bg-gradient-to-b from-green-950 to-black/70">
        <Skeleton className="absolute inset-0 w-full h-full bg-green-700/40" />
      </div>

      {/* Right — Text placeholders */}
      <div className="p-4 pl-0 space-y-4 flex flex-col items-start w-full">
        {/* Category + Date */}
        <div className="flex items-center gap-3 w-full">
          <Skeleton className="h-5 w-20 bg-green-700/60 rounded-full" />
          <Skeleton className="h-4 w-16 bg-green-800/50 rounded" />
        </div>

        {/* Title */}
        <Skeleton className="h-10 w-3/4 bg-green-600/50 rounded-md" />
        <Skeleton className="h-10 w-2/3 bg-green-600/40 rounded-md" />

        {/* Preview paragraph */}
        <div className="space-y-2 w-full mt-auto">
          <Skeleton className="h-3 w-full bg-green-800/40" />
          <Skeleton className="h-3 w-5/6 bg-green-800/40" />
          <Skeleton className="h-3 w-4/6 bg-green-800/40" />
        </div>

        {/* Read more button */}
        <div className="flex items-center gap-2 mt-6">
          <Skeleton className="h-5 w-5 bg-green-700/60 rounded" />
          <Skeleton className="h-4 w-20 bg-green-700/60 rounded" />
        </div>
      </div>
    </div>
  );
}
