"use client"
import PostTextEditor from "@/components/PostTextEditor";
import { useAuthContext } from "@/context/auth"
import { updatePost } from "./action";
import { useRouter } from "next/navigation";

export default function EditPost({post}) {
  const route=useRouter()
    /* 
author: "Ndulue Christian"
createdAt: "2025-09-26T23:51:42.269Z"
html: "<h1>Hello this is a test of time</h1>\n<p>and times will be tested</p>"
id: "njaLd8di0EmVnVuxh2ji"
    */

    const authContext=useAuthContext()

    async function edit(data){
        const token=await authContext.currentUser.getIdToken()
        if(!token)return

        console.log(data);
        
      const response= await updatePost({id:post.id,html:data},token)

         route.push("/admin-dashboard")
    }

    return <div>
            <PostTextEditor post={post} onSave={edit} />
        </div>
}

