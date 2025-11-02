"use client"
import { FontFamily } from "@tiptap/extension-text-style";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Tiptap(text,onchange) {
    const editor = useEditor({
        extensions: [
          StarterKit.configure,
          Underline,
          TextStyle,
          FontFamily,
          FontSize,
        //   Image.configure({ inline: true }),
        ],
        content: "text",
        editorProps:{
            attributes:{
                class:"min-h-[23rem] border-input bg-black"
            }
        },
        onUpdate: ({ editor }) => {
            // onchange(editor.getHTML())
          form.setValue("description", editor.getHTML());
        },
        immediatelyRender: false,
      });

    return <div>
            
        </div>
}

