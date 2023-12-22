// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-d7721.firebaseapp.com",
  projectId: "estate-d7721",
  storageBucket: "estate-d7721.appspot.com",
  messagingSenderId: "853223609386",
  appId: "1:853223609386:web:f5b8f8fe3ace50c851df53"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);