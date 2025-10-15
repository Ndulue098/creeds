import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function AnnouncementBtn() {
  return (
    <Link href={`/admin-dashboard/announcement`}>
      <Button>
        <PlusCircle/>
        Announcement</Button>
    </Link>
  )
}
