import BadgeCategory from "@/components/BadgeCategory";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({post}) {
     const { title, artic, category, createdAt, image,id } = post;
//   const [liked, setLiked] = useState(false);

//   const toggleLike = () => setLiked((prev) => !prev);

  return (
    <Link href={`/blogPost/${id}`} className=" inline-block h-full">
    <div className="group flex flex-col h-full relative overflow-hidden rounded-2xl border-[1px] border-border bg-card transition hover:-translate-y-1 duration-300">
      {/* Image */}
      <div className="relative h-46 w-full overflow-hidden ">
        <Image
          src={image}
          alt={title} 
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

        {/* Like Button */}
        <button 
        //   onClick={toggleLike}
        className={cn(
            "absolute top-3 right-3 z-10 rounded-full p-2 transition",
            // liked ? "bg-red-500 text-white" : "bg-black/40 text-white hover:bg-black/60"
        )}
        >
          <Heart
            size={18}
            // className={cn("transition", liked ? "fill-current" : "stroke-current")}
            />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category + Date */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <BadgeCategory label={category}/>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold leading-snug line-clamp-2 text-foreground  transition">
          {title}
        </h2>

        {/* Preview */}
        <p className="text-xs text-muted-foreground line-clamp-3">
          {artic.replace(/<[^>]+>/g, "").slice(0, 150)}...
        </p>
      </div>
    </div>
    </Link>
  );
}

