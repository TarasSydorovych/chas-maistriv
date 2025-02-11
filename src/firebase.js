import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAuth, listUsers } from "firebase/auth";
import { OAuthProvider, signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyAkQCZosAm28-1oGmUDqH2CaDZQJY5ZBhY",
  authDomain: "chas-maistriv-4d49a.firebaseapp.com",
  projectId: "chas-maistriv-4d49a",
  storageBucket: "chas-maistriv-4d49a.appspot.com",
  messagingSenderId: "266780545903",
  appId: "1:266780545903:web:5ad83b1680d28da9eace9a",
  measurementId: "G-2949SXKMFH",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
const analytics = getAnalytics(app);
