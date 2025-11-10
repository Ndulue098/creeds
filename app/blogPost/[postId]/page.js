import ToggleBookmark from "@/app/blog-posts/ToggleBookmark";
import Comment from "@/app/blogPost/[postId]/Comment";
import BadgeCategory from "@/components/BadgeCategory";
import { getBookMarkById } from "@/data/getBookMarks";
import { Likes } from "@/data/Likes";
import { getLike, getPost } from "@/data/postData";
import { format } from "date-fns";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TurndownService from "turndown";
import CommentsPost from "./CommentsPost";
import ToggleLike from "./toggleLike";
import Link from "next/link";
import { dateConvert, formatDate } from "@/lib/utils";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { cookies } from "next/headers";
import { auth } from "@/firebase/Server";

export const metadata = {
  title: "Article",
};

export default async function page({ params }) {
  const { postId } = await params;
  const post = await getPost(postId);

  //! getting the auth token, verifying it and getting the uid
  const cookiesStore = await cookies();
  const token = cookiesStore?.get("firebaseAuthToken")?.value;
  let like;
  if (!!token) {
    const verified = await auth.verifyIdToken(token);
    like = await getLike(postId, verified?.uid);
  }

  // const datefn = formatDate(post?.updatedAt);
  // const datecon = dateConvert(post.createdAt);

  //    console.log("Markdown",convertToMarkdown(post.htmlString));
  // ! data formatter
  // const formattedCreated = format(new Date(post.createdAt), "MMMM d, yyyy");
  // ! data formatter
  const formattedCreated = formatDate(post.createdAt);
  const formattedUpdated = post.updatedAt
    ? format(new Date(post.updatedAt), "MMMM d, yyyy")
    : null;

  const marked = await getBookMarkById(postId);
  const { isBookmarked } = marked || {};

  // likes
  const likeNum = await Likes(postId);

  return (
    <>
      <article className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-3 mt-2">
        {/* Blog Image */}
        {post?.image && (
          <div className="relative  min-h-[24rem] w-full mb-8 overflow-hidden rounded-xl shadow-lg">
            <Image
              src={post.image}
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
        <div className="flex md:flex-row flex-col  gap-2 justify-between text-muted-foreground mb-8 border-b border-border pb-3">
          <div className="flex gap-3 items-center text-sm">
            <BadgeCategory label={post.category} />
            <span>
              By{" "}
              <span className="font-medium text-foreground">{post.author}</span>
            </span>
            <span>• {formattedCreated}</span>
            {formattedUpdated && <span>• Updated {formattedUpdated}</span>}
          </div>
          <div className="flex items-center text-sm sm:gap-5 gap-3 ml-auto ">
            {/* <Heart size={17} strokeWidth={1.5} /> */}
            <div className="flex gap-2 items-center justify-center">
              <ToggleLike postId={postId} isLiked={like?.liked} />
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
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            h2: ({ node, ...props }) => (
              <h2 {...props} className="text-xl font-bold mb-3" />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="leading-7 mb-4 text-gray-700" />
            ),
            ul: ({ node, ...props }) => (
              <ul {...props} className="list-disc ml-6 mb-4 text-gray-800" />
            ),
            hr: () => <hr className="my-4 border-gray-300" />,
          }}
        >
          {post.artic}
        </ReactMarkdown>
      </article>

      <Comment postId={postId} />
      <CommentsPost postId={postId} />
    </>
  );
}
