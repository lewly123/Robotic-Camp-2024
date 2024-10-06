import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('email_id').innerText = userData.email;
                    document.getElementById('username_id').innerText = userData.username;
                } else {
                    console.log("No document found matching id");
                }
            })
            .catch((error) => {
                console.error("Error getting document: ", error);
            })
    }
})

const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signout(signOut, auth);
})