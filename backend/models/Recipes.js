import mongoose from 'mongoose';
const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    preparationTime: { type: Number, required: true }, // In minutes
    servings: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  // Create and export the Recipe model
  const Recipe = mongoose.model('Recipe', recipeSchema);
  export default Recipe;