"use client";
import Login from "@/components/Login";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  return (
    // <Form {...form}>
    //   <div className="flex flex-col gap-3">
    //     <form onSubmit={form.handleSubmit(handleSubmit)}>
    //       <fieldset disabled={form.formState.isSubmitting} className="flex gap-5 flex-col">
    //         <FormField
    //           name="password"
    //           control={form.control}
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Password</FormLabel>
    //               <FormControl>
    //                 <Input type="password" {...field} placeholder="Enter your password" />
    //               </FormControl>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />

    //         <FormField
    //           name="email"
    //           control={form.control}
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Email</FormLabel>
    //               <FormControl>
    //                 <Input {...field} placeholder="Enter your password" />
    //               </FormControl>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />
    //         <Button type="submit" className="cursor-pointer">Login</Button>
    //         <div className="text-center text-sm text-muted-foreground gap-4 flex items-center justify-center">
    //           <div className="border-[0.5px] flex-1" />
    //           <p>or</p>
    //           <div className="border-[0.5px] flex-1" />
    //         </div>
    //       </fieldset>
    //     </form>
    //     <ContinueWithGoogleBtn />
    //   </div>
    // </Form>
    <Login
      onSuccess={() => {
        router.refresh();
      }}
      
    />
  );
}
