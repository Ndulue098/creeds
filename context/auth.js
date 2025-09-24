"use client"
import {createContext, useContext, useEffect, useState} from "react";
import {auth} from "@/firebase/Client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { removeToken, setToken } from "./action";

const AuthContext=createContext(null)

function AuthProviderContext({children}){
    const [currentUser,setCurrrentUser]=useState("");
    const [customClaims,setCustomClaims]=useState(null)

    useEffect(()=>{
       const unsubscribe= auth.onAuthStateChanged(async (user)=>{
            setCurrrentUser(user??null)

        if(user){

            // const tokenDetail=await user.getIdTokenResult()
            // const token=tokenDetail.token
            // const claims=tokenDetail.claims
            // const refreshToken=user.refreshToken

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
        }catch(err){
            console.log("Google login failed",err);
        }
    }

    // 

    return <AuthContext.Provider value={{currentUser,loginwithGoogle,logOut,customClaims}}>
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