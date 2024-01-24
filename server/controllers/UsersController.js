const bcrypt = require("bcrypt");
const {pool} = require("../Model/querie");
/*const allUsers = await pool.query("SELECT * FROM users", async (error, results) =>{
    if(error) throw error;
    return results.rows
});*/

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

    //const duplicat = allUsers.find(user => user.full_name === full_name || user.email === email);
    //if(duplicat) return response.sendStatus('409'); //Conflict

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

const userLogIn = (request, response) =>{
    const {email, password} = request.body;
    pool.query(`SELECT * FROM users WHERE email = $1`, [email], async (error, results) => {
        if (error) throw error;
        const match = await bcrypt.compare(password, results.rows[0].password);
        if(match){
            // here creation of the JWT
            response.json({'success': `user: ${results.rows[0].full_name} is logged in.`})
        } else response.sendStatus(401);
    })
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
            response.status(201).send(`User id ${results.rows[0].id } updated`);
    })
};

module.exports = {
    getAllusers,
    getUserById,
    addUser,
    userLogIn,
    deleteUser,
    addSold
};