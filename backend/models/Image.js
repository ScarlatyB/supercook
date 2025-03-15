import mongoose from "mongoose";
const imageSchema = new mongoose.Schema({
  name: String,
  imageData: String, // Store Base64 image data
      owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // 🔗 Reference to User
});

const Image = mongoose.model('Image', imageSchema);
export default Image;