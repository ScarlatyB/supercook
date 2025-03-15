import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [{ type: String, required: true }], // Array of ingredients
    instructions: { type: String, required: true },
    preparationTime: { type: Number, required: true }, // Time in minutes
    servings: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // ✅ Link to User
}, { timestamps: true });

export default mongoose.model("Recipe", recipeSchema);
