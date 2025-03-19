const express = require('express');
const recipeRoute = require('./routes/recipeRoute');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/recipes', recipeRoute);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
