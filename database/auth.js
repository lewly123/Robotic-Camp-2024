import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { updateUI } from "./function.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    updateUI(user); // Update the UI based on user state
});