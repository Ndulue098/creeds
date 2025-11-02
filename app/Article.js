import ArticleCard from "@/components/ArticleCard";
import { getPosts } from "@/data/postData";
import TopArticle from "./TopArticle";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";

export default async function Article() {
  const options = {
    pagination: { pageSize: 5, page: 1 },
  };
  const { posts } = await getPosts(options);
  console.log("post--->", posts);
  const [first, ...rest] = posts;
  return (
    <div className="max-w-6xl  mb-24 w-full mx-auto ">
      <div className="flex justify-between w-1/2 ml-auto">
        <h2 className="text-4xl font-semibold text-center mb-12 text-gray-800 dark:text-gray-100 capitalize">
          Latest Article
        </h2>
        <Link href={"/blog-posts"}>
          <small className="flex items-center gap-2 mt-2">VIEW ALL <MoveRightIcon/></small>
        </Link>
      </div>

      <TopArticle post={first} /> 

      <div className="grid  sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {rest.map((post) => (
          <ArticleCard post={post} type="bm" key={post.id} />
        ))}
      </div>
    </div>
  );
}
