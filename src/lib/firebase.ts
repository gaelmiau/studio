import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDv3AUt4U2fpb4cg96mMJB9P0TU0LfGfgw",
  authDomain: "loteria-137c4.firebaseapp.com",
  databaseURL: "https://loteria-137c4-default-rtdb.firebaseio.com",
  projectId: "loteria-137c4",
  storageBucket: "loteria-137c4.appspot.com",
  messagingSenderId: "829551312056",
  appId: "1:829551312056:web:eb054014ba6ee53c20884d",
  measurementId: "G-FZQ3E4ZV3J"
};

// Inicializa Firebase y la base de datos
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
