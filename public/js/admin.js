// js/admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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

const loginForm = document.getElementById('admin-login-form');
const errorMsg = document.getElementById('error-msg');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.textContent = '';

    const email = document.getElementById("admin-email").value.trim();
    const password = document.getElementById("admin-password").value.trim();

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Check if the user is an admin in Firestore "admins" collection
      const adminDoc = await getDoc(doc(db, "admins", uid));
      if (!adminDoc.exists()) {
        errorMsg.textContent = "This account is not authorized as admin.";
        await signOut(auth);
        return;
      }

      // Redirect to admin dashboard on success
      window.location.href = "admin-dashboard.html";

    } catch (error) {
      errorMsg.textContent = "Login Failed: " + error.message;
    }
  });
}
