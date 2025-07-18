const jwt = require('jsonwebtoken');

function protect(req,res,next){
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - no token' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch{
        return res.status(401).json({ message: 'Token is invalid or expired' });
    }
}

module.exports = protect;