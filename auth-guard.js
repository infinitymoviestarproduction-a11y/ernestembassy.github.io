firebase.auth().onAuthStateChanged(async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const db = firebase.firestore();

    const userDoc = await db.collection("users").doc(user.uid).get();

    if (!userDoc.exists) {
        alert("User profile missing!");
        window.location.href = "login.html";
        return;
    }

    const userData = userDoc.data();

    // Save session
    localStorage.setItem("currentUser", JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email.split("@")[0],
        role: userData.role
    }));

    // 🔐 ROLE PROTECTION
    const currentPage = window.location.pathname;

    if (currentPage.includes("admin.html")) {
        if (userData.role !== "admin") {
            alert("Access denied: Admin only");
            window.location.href = "dashboard.html";
        }
    }

});
