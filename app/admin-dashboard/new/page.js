import { Breadcrumbs } from "@/components/ui/breadcrumb";
import AdminEditor from "./AdminEditor";

export default function page() {

   const items=[{label:"Dashboard",href:"/admin-dashboard"},{label:"New Post"}]

    return <div className="flex flex-col max-w-6xl mx-auto w-full  min-h-screen">
            <h2>Add a blog post</h2>
            <Breadcrumbs items={items}/>
            <AdminEditor />
        </div>
}

 