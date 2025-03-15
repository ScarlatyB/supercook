import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ Failed to connect to MongoDB:', err));

// Initial route
app.get('/', (req, res) => {
res.send('Welcome to the backend! 🚀');
});

app.listen(PORT, () => { 
console.log(`Server running on port ${PORT}`);
});
