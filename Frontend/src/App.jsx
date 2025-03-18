import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [recipes, setRecipes] = useState([]);
    const [searchText, setSearchText] = useState("");

    // ✅ Fetch recipes from the backend API
    useEffect(() => {
        fetch("http://localhost:3000/api/recipes")  // Adjust if needed
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched recipes:", data);
                setRecipes(data);
            })
            .catch((error) => console.error("Error fetching recipes:", error));
    }, []);

    return (
        <div className="app">
            <h1>SuperCook - Recipe List</h1>

            {/* ✅ Search Input */}
            <input 
                type="text" 
                className="search" 
                placeholder="Search for a recipe..." 
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value.toLowerCase())} 
            />

            {/* ✅ Display Recipes from Database */}
            <div className="recipes">
                {recipes.length > 0 ? (
                    recipes
                        .filter(recipe => recipe.title.toLowerCase().includes(searchText))
                        .map(recipe => (
                            <article key={recipe._id}>
                                <h3>{recipe.title}</h3>
                                <p>{recipe.description}</p>
                            </article>
                        ))
                ) : (
                    <p>Loading recipes...</p>  // ✅ Show loading message
                )}
            </div>
        </div>
    );
}

<<<<<<< HEAD
export default App;
=======
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
>>>>>>> origin/main
