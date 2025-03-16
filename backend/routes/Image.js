import express from "express";
const router = express.Router();
import multer from "multer";
import path from'path';
import Image from "../models/Image.js";
import User from "../models/users.js";
// Set up multer storage configuration (where to store the uploaded file)
const storage = multer.memoryStorage(); // Use memory storage to keep the image in memory (you can also save it to disk)
const upload = multer({ storage: storage });

// API endpoint to upload and store image as Base64

router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    const { userId } = req.body; const file = req.file;
        // ❌ Check if userId is missing
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // ✅ Verify that the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
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
      owner: userId
    });

    await newImage.save();
    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});
         //GET
router.get('/get-image/:name', async (req, res) => {
    try {
      const imageName = req.params.name; // Extract image name from URL parameter
  
      const image = await Image.findOne({ name: imageName}); // Find the image by name in the database
  
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
      export default router;