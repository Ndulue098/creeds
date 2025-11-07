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
import { useAuthContext } from "@/context/auth";
import { LoginFormSchema } from "@/validator/loginFromSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login({onSuccess}) {
  const authContext = useAuthContext();
//   const router = useRouter();
  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(data) {
    try {
      await authContext.loginWithEmail(data.email, data.password);
       onSuccess?.()
    } catch (err) {
      toast.error("Error!", {
        description:
          err.code === "auth/invalid-credential"
            ? "incorrect credentials"
            : "error occured",
      });
    }
  }

  return (
    <Form {...form}>
      <div className="flex flex-col sm:gap-3 gap-2">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <fieldset
            disabled={form.formState.isSubmitting}
            className="flex sm:gap-5 gap-3 flex-col"
          >
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Enter your password"
                    />
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
                    <Input {...field} placeholder="Enter your password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="cursor-pointer font-semibold tracking-widest">
              Login
            </Button>
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
