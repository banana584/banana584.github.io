// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// Import constants from "../utils/constants.js"
import { website_name } from "../utils/constants.js"

// Firebase Config (Replace with your own details)
const firebaseConfig = {
  apiKey: "AIzaSyCmmCKb56WnaQUKSD8UDjBLJZ8iBQRLzbg",
  authDomain: "t-shirt-buisness.firebaseapp.com",
  projectId: "t-shirt-buisness",
  storageBucket: "t-shirt-buisness.firebasestorage.app",
  messagingSenderId: "608217671833",
  appId: "1:608217671833:web:597c7d4f8bc4c8a7c27008",
  measurementId: "G-9BMNEB8V1G"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let isLogin = false; // Toggle between login & register

// Toggle Login/Register Forms
/*
document.getElementById("toggle-form").addEventListener("click", function () {
isLogin = !isLogin;
  document.getElementById("form-title").innerText = isLogin ? "Login" : "Register";
  document.getElementById("toggle-form").innerText = isLogin ? "Don't have an account? Register" : "Already have an account? Login";
  document.getElementById("username").style.display = isLogin ? "none" : "block";
  document.querySelector("button").innerText = isLogin ? "Login" : "Register";
});
*/
document.getElementById("toggle-form").addEventListener("click", function () {
  window.location.href = `${website_name}/register/register.html`
});

// Handle Authentication
window.handleAuth = async function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let username = document.getElementById("name").value;
  let message = document.getElementById("message");

  try {
    // Login user
    let userCredential = await signInWithEmailAndPassword(auth, email, password);
    let user = userCredential.user;
    let userDoc = await getDoc(doc(db, "users", user.uid));
    message.style.color = "green";
    message.innerText = "Welcome, " + userDoc.data().username + "!";
    console.log("true");
  } catch (error) {
    message.style.color = "red";
    message.innerText = "Error: " + error.message;
    console.log(error.message);
  }
};
