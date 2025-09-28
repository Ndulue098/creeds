import { firestore } from "@/firebase/Server"
import "server-only"

export async function getPosts() {
  const snapShot = await firestore
    .collection("posts")
    .orderBy("createdAt", "desc")
    .get();

  const posts = snapShot.docs.map((doc) => {
    const data = doc.data(); // ✅ define data first

    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : data.createdAt,
      updated: data.updated?.toDate
        ? data.updated.toDate().toISOString()
        : data.updated,
    };
  });

  return posts;
}

export async function getPost(id) {
  const snapShot = await firestore.collection("posts").doc(id).get();

  if (!snapShot.exists) {
    return null;
  }

  const data = snapShot.data();

  return {
    id: snapShot.id,
    ...data,
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : data.createdAt,
    updated: data.updated?.toDate
      ? data.updated.toDate().toISOString()
      : data.updated,
  };
}