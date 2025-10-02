import { firestore } from "@/firebase/Server"
import "server-only"
import { getTotalPage } from "./getTotalPage";

export async function getPosts(option){
  const {pagination}=option
  const {page=1,pageSize=5}=pagination

  console.log("ps",pageSize);
  

  const snapShot = await firestore
    .collection("posts")
    .orderBy("createdAt", "desc")
    // .limit(pageSize)
    // .get();

  
  const totalPage= await getTotalPage(snapShot,pageSize)
  const postSnapShot=await snapShot.limit(pageSize).offset((page-1)*pageSize).get()

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

  return {posts,totalPage};
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