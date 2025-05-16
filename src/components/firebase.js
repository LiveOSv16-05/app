// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';  // <-- Add this import

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtRKejGaEXv9VDCZWDI_OK_6L2UZFkPAY",
  authDomain: "liveos-5318e.firebaseapp.com",
  projectId: "liveos-5318e",
  storageBucket: "liveos-5318e.firebasestorage.app",
  messagingSenderId: "519921557956",
  appId: "1:519921557956:web:0877f1e3fd5842dc538491",
  measurementId: "G-DV9DNB9GQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

// ✅ Export db for use elsewhere
export { db };