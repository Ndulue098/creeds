import { auth, firestore } from "@/firebase/Server"
import { cookies } from "next/headers"
import "server-only"

export default async function getBookMarks() {
    const cookieStore=await cookies()
    const token=cookieStore.get("firebaseAuthToken")?.value
    if(!token){
        return {}
    }
    const verifiedIdToken=await auth.verifiedIdToken(token)
    if(!verifiedIdToken){
        return{
            error:true,
            message:"Unauthorized"
        }
    }

    const snapShot= await firestore.collection("bookmarked").doc(verifiedIdToken.uid).get()
    const bookedMarked=snapShot.data()
    return bookedMarked||{}
}

