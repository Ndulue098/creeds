"use client";
import { useAuthContext } from "@/context/auth";
import { Trash2 } from "lucide-react";
import { delComment } from "./action";

export default function Del({ commendId, author, postId }) {
  const authContext = useAuthContext();
  const displayName = authContext.currentUser?.displayName;

  async function handleDelete() {
    const token = await authContext.currentUser?.getIdToken();
    console.log(token);
    
    if (!token) {
      console.log("error in del Comment");

      console.error("Unauthorized user");
      return;
    }
    console.log("delComment function ref::", delComment);
    await delComment(postId, commendId, token);
  }

  if (author !== displayName) return null;

  return (
    <button
      type="button"
      className="text-muted-foreground hover:text-destructive transition-colors"
      aria-label="Delete comment"
      onClick={handleDelete}
    >
      <Trash2 className="size-4" />
    </button>
  );
}
