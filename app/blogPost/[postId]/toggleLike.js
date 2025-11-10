"use client";
import { useAuthContext } from "@/context/auth";
import { Heart } from "lucide-react";
import { toggleLike } from "./action";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ToggleLike({ postId,isLiked }) {
  const authContext = useAuthContext();
  const [liked, setLiked] = useState("");

  const route=useRouter()
    
  async function handleToggleLike() {
    const token = await authContext.currentUser?.getIdToken();
    if (!token) {
      toast.error("Error!", {
        description:"Login to like a post",
      });
    };
    
    const result = await toggleLike(token, postId);
    setLiked(result.liked);
    route.refresh()
  }

  return (
    <div>
      <Heart
        size={18}
        strokeWidth={1.5}
        onClick={handleToggleLike}
        className={cn(
          "cursor-pointer transition",
          isLiked ? "fill-green-500 stroke-green-500" : "stroke-muted-foreground"
        )}
      />
    </div>
  );
}
