"use client";
import Login from "@/components/Login";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  return (
   
    <Login
      onSuccess={() => {
        router.refresh();
      }}
      
    />
  );
}
