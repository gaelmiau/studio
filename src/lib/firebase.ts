import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD30LE9R9CDPN1Rltjs-h8jG8cr_37EzSo",
  authDomain: "loteria100-4544e.firebaseapp.com",
  databaseURL: "https://loteria100-4544e-default-rtdb.firebaseio.com",
  projectId: "loteria100-4544e",
  storageBucket: "loteria100-4544e.firebasestorage.app",
  messagingSenderId: "970189710033",
  appId: "1:970189710033:web:059ba41c496c0b94e95bf0",
  measurementId: "G-K4Q1NT2WWY"
};

// Inicializa Firebase y la base de datos
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
