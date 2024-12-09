// import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
// import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// const auth = getAuth();
// const db = getFirestore();

// onAuthStateChanged(auth, (user) => {
//     const loggedInUserId = localStorage.getItem("loggedInUserId");
//     if (loggedInUserId) {
//         const docRef = doc(db, "users", loggedInUserId);
//         getDoc(docRef)
//             .then((docSnap) => {
//                 if (docSnap.exists()) {
//                     const userData = docSnap.data();
//                     document.getElementById('email_id').innerText = userData.email;
//                     document.getElementById('username_id').innerText = userData.username;
//                 } else {
//                     console.log("No document found matching id");
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error getting document: ", error);
//             })
//     }
// })

// const logoutButton = document.getElementById('logoutButton');

// logoutButton.addEventListener('click', () => {
//     localStorage.removeItem('loggedInUserId');
//     signout(signOut, auth);
// })

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

// Monitor Auth State
onAuthStateChanged(auth, (user) => {
    if (user) {
        const loggedInUserId = localStorage.getItem("loggedInUserId");

        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);

            // Fetch User Data
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        document.getElementById("email_id").innerText = userData.email;
                        document.getElementById("username_id").innerText = userData.username;
                    } else {
                        console.log("No document found matching ID");
                    }
                })
                .catch((error) => {
                    console.error("Error getting document: ", error);
                });
        }
    }
});

// Logout Button Handler
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            // Clear local storage and sign out user
            localStorage.removeItem("loggedInUserId");

            signOut(auth)
                .then(() => {
                    console.log("User successfully signed out.");
                    // Optional: Redirect to login page or refresh
                    window.location.href = "/login.html"; // Adjust path if necessary
                })
                .catch((error) => {
                    console.error("Error signing out: ", error);
                });
        });
    } else {
        console.error("Logout button not found in the DOM.");
    }
});
