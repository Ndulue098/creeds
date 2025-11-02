"use client";

import PostForm from "@/components/PostForm";
import { useAuthContext } from "@/context/auth";
import { storage } from "@/firebase/Client";
import { extractPostData } from "@/utils/extractPost";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter, useSearchParams } from "next/navigation";
import { createPost, saveImage } from "./action";
import { toast } from "sonner";
import CreateArticleForm from "@/components/TectEditor";

export default function AdminEditor() {
  const route = useRouter();
  const authContext = useAuthContext();

  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "design";

  async function onSave(data) {
    console.log("post data", data);
    const token = await authContext.currentUser?.getIdToken();
    if (!token) return;
    const author = await authContext.currentUser?.displayName;
    const { image, ...rest } = data;
    const postData = {
      ...rest,
      category,
      author,
    };

    console.log(postData);

    const response = await createPost(token, postData);

    if (response?.error) {
      toast.error("Error!", {
        description: response.message,
      });
      return;
    }

    toast.success("Success!", {
      description: "New Post Created",
    });

    if (image.file) {
      const path = `posts/${response.id}/${Date.now()}-${image.file.name}`;
      const storageRef = ref(storage, path);
      // paths.push(path);
      const uploadTask = uploadBytesResumable(storageRef, image.file);

      await new Promise((resolve, reject) => {
        uploadTask.on("state_changed", null, reject, () => resolve());
      });

      const downloadURL = await getDownloadURL(storageRef);
      console.log(downloadURL);
      await saveImage({ postId: response.id, image: downloadURL }, token);
    }
    route.push("/admin-dashboard");
  }

  // return <PostForm onSave={onSave} />;

  return (
    <div className="max-w-6xl ">
      <CreateArticleForm onSave={onSave} />
    </div>
  );
}
