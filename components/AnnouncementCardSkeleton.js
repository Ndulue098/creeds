import { Skeleton } from "@/components/ui/skeleton"

export default function AnnouncementCardSkeleton() {
  return (
   <div className="flex h-full flex-col gap-3 items-center overflow-y-scroll lg:col-span-6 lg:grid-cols-none">
      {Array.from({ length: 3 }).map((_, i) => (
    <div key={i} className="flex items-center w-full flex-row-reverse border rounded-md overflow-hidden bg-card">
      {/* Image placeholder */}
      <Skeleton className="w-24 h-24" />

      {/* Text placeholder */}
      <div className="p-3 flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
    ))}
   </div>
  )
}
