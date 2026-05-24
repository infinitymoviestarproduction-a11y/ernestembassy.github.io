/* =========================================
   FIREBASE INIT
========================================= */
const firebaseConfig = {
    apiKey: "AIzaSyD6xpH_zLnoJP2PTSMHg80R94_Vd-fUZSA",
    authDomain: "ernest-embassy-travel-website.firebaseapp.com",
    projectId: "ernest-embassy-travel-website",
    storageBucket: "ernest-embassy-travel-website.firebasestorage.app",
    messagingSenderId: "831442789419",
    appId: "1:831442789419:web:1845791aafb7ac9d31366e"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

/* =========================================
   SESSION BUILDER (UDEMY STYLE)
========================================= */
function createSessionUser(user) {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email.split("@")[0],
        role: "student",
        loginTime: new Date().toISOString()
    };
}

/* =========================================
   LOGIN HANDLER
========================================= */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const errorBox = document.getElementById("errorBox");

        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const user = result.user;

            if (!user.emailVerified) {
                errorBox.innerText = "Please verify your email before login.";
                errorBox.style.display = "block";
                await auth.signOut();
                return;
            }

            const sessionUser = createSessionUser(user);

            localStorage.setItem("currentUser", JSON.stringify(sessionUser));
            localStorage.setItem("userLoggedIn", "true");

            window.location.href = "dashboard.html";

        } catch (error) {
            errorBox.innerText = error.message;
            errorBox.style.display = "block";
        }
    });
}

/* =========================================
   SESSION SYNC ONLY (NO REDIRECT LOOP)
========================================= */
auth.onAuthStateChanged((user) => {
    if (user) {
        const sessionUser = createSessionUser(user);
        localStorage.setItem("currentUser", JSON.stringify(sessionUser));
        localStorage.setItem("userLoggedIn", "true");
    } else {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userLoggedIn");
    }
});

/* =========================================
   LOGOUT FUNCTION (GLOBAL USE)
========================================= */
function logout() {
    auth.signOut();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userLoggedIn");
    window.location.href = "login.html";
}
