"use server"

import { auth, firestore } from "@/firebase/Server"

export async function handleDeletePost(postId,token){
    const verifiedToken=await auth.verifyIdToken(token)
    if (!verifiedToken){
        return {
            error:true,
            message:"Unauthorized user"
        }
    }

    await firestore.collection("posts").doc(postId).delete()
}