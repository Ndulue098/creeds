"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Textarea } from "../../../components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { textSchema } from "@/validator/textValidator";
import { Button } from "../../../components/ui/button";
import { useAuthContext } from "@/context/auth";
import { addComment } from "./action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

export default function Comment({ postId }) {
  const form = useForm({
    resolver: zodResolver(textSchema),
    defaultValues: { comment: "" },
  });

  const authContext = useAuthContext();
  const UserName = authContext.currentUser?.displayName;

  async function submitComment(data) {
    const token = await authContext.currentUser?.getIdToken();
    const displayName = authContext.currentUser?.displayName;

    if (!token) {
      return {
        error: "Unauthorized user",
      };
    }

    const commentData = {
      author: displayName,
      comment: data.comment,
    };

    await addComment({ commentData, postId }, token);
    form.reset();
  }

  return (
    <section className="max-w-4xl w-full mx-auto mt-16 border-t border-border pt-10">
      <h2 className="text-2xl font-semibold mb-6">Leave a Comment</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitComment)}
          className="space-y-5 bg-muted/30 p-6 rounded-xl shadow-sm"
        >
          <fieldset disabled={form.formState.isSubmitting || !UserName}>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-muted-foreground">
                    Your Comment
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Share your thoughts..."
                      className="min-h-[120px] resize-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-3">
                {/* <div className="size-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-gray-300">
                {UserName?.[0] || "?"}
              </div> */}

                {UserName && (
                  <Avatar>
                    {!!authContext?.currentUser?.photoURL && (
                      <Image
                        height={70}
                        width={70}
                        src={authContext.currentUser.photoURL}
                        alt={`${authContext.currentUser.UserName}avatar`}
                      />
                    )}
                    <AvatarFallback className="text-sky-950 bg-white w-full flex items-center justify-center font-semibold">
                      {
                        (authContext.currentUser.UserName ||
                          authContext.currentUser.email)?.[0]
                      }
                    </AvatarFallback>
                  </Avatar>
                )}
                <span className="text-sm text-muted-foreground">
                  {UserName?`Commenting as ${UserName}`:"Login to comment"}
                </span>
              </div>

              <Button
                type="submit"
                disabled={!UserName}
                className=" mt-3  text-white px-6"
              >
                Post Comment
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </section>
  );
}
