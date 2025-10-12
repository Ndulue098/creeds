"use client";

import { useAuthContext } from "@/context/auth";
import { Bookmark } from "lucide-react";
import { addMarked } from "./action";
import { cn } from "@/lib/utils";

export default function ToggleBookmark({postId,marked}) {
  const authContext = useAuthContext();
//   const token = authContext.currentUser.getIdToken();

  async function toggleMarked(){
    const tokenResult = await authContext?.currentUser?.getIdTokenResult();
    //   const token = await authContext.currentUser?.getIdToken();
    if(!tokenResult){
        return
    }
    addMarked(postId,tokenResult)

  }

  return (
    <div>
      <Bookmark
        onClick={toggleMarked}
        size={18}
        // fill={marked||""}
        className={cn("transition cursor-pointer", marked ? "fill-current" : "stroke-current")}
      />
    </div>
  );
}
