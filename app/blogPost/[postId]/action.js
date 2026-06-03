"use server";

import { auth, firestore } from "@/firebase/Server";
import { revalidatePath } from "next/cache";

export async function addComment(data, token) {
  try {
    const { postId, commentData } = data;

    const verifiedToken = await auth.verifyIdToken(token);

    if (!verifiedToken) {
      return {
        error: true,
        message: "Unauthorized user",
      };
    }

    await firestore
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        ...commentData,
        userId: verifiedToken.uid,
        createdAt: new Date(),
      });

    revalidatePath(`/blogPost/${postId}`);

    return {
      success: true,
      message: "Comment added",
    };
  } catch (error) {
    console.error("Add Comment Error:", error);

    return {
      error: true,
      message: "Failed to add comment",
    };
  }
}

export async function toggleLike(token, postId) {
  try {
    const verifiedToken = await auth.verifyIdToken(token);

    if (!verifiedToken) {
      return {
        error: true,
        message: "Unauthorized user",
      };
    }

    const likeRef = firestore
      .collection("posts")
      .doc(postId)
      .collection("likes")
      .doc(verifiedToken.uid);

    const docSnap = await likeRef.get();

    let liked = false;

    if (docSnap.exists) {
      await likeRef.delete();
      liked = false;
    } else {
      await likeRef.set({
        liked: true,
        createdAt: new Date(),
      });

      liked = true;
    }

    revalidatePath(`/blogPost/${postId}`);

    return { liked };
  } catch (error) {
    console.error("Toggle Like Error:", error);

    return {
      error: true,
      message: "Failed to update like",
    };
  }
}

export async function delComment(postId, commentId, token) {
  try {
    const verifiedToken = await auth.verifyIdToken(token);

    if (!verifiedToken) {
      return {
        error: true,
        message: "Unauthorized user",
      };
    }

    const commentRef = firestore
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId);

    const commentSnap = await commentRef.get();

    if (!commentSnap.exists) {
      return {
        error: true,
        message: "Comment not found",
      };
    }

    const commentData = commentSnap.data();

    if (commentData.userId !== verifiedToken.uid) {
      return {
        error: true,
        message: "You can only delete your own comments",
      };
    }

    await commentRef.delete();

    revalidatePath(`/blogPost/${postId}`);

    return {
      success: true,
      message: "Comment deleted",
    };
  } catch (error) {
    console.error("Delete Comment Error:", error);

    return {
      error: true,
      message: "Failed to delete comment",
    };
  }
}