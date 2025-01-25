// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU19mm6RDWy_fhoMo3SLWFuyvT4UDKKKk",
  authDomain: "calendrier-300cb.firebaseapp.com",
  projectId: "calendrier-300cb",
  storageBucket: "calendrier-300cb.firebasestorage.app",
  messagingSenderId: "556904721649",
  appId: "1:556904721649:web:8d40a30990520e4ffbcd50",
  measurementId: "G-9G8217QW9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
