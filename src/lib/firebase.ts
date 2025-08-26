// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUOYXjtBu3BBy3L949acYMIoD3eBBZmXU",
  authDomain: "keatchenconnect.firebaseapp.com",
  databaseURL: "https://keatchenconnect-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "keatchenconnect",
  storageBucket: "keatchenconnect.firebasestorage.app",
  messagingSenderId: "613001657446",
  appId: "1:613001657446:web:d8d66ebeb549ec7f9681a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
