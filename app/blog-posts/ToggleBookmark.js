"use client";

import { useAuthContext } from "@/context/auth";
import { Bookmark } from "lucide-react";
import { addMarked, removeMarked } from "./action";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ToggleBookmark({ postId, marked }) {
  const authContext = useAuthContext();
  //   const token = authContext.currentUser.getIdToken();
  const route = useRouter();

  async function toggleMarked() {
    // u can get access to roles like abmin etc
    const tokenResult = await authContext?.currentUser?.getIdTokenResult();
    //   const token = await authContext.currentUser?.getIdToken();
    if (!tokenResult) {
      route.push(`/login?post=${postId}`,{scroll:false})
      // route.push(`/login?redirect=/blog-posts/${postId}&bookmark=true`)
      return;
    }
    if (marked) {
      await removeMarked(postId, tokenResult.token);
      toast("Favourite",{
        description:"Post Removed from BookMark"
      })
    } else {
      await addMarked(postId, tokenResult.token);
      toast.success("Success",{
        description:"Post Added to BookMark"
      }) 
    }
    route.refresh();
  }

  return (
    <div>
      <Bookmark
        onClick={toggleMarked}
        size={18}
        strokeWidth={1}
        fill={marked ? "oklch(62.7% 0.194 149.214)" : "white"}
        // fill={marked||""}
        className={cn("transition cursor-pointer focus:ring-2 focus:ring-green-500")}
      />
    </div>
  );
}
