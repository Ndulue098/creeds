"use client";

import { useAuthContext } from "@/context/auth";
import { Heart } from "lucide-react";
import { toggleLike } from "./action";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ToggleLike({ postId, isLiked }) {
  const authContext = useAuthContext();

  const [liked, setLiked] = useState(isLiked);

  const router = useRouter();

  async function handleToggleLike() {
    const token = await authContext.currentUser?.getIdToken();

    if (!token) {
      toast.error("Error!", {
        description: "Login to like a post",
      });

      return;
    }

    setLiked(prev => !prev);

    try {
      await toggleLike(token, postId);
      router.refresh();
    } catch (error) {
      setLiked(prev => !prev);

      toast.error("Error!", {
        description: "Failed to update like",
      });
    }
  }

  return (
    <Heart
      size={18}
      strokeWidth={1.5}
      onClick={handleToggleLike}
      className={cn(
        "cursor-pointer transition",
        liked
          ? "fill-green-500 stroke-green-500"
          : "stroke-muted-foreground"
      )}
    />
  );
}