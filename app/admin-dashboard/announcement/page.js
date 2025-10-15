import { Breadcrumbs } from "@/components/ui/breadcrumb";
import AnnouncementForm from "./AnnouncementForm";

export default async function page() {
  const items = [
    { label: "Dashboard", href: "/admin-dashboard" },
    { label: "Announcement" },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full py-2">
      <Breadcrumbs items={items} />
      <h1 className="text-4xl font-semibold capitalize mb-6 mt-2">
        Announcement
      </h1>
      <AnnouncementForm />
    </div>
  );
}
