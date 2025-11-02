import { getPost } from "@/data/postData";
import EditPost from "./EditPost";
import { Breadcrumbs } from "@/components/ui/breadcrumb";

export default async function page({params}){
    const {postid}= await params
    const postData = await getPost(postid)
    console.log(postData);
    
    const items=[{label:"Dashboard",href:"/admin-dashboard"},{label:"Edit"}]


    return <div className="flex flex-col max-w-6xl mx-auto w-full p-2 min-h-screen">
            <Breadcrumbs items={items}/>
            <h1 className="text-4xl font-semibold capitalize mb-6 mt-2">edit post field</h1>
            <EditPost post={postData}/>
        </div>
}

