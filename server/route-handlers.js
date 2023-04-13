const jwt = require('jsonwebtoken')

function isLoggedIn(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) { return res.sendStatus(401); }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(401);
        }
        //defnie which user is this after token authentication
        req.user = user;
        next();
    });
}
module.exports = isLoggedIn