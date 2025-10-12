import BadgeCategory from "@/components/BadgeCategory";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Bookmark, BookMarked, Building2Icon, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ToggleBookmark from "./ToggleBookmark";
import getBookMarks from "@/data/getBookMarks";

export default async function ArticleCard({ post }) {
  const { title, artic, category, createdAt, image, id } = post;
  //   const [liked, setLiked] = useState(false);

  //   const toggleLike = () => setLiked((prev) => !prev);
  const mark=await getBookMarks()
  console.log(mark);
  

  return (
    <Link href={`/blogPost/${id}`} className=" inline-block h-full">
      <div className="group flex flex-col h-full relative overflow-hidden rounded-2xl border-[1px] border-border bg-card transition hover:-translate-y-1 duration-300">
        {/* Image */}
        <div className="relative h-46 w-full overflow-hidden ">
          {image && (
            <Image
              src={image || null}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {!image && (
            <div className="bg-green-100 h-full flex flex-col items-center justify-center w-full text-zinc-500 ">
              <Building2Icon size={28} />
              <small>No Image</small>
            </div>
          )}

          {/* Like Button */}
          <div className="bg-white p-3">
            <button
              //   onClick={toggleLike}
              className={cn(
                "absolute top-2 bg-white right-2 z-10 rounded-tr-2xl rounded-md p-2 transition "
                // liked ? "bg-red-500 text-white" : "bg-black/40 text-white hover:bg-black/60"
              )}
            >
              <ToggleBookmark postId={id} marked={mark[id]}/>
              {/* <Bookmark
                size={18}
              /> */}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Category + Date */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <BadgeCategory label={category} />
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold leading-snug line-clamp-2 text-foreground  transition">
            {title}
          </h2>

          {/* Preview */}
          <p className="text-xs text-muted-foreground line-clamp-3">
            {artic?.replace(/<[^>]+>/g, "").slice(0, 150)}...
          </p>
        </div>
      </div>
    </Link>
  );
}
