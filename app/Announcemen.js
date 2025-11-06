import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Megaphone } from "lucide-react";
import { getAnnouncement } from "@/data/postData";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import AnnouncementCard from "./AnnouncementCard";
import AnnouncementList from "./AnnouncementList";

function datefn(str) {
  const date = new Date(str);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  return formattedDate;
}

export default async function AnnouncementWireframe() {
  const data = await getAnnouncement();
  console.log("announcement", data);
  const [first, ...rest] = data;

  return (
    <section className="max-w-7xl mx-auto my-24 px-6 py-5" id="announcement">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 capitalize">
          Latest Announcements
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-xl leading-relaxed">
          Get the latest updates, news, and important information from{" "}
          <span className="font-semibold text-green-600 dark:text-green-400">
            CREEDS
          </span>
          . Stay informed and connected with upcoming academic or departmental
          notices.
        </p>
      </div>

      <div className="grid w-full  md:h-[30rem] h-[42rem] md:grid-cols-12 md:grid-rows-none grid-rows-2 gap-5 ">
        <AnnouncementList announcements={data} />
      </div>
    </section>
  );
}
