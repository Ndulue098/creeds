"use client";

import { useAuthContext } from "@/context/auth";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AuthBtn() {
  const authContext = useAuthContext();
  const router = useRouter();

  async function logout() {
    try {
      await authContext.logOut();
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  // Initial auth check skeleton
  if (authContext?.authLoading) {
    return (
      <div className="flex gap-3 items-center">
        <div className="h-4 w-14 rounded bg-white/10 animate-pulse" />
        <div className="h-6 w-px bg-white/20" />
        <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
      </div>
    );
  }

  // Logged in
  if (authContext?.currentUser) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {!!authContext.currentUser?.photoURL && (
              <Image
                height={70}
                width={70}
                src={authContext.currentUser.photoURL}
                alt={`${authContext.currentUser.displayName} avatar`}
              />
            )}

            <AvatarFallback className="text-sky-950 bg-white w-full flex items-center justify-center font-semibold">
              {(
                authContext.currentUser.displayName ||
                authContext.currentUser.email
              )?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div>{authContext.currentUser.displayName}</div>
            <div className="font-normal text-xs">
              {authContext.currentUser.email}
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/account">My Account</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/account/book-mark">Bookmarks</Link>
          </DropdownMenuItem>

          {!!authContext.customClaims?.admin && (
            <DropdownMenuItem asChild>
              <Link href="/admin-dashboard">Admin Dashboard</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={logout}
            disabled={authContext.logoutLoading}
            className="cursor-pointer"
          >
            {authContext.logoutLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging out...
              </>
            ) : (
              "Logout"
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Logged out
  return (
    <div className="flex gap-2 items-center text-white/50">
      <Link
        className="uppercase tracking-widest hover:underline underline-offset-2 transition-colors hover:text-white"
        href="/login"
      >
        Login
      </Link>

      <div className="bg-white/50 h-8 w-[1px]" />

      <Link
        className="uppercase tracking-widest hover:underline underline-offset-2 transition-colors hover:text-white"
        href="/register"
      >
        Signup
      </Link>
    </div>
  );
}