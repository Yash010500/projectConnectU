import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCtgnwPK3G2VMrRSCRLpF4bKv1ZCQXgjO4",
    authDomain: "connectu-d4533.firebaseapp.com",
    projectId: "connectu-d4533",
    storageBucket: "connectu-d4533.appspot.com",
    messagingSenderId: "923804376985",
    appId: "1:923804376985:web:9b912adee3d03d12177d08",
    measurementId: "G-HQLF8YLFM0"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
export {
  auth,
  googleProvider,
}

export default db;