"use client";
import ContinueWithGoogleBtn from "@/components/ContinueWithGoogleBtn";
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
import { registerUserSchema } from "@/validator/passwordValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerUser } from "./action";
import { toast } from "sonner";

export default function RegisterForm() {
  //    const authContext= useAuthContext()
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });


   async function handleFormSubmit(data) {
    const response = await registerUser(data);

    if (response?.error) {
      toast.error("Error!", {
        description: response.message,
      });
      return;
    }

    toast.success("Success!", {
      description: "Your account was created successfully",
    });

    // redirect to login
    router.push("/login");
  }


  return (
   <Form {...form}>
      <div className="flex flex-col gap-3">
        {/* ✅ Make sure handleSubmit is used here */}
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <fieldset
            disabled={form.formState.isSubmitting}
            className="flex flex-col gap-6"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter Your Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="confirmpassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Your Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Register</Button>
            <div className="text-center text-sm text-muted-foreground gap-4 flex items-center justify-center">
              <div className="border-[0.5px] flex-1" />
              <p>or</p>
              <div className="border-[0.5px] flex-1" />
            </div>
          </fieldset>
        </form>

        <ContinueWithGoogleBtn />
      </div>
    </Form>
  );
}
