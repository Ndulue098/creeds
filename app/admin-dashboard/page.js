import { getAnnouncement, getEvent, getPosts } from "@/data/postData";
import PostCard from "./PostCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PostBtn from "./PostBtn";
import SortFilter from "./SortFilter";
import { Suspense } from "react";
import AnnouncementBtn from "./announcement/AnnouncementBtn";
import Eventbtn from "./event/Eventbtn";
import AnnouncementsCard from "./AnnouncEditCard";
import EventsCard from "./EventsCard";
import AnnouncEditCard from "./AnnouncEditCard";

export default async function page({searchParams}) {
  const searchParamsVal= await searchParams
   const parsedPage=parseInt(searchParamsVal?.page);
   const page=isNaN(parsedPage)?1:parsedPage
   
  const {sort,status}=searchParamsVal
  // {sort: 'asc', status: 'career'}
  console.log(page);
  console.log("searchparams",searchParamsVal);
  
  const items=[{label:"admin-dashboard"}]

  // const [cabin,bookedDates]=await Promise.all([getCabin(cabinid),getBookedDatesByCabinId(cabinid)])
    const [announcement,event]= await Promise.all([getAnnouncement(),getEvent()])
    console.log("promise",announcement);
    console.log("promise",event);  
    


  return (
    <div className="max-w-7xl w-full mx-auto space-y-4 p-4">
      <h2 className="text-3xl font-bold mb-4">Admin dashboard</h2>
      
      <div className="flex justify-between gap-4 items-end">
        <PostBtn/>
        <Suspense>
          <SortFilter/>
        </Suspense>
      </div>
      
      <PostCard page={page} sort={sort} status={status} searchParamsVal={searchParamsVal}/>
      <div className="grid grid-cols-2 gap-4 min-h-[20rem]">
        {/* <AnnouncementsCard/> */}
        <AnnouncEditCard Btn={AnnouncementBtn} data={announcement} label={"announcement"}/>
        <AnnouncEditCard Btn={Eventbtn} data={event} label={"event"}/>
        {/* <EventsCard/> */}
      </div>
    </div>
  );
}
