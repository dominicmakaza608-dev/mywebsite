import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// TODO: Replace this with your actual Firebase project configuration
// 1. Go to console.firebase.google.com
// 2. Create a project and add a Web App
// 3. Enable Google Authentication in Build -> Authentication -> Sign-in method
// 4. Copy your firebaseConfig object here:
const firebaseConfig = {
  apiKey: "AIzaSyA1DaYSlhgeDwXUT0jvJZjs-Q4Wk0Eu_G4",
  authDomain: "web-app-505be.firebaseapp.com",
  projectId: "web-app-505be",
  storageBucket: "web-app-505be.firebasestorage.app",
  messagingSenderId: "127318134359",
  appId: "1:127318134359:web:aaf53c932cc9f963911d12",
  measurementId: "G-T3LB1BJ43X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM Elements
const authBtn = document.getElementById("authBtn");
const authBtnInline = document.getElementById("authBtnInline");
const signOutBtn = document.getElementById("signOutBtn");
const userInfo = document.getElementById("userInfo");
const userAvatar = document.getElementById("userAvatar");

const lockedState = document.getElementById("lockedState");
const documentGrid = document.getElementById("documentGrid");

// Handle Sign In
const signIn = async () => {
  try {
    // If you haven't set up Firebase yet, we will bypass it just for the demo:
    if (firebaseConfig.apiKey === "YOUR_API_KEY") {
      alert("Firebase is not configured yet! I will mock the login for now so you can see how it works.");
      handleAuthStateChange({ photoURL: "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff", displayName: "Demo User" });
      return;
    }
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in:", error);
    alert("Error signing in. Please check console.");
  }
};

// Handle Sign Out
const logOut = async () => {
  if (firebaseConfig.apiKey === "YOUR_API_KEY") {
    handleAuthStateChange(null);
    return;
  }
  await signOut(auth);
};

// Update UI based on User State
const handleAuthStateChange = (user) => {
  if (user) {
    // User is signed in
    authBtn.style.display = "none";
    userInfo.style.display = "flex";
    userAvatar.src = user.photoURL || 'https://ui-avatars.com/api/?name=User';
    userAvatar.title = user.displayName;
    
    // Unlock Documents
    lockedState.style.display = "none";
    documentGrid.style.display = "grid";
  } else {
    // User is signed out
    authBtn.style.display = "inline-flex";
    userInfo.style.display = "none";
    
    // Lock Documents
    lockedState.style.display = "flex";
    documentGrid.style.display = "none";
  }
};

// Event Listeners
authBtn.addEventListener("click", signIn);
if(authBtnInline) authBtnInline.addEventListener("click", signIn);
signOutBtn.addEventListener("click", logOut);

// Listen for actual Firebase state changes
if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
  onAuthStateChanged(auth, handleAuthStateChange);
}
