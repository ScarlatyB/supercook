import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcrypt";
import User from "../models/users.js";

const app = express();
app.use(cors());
app.use(express.json()); 

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user; // Attach user to request object
        next();
    });
};

// 🔹 **Register User**
router.post("/users", async (req, res) => {
    try {
        const { name, password } = req.body;

        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving user to the database" });
    }
});

// 🔹 **Login & Generate JWT Token**
router.post("/login", async (req, res) => {
  try {
      const { name, password } = req.body;
      console.log("Login attempt for:", name);

      const user = await User.findOne({ name });
      if (!user) {
          console.log("User not found");
          return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          console.log("Invalid password");
          return res.status(400).json({ message: "Invalid credentials" });
      }

      // Ensure JWT_SECRET is defined
      if (!process.env.JWT_SECRET) {
          console.error("JWT_SECRET is not set in .env file");
          return res.status(500).json({ message: "Internal server error" });
      }

      // Generate JWT token
      const token = jwt.sign(
          { id: user._id, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
      );

      console.log("Generated Token:", token); // Debug log
      res.json({ message: "Login successful!", token });

  } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Error during login" });
  }
});


router.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});


router.get("/users", authenticateToken, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users" });
    }
});

export default router;
