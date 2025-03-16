import mongoose from "mongoose";
const imageSchema = new mongoose.Schema({
  name: String,
  imageData: String, // Store Base64 image data
});

const Image = mongoose.model('Image', imageSchema);
export default Image;