import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { getAnnouncId } from "@/data/postData";
import AnnouncementForm from "../../AnnouncementForm";
import EditCom from "../../../EditCom";

export default async function page({ params }) {
  const { announceId } = await params;
  console.log(announceId);
  const data = await getAnnouncId(announceId);
  console.log(data);

  const items = [
    { label: "Dashboard", href: "/admin-dashboard" },
    { label: "Announcement" },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full py-2">
      <Breadcrumbs items={items} />
      <h1 className="text-4xl font-semibold capitalize mb-6 mt-2">
        Edit Announcement 
      </h1>
      <EditCom defaultval={data} field="announcements" Element={AnnouncementForm} />
      {/* <AnnouncementForm  /> */}
    </div>
  );
}
