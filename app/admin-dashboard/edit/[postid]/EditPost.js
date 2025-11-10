"use client";
import PostTextEditor from "@/components/PostTextEditor";
import { useAuthContext } from "@/context/auth";
import { updatePost } from "./action";
import { useRouter } from "next/navigation";
import { extractPostData } from "@/utils/extractPost";
import PostForm from "@/components/PostForm";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { saveImage } from "../../new/action";
import { storage } from "@/firebase/Client";
import { toast } from "sonner";
import CreateArticleForm from "@/components/TectEditor";

export default function EditPost({ post }) {
  const route = useRouter();

  console.log(post);

  const authContext = useAuthContext();

  async function edit(data) {
    const token = await authContext.currentUser.getIdToken();
    if (!token) return;
    //  const { title, article} = extractPostData(data)
    const { image, ...rest } = data;
    // const { title, article: artic } = extractPostData(article);
      const postData = {
      ...rest,
    };
    

    const response = await updatePost({ id: post.id, ...postData }, token);
    if (response?.error) {
      toast.error("Error!", {
        description: response.message,
      });
      return;
    }

    toast.success("Success!", {
      description: "Form Edited",
    });

    console.log("edit--", image);
    if (image && typeof image == "object" && image.file) {

      const path = `posts/${post.id}/${Date.now()}-${image.file.name}`;
      const storageRef = ref(storage, path);
      // paths.push(path);
      const uploadTask = uploadBytesResumable(storageRef, image.file);

      await new Promise((resolve, reject) => {
        uploadTask.on("state_changed", null, reject, () => resolve());
      });

      const downloadURL = await getDownloadURL(storageRef);
      await saveImage({ postId: post.id, image: downloadURL }, token);
    }

    route.push("/admin-dashboard");
  }

  const defaultVal = {
    ...post,
    // article: post?.htmlString,
    // title:post.title,
    // artic:post.artic,
    // image: post.image,
  }; 

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* <PostForm defaultVal={defaultVal} onSave={edit} /> */}
        <CreateArticleForm onSave={edit} defaultVal={defaultVal}/>
    </div>
  );
}
