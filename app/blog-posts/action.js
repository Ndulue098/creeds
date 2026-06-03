"use server"
import { auth, firestore } from "@/firebase/Server";
import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";
// import { firestore } from "firebase-admin";

export async function addMarked(postId,token){
    try {
    const verifiedToken=await auth.verifyIdToken(token)
    if(!verifiedToken){
        return {
            error:true,
            message:"Unauthorized", 
        }
    }
    await firestore.collection("bookmarked").doc(verifiedToken.uid).set(
        {
            [postId]: true,
        },
        {
            merge: true,
        }
    );
    revalidatePath("/blog-posts");
    } catch (error) {
    return {
        error: true,
        message: "Something went wrong",
    };
}
}

export async function removeMarked(postId,token) {
     const verifiedToken=await auth.verifyIdToken(token)

    if(!verifiedToken){
        return {
            error:true,
            message:"Unauthorized"
        }
    }

    // removing a firestor collection
    await firestore.collection("bookmarked").doc(verifiedToken.uid).update({
        [postId]:FieldValue.delete()
    })
    revalidatePath("/blog-posts");
}

