
import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import bodyParser from "body-parser";
const app = express();
app.use(express.json());
app.use(bodyParser.json());
import path from 'path';
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
  //API END POINT Preference
app.use("/api", userRoutes);
app.use("/api", preferenceRoutes); 
  //Image End poit
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
/***************************
 * Backend Dev #4 - Image Processing
 ***************************/

const express = require('express');
const axios = require('axios'); // To be used later to call Clarifai
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Function to convert image URL to Base64
const getBase64FromUrl = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
    return imageBase64;
  } catch (error) {
    throw new Error('Error converting image URL to Base64');
  }
};

// Function to send image to Clarifai for recognition
const recognizeImage = async (imageBase64) => {
  try {
    // Your Clarifai API Key
    const clarifaiAPIKey = process.env.CLARIFAI_API_KEY;  // Store API key securely in .env file

    // Send a POST request to Clarifai API
    const response = await axios.post(
      'https://api.clarifai.com/v2/models/food-item-recognition/outputs',
      {
        inputs: [
          {
            data: {
              image: {
                base64: imageBase64,  // Send the Base64 string as image data
              }
            }
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${clarifaiAPIKey}`,
          'Content-Type': 'application/json',
        }
      }
    );

    // Output the response data which includes the identified items
    console.log(response.data);

    // Return the recognized ingredients
    return response.data;

  } catch (error) {
    console.error('Error recognizing image:', error.message);
    throw error;
  }
};

// Route to receive image URL from Backend Dev #1
app.post('/process-image', async (req, res) => {
  try {
    const { imageUrl } = req.body; // Expecting Backend Dev #1 to send an image URL

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    // Step 1: Convert the image URL to Base64
    const imageBase64 = await getBase64FromUrl(imageUrl);

    // Step 2: Send the Base64 image to AI for recognition
    const aiResponse = await recognizeImage(imageBase64);

    // Step 3: Return the AI response (recognized ingredients, etc.)
    res.json(aiResponse);

  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend Dev #4 server running on http://localhost:${port}`);
});
