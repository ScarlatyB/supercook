
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