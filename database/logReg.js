import { register, login } from "./function.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, setDoc, doc, collection, query, where, getDocs  } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

document.addEventListener("DOMContentLoaded", function () {
    // Register user
    const submitButtonRegister = document.getElementById("submitButtonRegister");
    submitButtonRegister.addEventListener("click", function (e) {
        e.preventDefault();

        const userId = document.getElementById("userIdR").value;
        const userEmail = document.getElementById("emailR").value;
        const userPassword = document.getElementById("userPasswordR").value;

        register(createUserWithEmailAndPassword, auth, db, setDoc, doc, userId, userEmail, userPassword);
    });

    // Login user
    const submitButtonLogin = document.getElementById("submitButtonLogin");
    submitButtonLogin.addEventListener("click", function (e) {
        e.preventDefault();

        const userEmail = document.getElementById("userIdL").value;
        const userPassword = document.getElementById("userPasswordL").value;

        // login(signInWithEmailAndPassword, auth, db, setDoc, doc, userEmail, userPassword);
        login(signInWithEmailAndPassword, auth, db, collection, query, where, getDocs, userEmail, userPassword);
    });
});