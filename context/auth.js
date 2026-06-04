"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/Client";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { removeToken, setToken } from "./action";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

function AuthProviderContext({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [customClaims, setCustomClaims] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const initPersistence = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (err) {
        console.warn("Failed to set auth persistence:", err);
      }
    };

    initPersistence();

    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      try {
        if (!user) {
          setCurrentUser(null);
          setCustomClaims(null);
          await removeToken();
          return;
        }

        const token = await user.getIdToken();

        const { newClaimAdded } = (await setToken({ token })) || {};

        if (newClaimAdded) {
          await user.getIdToken(true);
        }

        const tokenResult = await user.getIdTokenResult();

        setCurrentUser(user);
        setCustomClaims(tokenResult.claims ?? null);
      } finally {
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // signout
  async function logOut() {
    try {
      setLogoutLoading(true);

      await auth.signOut();
    } finally {
      setLogoutLoading(false);
    }
  }

  //login
  async function loginwithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
      setLoginLoading(true);
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google login failed", error);
      throw error;
    } finally {
      setLoginLoading(false);
    }
  }

  // login with email
  // async function loginWithEmail(email, password) {
  //   await signInWithEmailAndPassword(auth, email, password);
  // }

  async function loginWithEmail(email, password) {
    try {
      setLoginLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Email login failed", error);
      throw error;
    } finally {
      setLoginLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginwithGoogle,
        loginWithEmail,
        logOut,
        customClaims,
        authLoading,
        loginLoading,
        logoutLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("Context was used outside AuthProvider");
  }
  return authContext;
}

export { useAuthContext, AuthProviderContext };
