// Example recipes
const recipes = {
    spaghetti: {
        title: "Spaghetti Bolognese",
        ingredients: ["200g Spaghetti", "100g Ground Beef", "1 Onion", "2 Tomatoes", "Salt", "Pepper"],
        steps: "1. Cook spaghetti. 2. Sauté onions. 3. Add beef and tomatoes. 4. Serve with spaghetti."
    },
    salad: {
        title: "Caesar Salad",
        ingredients: ["Lettuce", "Chicken", "Croutons", "Caesar Dressing"],
        steps: "1. Chop lettuce. 2. Grill chicken. 3. Add croutons and dressing."
    }
};

// Load recipe based on URL
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const recipeName = params.get("name");

    if (recipes[recipeName]) {
        document.getElementById("recipe-title").innerText = recipes[recipeName].title;
        document.getElementById("ingredients-list").innerHTML = recipes[recipeName].ingredients
            .map(ingredient => `<li>${ingredient}</li>`).join("");
        document.getElementById("preparation-steps").innerText = recipes[recipeName].steps;
    } else {
        document.body.innerHTML = "<h1>Recipe not found!</h1>";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:5173/api/Recipes") // <-- Hier die richtige API-URL einfügen
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("recipes-container");
            container.innerHTML = ""; // Vorherige Inhalte löschen

            data.forEach(recipe => {
                const recipeCard = document.createElement("div");
                recipeCard.classList.add("recipe-card");
                recipeCard.innerHTML = `
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                    <button onclick="viewRecipe('${recipe.id}')">View Recipe</button>
                `;
                container.appendChild(recipeCard);
            });
        })
        .catch(error => console.error("Error loading recipes:", error));
});

function viewRecipe(recipeId) {
    window.location.href = `recipe.html?id=${recipeId}`;
}