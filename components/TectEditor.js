"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import {FontFamily} from "@tiptap/extension-font-family";
import {FontSize} from "tiptap-extension-font-size";
import Heading from "@tiptap/extension-heading";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Image as ImageIcon,
  List,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import UploadForm from "./UploadForm";
import { ImageSchema } from "@/validator/textValidator";
import Tiptap from "./Tiptap";
import Toolbar from "./Toolbar";
import { ref } from "firebase/storage";
// Schema
const formSchema = z.object({
  title: z
    .string()
    .min(1, "Heading is required")
    .max(100, "Heading cannot be more that 50 characters"),
  artic: z.string().min(300, "Description is required"),
});
const combinedSchema = formSchema.merge(ImageSchema);

export default function ArticleForm({ onSave, defaultVal = {} }) {
  const form = useForm({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      title: "",
      artic: "",
      ...defaultVal,
    },
  });


  // ------------------
  // HEADING EDITOR
  // ------------------
  const headingEditor = useEditor({
    extensions: [StarterKit, TextStyle],
    content: "",
    onUpdate: ({ editor }) => {
      form.setValue("heading", editor.getHTML());
    },
    immediatelyRender: false, 
  });

  // ------------------
  // DESCRIPTION EDITOR
  // ------------------
  const descriptionEditor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-6 text-gray-800",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-6 text-gray-800",
          },
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          level: [2],
        },
      }),
      // bulletList
      Underline,
      TextStyle,
      FontFamily,
      FontSize,
      Image.configure({ inline: true }),
    ],
    content: form.getValues("artic") || "", // initialize with form value
    editorProps: {
      attributes: {
        class: "min-h-[23rem] border-input focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      form.setValue("artic", html, { shouldValidate: true });
    },
    immediatelyRender: false,
  });

 

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg border-[1px]">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Create Article</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-8 w-full">
          <UploadForm form={form} />
          {/* HEADING */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base font-semibold text-gray-800">
                  Heading
                </FormLabel>

                <div className="flex flex-col gap-2 border-gray-200 rounded-lg p-4 bg-gray-50 border-[1px] w-full">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="hover:bg-gray-100 text-gray-700 hover:text-blue-600"
                        onClick={() => {
                          const el = document.getElementById("heading-input");
                          el.style.fontWeight =
                            el.style.fontWeight === "bold" ? "normal" : "bold";
                        }}
                      >
                        <Bold size={16} />
                      </Button>

                      <select
                        className="text-sm border border-gray-200 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          const el = document.getElementById("heading-input");
                          el.style.fontSize = e.target.value;
                        }}
                      >
                        <option value="16px">16px</option>
                        <option value="20px">20px</option>
                        <option value="24px">24px</option>
                        <option value="32px">32px</option>
                      </select>
                    </div>

                    <span className="text-xs text-gray-500">
                      Max 100 characters
                    </span>
                  </div>

                  <FormControl>
                    <Input
                      id="heading-input"
                      placeholder="Enter your article title..."
                      maxLength={100}
                      className="w-full text-gray-900 border-[1px] focus-visible:ring-blue-500 text-lg placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="artic"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-medium text-gray-800">
                  Description
                </FormLabel>

                <div className="border border-gray-300 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-primary/40 w-full">
                  <Toolbar editor={descriptionEditor} />

                  <FormControl>
                    <EditorContent
                      id="description-input"
                      editor={descriptionEditor}
                      className="min-h-[200px] w-full p-3 text-sm focus:outline-none prose prose-sm max-w-none prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-gray-700"
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full cursor-pointer font-semibold text-base"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}


/* 

 const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      try {
        const path = `postImages/${Date.now()}-${file.name}`;
        const storageRef = ref(storage, path);

        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          uploadTask.on("state_changed", null, reject, resolve);
        });

        const url = await getDownloadURL(storageRef);

        descriptionEditor?.chain().focus().setImage({ src: url }).run();
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };

    input.click();
  };


  <Button type="button" onClick={handleImageUpload}>
            <ImageIcon size={16} />
          </Button>
*/