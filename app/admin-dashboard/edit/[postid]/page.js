import { getPost } from "@/data/postData";
import EditPost from "./EditPost";

export default async function page({params}){
    const {postid}= await params
    const postData = await getPost(postid)
    console.log(postData);
    
    return <div>
            <h1>edit post field</h1>
            <EditPost post={postData}/>
        </div>
}

