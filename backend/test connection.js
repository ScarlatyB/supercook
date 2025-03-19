const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB Connection
mongoose.connect('mongodb+srv://Lakaii:lakaii_1@cluster0.hbnvm.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB Atlas");
})
.catch((error) => {
  console.error("❌ Error connecting to MongoDB Atlas:", error);
});

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Recipe Route - Receive ingredients
app.post("/get-recipes", (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ me
