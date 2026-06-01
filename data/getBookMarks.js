import "server-only";
import { auth, firestore } from "@/firebase/Server";
import { cookies } from "next/headers";

export default async function getBookMarks() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) return {};

  try {
    const { uid } = await auth.verifyIdToken(token);

    const doc = await firestore
      .collection("bookmarked")
      .doc(uid)
      .get();

    return doc.data() ?? {};
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function getBookMarkById(postId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) {
    return {
      postId,
      isBookmarked: false,
    };
  }

  try {
    const { uid } = await auth.verifyIdToken(token);

    const doc = await firestore
      .collection("bookmarked")
      .doc(uid)
      .get();

    const bookmarks = doc.data() ?? {};

    return {
      postId,
      isBookmarked: Boolean(bookmarks[postId]),
    };
  } catch (error) {
    console.error(error);

    return {
      postId,
      isBookmarked: false,
    };
  }
}