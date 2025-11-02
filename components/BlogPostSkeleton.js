import { Skeleton } from "./ui/skeleton";

export default function BlogPostSkeleton() {
    return <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col h-full relative overflow-hidden border-[1px] bg-card rounded-md"
        >
          {/* Image Skeleton */}
          <div className="relative h-46 w-full overflow-hidden">
            <Skeleton className="h-46 w-full" />
          </div>

          {/* Content Skeleton */}
          <div className="p-4 space-y-3 flex-1 flex flex-col items-start">
            {/* Category + Date */}
            <div className="flex items-center justify-between w-full">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-12 rounded" />
            </div>

            {/* Title */}
            <Skeleton className="h-5 w-3/4 rounded" />

            {/* Preview text */}
            <div className="space-y-2 w-full">
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-5/6 rounded" />
              <Skeleton className="h-3 w-2/3 rounded" />
            </div>

            {/* Read more button */}
            <div className="mt-auto flex items-center gap-2 w-24">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
}

