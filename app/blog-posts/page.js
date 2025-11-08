import BlogPostSkeleton from "@/components/BlogPostSkeleton";
import { Quote } from "lucide-react";
import { Suspense } from "react";
import SortFilter from "../admin-dashboard/SortFilter";
import ArticleCards from "./ArticleCards";

export const metadata={
  title:"Articles"
}

export default async function page({ searchParams }) {
  const searchParamsVal = await searchParams;
  const pageInt = parseInt(searchParamsVal.page);
  const page = isNaN(pageInt) ? 1 : pageInt;
  const { sort, status } = searchParamsVal;

  return (
    <div className="max-w-7xl mx-auto mt-5 w-full py-4 pb-6">
      <div className="flex md:items-center justify-between mb-5 gap-6 px-4 md:flex-row flex-col 
      ">
        <div>
          <h1 className="text-5xl mb-3">
            <span className="font-medium">The </span>
            Blogs
          </h1>
          <div>
            <p className="max-w-2xl text-sm flex gap-2">
              <Quote /> Dive into stories, ideas, and insights that shape the
              way we create, build, and grow. From design concepts to real-world
              lessons, our blog keeps you inspired and informed
            </p>
          </div>
        </div>
        <Suspense fallback={<div>loading...</div>}>
          <div className="md:mt-auto ml-auto">
            
          <SortFilter />
          </div>
        </Suspense>
      </div>

      <Suspense fallback={<BlogPostSkeleton/>} key={pageInt}>
        <ArticleCards
          searchParamsVal={searchParamsVal}
          page={page}
          sort={sort}
          status={status}
        />
      </Suspense>
    </div>
  ); 
}
