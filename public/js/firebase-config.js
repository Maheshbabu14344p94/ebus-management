// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwd4jPJ4O_WevadMM2eYiqA3934VWdc84",
  authDomain: "ebus-management-b465b.firebaseapp.com",
  projectId: "ebus-management-b465b",
  storageBucket: "ebus-management-b465b.firebasestorage.app",
  messagingSenderId: "937392993843",
  appId: "1:937392993843:web:98dd10fabf25e7976f9546",
  measurementId: "G-SQ9CEMN0NT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
