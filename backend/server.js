const express = require("express");
const cors = require("cors");
const multer = require("multer");  // ✅ Keep this at the top
const path = require("path");      // ✅ Keep this at the top
const fs = require("fs");
const mongoose = require("mongoose");

// ✅ Connect to MongoDB - Database: Informations
mongoose.connect("mongodb+srv://lakaii_1:Mynewpassword@cluster0.hbnvm.mongodb.net/Informations?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB - Database: Informations"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Create Express App
const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Ensure "uploads" folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Define Recipe Schema (Mongoose Model)
const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    steps: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now }
});
const Recipe = mongoose.model("Recipe", recipeSchema);

// 📌 **1️⃣ GET All Recipes (Fetch from MongoDB)**
app.get("/api/recipes", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes", error });
    }
});

// 📌 **2️⃣ GET Single Recipe by ID**
app.get("/api/recipes/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipe", error });
    }
});

// 📌 **3️⃣ POST Create New Recipe (Store in MongoDB)**
app.post("/api/recipes", async (req, res) => {
    try {
        const { name, ingredients, steps } = req.body;
        if (!name || !ingredients || !steps) {
            return res.status(400).json({ message: "Please provide name, ingredients, and steps" });
        }

        const newRecipe = new Recipe({ name, ingredients, steps });
        await newRecipe.save();

        res.json({ message: "Recipe added", recipe: newRecipe });
    } catch (error) {
        res.status(500).json({ message: "Error adding recipe", error });
    }
});

// 📌 **4️⃣ PUT Update Recipe**
app.put("/api/recipes/:id", async (req, res) => {
    try {
        const { name, ingredients, steps } = req.body;
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            { name, ingredients, steps },
            { new: true }
        );
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        res.json({ message: "Recipe updated", recipe });
    } catch (error) {
        res.status(500).json({ message: "Error updating recipe", error });
    }
});

// 📌 **5️⃣ DELETE Recipe**
app.delete("/api/recipes/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        res.json({ message: "Recipe deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting recipe", error });
    }
});

// ✅ **6️⃣ Configure Multer for File Uploads**
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage: storage });

// ✅ Modify Image Upload Route to Store in MongoDB
app.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ message: "No image uploaded!" });
      }

      // ✅ Create a new recipe with image
      const newRecipe = new Recipe({
          name: "Unnamed Recipe",
          ingredients: [],
          steps: [],
          image: req.file.filename
      });

      await newRecipe.save();

      res.json({ 
          message: "Image uploaded & recipe created!", 
          recipe: newRecipe 
      });

  } catch (error) {
      res.status(500).json({ message: "Error uploading image", error });
  }
});



// ✅ **9️⃣ Process Ingredients Route**
app.post("/process-ingredients", (req, res) => {
    const { ingredients } = req.body;
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ message: "No ingredients provided!" });
    }
    res.json({
        message: "Ingredients processed successfully!",
        ingredients
    });
});

// ✅ **10️⃣ Process Recipe Route**
app.post("/process-recipe", async (req, res) => {
  try {
      const { processedIngredients } = req.body;

      if (!processedIngredients || !Array.isArray(processedIngredients) || processedIngredients.length === 0) {
          return res.status(400).json({ message: "No processed ingredients provided!" });
      }

      // ✅ Simulated Recipe Creation (Replace with AI Model later)
      const generatedRecipe = {
          name: "Generated Dish",
          ingredients: processedIngredients,
          steps: [
              "Step 1: Prepare ingredients",
              "Step 2: Cook ingredients",
              "Step 3: Serve and enjoy!"
          ]
      };

      res.json({
          message: "Recipe generated successfully!",
          generatedRecipe
      });

  } catch (error) {
      res.status(500).json({ message: "Error generating recipe", error });
  }
});


// ✅ **Start Server**
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

