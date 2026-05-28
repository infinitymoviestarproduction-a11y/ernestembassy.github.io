/* ============================================
   AUTH.JS - Central Authentication for Ernest Embassy LMS
   Include this file in all protected pages
   ============================================ */

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXuzYLUALnYVfjdg_JDIUE1zySCAbpkpg",
    authDomain: "ernest-embassy-lms.firebaseapp.com",
    projectId: "ernest-embassy-lms",
    storageBucket: "ernest-embassy-lms.firebasestorage.app",
    messagingSenderId: "204896421221",
    appId: "1:204896421221:web:9407b523da68c3e5b88d8c"
};

// Initialize Firebase if not already initialized
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

// Global variables
let currentUser = null;
let currentUserData = null;

/* ============================================
   CHECK AUTHENTICATION STATUS
   ============================================ */
async function checkAuth(redirectToLogin = true) {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            unsubscribe(); // Detach listener instantly to avoid memory leaks
            
            if (user) {
                currentUser = user;
                
                // Fetch user data from Firestore
                try {
                    const userDoc = await db.collection("users").doc(user.uid).get();
                    currentUserData = userDoc.exists ? userDoc.data() : {};
                    
                    // Store in localStorage for rapid access across dashboards
                    localStorage.setItem("currentUser", JSON.stringify({
                        uid: user.uid,
                        name: currentUserData.name || user.email.split('@')[0],
                        email: user.email,
                        role: currentUserData.role || "student"
                    }));
                    
                    resolve(true);
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    resolve(true); // Still authenticate if network blips but user is valid
                }
            } else {
                // Check localStorage fallback
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

/* ============================================
   GETTERS FOR DATA
   ============================================ */
function getCurrentUser() { return currentUser; }
function getCurrentUserData() { return currentUserData; }

function getUserName() {
    if (currentUserData && currentUserData.name) return currentUserData.name;
    if (currentUser) return currentUser.email.split('@')[0];
    const localUser = JSON.parse(localStorage.getItem("currentUser"));
    return localUser ? (localUser.name || "Student") : "Student";
}

/* ============================================
   ROLE CHECKING
   ============================================ */
async function isAdmin() {
    if (currentUser) {
        try {
            const userDoc = await db.collection("users").doc(currentUser.uid).get();
            return userDoc.exists && userDoc.data().role === "admin";
        } catch (err) {
            return false;
        }
    }
    const localUser = JSON.parse(localStorage.getItem("currentUser"));
    return localUser ? localUser.role === "admin" : false;
}

/* ============================================
   UI HELPERS
   ============================================ */
async function showAdminButtonIfNeeded(containerSelector = ".user-area") {
    if (await isAdmin()) {
        const container = document.querySelector(containerSelector);
        if (container && !document.getElementById("adminBtn")) {
            const adminBtn = document.createElement("button");
            adminBtn.id = "adminBtn";
            adminBtn.innerText = "⚙️ Admin Panel";
            adminBtn.style.background = "#28a745";
            adminBtn.style.color = "white";
            adminBtn.style.border = "none";
            adminBtn.style.padding = "8px 15px";
            adminBtn.style.borderRadius = "6px";
            adminBtn.style.cursor = "pointer";
            adminBtn.style.fontWeight = "bold";
            adminBtn.onclick = () => { window.location.href = "admin.html"; };
            container.insertBefore(adminBtn, container.children[0]);
        }
    }
}

function updateUserNameUI(elementId = "userName") {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerText = getUserName();
    }
}

/* ============================================
   LOGOUT
   ============================================ */
async function logout() {
    try {
        if (auth && auth.signOut) {
            await auth.signOut();
        }
    } catch (err) {
        console.error("Logout error:", err);
    }
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userLoggedIn");
    window.location.href = "login.html";
}

/* ============================================
   DATABASE UPDATES (Scores & Progress Tracking)
   ============================================ */
async function updateUserScore(score) {
    if (currentUser) {
        try {
            const userRef = db.collection("users").doc(currentUser.uid);
            const userDoc = await userRef.get();
            const currentScore = userDoc.exists ? (userDoc.data().score || 0) : 0;
            
            if (score > currentScore) {
                await userRef.set({ score: score }, { merge: true });
            }
            return true;
        } catch (err) {
            console.error("Error updating score:", err);
            return false;
        }
    }
    return false;
}

async function saveQuizAttempt(subject, score, totalQuestions, quizType = "practice") {
    if (currentUser) {
        try {
            await db.collection("quizAttempts").add({
                userId: currentUser.uid,
                userName: getUserName(),
                subject: subject,
                score: score,
                correctAnswers: Math.round((score / 100) * totalQuestions),
                totalQuestions: totalQuestions,
                date: new Date(),
                quizType: quizType
            });
            return true;
        } catch (err) {
            console.error("Error saving quiz attempt:", err);
            return false;
        }
    }
    return false;
}

async function loadUserScore() {
    if (currentUser) {
        try {
            const userDoc = await db.collection("users").doc(currentUser.uid).get();
            if (userDoc.exists) {
                const score = userDoc.data().score || 0;
                const scoreElement = document.getElementById("userScore");
                if (scoreElement) {
                    scoreElement.innerText = score;
                }
                return score;
            }
        } catch (err) {
            console.error("Error loading score:", err);
        }
    }
    return 0;
}

/* ============================================
   INITIALIZE AUTH EXPLICITLY PER PAGE
   ============================================ */
async function initAuth(protectPage = true) {
    if (protectPage) {
        await checkAuth(true);
    } else {
        await checkAuth(false);
    }
    updateUserNameUI();
    return currentUser;
}

// NOTE: Auto-initialization was removed from here. 
// Simply call `initAuth()` inside your protected dashboard pages scripts explicitly!
