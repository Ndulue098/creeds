import { getFirestore} from "firebase-admin/firestore"
import { getApps } from "firebase-admin/app";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

const serviceAccount={
    "type": "service_account",
    "project_id": "fesablog-1e56b",
    // "project_id": "fesablog-750f6",
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_EMAIL,
    "client_id": process.env.FIREBASE_ID,
    // "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    // "token_uri": "https://oauth2.googleapis.com/token",
    // "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    // "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40fesablog-750f6.iam.gserviceaccount.com",
    // "universe_domain": "googleapis.com"
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40fesablog-1e56b.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

// {
//   "type": "service_account",
//   "project_id": "fesablog-1e56b",
//   "private_key_id": "1236b46d6707b9ee70d50897be4a6315d67ec5ab",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCuvFd7G1RhepFM\n7U8Ky91Gj+lKNCeHt/UmmfTOonzLWYK4czdcUyLacMiGOYb7wc3xDAxRBtPZiAAG\nYYIf3HweraEozXW63efn4VpBe83D0xMJAiuzXHplI4a8xKjxKsHpXz7sv+L+/86G\noroiyDqZcphCUoc/nmtPbATqxc1U/Hhg6ObP6iqMGi8XXheZZ48ydyLddOiYouUr\n0m/Mo67v0yvX54xVjI1bppV9MVgCoLOaz6tEcXP48IvCCXR4XDdExw3SXsBpHYKz\ndpm9pngg9FtXivT7QPIIdtKRX84BR+aLcPQQ1SZdWZDkAcWka4DtEJtB49swFDxJ\ntWhK5X0FAgMBAAECggEAC1xZf7qOKOxUKCFBw1zv3RecPmPXsh5GxSS7YvfzjzEZ\nq65qCgmpuXQdxYRV/2ZhYmu7HUWJXppWDhQm5rVqKIB3evSo0+Z7nnrraFiJT1MY\n6LwIZVf86Th/GSTcKxnxk5/Kso/jTVsKbXyFB5/nF3T46078VimRpo9KXo1PxVet\nQVrRoUWrCqLHQh99I4CgO+lTVMYpECg8EmGyF+gow9gwsSAsHnA4OHAKKvf9wsBc\nCCGJUjfBjejdPErgYPuIk79GnKDl3UwoCFycIszEQJ/iWy4RTEvGct2ze3DXaCPy\n7CP7YVkEO4QGzHr9+JSrIvCv5VymZuZAsvbESn8K4QKBgQDqorXMMXCA5eqzos7c\nwgsQhhCwGofPH9O1QOolm//c++fcpFqaZyR3c7yjDVrKoqUt8F8l93fWW4GbkaFR\njRUWbdIkgDwRZHY2a+y+n35uooIWbYTirF47B6uagsPF3Fh9oxl8vjBQ54iM+e6z\n5O415zFVF3sL7zkpUI+CgLjh/QKBgQC+pWHY04H+tDHkTOwJk4uc+0BX1vaaFWth\ngalbk7JCTUKxeRIv9P654l7yMi/JeF4gSB1nNylVLceq2Pvkcc1AuaWGQUhS9tV6\nwAUcGXnc1MXXYoSw5Z8UkaMf9OA7RfUsdkGBdN2TCkIRCpcY+7YGftLJjqZYcU0C\ncDK9R7iRqQKBgQCYOujoiksL1h/oXIEKCXtURScempfychvRRUSlEgl3Ppi4Nony\nE2k9dwG0aD23qr6wh3u0DlLZ6JS2ck3Ps1EzNB1bQTe3sQ5hULRRGPnWnej41CWb\nS2n3sopLvPt3q/ZdzSwEGwEN/KpDjQSqAqXqow0GwC09GQBlJbd2XD2XoQKBgQCW\n45Jj6FM04i2yweb3VV3kqz8rxql7HoTUsaj3IBiwPTISAP8SEdgiCzaWfn4v+SKW\nbj1HWfNOxWMIp6AGGMQY/FYzwiuZ7l7cPmpM6ST4UTcc146p67NStknjmw52G1KH\nFDmYWoScQjwz/KvGTEKvNWVjvZGO4m3PBjpCcSd1sQKBgFKYzvp552HDqopewu/O\ncCToVFdTheoZh7GTr6kt2BOdipjb72Lx08g0Lgzy8Gn5g45+5xywr5wEso6MhJ1g\nmJw4YfVvlNss5LWvU/L/xYLTNA+YbsN5R86xv/Hk8w4f7WnPQEDchmoq7fbwnXC6\n32KCn78NblnB4krD1A8bpgpn\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-fbsvc@fesablog-1e56b.iam.gserviceaccount.com",
//   "client_id": "115834011766897071731",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40fesablog-1e56b.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }




let firestore;
let auth;
const currentApps=getApps()
if (!currentApps.length) {
    const app = admin.initializeApp({
        credential:admin.credential.cert(serviceAccount)
    });

    firestore=getFirestore(app)
    auth=getAuth(app)
} else {
    const app = currentApps[0];
    firestore=getFirestore(app)
    auth=getAuth(app)
}

export {firestore,auth}


// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });