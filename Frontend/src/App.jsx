import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
   const [count, setCount] = useState(0)

  return (
   <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
       </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
   </>
   )
}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search");
    const recipeCards = document.querySelectorAll(".recipes article");
    const findRecipeBtn = document.querySelector(".find-recipe");
    
    // Search Functionality
    searchInput.addEventListener("input", (e) => {
        const searchText = e.target.value.toLowerCase();
        recipeCards.forEach(card => {
            const title = card.querySelector("h3").innerText.toLowerCase();
            card.style.display = title.includes(searchText) ? "block" : "none";
        });
    });
    
    // Find Recipe Button Click Event
    findRecipeBtn.addEventListener("click", () => {
        alert("Finding the best recipe for you...");
    });
  });
  
  // Simulating a simple login/signup system using localStorage
  
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

 export default App

// script.js