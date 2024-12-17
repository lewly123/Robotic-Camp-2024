
export function Notification(message, divId) {
    console.log(message);
}

export function checkLoginStatus() {
    // Assuming you are storing user info in sessionStorage after login
    return sessionStorage.getItem("loggedInUserId") !== null;
}

// export function updateUI(user) {
//     const loginButton = document.getElementById("loginButton");
//     const dropdown = document.querySelector(".dropdown-content"); // Dropdown for user profile info
//     const userNameElement = document.querySelector(".name"); // User's name in the dropdown
//     const userEmailElement = document.querySelector(".email"); // User's email in the dropdown

//     if (user) {
//         // Hide login button and show dropdown profile
//         loginButton.style.display = "none";
//         dropdown.style.display = "block";

//         // Update profile info in the dropdown
//         userNameElement.innerText = user.displayName || "User";
//         userEmailElement.innerText = user.email;
//     } else {
//         // Show login button and hide dropdown profile
//         loginButton.style.display = "block";
//         dropdown.style.display = "none";

//         // Clear profile info
//         userNameElement.innerText = "";
//         userEmailElement.innerText = "";
//     }
// }
export function updateUI(user) {
    const loginButton = document.getElementById("loginButton");
    const dropdown = document.querySelector(".dropdown"); // Dropdown for user profile info
    const userNameElement = document.querySelector(".name"); // User's name in the dropdown
    // Ensure elements exist
    if (!loginButton || !dropdown || !userNameElement) {
        console.error("UI elements not found!");
        return;
    }

    if (user && typeof user === "object") {
        // Hide login button and show dropdown profile
        loginButton.style.display = "none";
        dropdown.style.display = "inline-block";

        // Update profile info in the dropdown
        userNameElement.innerText = user.displayName || "User";

        // Optionally store in localStorage
        localStorage.setItem("loggedInUserId", user.uid);
    } else {
        // Show login button and hide dropdown profile
        loginButton.style.display = "inline-block";
        dropdown.style.display = "none";

        // Clear profile info
        userNameElement.innerText = "";

        // Remove from localStorage
        localStorage.removeItem("loggedInUserId");
    }
}


// Firebase Function
export async function register(signInWithEmailAndPassword, createUserWithEmailAndPassword, auth, db, setDoc, doc, userId, userEmail, userPassword) {
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            const userData = {
                email: userEmail,
                username: userId,
                password: userPassword
            };

            // Write to Firestore
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(async () => {
                    // window.location.href = "main.html";
                    console.log("Success send data to docs");
                    const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword);
                    const user = userCredential.user;

                    localStorage.setItem("loggedInUserId", user.uid);
                    window.location.href = "https://solstice-salvation.web.app/";
                })
                .catch((error) => {
                    console.error("Error writing document", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/email-already-in-use') {
                Notification("Email Address Already Exists!", "signUpMessage");
            } else {
                Notification(errorMessage, "signUpMessage");
            }
        });
}

// export function login(signInWithEmailAndPassword, auth, db, setDoc, doc, userEmail, userPassword) {
//     signInWithEmailAndPassword(auth, userEmail, userPassword)
//         .then((userCredential) => {
//             const user = userCredential.user;
//             // localStorage.setItem('loggedInUserId', user.uid);
//             // window.location.href = "main.html";
//             console.log("User signed in: ", user);
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.error("Error signing in: ", errorMessage);

//             if (error === 'auth/invalid-credential') {
//                 console.log("Incorrect Email or Password");
//             } else {
//                 console.log(error);
//             }
//         });
// }

// export function login(signInWithEmailAndPassword, auth, db, setDoc, doc, userEmail, userPassword) {
//     signInWithEmailAndPassword(auth, userEmail, userPassword)
//         .then((userCredential) => {
//             const user = userCredential.user;

//             // Store logged-in user's ID
//             localStorage.setItem('loggedInUserId', user.uid);

//             // Call UI update
//             updateUI(user);

//             console.log("User signed in: ", user);
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;

//             console.error("Error signing in: ", errorMessage);
//             Notification(errorMessage, "loginMessage");
//         });
// }

import { setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
export async function login(signInWithEmailAndPassword, auth, db, collection, query, where, getDocs, userInput, userPassword) {
    try {
        await setPersistence(auth, browserLocalPersistence); // Ensures session persists

        let userEmail = userInput;

        // Check if input is a username
        if (!userInput.includes("@")) {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", userInput));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                userEmail = userDoc.data().email;
                console.log("Resolved username to email:", userEmail);
            } else {
                throw new Error("Username not found.");
            }
        }

        const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword);
        const user = userCredential.user;
        updateUI(user);

        // Store user's ID or other details if necessary
        console.log("User signed in:", user);

        window.location.href = "https://solstice-salvation.web.app/";

    } catch (error) {
        console.error("Error signing in:", error.message);
    }
}

// export async function login(signInWithEmailAndPassword, auth, db, collection, query, where, getDocs, userInput, userPassword) {
//     try {
//         let userEmail = userInput; // Default: assume input is an email

//         // Check if the input is a username
//         if (!userInput.includes("@")) {
//             console.log("Checking for username...");

//             const usersRef = collection(db, "users"); // Firestore 'users' collection
//             const q = query(usersRef, where("username", "==", userInput));
//             const querySnapshot = await getDocs(q);

//             if (!querySnapshot.empty) {
//                 // Username found, get the corresponding email
//                 const userDoc = querySnapshot.docs[0];
//                 userEmail = userDoc.data().email;
//                 console.log("Resolved username to email: ", userEmail);
//             } else {
//                 throw new Error("Username not found.");
//             }
//         }

//         // Sign in using the resolved email
//         const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword);
//         const user = userCredential.user;

//         // Store logged-in user's ID
//         localStorage.setItem('loggedInUserId', user.uid);

//         // Update the UI
//         updateUI(user);

//         console.log("User signed in: ", user);

//     } catch (error) {
//         console.error("Error signing in: ", error.message);
//         Notification(error.message, "loginMessage");
//     }
// }



// logoutButton.addEventListener('click', () => {
//     const auth = getAuth();

//     // Clear stored user ID
//     localStorage.removeItem('loggedInUserId');

//     signOut(auth)
//         .then(() => {
//             console.log("User logged out");
//             updateUI(null); // Update the UI to show the login button again
//         })
//         .catch((error) => {
//             console.error("Error signing out: ", error);
//         });
// });
