import ArticleCard from "@/components/ArticleCard";
import getBookMarks from "@/data/getBookMarks";
import { getPostByIds } from "@/data/postData";

export default async function page() {
  const mark = await getBookMarks();
  const postIds = Object.keys(mark);
  console.log(postIds);

  const markedPost = await getPostByIds(postIds);
  console.log(markedPost);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-10 ">
      <h1>Your Bookmarks</h1>
      <div className="grid  sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {markedPost.map((post, i) => (
          <ArticleCard key={post.id} post={post} type={"bm"}/>
        ))}
      </div>
    </div>
  );
}
