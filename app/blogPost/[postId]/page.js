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
import ToggleLike from "./toggleLike";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { cookies } from "next/headers";
import { auth } from "@/firebase/Server";
import CommentsPost from "./CommentsPost";

export const metadata = {
  title: "Article",
};

export default async function page({ params }) {
  const { postId } = await params;
  const post = await getPost(postId);

  const cookiesStore = await cookies();
  const token = cookiesStore?.get("firebaseAuthToken")?.value;

  let like;
  if (token) {
    const verified = await auth.verifyIdToken(token);
    like = await getLike(postId, verified?.uid);
  }

  const formattedCreated = formatDate(post.createdAt);
  const formattedUpdated = post.updatedAt
    ? format(new Date(post.updatedAt), "MMMM d, yyyy")
    : null;

  const marked = await getBookMarkById(postId);
  const { isBookmarked } = marked || {};

  const likeNum = await Likes(postId);

  return (
    <>
      <article className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-0 py-10">
        {/* HERO IMAGE */}
        {post?.image && (
          <div className="w-full mb-12">
            <div
              className="relative w-full min-h-[420px] sm:min-h-[560px] rounded-md overflow-hidden bg-gray-100 flex items-center justify-center"
              style={{
                backgroundImage: `url(${post.image})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              {/* soft depth layer */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />
            </div>
          </div>
        )}

        {/* TITLE */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.2] mb-6 text-gray-900">
          {post.title}
        </h1>

        {/* META */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b pb-5 border-gray-200">
          {/* LEFT META */}
          <div className="flex flex-wrap gap-3 items-center text-sm text-gray-600">
            <BadgeCategory label={post.category} />
            <span>
              By{" "}
              <span className="font-medium text-gray-900">{post.author}</span>
            </span>
            <span>• {formattedCreated}</span>
            {formattedUpdated && <span>• Updated {formattedUpdated}</span>}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-5 text-gray-700">
            <div className="flex items-center gap-2 hover:text-red-500 transition">
              <ToggleLike postId={postId} isLiked={like?.liked} />
              <small className="text-sm">{likeNum}</small>
            </div>

            <Link href="#comment" className="hover:text-blue-500 transition">
              <MessageCircle size={18} />
            </Link>

            <div className="hover:scale-105 transition">
              <ToggleBookmark postId={postId} marked={isBookmarked} />
            </div>
          </div>
        </div>

        {/* MARKDOWN CONTENT */}
        <div className="prose prose-lg max-w-none prose-gray prose-headings:font-bold prose-p:leading-8 prose-p:text-gray-700">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              h2: ({ node, ...props }) => (
                <h2
                  {...props}
                  className="text-2xl font-bold mt-10 mb-4 text-gray-900"
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  {...props}
                  className="leading-8 mb-5 text-gray-700 text-[17px]"
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  {...props}
                  className="list-disc ml-6 mb-6 space-y-2 text-gray-700"
                />
              ),
              hr: () => <hr className="my-10 border-gray-200" />,
            }}
          >
            {post.artic}
          </ReactMarkdown>
        </div>
      </article>

      {/* COMMENTS */}
      <Comment postId={postId} />
      <CommentsPost postId={postId} />
    </>
  );
}
