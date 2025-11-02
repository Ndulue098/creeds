import BadgeCategory from "@/components/BadgeCategory";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Bookmark, BookMarked, Building2Icon, Heart, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ToggleBookmark from "../app/blog-posts/ToggleBookmark";
import getBookMarks from "@/data/getBookMarks";
import { Button } from "@/components/ui/button";

export default async function ArticleCard({ post, type }) {
  const { title, artic, category, createdAt, image, id } = post;
  //   const [liked, setLiked] = useState(false);

  //   const toggleLike = () => setLiked((prev) => !prev); 
  const mark = await getBookMarks(); 
  return (
    <div className="group flex flex-col h-full relative overflow-hidden border-[1px] bg-card transition hover:-translate-y-1 duration-300">
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
        {type !== "bm" && (
          <div className="bg-white p-1">
            <button
              className={cn(
                "absolute top-2 right-2 z-10 rounded-md p-1.5 bg-white/80 backdrop-blur-sm",
                "shadow-sm hover:bg-white hover:shadow-md transition-all duration-200"
              )}
            >
              <ToggleBookmark postId={id} marked={mark[id]} />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 flex-1 flex flex-col items-start ">
        {/* Category + Date */}
        <div className="flex items-center gap-3 justify-between text-xs text-muted-foreground">
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
        <Link href={`/blogPost/${id}`} className="w-full mt-auto flex gap-2 items-center ">
          <MoveRight /> <small>READ MORE</small>
          {/* <Button className="w-full">view Aritcle</Button> */}
        </Link>
      </div>
    </div>
  );
}
 