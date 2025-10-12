import { getPosts } from "@/data/postData";
import PostCard from "./PostCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PostBtn from "./PostBtn";
import SortFilter from "./SortFilter";
import { Suspense } from "react";

export default async function page({searchParams}) {
  const searchParamsVal= await searchParams
   const parsedPage=parseInt(searchParamsVal?.page);
   const page=isNaN(parsedPage)?1:parsedPage
   
  const {sort,status}=searchParamsVal
  // {sort: 'asc', status: 'career'}
  console.log(page);
  console.log("searchparams",searchParamsVal);
  
  const items=[{label:"admin-dashboard"}]
   
  return (
    <div className="max-w-5xl mx-auto space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Admin dashboard</h2>
      
      <div className="flex justify-between items-end">
        <PostBtn/>
        <Suspense>
          <SortFilter/>
        </Suspense>
      </div>
      
      <PostCard page={page} sort={sort} status={status} searchParamsVal={searchParamsVal}/>
      
    </div>
  );
}
