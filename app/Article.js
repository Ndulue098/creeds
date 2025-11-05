import ArticleCard from "@/components/ArticleCard";
import { getPosts } from "@/data/postData";
import TopArticle from "./TopArticle";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { TopArticleSkeleton } from "@/components/TopArticleSkeleton";
import { ArticleCardSkeleton } from "@/components/ArticleCardSkeleton";

export default async function Article() {
  const options = {
    pagination: { pageSize: 5, page: 1 },
  };
  const { posts } = await getPosts(options);
  console.log("post--->", posts);
  const [first, ...rest] = posts;
  return (
    <div className="max-w-6xl px-4 mb-24 w-full mx-auto ">
      <div className="flex justify-between lg:w-1/2 ml-auto
      w-full
      xl:bg-red-600 lg:bg-red-400 md:bg-blue-400 sm:bg-red-200
      ">
        <h2 className="text-4xl font-semibold text-center mb-12 text-gray-800 dark:text-gray-100 capitalize">
          Latest Article
        </h2>
        <Link href={"/blog-posts"}>
          <small className="flex items-center gap-2 mt-2">
            VIEW ALL <MoveRightIcon />
          </small>
        </Link>
      </div>

      <Suspense fallback={<TopArticleSkeleton />}>
        <TopArticle post={first} />
      </Suspense>

      <div className="grid max-w-[24rem] mx-auto sm:max-w-full sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {rest.map((post) => (
          <Suspense key={post.id} fallback={<ArticleCardSkeleton/>}>
            <ArticleCard post={post} type="bm" key={post.id} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
