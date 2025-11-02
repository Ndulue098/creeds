import "server-only";

import { firestore } from "@/firebase/Server";
import { getTotalPage } from "./getTotalPage";

export async function getPosts(option) {
  const { pagination, filter, sort = "desc" } = option || {};
  const { page, pageSize = 5 } = pagination || {};
  const { status } = filter || {};
  console.log("ps", status);

  console.log("sort--", sort);

  // let snapShot = firestore.collection("posts").orderBy("createdAt", "desc");
  let snapShot = firestore.collection("posts");
  // .limit(pageSize)
  // .get();

  if (status && status !== "all") {
    // const statusArr
    snapShot = snapShot.where("category", "==", status);
  }

  snapShot = snapShot.orderBy("createdAt", sort || "desc");

  const totalPage = await getTotalPage(snapShot, pageSize);
  const postSnapShot = await snapShot
    ?.limit(pageSize)
    .offset((page - 1) * pageSize)
    .get();

  const posts = postSnapShot.docs.map((doc) => {
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

  // return {posts,totalPage};
  return { posts, totalPage };
}

/* export async function getPosts(option) {
  const { pagination, filter } = option || {};
  const { page = 1, pageSize = 5 } = pagination || {};
  const { status } = filter || {};

  let query = firestore.collection("posts").orderBy("createdAt", "desc");

  // Optional filtering by category
  if (status && status !== "all") {
    query = query.where("category", "==", status);
  }

  // Limit to 5 (or whatever pageSize is)
  const snapshot = await query.limit(pageSize).get();

  const posts = snapshot.docs.map((doc) => {
    const data = doc.data();
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

  return { posts, totalPage: 1 }; // since we're only fetching a fixed number
} */

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

export async function getPostByIds(postIds) {
  if (!postIds.length) {
    return [];
  }
  // where name revers to the id of the document. so u grabing document by id .where("__name__", "in", ["id1", "id2"])
  const propertiesSnapshot = await firestore
    .collection("posts")
    .where("__name__", "in", postIds)
    .get();

  const propertyData = propertiesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return propertyData;
}

export async function getCommets(postId) {
  const commentsRef = await firestore
    .collection("posts")
    .doc(postId)
    .collection("comments") // ✅ comments should be a subcollection
    .orderBy("createdAt", "desc");

  const commentSnap = await commentsRef.get();

  return commentSnap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : data.createdAt,
    };
  });
}

export async function getAnnouncement() {
  const snapShot = firestore
    .collection("announcements")
    .orderBy("createdAt", "desc");
  const dataSnaps = await snapShot.get();

  return dataSnaps.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : data.createdAt,
      updatedAt: data.updated?.toDate
        ? data.updated.toDate().toISOString()
        : data.updated,
    };
  });
}

export async function getAnnouncId(id) {
  const snapShot = await firestore.collection("announcements").doc(id).get();
  if (!snapShot.exists) {
    return {};
  }

  const data = snapShot.data();

  // Helper to safely convert Firestore Timestamps to ISO strings
  const toISOStringSafe = (val) =>
    val?.toDate ? val.toDate().toISOString() : val || null;

  return {
    id: snapShot.id,
    ...data,
    createdAt: toISOStringSafe(data.createdAt),
    updatedAt: toISOStringSafe(data.updatedAt),
    expiresAt: toISOStringSafe(data.expiresAt),
    updated: toISOStringSafe(data.updated),
  };
}
export async function getLike(postId, likeId) {
  const docRef = firestore
    .collection("posts")
    .doc(postId)
    .collection("likes")
    .doc(likeId);

  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    return null; // No like found
  }

  const data = docSnap.data();

  // Safely handle Firestore Timestamps
  const toISOStringSafe = (val) =>
    val?.toDate ? val.toDate().toISOString() : val || null;

  return {
    id: docSnap.id,
    ...data,
    createdAt: toISOStringSafe(data.createdAt),
    updatedAt: toISOStringSafe(data.updatedAt),
    expiresAt: toISOStringSafe(data.expiresAt),
    updated: toISOStringSafe(data.updated),
  };
}

export async function getEvent() {
  const snapShot = firestore.collection("event").orderBy("createdAt", "desc");
  const dataSnap = await snapShot.get();

  return dataSnap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      date: data.date?.toDate ? data.date.toDate().toISOString() : data.date,
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : data.createdAt,
      updatedAt: data.updatedAt?.toDate
        ? data.updatedAt.toDate().toISOString()
        : data.updatedAt,
    };
  });
}

export async function getEventId(id) {
  const snapShot = await firestore.collection("event").doc(id).get();
  if (!snapShot.exists) {
    return {};
  }
  const data = snapShot.data();
  return {
    id: snapShot.id,
    ...data,
    // ✅ Convert Firestore Timestamps to ISO strings
    date: data.date?.toDate ? data.date.toDate().toISOString() : data.date,
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : data.createdAt,
    updatedAt: data.updatedAt?.toDate
      ? data.updatedAt.toDate().toISOString()
      : data.updatedAt,
  };
}
