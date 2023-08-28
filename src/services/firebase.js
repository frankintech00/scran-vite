/**
 * @file This file initializes Firebase services like Auth, Firestore, and Storage, and exports them for use throughout the application.
 */

/**
 * Imports necessary modules and components from Firebase and other libraries.
 */
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/**
 * Configuration object for Firebase.
 *
 * @type {Object}
 */
const firebaseConfig = {
  apiKey: "AIzaSyA2I7cq6ALajxVnegz8wx7Pv4bTIvDcnnU",
  authDomain: "scran-vite-2b11a.firebaseapp.com",
  projectId: "scran-vite-2b11a",
  storageBucket: "scran-vite-2b11a.appspot.com",
  messagingSenderId: "369718663107",
  appId: "1:369718663107:web:00c9f91c826505b65b0f76",
  measurementId: "G-JVS26LETH9",
};

/**
 * Initializes the Firebase app.
 *
 * @type {Object}
 */
const app = initializeApp(firebaseConfig);

/**
 * Firebase authentication instance.
 *
 * @type {Object}
 */
export const auth = getAuth(app);

/**
 * Firebase authentication provider for Google sign-in.
 *
 * @type {Object}
 */
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

/**
 * Firebase Firestore instance.
 *
 * @type {Object}
 */
export const db = getFirestore(app);

/**
 * Firebase storage instance.
 *
 * @type {Object}
 */
export const storage = getStorage(app);
