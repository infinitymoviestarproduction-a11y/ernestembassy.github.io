/* ============================================================
   AUTH.JS — Central Authentication Engine
   Ernest Embassy LMS
   ============================================================ */

const firebaseConfig = {
    apiKey:            "AIzaSyBXuzYLUALnYVfjdg_JDIUE1zySCAbpkpg",
    authDomain:        "ernest-embassy-lms.firebaseapp.com",
    projectId:         "ernest-embassy-lms",
    storageBucket:     "ernest-embassy-lms.firebasestorage.app",
    messagingSenderId: "204896421221",
    appId:             "1:204896421221:web:9407b523da68c3e5b88d8c"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db   = firebase.firestore();

/* ============================================================
   GLOBAL STATE
============================================================ */
let currentUser     = null;   // Firebase user object OR dev fake object
let currentUserData = null;   // Firestore user document data

/* ============================================================
   DEV BYPASS HELPER
   Returns true if developer quick-login is active
============================================================ */
function isDevBypass() {
    return localStorage.getItem("devBypass") === "true";
}

/* ============================================================
   initAuth(requireLogin)
   ─────────────────────
   Called by every page on load.
   - requireLogin = true  → redirect to login.html if no session
   - requireLogin = false → just check, don't redirect

   Also aliased as checkAuth() for backward compatibility.
============================================================ */
async function initAuth(requireLogin = true) {
    // ── Dev bypass path ──────────────────────────────────────
    if (isDevBypass()) {
        const stored = localStorage.getItem("currentUser");
        if (stored) {
            const u = JSON.parse(stored);
            // Fake a minimal "user" object so pages that read
            // currentUser.uid / currentUser.email don't crash
            currentUser = {
                uid:         u.uid   || "dev-admin-uid-001",
                email:       u.email || "admin@ernestembassy.dev",
                displayName: u.name  || "Dev Admin"
            };
            currentUserData = {
                name:  u.name  || "Dev Admin",
                role:  u.role  || "admin",
                score: u.score || 0
            };
        }
        return true;
    }

    // ── Normal Firebase auth path ────────────────────────────
    return new Promise((resolve) => {
        const unsub = auth.onAuthStateChanged(async (user) => {
            unsub();

            if (user) {
                currentUser = user;
                try {
                    const doc = await db.collection("users").doc(user.uid).get();
                    currentUserData = doc.exists ? doc.data() : {};
                    localStorage.setItem("currentUser", JSON.stringify({
                        uid:   user.uid,
                        name:  currentUserData.name  || user.email.split('@')[0],
                        email: user.email,
                        role:  currentUserData.role  || "student",
                        score: currentUserData.score || 0
                    }));
                } catch (err) {
                    console.error("Firestore user fetch error:", err);
                    currentUserData = {};
                }
                resolve(true);

            } else {
                // No Firebase session — try localStorage fallback
                const local = localStorage.getItem("currentUser");
                if (local) {
                    const u = JSON.parse(local);
                    currentUser = {
                        uid:   u.uid   || "",
                        email: u.email || "",
                        displayName: u.name || "Student"
                    };
                    currentUserData = {
                        name:  u.name  || "Student",
                        role:  u.role  || "student",
                        score: u.score || 0
                    };
                    resolve(true);
                } else if (requireLogin) {
                    window.location.href = "login.html";
                    resolve(false);
                } else {
                    resolve(false);
                }
            }
        });
    });
}

/* Backward-compat alias — old pages call checkAuth() */
async function checkAuth(redirectToLogin = true) {
    return initAuth(redirectToLogin);
}

/* ============================================================
   SHOW ADMIN BUTTON IF NEEDED
   Pass a CSS selector for the container where the button
   should be injected, e.g. "#userMenuArea"
============================================================ */
async function showAdminButtonIfNeeded(containerSelector) {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) return;
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const btn = document.createElement("a");
    btn.href      = "admin.html";
    btn.innerText = "⚙️ Admin";
    btn.style.cssText = "background:#ffd700;color:#000;padding:8px 14px;border-radius:8px;font-weight:bold;text-decoration:none;font-size:13px;";
    container.appendChild(btn);
}

/* ============================================================
   HELPERS
============================================================ */
function getCurrentUser()     { return currentUser; }
function getCurrentUserData() { return currentUserData; }

function getUserName() {
    if (currentUserData && currentUserData.name) return currentUserData.name;
    if (currentUser && currentUser.displayName)  return currentUser.displayName;
    if (currentUser && currentUser.email)        return currentUser.email.split('@')[0];
    const local = localStorage.getItem("currentUser");
    if (local) { const u = JSON.parse(local); return u.name || u.email?.split('@')[0] || "Student"; }
    return "Student";
}

async function isAdmin() {
    if (isDevBypass()) {
        const local = localStorage.getItem("currentUser");
        if (local) return JSON.parse(local).role === "admin";
    }
    const user = auth.currentUser;
    if (user) {
        try {
            const doc = await db.collection("users").doc(user.uid).get();
            return doc.exists && doc.data().role === "admin";
        } catch { return false; }
    }
    const local = localStorage.getItem("currentUser");
    return local ? JSON.parse(local).role === "admin" : false;
}

/* ============================================================
   LOGOUT — clears everything including dev bypass
============================================================ */
async function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("devBypass");
    localStorage.removeItem("userLoggedIn");
    try { if (auth) await auth.signOut(); } catch (e) { console.error("Signout error:", e); }
    window.location.href = "login.html";
}
