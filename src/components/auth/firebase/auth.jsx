// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsYzvyfXomdfUWlVmHwv4BzQM5lTJljCk",
  authDomain: "iwb-project-287a3.firebaseapp.com",
  projectId: "iwb-project-287a3",
  storageBucket: "iwb-project-287a3.firebasestorage.app",
  messagingSenderId: "215153888947",
  appId: "1:215153888947:web:7cf6551307b9871a6ceac6",
  measurementId: "G-DNGR267WTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// exposed api key eyyy..use it as you wish