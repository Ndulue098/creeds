import { Eye, Pencil, PencilIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import DeletePost from "./DeletePost";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPosts } from "@/data/postData";
import { Button } from "@/components/ui/button";
import BadgeCategory from "@/components/BadgeCategory";

export function formatDate(isoString) {
  const date = new Date(isoString);

  // Format as: "Sep 28, 2025"
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function PostCard() {
  // console.log("post--id",post.id);
  const posts = await getPosts();
  console.log(posts);
  // Extract plain text from HTML to create a summary
  // const plainText = post.html.replace(/<[^>]+>/g, ""); // strip tags
  // const summary = plainText.length > 120 ? plainText.slice(0, 120) + "..." : plainText;

  // post

  return (
    // <div className="flex items-center gap-4 p-4 rounded-2xl shadow-md bg-white hover:shadow-lg transition">
    //   {/* Image placeholder */}
    //   <div className="w-24 h-24 rounded-xl bg-gray-200 flex items-center justify-center">
    //     <span className="text-gray-400 text-sm">No Image</span>
    //   </div>

    //   {/* Text content */}
    //   <div className="flex-1">
    //     <h3 className="text-lg font-semibold line-clamp-1">
    //       {/* Try to extract <h1> or <h2> if present */}
    //       {post.html.match(/<h[1-2][^>]*>(.*?)<\/h[1-2]>/)?.[1] || "Untitled Post"}
    //     </h3>
    //     <p className="text-gray-600 text-sm line-clamp-2">{summary}</p>
    //     <p className="text-xs text-gray-400 mt-1">
    //       Published: {new Date(post.createdAt).toLocaleDateString()}
    //     </p>
    //   </div>

    //   {/* Action buttons */}
    //   <div className="flex  gap-2">
    //     <button
    //       onClick={() => onView(post.id)}
    //       className="p-2 rounded-lg hover:bg-gray-100 text-blue-600"
    //     >
    //     <Link href={`blogPost/${post.id}`}>
    //       <Eye size={18} />
    //     </Link>
    //     </button>
    //     <Link
    //     href={`/admin-dashboard/edit/${post.id}`}
    //     className="p-2 rounded-lg hover:bg-gray-100 text-green-600"
    //     >
    //       <Pencil size={18} />
    //     </Link>
    //     <DeletePost postId={post.id}/>
    //   </div>
    // </div>
    <>
      {posts.length === 0 && (
        <p className="text-gray-500 text-center">No posts available</p>
      )}
      {!!posts.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts?.map((post, i) => {
              const plainText = post.title;
              const title =plainText > 15 ? plainText.slice(0, 15) + "..." : plainText;
              const createdAt = formatDate(post?.createdAt);
              return (
                <TableRow key={post.id}>
                  <TableCell>{title}</TableCell>
                  <TableCell>{createdAt}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  {/* <TableCell>{post.category}</TableCell> */}
                  <TableCell>
                    <BadgeCategory label={post.category}/>
                  </TableCell>
                  <TableCell className="flex gap-2 " >
                    <Button variant="outline" size="medium" className="p-1">
                      <Link href={`blogPost/${post.id}`}>
                        <Eye />
                      </Link>
                    </Button>
                    <Button variant="outline" size="medium" className="p-1">
                      <Link href={`/admin-dashboard/edit/${post.id}`}>
                        <PencilIcon className="text-green-600"/>
                      </Link>
                    </Button>
                    <Button variant="outline" size="medium" className="p-1">
                      <Link href={`/admin-dashboard/edit/${post.id}`}>
                        <Trash2 className="text-red-400" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
}
/* 

article
: 
"<p>testing 123412121,,,ewjenfqjenkqekdfnsf</p>\n<p>wejdfksdjkwjrnkfnwrkjfj</p>"
author
: 
"Ndulue Christian"
category
: 
"design"
createdAt
: 
"2025-09-28T21:35:30.248Z"
id
: 
"2pK31YRW0jZaLiVI22L0"
title
: 
"hello this is a test"

*/
