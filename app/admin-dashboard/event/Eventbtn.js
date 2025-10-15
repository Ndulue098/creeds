import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Eventbtn() {
  return (
    <Link href="/admin-dashboard/event">
      <Button>
        <PlusCircle/>
        Event</Button>
    </Link>
  );
}
