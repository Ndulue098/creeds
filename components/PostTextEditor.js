"use client";
import { Editor } from "@tinymce/tinymce-react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/Client";

export default function PostTextEditor({ post, value, onChange }) {
  return (
    <div className="p-4 max-w-[82rem] w-full mx-auto bg-white">
      <Editor
        apiKey="ic37pomxla7uwzhhkhf6sc695027lqwfddxorp5wniuxulwk"
        value={value || ""}
        init={{
          height: 600,
          menubar: true,
          plugins:
            "image advlist autolink lists link charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
          toolbar:
            "undo redo | formatselect | bold italic underline backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | image | removeformat | help",

          // ✅ Enable actual image upload
          automatic_uploads: true,
          images_upload_handler: async (blobInfo, progress) => {
            try {
              const file = blobInfo.blob();
              const fileName = `${Date.now()}-${blobInfo.filename()}`;
              const storageRef = ref(storage, `editor-images/${fileName}`);

              const uploadTask = uploadBytesResumable(storageRef, file);

              // track upload progress
              uploadTask.on("state_changed", (snapshot) => {
                const percent =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progress(percent);
              });

              await new Promise((resolve, reject) => {
                uploadTask.on("state_changed", null, reject, () => resolve());
              });

              const downloadURL = await getDownloadURL(storageRef);
              return downloadURL;
            } catch (err) {
              console.error("TinyMCE upload error:", err);
              throw new Error("Upload failed");
            }
          },

          // ✅ Prevent base64 images from being embedded
          paste_data_images: false,

          // ✅ Optional: limit image size or type
          file_picker_types: "image",
        }}
        onEditorChange={onChange}
      />
    </div>
  );
}
