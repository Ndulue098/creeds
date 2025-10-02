"use client";

import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useAuthContext } from "@/context/auth";
import { createPost } from "./action";
import { useRouter, useSearchParams } from "next/navigation";
import PostTextEditor from "@/components/PostTextEditor";
import { extractPostData } from "@/utils/extractPost";

export default function AdminEditor() {
  const route=useRouter()
  const authContext=useAuthContext()

  const searchParams=useSearchParams();
  const category=searchParams.get("category") ||"design";

  console.log(category); 
  
  async function onSave(data) {

      const token=await authContext.currentUser?.getIdToken()
      if(!token)return
      
     const { title, article} = extractPostData(data)
      const author=await authContext.currentUser?.displayName

      const postData={
        title,
        article,
        category,
        author,
        htmlString:data
      }
      console.log("postData",postData);
      
       const response= await createPost(token,postData)

     console.log(response);
       
     route.push("/admin-dashboard")
    
  }

  return (
    <div >
      <PostTextEditor onSave={onSave}/>
    </div>
  );
}
