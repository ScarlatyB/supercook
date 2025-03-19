/**
 * Simulating a simple signup system without using the database
 * @selanssary
 */

function signup() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (name && email && password) {
        localStorage.setItem("user", JSON.stringify({ name, email, password }));
        alert("Account created successfully! Redirecting to login.");
        window.location.href = "login.html";
    } else {
        alert("Please fill out all fields.");
    }
}

/**
 * Simulating a simple login system without using the database
 * @selanssary
 */
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
        localStorage.setItem("loggedIn", "true");
        alert("Login successful! Redirecting to homepage.");
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password.");
    }
}

// Check if user is logged in
document.addEventListener("DOMContentLoaded", function () {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn === "true") {
        document.querySelector(".login-btn")?.remove();
        document.querySelector(".signup-btn")?.remove();

        let accountBtn = document.createElement("button");
        accountBtn.innerText = "My Account";
        accountBtn.className = "account-btn";
        accountBtn.onclick = function () {
            alert("Welcome to your account!");
        };

        document.querySelector(".header-right").appendChild(accountBtn);
    }
});