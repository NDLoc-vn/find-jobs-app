// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4wETuMDxpCNPjqYaA6nmDdhHPIGHNu5U",
  authDomain: "chat-814f6.firebaseapp.com",
  databaseURL: "https://chat-814f6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-814f6",
  storageBucket: "chat-814f6.firebasestorage.app",
  messagingSenderId: "727434414862",
  appId: "1:727434414862:web:9222a4fb303112f251655f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };