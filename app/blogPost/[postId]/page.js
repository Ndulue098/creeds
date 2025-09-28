export default async function page({params}){
   const {postId}= await params
   console.log(postId);
   
    return <div>
            blog post
        </div>
}

