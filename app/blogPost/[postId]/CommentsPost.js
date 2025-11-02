import { getCommets } from "@/data/postData";
import Del from "./Del";

export default async function CommentsPost({ postId }) {
  const comments = await getCommets(postId);
  console.log("comment data",comments);

  return (
    <div
      id="comment"
      className="max-w-4xl w-full mx-auto my-8 border-t border-border"
    >
      {comments.length > 0 &&
        comments.map((c) => (
          <div key={c.id} className="mt-8 space-y-6">
            <div className="flex justify-between items-start border-b border-border pb-4 last:border-0 last:pb-0">
              <div>
                <p className="text-sm text-foreground mb-1">{c.comment}</p>
                <span className="text-xs text-muted-foreground">
                  — {c.author} •{" "}
                  {new Date(
                    c.createdAt?.toDate?.() || c.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>
                  <Del commendId={c.id} postId={postId} author={c.author}/>
            </div>
          </div>
        ))}
    </div>
  );
}
