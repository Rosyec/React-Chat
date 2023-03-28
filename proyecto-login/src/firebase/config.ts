// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FacebookAuthProvider } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsWqvoxCfBP5gJtD1Obx2LgBwQki1K3e8",
  authDomain: "proyecto-login-f4db3.firebaseapp.com",
  projectId: "proyecto-login-f4db3",
  storageBucket: "proyecto-login-f4db3.appspot.com",
  messagingSenderId: "1063758965894",
  appId: "1:1063758965894:web:e16ea8263a7422eb2bf507",
  measurementId: "G-FQ62KDZY0D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const googleAuth = new GoogleAuthProvider();
export const facebookAuth = new FacebookAuthProvider();
const analytics = getAnalytics(app);