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
import { useRouter, useSearchParams } from "next/navigation";
import LoginValidate from "./action";
import { useAuthContext } from "@/context/auth";
import { addMarked } from "../../action";

export default function LoginWithModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authContext = useAuthContext();
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
            onSuccess={async () => {
              await LoginValidate();

              const post = searchParams?.get("post");

              if (post) {
                try {
                  const user = authContext?.currentUser;

                  if (user && post) {
                    const token = await user.getIdToken(true);
                    await addMarked(post, token);
                  }
                } catch (error) {
                  console.error("Auto-add bookmark failed:", error);
                }
              }

              // Navigate back to previous page, then refresh data
              router.back();

              setTimeout(() => {
                router.refresh();
              }, 200);
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
