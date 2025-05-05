import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsYzvyfXomdfUWlVmHwv4BzQM5lTJljCk",
  authDomain: "iwb-project-287a3.firebaseapp.com",
  projectId: "iwb-project-287a3",
  storageBucket: "iwb-project-287a3.appspot.com",
  messagingSenderId: "215153888947",
  appId: "1:215153888947:web:7cf6551307b9871a6ceac6",
  measurementId: "G-DNGR267WTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };