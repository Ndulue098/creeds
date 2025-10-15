import "server-only"
import { firestore } from "@/firebase/Server";

export async function Likes(postId) {
    const likesSnapshot = await firestore
  .collection("posts")
  .doc(postId)
  .collection("likes")
  .get();

const likeCount = likesSnapshot.size;
return likeCount
}

