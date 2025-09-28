import { getPosts } from "@/data/postData";
import PostCard from "./PostCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PostBtn from "./PostBtn";

export default async function page() {
  return (
    <div className="max-w-5xl mx-auto space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Admin dashboard</h2>
      <PostBtn />
      <PostCard />
    </div>
  );
}
