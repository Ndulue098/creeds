import { getPosts } from "@/data/postData";
import ArticleCard from "./ArticleCard";

export default async function ArticleCards() {
  const {posts}=await getPosts()
console.log(posts);

    return <div className="grid max-w-7xl mx-auto sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {posts.map((post) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </div>
}

