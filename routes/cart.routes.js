const express = require('express');
const router = express.Router();
const cartMap = require('../memory/cart.memory');
const protect = require('../middleware/auth.middleware');

function getUserCart(userId) {
    let cart = cartMap.get(userId);
    if (!cart) {
        cart = { userId, items: [], updatedAt: new Date() };
        cartMap.set(userId, cart);
    }
    return cart;
}

// Get cart for the authenticated user
router.get('/getUserCart', protect, (req, res) => {
    const cart = getUserCart(req.user.id);
    res.json({ cart: cart.items })
})

// Add item to cart
router.post('/addToCart', protect, (req, res) => {
    const { name, quantity = 1 } = req.body;
    if (!name || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid item data' });
    }

    const cart = getUserCart(req.user.id);

    const existingItem = cart.items.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ name, quantity });
    }

    cart.updatedAt = new Date();
    res.json({ message: 'Item added to cart', cart: cart.items });
})

// Remove item from cart
router.delete('/removeFromCart/:itemName', protect, (req, res) => {
    const itemName = req.params.itemName;
    const cart = getUserCart(req.user.id);

    const originalLength = cart.items.length;
    cart.items = cart.items.filter(item => item.name !== itemName);

    if (cart.items.length === originalLength) {
        return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.updatedAt = new Date();
    res.json({ message: 'Item removed', cart: cart.items });
})

//simulate checkout
router.post('/checkout', protect, (req, res) => {
    const userId = req.user.id;

    const cart = getUserCart(userId);
    const cartItems = cart.items;

    if (cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
    }

    // here this will clear the cart after checkout
    // in a real application, you would process the payment and order here
    cart.items = [];
    cart.updatedAt = new Date();

    res.json({
        message: 'Checkout successful!',
        purchasedItems: cartItems
    });
})

module.exports = router;