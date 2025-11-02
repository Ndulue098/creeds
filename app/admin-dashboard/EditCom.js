"use client";
import { useAuthContext } from "@/context/auth";
import AnnouncementForm from "./announcement/AnnouncementForm";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/Client";
import updateAnnounce from "./announcement/edit/[announceId]/action";
import updateEvent from "@/app/admin-dashboard/event/edit/[editId]/action";
import { saveImage as saveImageEdit } from "./event/action";
import { saveImage } from "./announcement/action";

export default function EditCom({ defaultval,Element,field}) {
  const authContext = useAuthContext();
  const route = useRouter();


  async function edit(data) {
    const token = await authContext.currentUser.getIdToken();
    if (!token) return;
    //  const { title, article} = extractPostData(data)
    const { image, ...rest } = data;

    let response
    if(field==="event"){
     response=await updateEvent({ id: defaultval.id,...rest }, token)
    }else{
      response= await updateAnnounce({ id: defaultval.id,...rest }, token);
    }


    if (image && typeof image == "object" && image.file) {
      const path = `${field}/${defaultval.id}/${Date.now()}-${image.file.name}`;
      const storageRef = ref(storage, path);
      // paths.push(path);
      const uploadTask = uploadBytesResumable(storageRef, image.file);

      await new Promise((resolve, reject) => {
        uploadTask.on("state_changed", null, reject, () => resolve());
      });

      const downloadURL = await getDownloadURL(storageRef);
      // await saveImage({ postId: defaultval.id, image: downloadURL }, token);
      if(field==="event"){
        await saveImageEdit({ postId: defaultval.id, image: downloadURL },token);
      }else{
        await saveImage({ postId: defaultval.id, image: downloadURL },token);
      }
      
    }

     route.push("/admin-dashboard")
  }
 
  const label = <p>Edit Announcement</p>;

  return (
    <div>
      {/* <AnnouncementForm onEdit={edit} label={label} defaultval={defaultval} /> */}
      <Element onEdit={edit} label={label} defaultval={defaultval}/>
    </div>
  );
}
