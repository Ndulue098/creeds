import { Breadcrumbs } from "@/components/ui/breadcrumb";
import EventForm from "./EventForm";

export default function page() {
  const items = [
    { label: "Dashboard", href: "/admin-dashboard" },
    { label: "Add Event" },
  ];
  return (
    <div className="max-w-4xl mx-auto w-full py-4">
      <Breadcrumbs items={items} />
      <h1 className="text-4xl font-semibold capitalize mb-6 mt-2">add event Event </h1>
      <EventForm />
    </div>
  );
}
