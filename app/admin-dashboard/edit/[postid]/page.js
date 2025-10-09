import { getPost } from "@/data/postData";
import EditPost from "./EditPost";
import { Breadcrumbs } from "@/components/ui/breadcrumb";

export default async function page({params}){
    const {postid}= await params
    const postData = await getPost(postid)
    console.log(postData);
    
    const items=[{label:"Dashboard",href:"/admin-dashboard"},{label:"Edit"}]


    return <div>
            <h1>edit post field</h1>
            <Breadcrumbs items={items}/>
            <EditPost post={postData}/>
        </div>
}

