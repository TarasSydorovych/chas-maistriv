
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import {getAuth, listUsers} from 'firebase/auth'
import { OAuthProvider ,signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyB-oBUol0lHBOCKJdYSYcYax9E7gb_aqGI",
  authDomain: "chas-maistriv.firebaseapp.com",
  projectId: "chas-maistriv",
  storageBucket: "chas-maistriv.appspot.com",
  messagingSenderId: "294986811111",
  appId: "1:294986811111:web:eb2192089445bda6ed4442",
  measurementId: "G-SV0MCFBTYP"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
export const googleAuthProvider = new GoogleAuthProvider();  
export const auth = getAuth(app);
const analytics = getAnalytics(app);
 
