"use client"
import { useAuthContext } from "@/context/auth"
import { useRouter } from "next/navigation"
import {Button} from "@/components/ui/button"

export default function ContinueWithGoogleBtn(){

    const authContext=useAuthContext()
    const route=useRouter()

    async function handleLogin(){
       await authContext?.loginwithGoogle()
       route.refresh()
    }

    return <Button onClick={handleLogin} className="w-full cursor-pointer">
            Continue With Google 
        </Button>
}
 
 