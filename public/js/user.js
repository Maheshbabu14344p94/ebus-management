// public/js/user.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwd4jPJ4O_WevadMM2eYiqA3934VWdc84",
  authDomain: "ebus-management-b465b.firebaseapp.com",
  projectId: "ebus-management-b465b",
  storageBucket: "ebus-management-b465b.firebasestorage.app",
  messagingSenderId: "937392993843",
  appId: "1:937392993843:web:98dd10fabf25e7976f9546",
  measurementId: "G-SQ9CEMN0NT"
};

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🟢 USER REGISTRATION LOGIC
const registerForm = document.getElementById('user-register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Save to Firestore users collection
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        role: "user"
      });

      alert("Registration successful!");
      window.location.href = "user-login.html";
    } catch (error) {
      alert("Error: " + error.message);
    }
  });
}
