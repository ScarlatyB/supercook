import express from "express";
const router = express.Router();
import Recipe from "../models/Recipes.js";
import User from "../models/users.js";
router.post('/add-ai-recipe', async (req, res) => {
  try {
      const { name, ingredients, instructions, preparationTime, servings, userId } = req.body;

      if (!userId) {
          return res.status(400).json({ error: "User ID is required" });
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      if (!name || !ingredients || !instructions || !preparationTime || !servings) {
          return res.status(400).json({ error: "All fields are required" });
      }

      // ✅ Ensure ingredients is an array
      const ingredientsArray = Array.isArray(ingredients) ? ingredients : ingredients.split(",");

      const newRecipe = new Recipe({
          name,
          ingredients: ingredientsArray,
          instructions,
          preparationTime,
          servings,
          owner: userId
      });

      await newRecipe.save();
      res.status(201).json({ message: "AI-generated recipe added successfully", recipe: newRecipe });
  } catch (err) {
      console.error("Error adding recipe:", err);
      res.status(500).json({ error: "Failed to add recipe", details: err.message });
  }
    // GET endpoint to fetch all recipes
    router.get("/", async (req, res) => {  // ✅ No "/recipes" here, just "/"
        try {
            
            const recipes = await Recipe.find().populate("owner", "name");
            res.status(200).json({ recipes });
        } catch (err) {
            console.error("❌ Error fetching recipes:", err);
            res.status(500).json({ error: "Failed to fetch recipes", details: err.message });
        }
    });
    
  
});

  export default router;