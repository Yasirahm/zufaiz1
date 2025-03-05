  import { initializeApp } from "firebase/app";
  import { getAuth } from "firebase/auth";
  import { getFirestore } from "firebase/firestore";
  import { getStorage } from "firebase/storage"; // Add storage for file uploads

  const firebaseConfig = {
    apiKey: "AIzaSyDnZcIg2NKwq8J9lb92D-XR-e6dSIykE60",
    authDomain: "hamaam-8115b.firebaseapp.com",
    projectId: "hamaam-8115b",
    storageBucket: "hamaam-8115b.appspot.com",
    messagingSenderId: "612476745824",
    appId: "1:612476745824:web:79dd6b2b29961fcb0dab05"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app); // Firebase Authentication
  export const db = getFirestore(app); // Firestore Database
  export const storage = getStorage(app); // Firebase Storage for file uploads
