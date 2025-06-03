// driver.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Firebase config (same as in firebase-config.js or replace this with your import)
const firebaseConfig = {
  apiKey: "AIzaSyCwd4jPJ4O_WevadMM2eYiqA3934VWdc84",
  authDomain: "ebus-management-b465b.firebaseapp.com",
  projectId: "ebus-management-b465b",
  storageBucket: "ebus-management-b465b.appspot.com",
  messagingSenderId: "937392993843",
  appId: "1:937392993843:web:98dd10fabf25e7976f9546",
  measurementId: "G-SQ9CEMN0NT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginForm = document.getElementById("driver-login-form");
const errorMsg = document.getElementById("error-msg");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.textContent = "";

    const email = document.getElementById("driver-email").value.trim();
    const password = document.getElementById("driver-password").value.trim();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const driverDoc = await getDoc(doc(db, "drivers", uid));
      if (!driverDoc.exists()) {
        errorMsg.textContent = "This account is not registered as a driver.";
        return;
      }

      window.location.href = "driver-dashboard.html";
    } catch (error) {
      errorMsg.textContent = error.message;
    }
  });
}
