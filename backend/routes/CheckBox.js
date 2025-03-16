import express from "express";
const router = express.Router();
import Checkbox from "../models/CheckBox-Allergies.js";
import User from "../models/users.js";
router.post('/submit-checkbox', async (req, res) => {
    try {
      const { name, isChecked, userId } = req.body;
        // ❌ Check if userId is missing
              if (!userId) {
                  return res.status(400).json({ error: "User ID is required" });
              }
      
              // ✅ Verify that the user exists
              const user = await User.findById(userId);
              if (!user) {
                  return res.status(404).json({ error: "User not found" });
              }
  
      if (!name || typeof isChecked !== 'boolean') {
        return res.status(400).json({ error: 'Invalid input data' });
      }
  
      const newCheckbox = new Checkbox({ name, isChecked ,owner : userId});
  
      await newCheckbox.save();
  
      res.status(200).json({ message: 'Checkbox data saved successfully' });
    } catch (err) {
      console.error('Error while saving checkbox:', err);
      res.status(500).json({ error: 'Failed to save data', details: err.message });
    }
  });
  // GET request to fetch all checkboxes
  router.get('/get-checkboxes', async (req, res) => {
    try {
      // Fetch all checkbox documents from the database
      const checkboxes = await Checkbox.find().populate("owner","name"); // This will return an array of all checkbox entries
  
     
      res.status(200).json({ checkboxes });
    } catch (err) {
      console.error('Error while fetching checkboxes:', err);
      res.status(500).json({ error: 'Failed to fetch data', details: err.message });
    }
  });
  export default router;