import { Button } from "@/components/ui/button";
import Link from "next/link";
import ArticleCards from "./ArticleCards";
import SortFilter from "../admin-dashboard/SortFilter";
import { Suspense } from "react";

export default async function page({ searchParams }) {
  const searchParamsVal = await searchParams;
  const pageInt=parseInt(searchParamsVal.page)
  const page=isNaN(pageInt)?1:pageInt
  const { sort, status } = searchParamsVal;


  return (
    <div>
      <h1>Blog post</h1>
      <Link href="/">
        <Button className="">Back</Button>
      </Link>
      <div className="max-w-7xl mx-auto flex flex-col gap-5 justify-end ">
        <Suspense>
          <SortFilter />
        </Suspense>
        <ArticleCards searchParamsVal={searchParamsVal} page={page} sort={sort} status={status} />
      </div>

    </div>
  );
}
