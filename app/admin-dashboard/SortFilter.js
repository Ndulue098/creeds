"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDownIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function SortFilter() {
    const searchParams=useSearchParams()
    const router=useRouter()
    const pathName=usePathname()

    const currentSort = searchParams.get("sort") || "asc"
    const currentFilter = searchParams.get("status") || ""

    const setParam=useCallback((key,value)=>{
        const params=new URLSearchParams(searchParams.toString())
        // if(value){
        //     params.set(key,value)
        // }
        // else{
        //     params.delete(key)
        // }
        params.set(key,value)
        params.set("page","1")
        router.replace(`${pathName}?${params}`)
        // router.push(`?${params.toString}`)
    },[router,searchParams,pathName])


  return (
    <div className="flex   gap-4 text-sm">
      <div>
        
        <p className="tracking-widest text-xs uppercase font-medium mb-2 text-gray-500">
      Sort By
    </p>
        <div className="flex gap-2">
            {/* <div className="p-1 flex items-center text-center px-3 border-[1px] rounded-sm">
            Asc
            <ArrowUpDownIcon size={14}/>
        </div> */}
        <button
            onClick={() => setParam("sort", "asc")}
            className={`p-1 flex items-center px-3 border rounded-sm ${
              currentSort === "asc" ? "bg-gray-200" : ""
            }`}
          >
            Asc <ArrowUpDownIcon size={14} className="ml-1" />
          </button>
         <button
            onClick={() => setParam("sort", "desc")}
            className={`p-1 flex items-center px-3 border rounded-sm ${
              currentSort === "desc" ? "bg-gray-200" : ""
            }`}
          >
            Desc <ArrowUpDownIcon size={14} className="ml-1" />
          </button>
        </div>
      </div>
      <div>
        <p className="tracking-widest text-xs uppercase font-medium mb-2 text-gray-500">
      Filter
    </p>
        
        <Select value={currentFilter} onValueChange={(val) => setParam("status", val)}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="career">career</SelectItem>
            <SelectItem value="campuslife">campus-life</SelectItem>
            <SelectItem value="design">design</SelectItem>
            <SelectItem value="construction">construction</SelectItem>
        </SelectContent>
        </Select>
      </div>
    </div>
  );
}
{/* <div className="flex gap-8 text-sm items-start">
  <div>
    <p className="tracking-widest text-xs uppercase font-medium mb-2 text-gray-500">
      Sort By
    </p>
    <div className="flex gap-2">
      <button className="flex items-center gap-1 px-3 py-1.5 border rounded-md bg-white hover:bg-gray-50 shadow-sm transition">
        Asc
        <ArrowUpDownIcon size={14} />
      </button>
      <button className="flex items-center gap-1 px-3 py-1.5 border rounded-md bg-white hover:bg-gray-50 shadow-sm transition">
        Dec
        <ArrowUpDownIcon size={14} />
      </button>
    </div>
  </div>

  <div className="flex-1">
    <p className="tracking-widest text-xs uppercase font-medium mb-2 text-gray-500">
      Filter
    </p>
    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
      {["Career", "Campus Life", "Design", "Construction"].map((cat) => (
        <button
          key={cat}
          className="px-3 py-1.5 text-sm rounded-full border bg-white hover:bg-gray-50 shadow-sm transition whitespace-nowrap"
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
</div> */}
