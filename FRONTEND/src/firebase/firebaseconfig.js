// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAicWc3OBTxnjX5Jvr1v67v12WI6nLHq9A",
  authDomain: "equityelite0.firebaseapp.com",
  projectId: "equityelite0",
  storageBucket: "equityelite0.firebasestorage.app",
  messagingSenderId: "1025175766636",
  appId: "1:1025175766636:web:6288c6b6ed387d154cba49",
  measurementId: "G-G1NTRFLHNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;