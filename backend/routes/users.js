import express from "express";
const router = express.Router();
import User from "../models/users.js"
import bcrypt from "bcrypt";
router.post("/users", async (req, res) => {
    try {
      const { name, password } = req.body;
  
      // Generate a salt and hash the password with bcrypt
      const salt = await bcrypt.genSalt(10); // 10 salt rounds
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user with the hashed password
      const user = new User({
        name: name,
        password: hashedPassword
      });
  
      // Save the user to the database
      await user.save();
  
      res.status(201).send("User created successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error saving user to the database");
    }
  });
  // POST route to handle login and verify the password
router.post("/login", async (req, res) => {
try {
  const { name, password } = req.body;

  // Find the user by name
  const user = await User.findOne({ name });

  if (!user) {
    return res.status(400).send("User not found");
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    res.send("Login successful!");
  } else {
    res.status(400).send("Invalid credentials");
  }
} catch (error) {
  console.error(error);
  res.status(500).send("Error during login");
}
});

  // Get Login Info
  router.get("/users", async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the database
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching users");
    }
  });
  export default router;
