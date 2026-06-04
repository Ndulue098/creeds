"use client";

import { useAuthContext } from "@/context/auth";
import { Heart } from "lucide-react";
import { toggleLike } from "./action";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ToggleLike({ postId, isLiked, initialCount }) {
  const authContext = useAuthContext();

  const [liked, setLiked] = useState(Boolean(isLiked));
  const [count, setCount] = useState(Number(initialCount ?? 0));

  const router = useRouter();

  async function handleToggleLike() {
    const token = await authContext.currentUser?.getIdToken();

    if (!token) {
      toast.error("Error!", {
        description: "Login to like a post",
      });

      return;
    }

    try {
      const result = await toggleLike(token, postId);

      if (result?.error) {
        throw new Error(result.message || "Failed to update like");
      }

      const newLiked = result?.liked ?? !liked;
      setLiked(newLiked);
      setCount((prev) => prev + (newLiked ? 1 : -1));
      router.refresh();
    } catch (error) {
      toast.error("Error!", {
        description: "Failed to update like",
      });
    }
  }

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleToggleLike}
    >
      <Heart
        size={18}
        strokeWidth={1.5}
        className={cn(
          "transition",
          liked ? "fill-green-500 stroke-green-500" : "stroke-muted-foreground",
        )}
      />
      <small className="text-sm">{count}</small>
    </div>
  );
}
