import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv7fZAFo9wlesmd7ozKoBkLo_LqpXLVWA",
  authDomain: "clone-ed285.firebaseapp.com",
  projectId: "clone-ed285",
  storageBucket: "clone-ed285.appspot.com",
  messagingSenderId: "644690820246",
  appId: "1:644690820246:web:bc59a184f7576b3fe296b7",
  measurementId: "G-W29V1GZDJZ",
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Firestore instance
const db = getFirestore(firebaseApp);

// Auth instance
const auth = getAuth(firebaseApp);

export { db, auth };
