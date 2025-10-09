import { Button } from "@/components/ui/button";
import Link from "next/link";
import ArticleCards from "./ArticleCards";

export default function page() {
  return (
    <div>
      <h1>Blog post</h1>
      <Link href="/">
        <Button className="">Back</Button>
      </Link>
      <ArticleCards/>
    </div>
  );
}
