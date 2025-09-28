"use client";

import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useAuthContext } from "@/context/auth";
import { createPost } from "./action";
import { useRouter, useSearchParams } from "next/navigation";
import PostTextEditor from "@/components/PostTextEditor";

export default function AdminEditor() {
  const route=useRouter()
  const authContext=useAuthContext()

  const searchParams=useSearchParams();
  const category=searchParams.get("category");

  //! to be exported
  function extractPostData(htmlString) {
    // Parse the HTML string into a DOM tree
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Extract the first h1 as title
    const title = doc.querySelector("h1")?.textContent || "Untitled";

    // Remove h1 from article content (optional)
    const h1 = doc.querySelector("h1");
    if (h1) h1.remove();

    // Get the rest of the HTML as the article body
    const article = doc.body.innerHTML.trim();

    return { title, article };
  }


  async function onSave(data) {

      const token=await authContext.currentUser?.getIdToken()
      if(!token)return
      
     const { title, article } = extractPostData(data)
      const author=await authContext.currentUser?.displayName

      const postData={
        title,
        article,
        category,
        author
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
