"use client"
import {createContext, useContext, useEffect, useState} from "react";
import {auth} from "@/firebase/Client";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { removeToken, setToken } from "./action";
import { useRouter } from "next/navigation";

const AuthContext=createContext(null)

function AuthProviderContext({children}){
    const [currentUser,setCurrrentUser]=useState("");
    const [customClaims,setCustomClaims]=useState(null)
    const router=useRouter()
    useEffect(()=>{
       const unsubscribe= auth.onAuthStateChanged(async (user)=>{
            setCurrrentUser(user??null)

        if(user){
            const tokenResult=await user.getIdTokenResult(true);
            // auth token 
            const token=tokenResult.token
            const claims=tokenResult.claims
            console.log("claims---",claims);
            
            // for refresh token
            const refreshToken=user.refreshToken


            setCustomClaims(claims??null)
            if(token && refreshToken){
               await setToken({token,refreshToken}) 
            }
        }else{ 
           await removeToken()
        }
            
        })

        return ()=>unsubscribe
    },[])

    // signout
    async function logOut() {
       await auth.signOut()
    }

    //login
    async  function loginwithGoogle(){
        const provider=new GoogleAuthProvider()
        try{
            await signInWithPopup(auth,provider)
            router.push("/")
        }catch(err){
            console.log("Google login failed",err);
        }
    }

    // login with email
     async function loginWithEmail(email,password) {
      await signInWithEmailAndPassword(auth,email,password)
      router.push("/")
  }

    return <AuthContext.Provider value={{currentUser,loginwithGoogle,loginWithEmail,logOut,customClaims}}>
        {children}
    </AuthContext.Provider>

}

function  useAuthContext(){
   const authContext= useContext(AuthContext)
    if(authContext===undefined){
        throw new Error('Context was used outside AuthProvider')
    }
    return authContext
}

export {useAuthContext, AuthProviderContext}