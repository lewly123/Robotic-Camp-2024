
export function Notification(message, divId) {
    console.log(message);
}

export function checkLoginStatus() {
    // Assuming you are storing user info in sessionStorage after login
    return sessionStorage.getItem("loggedInUserId") !== null;
}

export function updateUI() {
    const isLoggedIn = checkLoginStatus();

    if (isLoggedIn) {
    } else {
    }
}

// Firebase Function
export function register(createUserWithEmailAndPassword, auth, db, setDoc, doc, userId, userEmail, userPassword) {
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
                .then(() => {
                    // window.location.href = "main.html";
                    console.log("Success send data to docs")
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

export function login(signInWithEmailAndPassword, auth, db, setDoc, doc, userEmail, userPassword) {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            // localStorage.setItem('loggedInUserId', user.uid);
            // window.location.href = "main.html";
            console.log("User signed in: ", user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error signing in: ", errorMessage);

            if (error === 'auth/invalid-credential') {
                console.log("Incorrect Email or Password");
            } else {
                console.log(error);
            }
        });
}

export function signout(signOut, auth) {
    signOut(auth)
        .then(() => {
            window.location.href = 'main.html';
        })
        .catch((error) => {
            console.error('Error Signing out: ', error);
        })
}