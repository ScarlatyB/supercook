document.addEventListener("DOMContentLoaded", () => {
    // Container, wo die Rezepte eingefügt werden
    const recipesContainer = document.getElementById("recipes-container");

    // API-URL (Ändere sie auf deine tatsächliche Backend-URL)
    const API_URL = "http://localhost:5173/recipes"; //

    // Funktion, um Rezepte zu laden
    async function loadRecipes() {
        try {
            const response = await fetch(API_URL); // Anfrage an die API
            if (!response.ok) throw new Error("Fehler beim Laden der Rezepte");

            const recipes = await response.json(); // Antwort als JSON umwandeln
            displayRecipes(recipes); // Rezepte in HTML anzeigen
        } catch (error) {
            console.error("Fehler:", error);
            recipesContainer.innerHTML = "<p>⚠️ Fehler beim Laden der Rezepte</p>";
        }
    }


    // Funktion, um die Rezepte anzuzeigen
    function displayRecipes(recipes) {
        recipesContainer.innerHTML = ""; // Vorherige Inhalte löschen

        recipes.forEach(recipe => {
            const recipeElement = document.createElement("article");
            recipeElement.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <p>⏳ ${recipe.time} Mins | Level: ${recipe.difficulty}</p>
                <button onclick="viewRecipe('${recipe.id}')">View recipe</button>
            `;
            recipesContainer.appendChild(recipeElement);
        });
    }

    // Funktion, um auf die Rezeptseite zu leiten
    function viewRecipe(recipeId) {
        window.location.href = `viewRecipe.html?id=${recipeId}`;
    }

    loadRecipes(); // Lade die Rezepte beim Start
});