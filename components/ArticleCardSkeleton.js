import { Skeleton } from "@/components/ui/skeleton";

export function ArticleCardSkeleton() {
  return (
    <div className="group flex flex-col h-full relative overflow-hidden border border-green-700/40 bg-gradient-to-b from-black via-green-950/40 to-black rounded-lg shadow-sm animate-pulse">
      {/* Image */}
      <div className="relative h-46 w-full overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full bg-green-800/40" />
        <div className="absolute top-2 right-2 z-10">
          <Skeleton className="h-6 w-6 rounded-md bg-green-700/60" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 flex-1 flex flex-col items-start">
        {/* Category + Date */}
        <div className="flex items-center justify-between gap-3 w-full">
          <Skeleton className="h-4 w-16 bg-green-700/60 rounded-full" />
          <Skeleton className="h-3 w-12 bg-green-800/50 rounded" />
        </div>

        {/* Title */}
        <Skeleton className="h-5 w-3/4 bg-green-600/50 rounded-md" />
        <Skeleton className="h-5 w-2/3 bg-green-600/40 rounded-md" />

        {/* Preview */}
        <div className="space-y-2 mt-2 w-full">
          <Skeleton className="h-3 w-full bg-green-800/40 rounded" />
          <Skeleton className="h-3 w-5/6 bg-green-800/40 rounded" />
          <Skeleton className="h-3 w-4/6 bg-green-800/40 rounded" />
        </div>

        {/* Read More */}
        <div className="flex items-center gap-2 mt-auto">
          <Skeleton className="h-4 w-4 bg-green-700/60 rounded" />
          <Skeleton className="h-3 w-16 bg-green-700/60 rounded" />
        </div>
      </div>
    </div>
  );
}
