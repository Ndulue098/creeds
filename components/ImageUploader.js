"use client";

import { useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { X } from "lucide-react";

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
    <div className="mb-3">
      <input onChange={handleInputChange} className="hidden" ref={uploadRef} type="file" accept="image/*" />
      <Button onClick={handleConnect} type="button">
        Add Image
      </Button>
      {(image?.url || image)  && (
        <div className="bg-gray-100 mt-3 flex gap-2 items-center rounded-lg overflow-hidden">
          <div className="size-20 relative">
            <Image
              src={typeof image=="string"?image: image.url}
              alt="Uploaded image"
              fill
              className="object-center"
              unoptimized
            />
          </div>
          <div
            className="mr-2 h-full ml-auto cursor-pointer"
            onClick={handleDelete}
          >
            <X size={24} />
          </div>
        </div>
      )}
    </div>
  );
}
