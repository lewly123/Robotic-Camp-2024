import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { updateUI } from "./function.js";

console.log("2");
// Get the logout button element
document.addEventListener("DOMContentLoaded", () => {
    const auth = getAuth();
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
        console.log("3");
        logoutButton.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default anchor behavior
            console.log("1");

            // Perform the sign-out operation
            signOut(auth)
                .then(() => {
                    console.log("User successfully signed out.");

                    // Clear locally stored data (optional)
                    localStorage.removeItem("loggedInUserId");
                    updateUI();

                    // Redirect to the homepage or login page
                    window.location.href = "https://roboticcamp2024.web.app/";
                })
                .catch((error) => {
                    console.error("Error during logout: ", error.message);
                });
        });
    } else {
        console.error("Logout button not found.");
    }
});