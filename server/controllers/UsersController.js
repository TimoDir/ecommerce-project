const bcrypt = require("bcrypt");
const {pool, getUser} = require("../Model/querie");
const jwt = require('jsonwebtoken');
const { SERVER } = require('../../config');


// *** Users *** //

const getAllusers = (request, response) =>{
    pool.query("SELECT * FROM users ORDER BY full_name ASC", (error, results) => {
        if(error) throw error;
        response.status(200).json(results.rows);
    });
};

const getUserById = (request, response) =>{
    const id = parseInt(request.params.id);
    pool.query(`SELECT * FROM users WHERE id = $1`, [id], (error, results) => {
        if(error) throw error;
        response.status(200).json(results.rows);
    });
};

const addUser = async (request, response) =>{
    const {full_name, email, password, sold} = request.body;
    try {
        // Encrypte the password
        const hashPswd = await bcrypt.hash(password, 10);
        pool.query('INSERT INTO users (full_name, email, password, sold) VALUES ($1, $2, $3, $4) RETURNING *', 
        [full_name, email, hashPswd, sold], 
        (error, results) => {
            if (error) throw error;
            response.status(201).send(`User added with ID: ${results.rows[0].id}`);
        })
    } catch (error) {
        response.status('500').json({"message": error.message});
    };
};

const deleteUser = (request, response) =>{
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) throw error;
        response.status(201).send(`User ID: ${id} deleted`);
      });
};

const addSold = (request, response) =>{
    const id = parseInt(request.params.id);
    const { soldToAdd } = request.body;
    pool.query('UPDATE users SET sold = sold + $1 WHERE id = $2', [soldToAdd, id], (error, results) => {
        if (error) throw error;
        response.status(200).send(`${soldToAdd}Kc added to user ID: ${id}`);
      });
};

const updateUser = (request, response) =>{
    const {full_name, email, sold} = request.body;
    pool.query(`UPDATE users (full_name, email, password, sold) VALUES ($1, $2, $3, $4) RETURNING *`, 
        [full_name, email, password, sold], 
        (error, results) => {
            if (error) throw error;
            response.sendStatus(201).send(`User id ${results.rows[0].id } updated`);
    })
};

// *** LOGIN AND ROLES *** //

// TOOLS
const tokenCreation = async (token_secret, email, time) =>{
    const token = jwt.sign(
        {'email': email}, 
        token_secret,
        {expiresIn: time},
    );
    return token;
};

const verifyToken = async(refreshToken, refresh_token_secret, token_secret, email, response) =>{
    jwt.verify(
        refreshToken,
        refresh_token_secret,
        async (err, decoded)=>{
            if(err || email !== decoded.email) return response.sendStatus(403); // Forbiden
            const accessToken = await tokenCreation(token_secret, decoded.email, "1000s");
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
    if(!email || !password) return response.sendStatus(400).json({"message": "username and password are required"})
    const user = await foundUser("email", email);
    //console.log(foundUser.email)
    if(!user) return response.sendStatus(401); // Unauthorize 
    const match = await bcrypt.compare(password, user.password);
    if(match){
        // here creation of the JWT
        const accessToken = await tokenCreation(SERVER.ACCESS_TOKEN_SECRET, user.email,'1000s');
        const refreshToken = await tokenCreation(SERVER.REFRESH_TOKEN_SECRET, user.email,'1d');
        console.log(refreshToken);
        // saving refreshToken in the current user
        pool.query("UPDATE users SET refreshtoken = $1 WHERE email = $2", [refreshToken, user.email]);
        response.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000});
        response.json({accessToken});
    } else response.sendStatus(401);
};

const userRefresh = async (request, response) =>{
    const cookie = request.cookies;
    if(!cookie?.jwt) return response.sendStatus(401);
    const refreshToken = cookie.jwt;
    //console.log(refreshToken);
    const user = await foundUser("refreshtoken", refreshToken);
    //console.log(user);
    if(!user) return response.sendStatus(403); // Forbidden 
    await verifyToken(refreshToken, SERVER.REFRESH_TOKEN_SECRET, SERVER.ACCESS_TOKEN_SECRET, user.email, response);
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
        response.clearCookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000});
        return response.sendStatus(401);
    };
    //Delete refreshtoken
    console.log(`user is found`)
    pool.query("UPDATE users SET refreshtoken = $1 WHERE email = $2", ['', user.email]);
    response.clearCookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000});
    response.sendStatus(204);
};

module.exports = {
    getAllusers,
    getUserById,
    addUser,
    deleteUser,
    addSold,
    updateUser,
    userLogIn,
    userRefresh,
    userLogOut
};