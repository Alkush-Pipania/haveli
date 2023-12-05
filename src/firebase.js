// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeMERMF63upLz2tijJsQf0Ur-HJgqfAtw",
  authDomain: "my-new-app-888e3.firebaseapp.com",
  projectId: "my-new-app-888e3",
  storageBucket: "my-new-app-888e3.appspot.com",
  messagingSenderId: "466340918851",
  appId: "1:466340918851:web:27d9354bbb36d490e746f6"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()