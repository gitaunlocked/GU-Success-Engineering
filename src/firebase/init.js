// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-o6DArJfMD7UD15mdwPR-Y0HqNxYGUEk",
  authDomain: "gitaunlocked-ca484-99291.firebaseapp.com",
  projectId: "gitaunlocked-ca484-99291",
  storageBucket: "gitaunlocked-ca484-99291.firebasestorage.app",
  messagingSenderId: "861779496540",
  appId: "1:861779496540:web:406d629c0204dac6356099",
  measurementId: "G-YGZ4B9K3DK"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// init firestore service
const db = getFirestore(app)

// init auth service
const auth = getAuth(app)

export { db, auth }
export default db