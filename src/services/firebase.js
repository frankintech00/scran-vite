// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA2I7cq6ALajxVnegz8wx7Pv4bTIvDcnnU",
  authDomain: "scran-vite-2b11a.firebaseapp.com",
  projectId: "scran-vite-2b11a",
  storageBucket: "scran-vite-2b11a.appspot.com",
  messagingSenderId: "369718663107",
  appId: "1:369718663107:web:00c9f91c826505b65b0f76",
  measurementId: "G-JVS26LETH9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
