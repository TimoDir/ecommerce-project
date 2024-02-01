const bcrypt = require("bcrypt");
const {pool, getUser} = require("../Model/querie");

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

const addUser = async (request, response, next) =>{
    const {full_name, email, password, sold} = request.body;
    try {
        // Encrypte the password
        const hashPswd = await bcrypt.hash(password, 10);
        pool.query('INSERT INTO users (full_name, email, password, sold) VALUES ($1, $2, $3, $4) RETURNING *', 
        [full_name, email, hashPswd, sold], 
        (error, results) => {
            if (error) throw error;
            next();
        });
    } catch (error) {
        response.status('500').json({"message": error.message});
    };
};

const deleteUser = (request, response) =>{
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM roles_user WHERE id_user = ($1)', [id]);
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
    });
};

module.exports = {
    getAllusers,
    getUserById,
    addUser,
    deleteUser,
    addSold,
    updateUser,
};