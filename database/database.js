// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyDh3WYkuVQ-Bwd_3mM3zHqQead-yjNbKPA",
  // authDomain: "roboticcamp2024.firebaseapp.com",
  // projectId: "roboticcamp2024",
  // storageBucket: "roboticcamp2024.appspot.com",
  // messagingSenderId: "96247026145",
  // appId: "1:96247026145:web:cda297740ea82f117202a0"
  apiKey: "AIzaSyCY95alP5uPQa0UFbUc7iMNLhiPbgCEm40",
  authDomain: "roboticcamp2024.firebaseapp.com",
  databaseURL: "https://roboticcamp2024-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "roboticcamp2024",
  storageBucket: "roboticcamp2024.firebasestorage.app",
  messagingSenderId: "96247026145",
  appId: "1:96247026145:web:d90c90532db819ca7202a0"
};
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID
// };

console.log(firebaseConfig); // Debug to confirm values
// Initialize Firebase
const app = initializeApp(firebaseConfig);