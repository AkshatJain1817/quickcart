const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const cartMap = require('../memory/cart.memory');


//this is a dummy suggestion feature that suggests items based on the time of the day 
//if user logged in at 10 am it will suggest milk, bread, eggs, coffee, tea
//if user logged in at 2 pm it will suggest fruits, vegetables, snacks, juice
//if user logged in at 8 pm it will suggest maggi, biscuits, chips, ice cream, cola
//here we can add a ai  model to suggest items based on the user's previous purchases and preferences

function getSuggestions(userId) {
    const hour = new Date().getHours();
    const cart = cartMap.get(userId) || { items: [] };

    const previousItems = cart.items.map(item => item.name.toLowerCase());
    const suggestions = new Set();

    // here i m just trying to suggest basic items based on time of day they are hardcoded
    if (hour < 11) {
        suggestions.add('Milk').add('Bread').add('Eggs').add('Coffee').add('Tea');
    } else if (hour < 17) {
        suggestions.add('Fruits').add('Vegetables').add('Snacks').add('Juice').add('rice').add('dal')
    } else {
        suggestions.add('Maggi').add('Biscuits').add('Chips').add('Ice Cream').add('cola');
    }

    // Filter out suggestions that are already in the cart
    const finalSuggestions = [...suggestions].filter(item => !previousItems.includes(item.toLowerCase()));

    return finalSuggestions;
}

// api to get suggestions based on time of day and cart items
router.get('/getSuggestions', protect, (req, res) => {
    const userId = req.user.id;
    const suggestions = getSuggestions(userId);

    res.json({
        timeBased: new Date().toLocaleTimeString(),
        suggestions
    });
})

module.exports = router;