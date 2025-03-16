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

 export default App

// script.js

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
