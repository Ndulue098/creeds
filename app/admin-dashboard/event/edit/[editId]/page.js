import EditCom from "@/app/admin-dashboard/EditCom";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { getEventId } from "@/data/postData";
import EventForm from "../../EventForm";

export default async function page({ params }) {
  const { editId } = await params;
  const data= await getEventId(editId);
//   const { author, date, image, location, message, title } = await getEventId(
//     editId
//   );
  console.log(editId);

//   const data = {
//     author,
//     date,
//     image,
//     location,
//     message,
//     title,
//   };

  console.log(data);

  const items = [
    { label: "Dashboard", href: "/admin-dashboard" },
    { label: "Event" },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full py-2">
      <Breadcrumbs items={items} />
      <h1 className="text-4xl font-semibold capitalize mb-6 mt-2">
        Edit Announcement
      </h1>
      <EditCom defaultval={data} field="event"  Element={EventForm}/>        
      {/* <AnnouncementForm  /> */}
    </div>
  );
}
