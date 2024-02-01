const jwt = require('jsonwebtoken');
const {SERVER} = require('../config');

const verifyJWT = (req, res, next) =>{
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        SERVER.ACCESS_TOKEN_SECRET,
        (err, decoded) =>{
            if(err) return res.sendStatus(403); // invalid token
            req.email = decoded.userInfo.email;
            req.roles = decoded.userInfo.roles;
            next();
        }
    );
};

module.exports = {verifyJWT};
