"use client";

import { useAuthContext } from "@/context/auth";
import { Bookmark } from "lucide-react";
import { addMarked, removeMarked } from "./action";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ToggleBookmark({ postId, marked }) {
  const authContext = useAuthContext();
  //   const token = authContext.currentUser.getIdToken();
  const route = useRouter();

  async function toggleMarked() {
    const tokenResult = await authContext?.currentUser?.getIdTokenResult();
    //   const token = await authContext.currentUser?.getIdToken();
    if (!tokenResult) {
      return;
    }
    if (!marked) {
      await addMarked(postId, tokenResult.token);
    } else {
      await removeMarked(postId, tokenResult.token);
    }
    route.refresh();
  }

  return (
    <div>
      <Bookmark
        onClick={toggleMarked}
        size={18}
        fill={marked ? "#db2777" : "white"}
        // fill={marked||""}
        className={cn("transition cursor-pointer")}
      />
    </div>
  );
}
