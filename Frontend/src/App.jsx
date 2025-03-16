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

export default App;
