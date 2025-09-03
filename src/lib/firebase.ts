// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "websockets-lotera",
  appId: "1:470702658375:web:33804a2e3c5945ddfa3262",
  storageBucket: "websockets-lotera.firebasestorage.app",
  apiKey: "AIzaSyCApmQAqqhty_42l3bos_6jNC62Lj5BcSc",
  authDomain: "websockets-lotera.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "470702658375",
  databaseURL: "https://websockets-lotera-default-rtdb.us-central1.firebasedatabase.app"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

export { app, database };
