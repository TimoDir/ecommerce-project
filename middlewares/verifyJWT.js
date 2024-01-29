const jwt = require('jsonwebtoken');
const {SERVER} = require('../config');

const verifyJWT = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        SERVER.ACCESS_TOKEN_SECRET,
        (err, decoded) =>{
            if(err) return res.sendStatus(403); // invalid token
            req.email = decoded.email;
            next();
        }
    );
};

module.exports = {verifyJWT};
