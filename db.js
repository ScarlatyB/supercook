const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb+srv://supercook:supercook@cluster0.hbnvm.mongodb.net/");
app.listen("3000",() =>{
    console.log("hii")
})