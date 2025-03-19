const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    steps: { type: [String], required: true },
    image: { type: String }, // ✅ Stores image filename or URL
    createdAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;