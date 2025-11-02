import BadgeCategory from "@/components/BadgeCategory";
import { Building2Icon, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TopArticle({post}) {
      const { title, artic, category, createdAt, image, id } = post;

    return <div className="grid grid-cols-2 mb-6 gap-6">
        {/* up */}
            <div className="relative h-[24rem] w-full overflow-hidden ">
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

      </div>

      <div className="p-4 pl-0 space-y-3 flex-1 flex flex-col items-start ">
        {/* Category + Date */}
        <div className="flex items-center gap-3 justify-between text-xs text-muted-foreground">
          <BadgeCategory label={category} />
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>

        {/* Title */}
        <h2 className="text-5xl leading-tight font-light text-foreground  transition">
          {title}
        </h2>
        {/* up */}

        {/* Preview */}
        <div className="mt-auto">
            {/* !!!up */}
            <p className="text-sm text-muted-foreground line-clamp-3 ">
            {artic?.replace(/<[^>]+>/g, "").slice(0, 300)}...
            </p>
            {/* !!!up */}
            <Link href={`/blogPost/${id}`} className="w-full mt-6 flex gap-2 items-center ">
            <MoveRight /> <small>READ MORE</small>
            {/* <Button className="w-full">view Aritcle</Button> */}
            </Link>
        </div>
      </div>
        </div>
}

