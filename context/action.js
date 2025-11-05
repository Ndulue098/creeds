"use server";

import { auth } from "@/firebase/Server";
import { cookies } from "next/headers";
export async function setToken({ token, refreshToken }) {
    // verify the token
    try {
    const verifiedToken = await auth.verifyIdToken(token);
    if (!verifiedToken) return;
    
    const expiresIn = (verifiedToken.exp * 1000) - Date.now();
        
    const userRecord = await auth.getUser(verifiedToken.uid);
    // const userRecord=await auth.getUser(verifiedToken.uid)

    console.log("userRecord--", userRecord);

    // setting custom claim
    if (
      process.env.ADMIN_EMAIL === userRecord.email &&
      !userRecord.customClaims?.admin
    ) {
     await auth.setCustomUserClaims(verifiedToken.uid, {
        admin: true,
      });
    }
    // !
    if (expiresIn <= 0) return; 
    // setting the cookies
    const cookiesStore = await cookies();
    cookiesStore.set("firebaseAuthToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
       maxAge: Math.floor(expiresIn / 1000),
      sameSite:"lax"
       //  maxAge: 3600
    });
    // cookiesStore.set("firebaseAuthToken", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    // });
    // cookiesStore.set("firebaseRefeshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    // });
  } catch (err) {
    console.log("Error form setting cookies", err);
  }
}

export async function removeToken() {
  const cookiesStore = await cookies();
  cookiesStore.delete("firebaseAuthToken");
//   cookiesStore.delete("firebaseRefeshToken");
}
