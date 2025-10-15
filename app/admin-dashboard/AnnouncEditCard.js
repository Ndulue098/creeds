import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAnnouncement } from "@/data/postData";
import { formatDate } from "@/lib/utils";
import { Eye, Megaphone, PenBoxIcon, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeletePost from "./DeletePost";

export default async function AnnouncEditCard({ data = [], label,Btn}) {
  let name;
  if(label==="announcement"){
    name=label+"s"
  }
  else{
    name=label
  }

  // const announcements = await getAnnouncement();
  // if (!data || data.length === 0) {
  //   return (
  //     <div className="bg-white rounded-lg p-4 shadow-sm text-center text-gray-500">
  //       No {label} available
  //     </div>
  //   );
  // }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
        <h3 className="font-semibold text-xl">Manage {label}</h3>

        <Btn/>
      </div>

      {(!data || data.length === 0) ? (
        <div className="bg-white rounded-lg p-4 shadow-sm text-center text-gray-500">
          No {label} available
        </div>
      )

      :
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title </TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <TableRow
                key={item.id}
                // className="p-4 flex gap-3 items-start hover:bg-gray-50 transition"
              >
                <TableCell>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <div className=" h-[2.5rem] w-[3rem] flex items-center justify-center">
                      <Megaphone />
                    </div>
                  )}
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell className="text-sm text-gray-600 line-clamp-2">
                  {item.message.slice(0, 10) + "..."}
                </TableCell>
                <TableCell>{formatDate(item?.createdAt)}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Link
                      href={`/admin-dashboard/${label}/edit/${item.id}`}
                    >
                      <PenBoxIcon className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <DeletePost postId={item.id} field={`${name}`} />
                    {/* <Trash2 className="w-4 h-4 text-red-500" /> */}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    </div>
  );
}
