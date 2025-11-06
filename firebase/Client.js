// Import the functions you need from the SDKs you need
import { initializeApp,getApps } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "fesablog-1e56b.firebasestorage.app",
  messagingSenderId: "221571399005",
  appId: "1:221571399005:web:1de5474f0084c971127cb4"
};

const currentApp= getApps()
let auth;
let storage;

if (!currentApp.length){
    const app = initializeApp(firebaseConfig);
    auth=getAuth(app);
    storage=getStorage(app);
}else {
    const app=currentApp[0]
    auth=getAuth(app);
    storage=getStorage(app);
}

export { auth, storage };


