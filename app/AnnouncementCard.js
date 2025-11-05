import { cn } from "@/lib/utils";
import Image from "next/image";

function datefn(str) {
  const date = new Date(str);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  return formattedDate;
}

export default function AnnouncementCard({ top, val, topAnnounce }) {
  const active = val.id === topAnnounce.id;
  console.log("top", topAnnounce);
  console.log("val", val);

  console.log("act", active);

  return (
    <>
      {/* {rest.map((val, i) => ( */}
      <div
        onClick={top}
        className={cn(
          "flex items-center w-full flex-row-reverse border-[1px] rounded-md overflow-hidden",
          active ? "border-green-600" : "bg-white"
        )}
      >
        <Image
          width={100}
          height={100}
          alt={val.title}
          src={val.image}
          className="w-24 h-24 object-cover"
        />
        <div className="p-3 h-full flex-1 ">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold text-gray-800 truncate">
              {val.title}
            </h2>
            <p className="text-sm">{datefn(val.createdAt)}</p>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {val.message.slice(0, 100)}...
          </p>
        </div>
      </div>
    </>
  );
}
