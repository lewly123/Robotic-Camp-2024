// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
// import { updateUI } from "./function.js";

// const auth = getAuth();

// onAuthStateChanged(auth, (user) => {
//     updateUI(user); // Update the UI based on user state
// });

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

// This runs on every page load
document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, async (user) => {
        const loginButton = document.getElementById("loginButton");
        const dropdown = document.querySelector(".dropdown"); // Dropdown for user profile info
        const userNameElement = document.querySelector(".name"); // User's name in the dropdown
        const userEmailElement = document.querySelector(".email"); // User's name in the dropdown
        if (user) {
            console.log("User is logged in:", user);

            // Fetch additional user data from Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();

                // Update UI
                userNameElement.innerText = userData.username || "Guest";
                // userEmailElement.innerText = userData.email || "No Email";
            } else {
                console.log("No Firestore document found for user.");
            }

            // Show logged-in UI
            loginButton.style.display = "none";
            dropdown.style.display = "inline-block";
        } else {
            console.log("No user is logged in.");

            // Show logged-out UI
            loginButton.style.display = "block";
            dropdown.style.display = "none";
        }
    });
});