const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'thisisjwtsecret';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send('Forbidden');
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).send('Unauthorized');
    }
};

module.exports = authenticateJWT;
