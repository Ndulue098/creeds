import { Breadcrumbs } from "@/components/ui/breadcrumb";
import AdminEditor from "./AdminEditor";
import { Suspense } from "react";

export default function page() {
  const items = [
    { label: "Dashboard", href: "/admin-dashboard" },
    { label: "New Post" },
  ];

  return (
    <div className="flex flex-col max-w-6xl mx-auto w-full p-2 min-h-screen">
      <Breadcrumbs items={items} />
      <h1 className="text-4xl font-semibold capitalize mb-6 mt-2">blog post</h1>
      <Suspense fallback={<div>Loading</div>}>
        <AdminEditor />
      </Suspense>
    </div>
  );
}
