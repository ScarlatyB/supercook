const openai = require('../utils/openaiClient');

async function generateRecipe(req, res) {
    const { ingredients, preferences } = req.body;
    const prompt = `Generate a recipe using the following ingredients: ${ingredients}. Dietary preferences: ${preferences}.`;

    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
            max_tokens: 500,
        });
        const recipe = response.data.choices[0].text.trim();
        res.json({ recipe });
    } catch (error) {
        console.error('Error generating recipe:', error.message);
        res.status(500).json({ error: 'Failed to generate recipe' });
    }
}

module.exports = { generateRecipe };
