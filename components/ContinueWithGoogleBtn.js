"use client"
import { useAuthContext } from "@/context/auth"
import { useRouter } from "next/navigation"
import {Button} from "@/components/ui/button"

export default function ContinueWithGoogleBtn({link}){

    const authContext=useAuthContext()
    const router=useRouter()

    async function handleLogin(){
        try{
            await authContext?.loginwithGoogle()
            if(link){
                router.back()
                router.refresh()
            }else{
                router.push("/")
            }
        }catch(err){

        }
    }

    return <Button onClick={handleLogin} variant="outline" className="w-full cursor-pointer">
            Continue With Google 
        </Button>
}
 
 