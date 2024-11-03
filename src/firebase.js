// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAkyM76MFRpgecjTLcAhMrgVH_YJLLxHMo",
    authDomain: "bloggo-41aad.firebaseapp.com",
    projectId: "bloggo-41aad",
    storageBucket: "bloggo-41aad.firebasestorage.app",
    messagingSenderId: "571520488982",
    appId: "1:571520488982:web:1cda85611a8f561de58737",
    measurementId: "G-YEJVQPDDQW"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
