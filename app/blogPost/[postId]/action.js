"use server"

import { auth, firestore } from "@/firebase/Server"
import { revalidatePath } from "next/cache"

export async function addComment(data,token){
    const {postId,commentData}=data
    const verifiedToken=await auth.verifyIdToken(token)

    if(!verifiedToken){
    return {
        error:true,
        message:"unauthorized user"
    }
   }

   await firestore.collection("posts").doc(postId).collection("comments").add({
    ...commentData,
    createdAt: new Date(),
   })

   revalidatePath(`/blogPost/${postId}`)
   return {success:true,message:"comment added"}
}