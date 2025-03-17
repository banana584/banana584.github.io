// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Config (Replace with your own details)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let isLogin = false; // Toggle between login & register

// Toggle Login/Register Forms
document.getElementById("toggle-form").addEventListener("click", function () {
isLogin = !isLogin;
  document.getElementById("form-title").innerText = isLogin ? "Login" : "Register";
  document.getElementById("toggle-form").innerText = isLogin ? "Don't have an account? Register" : "Already have an account? Login";
  document.getElementById("username").style.display = isLogin ? "none" : "block";
  document.querySelector("button").innerText = isLogin ? "Login" : "Register";
});

// Handle Authentication
window.handleAuth = async function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let username = document.getElementById("username").value;
  let message = document.getElementById("message");

  try {
    if (isLogin) {
      // Login user
      let userCredential = await signInWithEmailAndPassword(auth, email, password);
      let user = userCredential.user;
      let userDoc = await getDoc(doc(db, "users", user.uid));
      message.style.color = "green";
      message.innerText = "Welcome, " + userDoc.data().username + "!";
    } else {
      // Register user
      let userCredential = await createUserWithEmailAndPassword(auth, email, password);
      let user = userCredential.user;

      // Store user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email
      });

      message.style.color = "green";
      message.innerText = "Registration successful! You can now login.";
      }
  } catch (error) {
    message.style.color = "red";
    message.innerText = "Error: " + error.message;
  }
};
