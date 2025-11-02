"use client"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import ImageUploader from "./ImageUploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageSchema } from "@/validator/textValidator";

export default function UploadForm({form}) {

    return  <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="w-full "> 
                  <FormControl className="flex-1">
                    <ImageUploader 
                    onImageChange={(image)=>{                        
                      form.setValue("image",image)
                      }}
                      image={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

}
