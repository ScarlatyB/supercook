const ingredients = ["Tomato", "Potato", "Onion", "Garlic", "Carrot", "Salt", "Pepper", "Basil", "Oregano"];

function showSuggestions() {
    let input = document.getElementById("ingredient-search").value.toLowerCase();
    let suggestionsBox = document.getElementById("suggestions-box");

    if (input.length < 3) {
        suggestionsBox.innerHTML = ""; // Hide suggestions if less than 3 characters
        return;
    }

    let filtered = ingredients.filter(ing => ing.toLowerCase().includes(input));

    if (filtered.length > 0) {
        suggestionsBox.innerHTML = filtered.map(ing => `<p onclick="selectIngredient('${ing}')">${ing}</p>`).join("");
        suggestionsBox.style.display = "block";
    } else {
        suggestionsBox.style.display = "none";
    }
}

function selectIngredient(ingredient) {
    document.getElementById("ingredient-search").value = ingredient;
    document.getElementById("suggestions-box").style.display = "none";
}