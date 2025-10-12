import { getPosts } from "@/data/postData";
import ArticleCard from "./ArticleCard";
import SortFilter from "../admin-dashboard/SortFilter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function ArticleCards({
  searchParamsVal,
  page,
  sort,
  status,
}) {
  const option = {
    pagination: {
      page,
      pageSize: 20,
    },
    filter: {
      status,
    },
  };
  const { posts, totalPage } = await getPosts(option);
  console.log(posts);

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="grid  sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
      <footer className="w-full flex items-center justify-center gap-2 py-6">
        {Array.from({ length: totalPage }, (_, i) => {
          const filter = new URLSearchParams();

          if (searchParamsVal.status) {
            filter.set("status", searchParamsVal.status);
          }
          filter.set("page", `${i + 1}`);

          const isActive = page === i + 1;

          return (
            <Button
              key={i}
              asChild
              variant={isActive ? "default" : "outline"}
              className={cn(
                "w-9 h-9 text-sm transition-colors duration-200",
                isActive
                  ? "cursor-default pointer-events-none"
                  : "hover:bg-muted"
              )}
            >
              <Link
                href={`/blog-posts?${filter.toString()}`}
                aria-current={isActive ? "page" : undefined}
              >
                {i + 1}
              </Link>
            </Button>
          );
        })}
      </footer>
    </div>
  );
}
