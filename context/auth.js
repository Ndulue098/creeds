"use client"
import {createContext, useContext, useEffect} from "react";

const AuthContext=createContext(null)

function AuthProviderContext({children}){
    useEffect(()=>{


    },[])


    return <AuthContext.Provider value={{}}>
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