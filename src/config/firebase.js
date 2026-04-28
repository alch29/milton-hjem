import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";

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
export const storage = getStorage(app);

export const authReady = new Promise((resolve) => {
  const unsub = onAuthStateChanged(auth, () => {
    unsub();
    resolve();
  });
});