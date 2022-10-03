const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    // const authHeader = req.headers.authorization || req.headers.Authorization;
    const cookieJwt = req.cookies;
    // if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    // const token = authHeader.split(' ')[1];
    if(!cookieJwt.jwt) return res.sendStatus(401);
    jwt.verify(
        cookieJwt.jwt,
        "mySecret",
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.username;
            next();
        }
    );
}

module.exports = verifyJWT