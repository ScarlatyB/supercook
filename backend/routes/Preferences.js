import express from "express";
const router = express.Router();
import Preference from "../models/Preferences.js";
import User from "../models/users.js";
// ✅ Create a new preference (linked to a user)
router.post("/preferences", async (req, res) => {
    try {
        const { PrefBody, userId } = req.body;

        // ❌ Check if userId is missing
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // ✅ Verify that the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // ✅ Create the preference linked to the user
        const newPreference = new Preference({
            body: PrefBody,
            owner: userId, // 🔗 Reference to User
        });

        await newPreference.save();
        res.status(201).json(newPreference);
    } catch (error) {
        console.error("Error saving preference:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Get preferences with user details (Using `populate`)
router.get("/preferences", async (req, res) => {
    try {
        const preferences = await Preference.find().populate("owner", "name "); // 🔗 Fetch user data
        res.status(200).json(preferences);
    } catch (error) {
        console.error("Error retrieving preferences:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;