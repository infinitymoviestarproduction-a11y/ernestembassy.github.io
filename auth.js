/* ============================================
   AUTH.JS - Central Authentication Engine
   ============================================ */

const firebaseConfig = {
    apiKey: "AIzaSyBXuzYLUALnYVfjdg_JDIUE1zySCAbpkpg",
    authDomain: "ernest-embassy-lms.firebaseapp.com",
    projectId: "ernest-embassy-lms",
    storageBucket: "ernest-embassy-lms.firebasestorage.app",
    messagingSenderId: "204896421221",
    appId: "1:204896421221:web:9407b523da68c3e5b88d8c"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;
let currentUserData = null;

async function checkAuth(redirectToLogin = true) {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            unsubscribe();
            if (user) {
                currentUser = user;
                try {
                    const userDoc = await db.collection("users").doc(user.uid).get();
                    currentUserData = userDoc.exists ? userDoc.data() : {};
                    localStorage.setItem("currentUser", JSON.stringify({
                        uid: user.uid,
                        name: currentUserData.name || user.email.split('@')[0],
                        email: user.email,
                        role: currentUserData.role || "student"
                    }));
                    resolve(true);
                } catch (err) {
                    console.error("Error fetching user details:", err);
                    resolve(true);
                }
            } else {
                const localUser = JSON.parse(localStorage.getItem("currentUser"));
                if (localUser && redirectToLogin === false) {
                    resolve(true);
                } else if (redirectToLogin) {
                    window.location.href = "login.html";
                    reject(false);
                } else {
                    resolve(false);
                }
            }
        });
    });
}

function getCurrentUser() { return currentUser; }
function getCurrentUserData() { return currentUserData; }

function getUserName() {
    if (currentUserData && currentUserData.name) return currentUserData.name;
    if (currentUser) return currentUser.email.split('@')[0];
    const localUser = JSON.parse(localStorage.getItem("currentUser"));
    return localUser ? (localUser.name || "Student") : "Student";
}

async function isAdmin() {
    const user = auth.currentUser;
    if (user) {
        try {
            const userDoc = await db.collection("users").doc(user.uid).get();
            return userDoc.exists && userDoc.data().role === "admin";
        } catch (err) {
            return false;
        }
    }
    const localUser = JSON.parse(localStorage.getItem("currentUser"));
    return localUser ? localUser.role === "admin" : false;
}

async function logout() {
    try {
        if (auth && auth.signOut) {
            await auth.signOut();
        }
    } catch (err) {
        console.error("Signout sequence failure:", err);
    }
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userLoggedIn");
    window.location.href = "login.html";
}
