// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-d5ae0.firebaseapp.com",
  projectId: "realestate-d5ae0",
  storageBucket: "realestate-d5ae0.appspot.com",
  messagingSenderId: "467959913429",
  appId: "1:467959913429:web:65464beda6102d501ebb5c",
  measurementId: "G-5SRCD7P9QV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);