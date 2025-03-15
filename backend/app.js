
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
import User from "./models/users.js";
import bcrypt from "bcrypt";
import userRoutes from "./routes/users.js";
import preferenceRoutes from "./routes/Preferences.js";
import checkBoxRoutes from "./routes/CheckBox.js";
import RecipeRout from "./routes/Recipes.js";
import imageRout from "./routes/Image.js";
import { get } from "http";

mongoose.connect("mongodb+srv://supercook:supercook@cluster0.hbnvm.mongodb.net/Informations").then(() => {
    console.log("connected");
app.use("/api", userRoutes);
app.use("/api", preferenceRoutes);
    
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
  app.use("/api", imageRout);
  //Check box(allergies) API ENDPOINT
// Route to handle POST request with checkbox data
app.use("/api/checkboxes", checkBoxRoutes); 
//Recipe API ENDPOINT
app.use("/api/recipes", RecipeRout);
// Start the Express server

});
app.listen("3000",() =>{
    console.log("hii")
});