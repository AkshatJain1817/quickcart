const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

//here i created a dummy user there is only user login functionality
//in real world application we will have a database and user model to handle user login and registration
//this is just a dummy user for testing purposes

const DUMMY_USER = {
    id: '123',
    username: 'testuser',
    email: 'testuser@gmail.com',
    password: 'password123',
}

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email !== DUMMY_USER.email || password !== DUMMY_USER.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(DUMMY_USER, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
        token,
        user: {
            id: DUMMY_USER.id,
            name: DUMMY_USER.name,
            email: DUMMY_USER.email,
            username: DUMMY_USER.username
        }
    })

})

module.exports = router;