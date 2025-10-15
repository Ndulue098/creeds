"use client"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { handleDeletePost } from "./action";
import { useRouter } from "next/navigation";
import { removeMarked } from "../blog-posts/action";

export default function DeletePost({postId,field}){
    const [isDeleting,setIsDeleting]=useState(false)
    const authContext=useAuthContext()
    const route=useRouter()

    async function handleDelClick(){
        setIsDeleting(true)
        const token=await authContext.currentUser?.getIdToken()
        if(!token) return
        

        await handleDeletePost(postId,token,field)
        if(field==="posts")await removeMarked(postId,token)
        
        // later set to ture
        setIsDeleting(false)
        route.push("/admin-dashboard")
    }

    return <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="medium" className="p-1">
          <Trash2Icon size={16}/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this property
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              This action cannot be undone. This will parmanently delete this property
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button disabled={isDeleting} onClick={handleDelClick}>
            {isDeleting ? "Deleting..." : "Delete Property"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}

