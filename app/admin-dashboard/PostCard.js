import { Eye, Pencil, PencilIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import DeletePost from "./DeletePost";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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

export default async function PostCard({page,sort,status,searchParamsVal}) {
  
  // console.log("post--id",post.id);
  const {posts,totalPage} = await getPosts({
   pagination:{page,
    pageSize:3
  }, 
  filter:{
    status
  },
  sort:{
    sortby:sort
  }
  });
  

  return (
    
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
                    
                    <DeletePost postId={post.id} field={"posts"}/>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
              <TableRow>
              <TableCell colSpan={5} className="text-center">

              {Array.from({ length: totalPage }).map((_, i) => {
                const filter=new URLSearchParams()
                if(searchParamsVal.status){
                  filter.set("status",searchParamsVal.status)                  
                }
                filter.set("page",`${i+1}`)
                return  <Button
                    disabled={page===i+1}
                    key={i}
                    asChild={page !== i + 1}
                    variant="outline"
                    className="mx-1 "
                  >
                    {/* <Link href={`/admin-dashboard?page=${i + 1}`}>{i + 1}</Link> */}
                    <Link href={`/admin-dashboard?${filter.toString()}`}>{i + 1}</Link>
                  </Button>
                })}
              </TableCell>
            </TableRow>
          </TableFooter>
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
