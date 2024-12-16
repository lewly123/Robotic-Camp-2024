document.addEventListener("DOMContentLoaded", () => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");

    // If no logged-in user is found, redirect to index.html
    if (!loggedInUserId) {
        window.location.href = "https://roboticcamp2024.web.app/";
    } else {
        console.log("User is logged in with ID: " + loggedInUserId);
        // You can place additional code here to load the user data or update the UI if needed
    }
});