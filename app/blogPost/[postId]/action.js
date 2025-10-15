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

export async function toggleLike(token, postId) {
  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) {
    return { error: true, message: "Unauthorized user" };
  }

  const likeRef = firestore
    .collection("posts")
    .doc(postId)
    .collection("likes")
    .doc(verifiedToken.uid);

  const docSnap = await likeRef.get();

  if (docSnap.exists) {
    // If user already liked → remove like
    await likeRef.delete();
    return { liked: false };
  } else {
    // If not liked yet → add like
    await likeRef.set({ liked: true, createdAt: new Date() });
    return { liked: true };
  }
}