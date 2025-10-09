"use client";

import PostForm from "@/components/PostForm";
import { useAuthContext } from "@/context/auth";
import { storage } from "@/firebase/Client";
import { extractPostData } from "@/utils/extractPost";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter, useSearchParams } from "next/navigation";
import { createPost, saveImage } from "./action";

export default function AdminEditor() {
  const route=useRouter()
  const authContext=useAuthContext()
  
  const searchParams=useSearchParams();
  const category=searchParams.get("category") ||"design";
   
  async function onSave(data) {
    console.log("data",data);

      const token=await authContext.currentUser?.getIdToken()
      if(!token)return
      
      const author=await authContext.currentUser?.displayName
      const {image,article}=data
     const { title, article:artic} = extractPostData(article)
      // const { title, article} = extractPostData(data)

      const postData={
        title,
        artic,
        category,
        author,
        htmlString:article
      }
      
      console.log("postData",postData);
      
      const response= await createPost(token,postData)

      console.log(response);
      
      // ! fire store upload

      // const uploadTasks=[];
      if (image.file){
        const path=`posts/${response.id}/${Date.now()}-${image.file.name}`
        const storageRef=ref(storage,path);
        // paths.push(path);
        const uploadTask=uploadBytesResumable(storageRef,image.file)
        
        await new Promise((resolve,reject)=>{
          uploadTask.on(
            "state_changed",
            null,
            reject,
            ()=>resolve()
          )
        })
        
        const downloadURL=await getDownloadURL(storageRef)
        console.log(downloadURL);
        await saveImage({postId:response.id,image:downloadURL},token)
        
      }

     route.push("/admin-dashboard")
    
  }


  return <PostForm onSave={onSave}/>
}
