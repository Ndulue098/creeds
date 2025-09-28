"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";

export default function PostTextEditor({ post, onSave }) {
  const [content, setContent] = useState(post?.html || "");

  useEffect(() => {
    if (post) {
      setContent(post.html); // update state when post changes (important for edit)
    }
  }, [post]);

  return (
    <div className="p-4 max-w-[82rem] w-full mx-auto bg-red-200">
      <Editor
        apiKey="ic37pomxla7uwzhhkhf6sc695027lqwfddxorp5wniuxulwk"
        value={content}
        init={{
          height: 600,
          menubar: true,
          plugins:
            "advlist autolink lists link charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
          toolbar:
            "undo redo | formatselect | bold italic underline backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={(newValue) => setContent(newValue)}
      />

      <button
        onClick={() => onSave(content)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {post ? "Update Post" : "Publish Post"}
      </button>
    </div>
  );
}
