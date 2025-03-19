const express = require('express');
const { generateRecipe } = require('../controllers/recipeController');

const router = express.Router();

router.post('/', generateRecipe);

module.exports = router;

// .env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
