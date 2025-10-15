"use server"

import { auth, firestore } from "@/firebase/Server";

export async function addAnnouncement(token, data) {
  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) return { error: true, message: "Unauthorized user" };

  // remove `image.file` before saving
  const { image, ...rest } = data;

  const docRefPost = await firestore.collection("announcements").add({
    ...rest,
    authorId: verifiedToken.uid,
    createdAt: new Date(),
  });

  return { success: true, id: docRefPost.id };
}


export async function saveImage({ postId, image }, token) {
  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) {
    return {
      error: true,
      message: "Unauthorized user",
    };
  }

  await firestore.collection("announcements").doc(postId).update({
    image,
  });

  return { success: true };
}