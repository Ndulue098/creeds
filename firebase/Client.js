// Import the functions you need from the SDKs you need
import { initializeApp,getApps } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBQpaVprBN9GgYlug7Nt8jBgKMDoiX5jjk",
//     authDomain: "fesablog-750f6.firebaseapp.com",
//     projectId: "fesablog-750f6",
//     storageBucket: "fesablog-750f6.firebasestorage.app",
//     messagingSenderId: "708523911386",
//     appId: "1:708523911386:web:5aa02d2856c77d616a1de3"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDnuvgOFPv5FbwKt0IHp1HlOFSlHmXdkrk",
  authDomain: "fesablog-1e56b.firebaseapp.com",
  projectId: "fesablog-1e56b",
  storageBucket: "fesablog-1e56b.firebasestorage.app",
  messagingSenderId: "221571399005",
  appId: "1:221571399005:web:1de5474f0084c971127cb4"
};

// Initialize Firebase
//
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



// 

// Import the functions you need from the SDKs you need
