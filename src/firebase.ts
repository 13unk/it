import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3M3E_2OOCqNcVJivhHIhSr9KxxMy8rXQ",
  authDomain: "unked-utopia.firebaseapp.com",
  projectId: "unked-utopia",
  storageBucket: "unked-utopia.firebasestorage.app",
  messagingSenderId: "1033913562116",
  appId: "1:1033913562116:web:3fd2f2ed1265fe3a9fb151"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
