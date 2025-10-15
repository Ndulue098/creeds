"use client";

import { useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

export default function ImageUploader({ onImageChange, image }) {
  const uploadRef = useRef(null);

  function handleConnect() {
    uploadRef?.current?.click();
  }

  function handleInputChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const newImage = {
      id: `${Date.now()}-${file.name}`,
      url: URL.createObjectURL(file),
      file,
    };
    onImageChange(newImage);
  }

  function handleDelete() {
    if (image?.url) {
      URL.revokeObjectURL(image.url);
    }
    onImageChange(null);
  }

  return (
    <div className="space-y-3">
      <input
        onChange={handleInputChange}
        className="hidden"
        ref={uploadRef}
        type="file"
        accept="image/*"
      />

      {!image && (
        <Button
          onClick={handleConnect}
          type="button"
          variant="outline"
          className="flex items-center gap-2 border-dashed border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition"
        >
          <ImagePlus className="h-5 w-5" />
          Add Image
        </Button>
      )}

      {image && (
        <div className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-sm w-full max-w-sm">
          <div className="aspect-video relative">
            <Image
              src={typeof image === "string" ? image : image.url}
              alt="Uploaded image"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
          </div>

          {/* Overlay */}
          <div
            onClick={handleDelete}
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X className="text-white w-8 h-8" />
          </div>
        </div>
      )}
    </div>
  );
}
