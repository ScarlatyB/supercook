import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipes from "./models/Recipes.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connect to MongoDB

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error("COULD NOT CONNECT TO DATABASE:", error.message);
    }
};

connectDB(); // Call the function to connect to MongoDB


// // Initial route
// app.get('/', (req, res) => {
// res.send('Welcome to the backend! 🚀');
// });

// *End node for recipes**
app.get("/recipes", async (req, res) => {
    try {
        const recipes = await Recipe.find(); // Holt alle Rezepte aus der DB
        res.json({ recipes });
    } catch (error) {
        console.error("Fehler beim Abrufen der Rezepte:", error);
        res.status(500).json({ message: "Fehler beim Laden der Rezepte" });
    }
});

// app.listen(PORT, () => { 
// console.log(`Server running on port ${PORT}`);
// });
