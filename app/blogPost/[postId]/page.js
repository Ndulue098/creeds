import ToggleBookmark from "@/app/blog-posts/ToggleBookmark";
import Comment from "@/app/blogPost/[postId]/Comment";
import BadgeCategory from "@/components/BadgeCategory";
import { getBookMarkById } from "@/data/getBookMarks";
import { Likes } from "@/data/Likes";
import { getPost } from "@/data/postData";
import { format } from "date-fns";
import {
  MessageCircle
} from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TurndownService from "turndown";
import CommentsPost from "./CommentsPost";
import ToggleLike from "./toggleLike";
import Link from "next/link";

const turndownService = new TurndownService();

function convertToMarkdown(htmlString) {
  return turndownService.turndown(htmlString);
}
export default async function page({ params }) {
  const { postId } = await params;
  const post = await getPost(postId);
  console.log(post);

  //    console.log("Markdown",convertToMarkdown(post.htmlString));
  // ! data formatter
    const formattedCreated = format(new Date(post.createdAt), "MMMM d, yyyy");
    const formattedUpdated = post.updatedAt
    ? format(new Date(post.updatedAt), "MMMM d, yyyy")
    : null;
  // ! data formatter


  const marked = await getBookMarkById(postId);
  console.log("marked", marked);
  const { isBookmarked } = marked || {};

  // likes
  const likeNum = await Likes(postId);

  return (
    <>
      <article className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* Blog Image */}
        {post.imageUrl && (
          <div className="relative aspect-video w-full mb-8 overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-5xl font-semibold tracking-tight leading-[1.3] mb-4">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex justify-between text-muted-foreground mb-8 border-b border-border pb-3">
          <div className="flex gap-3 items-center text-sm">
            <BadgeCategory label={post.category} />
            <span>
              By{" "}
              <span className="font-medium text-foreground">{post.author}</span>
            </span>
            <span>• {formattedCreated}</span>
            {formattedUpdated && <span>• Updated {formattedUpdated}</span>}
          </div>
          <div className="flex items-center text-sm gap-5 ">
            {/* <Heart size={17} strokeWidth={1.5} /> */}
            <div className="flex gap-2 items-center justify-center">
              <ToggleLike postId={postId} />
              <small>{likeNum}</small>
            </div>
            <Link href="#comment">
              <MessageCircle size={17} strokeWidth={1.5} />
            </Link>
            <ToggleBookmark postId={postId} marked={isBookmarked} />
          </div>
        </div>

        
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1
                {...props}
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                {...props}
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginTop: "2rem",
                  marginBottom: "0.5rem",
                }}
              />
            ),
            p: ({ node, ...props }) => (
              <p
                {...props}
                style={{ lineHeight: "1.75", marginBottom: "1rem" }}
              />
            ),
            ul: ({ node, ...props }) => (
              <ul
                {...props}
                style={{
                  paddingLeft: "1.5rem",
                  listStyleType: "disc",
                  marginBottom: "1rem",
                }}
              />
            ),
          }}
          //       className="prose prose-lg prose-neutral dark:prose-invert max-w-none"
        >
          {convertToMarkdown(`${post.artic}`)}
        </ReactMarkdown>
      </article>

      <Comment postId={postId} />
      <CommentsPost postId={postId} />
    </>
  );
}
