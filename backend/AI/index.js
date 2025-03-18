// Main file for AI logic
require('dotenv').config({ path: './backend/AI/credentials/.env' });
console.log("Credenciais: ", process.env.GOOGLE_APPLICATION_CREDENTIALS);

const fs = require("fs");

const filePath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

fs.access(filePath, fs.constants.F_OK, (err) => {
  console.log(err ? "Arquivo não encontrado!" : "Arquivo encontrado!");
});

const detectImage = require('./processors/vision');
const generateRecipe = require('./utils/recipeGenerator');

async function main(imagePath) {
  try {
    const ingredients = await detectImage(imagePath);
    console.log('Ingredientes detectados:', ingredients);

    const recipe = generateRecipe(ingredients);
    console.log('Receita sugerida:', recipe);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Test image path
main('C:/Users/scarl/pessoal/area-de-trabalho/supercook/backend/cloudFiles/img_exemple.jpg');
