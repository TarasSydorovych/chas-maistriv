
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import {getAuth, listUsers} from 'firebase/auth'
import { OAuthProvider ,signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyB7NYWLdEy90JC4AVVIrbR9xLr2UZ-ulFQ",
  authDomain: "chas2-12974.firebaseapp.com",
  projectId: "chas2-12974",
  storageBucket: "chas2-12974.appspot.com",
  messagingSenderId: "508202227569",
  appId: "1:508202227569:web:a8f1427e4db958e3cc08d0",
  measurementId: "G-2JSMRR0XQ0"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
export const googleAuthProvider = new GoogleAuthProvider();  
export const auth = getAuth(app);
const analytics = getAnalytics(app);
 
