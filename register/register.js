// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// Import constants
import { website_name } from "../utils/constants.js";

console.log("Website Name:", website_name); // Debugging check

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCmmCKb56WnaQUKSD8UDjBLJZ8iBQRLzbg",
  authDomain: "t-shirt-buisness.firebaseapp.com",  // Check spelling!
  projectId: "t-shirt-buisness",
  storageBucket: "t-shirt-buisness.appspot.com",
  messagingSenderId: "608217671833",
  appId: "1:608217671833:web:597c7d4f8bc4c8a7c27008",
  measurementId: "G-9BMNEB8V1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Toggle Login/Register Forms (Only if the element exists)
let toggleForm = document.getElementById("toggle-form");
if (toggleForm) {
  toggleForm.addEventListener("click", function () {
    window.location.href = `${website_name}/login/login.html`;
  });
}

// Handle Registration
window.handleAuth = async function () {
  let email = document.getElementById("email")?.value.trim();
  let password = document.getElementById("password")?.value.trim();
  let name = document.getElementById("name")?.value.trim();
  let message = document.getElementById("message");

  if (!email || !password || !name) {
    if (message) {
      message.style.color = "red";
      message.innerText = "Please fill in all fields.";
    }
    return;
  }

  if (password.length < 6) {
    if (message) {
      message.style.color = "red";
      message.innerText = "Password must be at least 6 characters long.";
    }
    return;
  }

  try {
    // Register user
    let userCredential = await createUserWithEmailAndPassword(auth, email, password);
    let user = userCredential.user;

    // Store user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email
    });

    if (message) {
      message.style.color = "green";
      message.innerText = "Registration successful! Redirecting to login...";
    }

    // Redirect to login page after successful registration
    setTimeout(() => {
      window.location.href = `${website_name}/login/login.html`;
    }, 2000);
  } catch (error) {
    if (message) {
      message.style.color = "red";
      message.innerText = "Error: " + error.message;
    }
    console.error("Firebase Auth Error:", error.code, error.message);
  }
};
