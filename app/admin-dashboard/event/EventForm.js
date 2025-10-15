"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EventDate } from "./EventDate";
import z from "zod";
import UploadForm from "@/components/UploadForm";
import { useAuthContext } from "@/context/auth";
import { addEvent, saveImage } from "./action";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/Client";
import { useRouter } from "next/navigation";

export default function EventForm({onEdit,label,defaultval}) {
  // onEdit={edit} label={label} defaultval={defaultval}
  const eventSchema = z.object({
    title: z.string().min(2, "Title is required"),
    message: z.string().min(5, "Message should be longer"),
    location: z.string().min(2, "Location is required"),
    date: z.date({ required_error: "Date is required" }),
    image: z
      .union([z.string().url(), z.any()])
      .optional()
      .nullable()
      .refine(
        (val) =>
          val === null || typeof val === "object" || typeof val === "string",
        { message: "Invalid image format" }
      ),
  });
  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "", 
      message: "",
      location: "",
      date: null,
      image: null,
      ...defaultval
    },
  });
  const route = useRouter();
  const authContext = useAuthContext();

  async function onSubmit(data) {
    console.log("Event data--> ", data);

    const token = await authContext.currentUser?.getIdToken();
    if (!token) return;

    const author = authContext.currentUser?.displayName;
    const response = await addEvent(token, { ...data, author });
    if (!response?.success) return;

    console.log(response.id);
    //

    // image store
    if (data.image?.file) {
      const path = `event/${response.id}/${Date.now()}-${data.image.file.name}`;
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
      <form onSubmit={form.handleSubmit(label?onEdit:onSubmit)} className="space-y-5">
        <fieldset disabled={form.formState.isSubmitting} className="space-y-5">
          {/* upload image */}
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
                    placeholder="Write a short event description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Event location (e.g. Main Hall)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <EventDate value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {label?"Edit":"Create"} Event
        </button>
      </form>
    </Form>
  );
}
