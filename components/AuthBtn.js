"use client"

import { useAuthContext } from "@/context/auth"
import Link from "next/link"
import { Avatar, AvatarFallback } from "./ui/avatar"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function AuthBtn() {
       const authContext=useAuthContext()
        const router=useRouter()
       console.log(authContext?.currentUser);
       console.log(authContext?.customClaims)
       console.log(authContext?.customClaims?.admin);
       
        
      async function logout(){
        await authContext.logOut()
        router.refresh()
       }

    return <div>
        {!!authContext?.currentUser&&
        <DropdownMenu>
            <DropdownMenuTrigger>
            
                <Avatar>
                    {!!authContext?.currentUser.photoURL&&
                    <Image height={70} width={70} src={authContext.currentUser.photoURL} alt={`${authContext.currentUser.displayName}avatar`}/>
                }
                    <AvatarFallback className="text-sky-950 bg-white w-full flex items-center justify-center font-semibold">
                        {(authContext.currentUser.displayName || authContext.currentUser.email)?.[0]}
                    </AvatarFallback>
                            
                </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <div>{authContext.currentUser.displayName}</div>
                    <div className="font-normal text-xs">{authContext.currentUser.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild>
                        <Link href="/account">My Account</Link>
                </DropdownMenuItem>
                {
                !!authContext.customClaims?.admin &&
                <DropdownMenuItem asChild> 
                    <Link href="/admin-dashboard">Admin Dashboard</Link>
                </DropdownMenuItem>
                }
                <DropdownMenuItem onClick={logout}>
                        logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        }

        {!authContext?.currentUser &&
            <div className="flex gap-2 items-center ">
            <Link className=" uppercase tracking-widest hover:underline" href="/login">Login</Link>
            <div className="bg-white/50 h-8 w-[1px]"/>
            <Link className=" uppercase tracking-widest hover:underline" href="/register">Signup</Link>
        </div>}

        </div>
}

