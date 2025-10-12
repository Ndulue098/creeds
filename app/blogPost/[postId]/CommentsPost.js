import { getCommets } from "@/data/postData";

export default async function CommentsPost({ postId }) {
  const comments =await getCommets(postId);
  console.log(comments); 
  
  return (
    <div className="max-w-4xl w-full mx-auto my-8 border-t border-border ">
      {comments.length>0 && comments.map((c) => (
         <div key={c.id} className="mt-8 space-y-6">
        <div
          className="border-b border-border pb-4 last:border-0 last:pb-0"
          >
          <p className="text-sm text-foreground mb-1">{c.comment}</p>
          <span className="text-xs text-muted-foreground">
            — {c.author} •{" "}
            {new Date(
                c.createdAt?.toDate?.() || c.createdAt
            ).toLocaleDateString()}
          </span>
        </div>
      </div>
      ))}
    </div>
  );
}
