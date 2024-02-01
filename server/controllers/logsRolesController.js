const bcrypt = require("bcrypt");
const {pool, getUser, getUserRoles} = require("../Model/querie");
const jwt = require('jsonwebtoken');
const { SERVER } = require('../../config');

// Helper Function
const tokenCreation = async (token_secret, user, roles, time) =>{
    const token = jwt.sign(
        {
            "userInfo":{
                'email': user.email,
                'roles': roles
            }
        }, 
        token_secret,
        {expiresIn: time},
    );
    return token;
};

const verifyToken = async(refreshToken, refresh_token_secret, token_secret, user, roles, response) =>{
    jwt.verify(
        refreshToken,
        refresh_token_secret,
        async (err, decoded)=>{
            //console.log(decoded, roles)
            if(err || user.email !== decoded.userInfo.email) return response.sendStatus(403); // Forbiden
            const accessToken = await tokenCreation(token_secret, decoded, roles, "1000s");
            response.json({accessToken});
        }
    );
};

const foundUser = async(propertie, value) =>{
    const allUser = await getUser();
    const foundUser = allUser.rows.find(user => user[propertie] === value);
    return foundUser;
}


// CONTROLLERS

const userLogIn = async(request, response) =>{
    const {email, password} = request.body;
    console.log(email, password)
    // Checking the body
    if(!email || !password) return response.sendStatus(400).json({"message": "username and password are required"});
    // Checking if the email is in our database and found the user who have it
    const user = await foundUser("email", email);
    if(!user) return response.sendStatus(401); // Unauthorize 
    // Checking the password validity
    const match = await bcrypt.compare(password, user.password);
    if(match){
        // Getting the roles of this user
        const userRoles = await getUserRoles(user.id);
        // here creation of the JWT
        const accessToken = await tokenCreation(SERVER.ACCESS_TOKEN_SECRET, user, userRoles,'1000s');
        const refreshToken = await tokenCreation(SERVER.REFRESH_TOKEN_SECRET, user, [], '1d');
        // saving refreshToken in the current user
        pool.query("UPDATE users SET refreshtoken = $1 WHERE email = $2", [refreshToken, user.email]);
        response.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
        .cookie('id', user.id, {httpOnly: true, maxAge: 24*60*60*1000});
        return response.json({accessToken});
    } else response.sendStatus(401);
};

const userRefresh = async (request, response) =>{
    const cookie = request.cookies;
    if(!cookie?.jwt) return response.sendStatus(401);
    const refreshToken = cookie.jwt;
    const user = await foundUser("refreshtoken", refreshToken);
    if(!user) return response.sendStatus(403); // Forbidden 
    const refresh_token_secret = SERVER.REFRESH_TOKEN_SECRET
    const token_secret = SERVER.ACCESS_TOKEN_SECRET;
    const userRoles = await getUserRoles(user.id)
    await verifyToken(refreshToken, refresh_token_secret, token_secret, user, userRoles, response);
};

const userLogOut = async(request, response) =>{
    const cookie = request.cookies;
    if(!cookie?.jwt) return response.sendStatus(204);
    const refreshToken = cookie.jwt;
    //console.log(refreshToken);
    const user = await foundUser("refreshtoken", refreshToken);
    //console.log(user);
    // is refreshtoken inside our DB?
    if(!user){
        console.log("user not found")
        response.clearCookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
        .clearCookie('id', user.id, {httpOnly: true, maxAge: 24*60*60*1000});
        return response.sendStatus(401);
    };
    //Delete refreshtoken
    pool.query("UPDATE users SET refreshtoken = $1 WHERE email = $2", ['', user.email]);
    console.log(`user is found`)
    response.clearCookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
    .clearCookie('id', user.id, {httpOnly: true, maxAge: 24*60*60*1000});
    response.sendStatus(204);
};

const addRole = async (request, response) =>{
    const {email} = request.body;
    const allUser = await getUser();
    const user = await allUser.rows.find(user => user["email"] === email);
    pool.query('INSERT INTO roles_user (id_user, role) VALUES ($1, $2) RETURNING *', 
        [user.id, "Client"], 
        (error, results) => {
            if (error) throw error;
            response.status(201).send(`User added with ID: ${user.id}\nAnd role of ${results.rows[0].role}`);
    });
};

const setRole = async (request, response) =>{
    const id = parseInt(request.params.id);
    const {role} = request.body;
    //Checking if the role is valid
    const validRoles = ["Client", "Admin", "Staff"];
    if(!validRoles.includes(role)) return response.sendStatus(400);
    //Checking if th role is already apply to the user
    const userRoles = await getUserRoles(id);
    if(userRoles.includes(role)) return response.sendStatus(200);
    //Give the new role to the user
    pool.query('INSERT INTO roles_user (id_user, role) VALUES ($1, $2) RETURNING *', 
        [id, role], 
        (error, results) => {
            if (error) throw error;
            response.status(201).send(`User id: ${id} have role of ${userRoles + ' and ' + role}`);
    });
};

const removeRole = async (request, response) =>{
    const id = parseInt(request.params.id);
    const {role} = request.body;
    //Checking if the role is valid
    const validRoles = ["Client", "Admin", "Staff"];
    if(!validRoles.includes(role)) return response.sendStatus(400);
    //Checking if th role is apply to the user
    const userRoles = await getUserRoles(id);
    if(!userRoles.includes(role)) return response.sendStatus(200);
    //Give the new role to the user
    pool.query('DELETE FROM roles_user WHERE id_user = $1 AND role = $2', 
        [id, role], 
        (error, results) => {
            if (error) throw error;
            response.status(201).send(`Removed role ${role} of user id: ${id}.`);
    });
};

module.exports = {
    userLogIn,
    userRefresh,
    userLogOut,
    addRole,
    setRole,
    removeRole
};