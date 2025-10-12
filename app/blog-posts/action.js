"use server"
import { auth, firestore } from "@/firebase/Server";
// import { firestore } from "firebase-admin";

export async function addMarked(postId,token){
    const verifiedToken=await auth.verifyIdToken(token)
    if(!verifiedToken){
        return {
            error:true,
            message:"Unauthorized",
        }
    }

    firestore.collection("bookmarked").doc(verifiedToken.uid).set({
        [postId]:true
    },{
        merge:true
    })
}