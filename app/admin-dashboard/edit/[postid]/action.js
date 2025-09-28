"use server"

import { auth, firestore } from "@/firebase/Server"

export async function updatePost(data,token){
    const {id,...res}=data
    console.log(data);
    
    console.log(res);
    
    const verifiedToken=await auth.verifyIdToken(token)
    if(!verifiedToken){
        return{
            error:true,
            message:"unauthorized user"
        }
    }

    await firestore.collection("posts").doc(id).update({
    ...res,
    updated:new Date(),
  })

  return {
    error:false,
    message: "Post updated successfully",
  }
}