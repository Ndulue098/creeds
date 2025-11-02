"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const userSchema = z.object({
  userName: z.string().min(3, "UserName can't be less than 3 characters"),
});
export default function UpdateUserName() {
  const auth = useAuthContext();

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userName: auth?.currentUser.displayName || "",
    },
  });

  async function userName(data) {
    const user = auth.currentUser;
    if (!user) {
      toast.error(_, { description: "cannot set UserName" });
    }
    await updateProfile(user, {
      displayName: data.userName,
    });

    toast.success(_, { description: "UserName Updated" });
  }

  return (
    <div>
      <Form {...form}>
        <h2 className="text-xl mb-4 font-semibold">Update UserName</h2>
        <form onSubmit={form.handleSubmit(userName)}>
          <fieldset
            disabled={form.formState.isSubmitting}
            className="flex flex-col gap-5 mb-4 w-full text-gray-700"
          >
            <FormField
              name="userName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Set userName</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="User Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update userName</Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
}
