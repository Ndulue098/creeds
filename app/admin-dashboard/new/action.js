"use server"

import { auth, firestore } from "@/firebase/Server"

export async function createPost(token,postData){
   const verifiedToken=await auth.verifyIdToken(token);
   
   if(!verifiedToken){
    return {
        error:true,
        message:"unauthorized user"
    }
   }

    const docRefPost = await firestore.collection("posts").add({
       ...postData,
      createdAt: new Date(),
    });

    return {success:true, id:docRefPost.id}
} 