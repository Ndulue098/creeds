import { auth, firestore } from "@/firebase/Server"
import { cookies } from "next/headers"
import "server-only"

export default async function getBookMarks() {
  const cookieStore = cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) return {};

  try {
    const verifiedIdToken = await auth.verifyIdToken(token);
    const snapShot = await firestore.collection("bookmarked").doc(verifiedIdToken.uid).get();
    return snapShot.data() || {};
  } catch (error) {
    console.error("Error verifying token or fetching bookmarks:", error);
    return {};
  }
}

export async function getBookMarkById(postId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) return {};

  try {
    const verifiedIdToken = await auth.verifyIdToken(token);
    const userDoc = await firestore
      .collection("bookmarked")
      .doc(verifiedIdToken.uid)
      .get();

    if (!userDoc.exists) {
      return { error: "No bookmarks found for this user" };
    }

    const bookmarks = userDoc.data();
    const isBookmarked = bookmarks?.[postId] || false;

    return { postId, isBookmarked };
  } catch (error) {
    console.error("Error verifying token or fetching bookmark:", error);
    return {};
  }
}