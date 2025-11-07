"use client";
import Login from "@/components/Login";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginValidate from "./action";

export default function LoginWithModal() {
  const router = useRouter();
  function openChange() {
    // navigate the user back to previous page:
    router.back();
  }
  return (
    <Dialog open onOpenChange={openChange} scroll={false}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            You must be logged in to bookmark
          </DialogDescription>
        </DialogHeader>
        <div>
          <Login
            link={"/blog-post"}
            onSucces={async () => {
              await LoginValidate();
              router.back();
            }}
          /> 
        </div>
        <DialogFooter className="block">
          Don&apos;t have an account?
          <Link className="underline pl-2" href="/register">
            Register Here
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
