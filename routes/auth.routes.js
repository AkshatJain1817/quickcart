const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const DUMMY_USER = {
    id: '123',
    username: 'testuser',
    email: 'testuser@gmail.com'
}

router.post('/login', (req, res) => {
    const { email } = req.body;

    if (email !== DUMMY_USER.email) {
        return res.status(401).json({ message: 'Invalid email' });
    }

    const token = jwt.sign(DUMMY_USER, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
        token,
        user: {
            id: DUMMY_USER.id,
            name: DUMMY_USER.name,
            email: DUMMY_USER.email
        }
    })

})

module.exports = router;