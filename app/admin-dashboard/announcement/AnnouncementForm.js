"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadForm from "@/components/UploadForm";
import { announcementSchema } from "@/validator/announcementSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addAnnouncement, saveImage } from "./action";
import { useAuthContext } from "@/context/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/Client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AnnouncementForm({defaultval,label,onEdit}){
  const {title,message,image}=defaultval||{}

  const form = useForm({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: "",
      message: "",
      image: null, 
      ...{title,message,image}
    },
  });

  const authContext = useAuthContext();
  const route=useRouter() 

  async function handleSubmit(data) {
    console.log(data);

    const token = await authContext.currentUser?.getIdToken();
    if (!token) return;

    const author = authContext.currentUser?.displayName;

    const response = await addAnnouncement(token, { ...data, author });
    if (!response?.success) return;

    if (response?.error) {
      toast.error("Error!", {
        description: response.message,
      });
      return;
    }

    toast.success("Success!", {
      description: "Announcement Added",
    });


    if (data.image?.file) {
      const path = `announcements/${response.id}/${Date.now()}-${
        data.image.file.name
      }`;
      const storageRef = ref(storage, path);

      const uploadTask = uploadBytesResumable(storageRef, data.image.file);

      await new Promise((resolve, reject) => {
        uploadTask.on("state_changed", null, reject, () => resolve());
      });

      const downloadURL = await getDownloadURL(storageRef);
      await saveImage({ postId: response.id, image: downloadURL }, token);
    }

    route.push("/admin-dashboard");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(label?onEdit:handleSubmit)} className="space-y-6">
        <fieldset disabled={form.formState.isSubmitting} className="flex flex-col gap-6">
          {/* Upload Image */}
          <UploadForm form={form} />

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[13rem] resize-none"
                    {...field}
                    placeholder="Write a short announcement..."
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {label?"Edit":"post"} Announcement
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
