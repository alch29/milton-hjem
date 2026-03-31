import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGo2UQjRWmznVSG5yWWISbvN2fMKeU4ic",
  authDomain: "milton-hjem.firebaseapp.com",
  projectId: "milton-hjem",
  storageBucket: "milton-hjem.firebasestorage.app",
  messagingSenderId: "1098533112729",
  appId: "1:1098533112729:web:d4b1ceff0e992b38f06108"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);