"use server"

import { auth, firestore } from "@/firebase/Server"

export default async function updateEvent(data,token){
    const {id,...rest}=data
    const verifiedId=await auth.verifyIdToken(token)
    if(!verifiedId){
        return {
            error:true,
            message:"unauthorized"
        }
    }
    await firestore.collection("event").doc(id).update({
    ...rest,
    updatedAt: new Date(),
  });
   return {
    error:false,
    message: "Post updated successfully",
  }
}

