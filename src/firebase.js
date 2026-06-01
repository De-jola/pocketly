// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAczJP0yzjgbcneFHdH6pBx6KutmhsRYHI",
  authDomain: "pocketly-1843c.firebaseapp.com",
  projectId: "pocketly-1843c",
  storageBucket: "pocketly-1843c.firebasestorage.app",
  messagingSenderId: "337656556258",
  appId: "1:337656556258:web:0f94b5480b82d1499b4cbb",
  measurementId: "G-88VTEVCSQ6",
};

// Initialize Firebase App Instance
const app = initializeApp(firebaseConfig);

// Initialize and export Authentication service handler
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

// Export built-in methods for direct use in Login/Signup views
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
};
