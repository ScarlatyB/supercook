import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [recipes, setRecipes] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [recipeResult, setRecipeResult] = useState(null);

    //  Fetch recipes from backend
    useEffect(() => {
        fetch("http://localhost:3000/api/recipes")  // Updated API endpoint
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched recipes:", data);
                setRecipes(data.recipes);
                setFilteredRecipes(data.recipes);
            })
            .catch((error) => console.error("Error fetching recipes:", error));
    }, []);

    // Handle File Selection
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Handle Image Upload & Fetch AI Recipe
    const handleUpload = async () => {
        console.log(" Upload button clicked!");
        
        if (!selectedFile) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        setUploading(true);

        try {
            //  Step 1: Upload the image
            const uploadResponse = await fetch("http://localhost:3000/upload-image", {
                method: "POST",
                body: formData
            });

            const uploadData = await uploadResponse.json();
            console.log(" Upload Response:", uploadData);

            if (!uploadResponse.ok) {
                alert("Error uploading image: " + uploadData.message);
                setUploading(false);
                return;
            }

            //  Step 2: Fetch AI-generated recipe
            console.log("📤 Fetching AI-generated recipe...");
            const recipeResponse = await fetch("http://localhost:3000/api/recipes");
            const recipeData = await recipeResponse.json();

            console.log(" Fetched Recipe:", recipeData);
            setRecipeResult(recipeData.recipes[0]);  //  Show first recipe

        } catch (error) {
            console.error(" Upload failed:", error);
            alert("Failed to upload image.");
        }

        setUploading(false);
    };

    // Handle Recipe Search & Open New Window
    const handleFindRecipe = () => {
        console.log(" Find Recipe button clicked!");

        if (searchText.trim() === "") {
            alert("Please enter a recipe name.");
            setFilteredRecipes(recipes);
            return;
        }

        const filtered = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredRecipes(filtered);

        // Open search results in a new window
        let newWindow = window.open("", "_blank");
        if (!newWindow) {
            alert("Pop-up blocked! Allow pop-ups for this site.");
            return;
        }

        newWindow.document.write(`
            <html>
            <head>
                <title>Recipe Search Results</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .recipe { border: 1px solid #ccc; padding: 10px; margin: 10px 0; }
                </style>
            </head>
            <body>
                <h2>Search Results for: ${searchText}</h2>
                ${filtered.length > 0 ? filtered.map(recipe => `
                    <div class="recipe">
                        <h3>${recipe.name}</h3>
                        <p>${recipe.instructions}</p>
                    </div>
                `).join("") : "<p>No recipes found.</p>"}
            </body>
            </html>
        `);
        newWindow.document.close();
    };

    return (
        <div className="app">
            <h1>SuperCook - Recipe Finder</h1>

            {/*  Search Input */}
            <div>
                <input
                    type="text"
                    className="search"
                    placeholder="Search for a recipe..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button className="find-recipe" onClick={() => handleFindRecipe()}>
                    Find Recipe
                </button> {/* Now properly linked to the function */}
            </div>

            {/* Image Upload */}
            <div className="upload-section">
                <h2>Upload an Image of Your Ingredients</h2>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleUpload} disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload & Get Recipe"}
                </button>
            </div>

            {/*  Display AI-Generated Recipe */}
            {recipeResult && (
                <div className="recipe-result">
                    <h2>Generated Recipe</h2>
                    <h3>{recipeResult.name}</h3>
                    <p>{recipeResult.instructions}</p>
                    <p><strong>Ingredients:</strong> {recipeResult.ingredients.join(", ")}</p>
                    <p><strong>Preparation Time:</strong> {recipeResult.preparationTime} minutes</p>
                    <p><strong>Servings:</strong> {recipeResult.servings}</p>
                </div>
            )}

            {/*  Recipe List */}
            <div className="recipes">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map(recipe => (
                        <article key={recipe._id}>
                            <h3>{recipe.name}</h3>
                            <p>{recipe.instructions}</p>
                        </article>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        </div>
    );
}

export default App;
