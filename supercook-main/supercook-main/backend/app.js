
import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import bodyParser from "body-parser";
const app = express();
app.use(express.json());
app.use(bodyParser.json());
import path from'path';
import multer from "multer";
import Preference from "./models/Preferences.js";
import Checkbox from "./models/CheckBox-Allergies.js";
import Image from "./models/Image.js";
import Recipe from "./models/Recipes.js";
mongoose.connect("mongodb+srv://supercook:supercook@cluster0.hbnvm.mongodb.net/Informations").then(() => {
    console.log("connected");
    // Image Endpoint
// Set up multer storage configuration (where to store the uploaded file)
const storage = multer.memoryStorage(); // Use memory storage to keep the image in memory (you can also save it to disk)
const upload = multer({ storage: storage });

// API endpoint to upload and store image as Base64
app.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Convert the image to Base64 string
    const base64Image = file.buffer.toString('base64');
    const imageName = file.originalname;

    // Create a new image entry in the database
    const newImage = new Image({
      name: imageName,
      imageData: base64Image,
    });

    await newImage.save();
    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});
//GET
      
app.get('/get-image/:name', async (req, res) => {
    try {
      const imageName = req.params.name; // Extract image name from URL parameter
  
      const image = await Image.findOne({ name: imageName }); // Find the image by name in the database
  
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      // Convert Base64 string back to binary buffer
      const imageBuffer = Buffer.from(image.imageData, 'base64');
  
      // Determine the file extension from the image name (assuming you saved images with extensions)
      const extname = path.extname(imageName).toLowerCase();
      let contentType = 'application/octet-stream';
  
      // Set the correct content type based on file extension
      if (extname === '.jpg' || extname === '.jpeg') {
        contentType = 'image/jpeg';
      } else if (extname === '.png') {
        contentType = 'image/png';
      } else if (extname === '.gif') {
        contentType = 'image/gif';
      }
  
      // Set the appropriate content type header
      res.set('Content-Type', contentType);
  
      // Set the Content-Disposition header to trigger a download with the correct filename and extension
      res.set('Content-Disposition', `attachment; filename="${imageName}"`);
  
      // Send the image data as the response
      res.send(imageBuffer);
  
    } catch (error) {
      console.error('Error retrieving image:', error);
      res.status(500).json({ message: 'Error retrieving image' });
    }
  });
        
    // Preferences Endpoint
    //POST
    app.post("/Preferences",async(req ,res) => {
        const NewPreference = new Preference();
        const PrefrencesBody = req.body.PrefBody;
        NewPreference.body = PrefrencesBody;
       await NewPreference.save();
       
        res.json(NewPreference)
    });
    //GET
app.get("/Preferences",async(req,res) => {
    const preferences2 = await Preference.find();
    console.log("Here is The Preferences",preferences2);
    res.json(preferences2);
});
//Check box(allergies) API ENDPOINT
// Route to handle POST request with checkbox data
app.post('/submit-checkbox', async (req, res) => {
  try {
    const { name, isChecked } = req.body;

    if (!name || typeof isChecked !== 'boolean') {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const newCheckbox = new Checkbox({ name, isChecked });

    await newCheckbox.save();

    res.status(200).json({ message: 'Checkbox data saved successfully' });
  } catch (err) {
    console.error('Error while saving checkbox:', err);
    res.status(500).json({ error: 'Failed to save data', details: err.message });
  }
});
// GET request to fetch all checkboxes
app.get('/get-checkboxes', async (req, res) => {
  try {
    // Fetch all checkbox documents from the database
    const checkboxes = await Checkbox.find(); // This will return an array of all checkbox entries

   
    res.status(200).json({ checkboxes });
  } catch (err) {
    console.error('Error while fetching checkboxes:', err);
    res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  }
});
//Recipe API ENDPOINT
app.post('/add-ai-recipe', async (req, res) => {
  try {
    
    const { name, ingredients, instructions, preparationTime, servings } = req.body;

    if (!name || !ingredients || !instructions || !preparationTime || !servings) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new Recipe instance with the AI-generated data
    const newRecipe = new Recipe({
      name,
      ingredients,
      instructions,
      preparationTime,
      servings,
    });

    // Save the recipe to the database
    await newRecipe.save();
    res.status(200).json({ message: 'AI-generated recipe added successfully', recipe: newRecipe });
  } catch (err) {
    console.error('Error adding recipe:', err);
    res.status(500).json({ error: 'Failed to add recipe', details: err.message });
  }
});

// GET endpoint to fetch all recipes
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ recipes });
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ error: 'Failed to fetch recipes', details: err.message });
  }
});
// Start the Express server

});
app.listen("3000",() =>{
    console.log("hii")
});