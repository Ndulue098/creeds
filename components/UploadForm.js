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

    // return <Form {...form}>
    //         <form onSubmit={form.handleSubmit()}>
    //         <FormField
    //           control={form.control}
    //           name="image"
    //           render={({ field }) => (
    //             <FormItem className="w-full "> 
    //               <FormControl className="flex-1">
    //                 <ImageUploader 
    //                 onImageChange={(image)=>{                        
    //                   form.setValue("image",image)
    //                   }}
    //                   image={field.value}
    //                   // 
    //                   // 
    //                 //   urlFomatter={(img)=>{
                        
    //                 //     if(!img.file){
    //                 //       return `https://firebasestorage.googleapis.com/v0/b/nextfire-ed6b5.firebasestorage.app/o/${encodeURIComponent(img.url)}?alt=media`
    //                 //     }
    //                 //     return img.url;
    //                 //   }} 
    //                 />
    //               </FormControl>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />
    //         </form>
    //     </Form>
}

// ! made a change in firebase storage
/* 
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if false;
      allow write: if request.auth!=null && request.auth.token.admin==true;
    }
  }
}

*/