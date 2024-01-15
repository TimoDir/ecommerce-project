const {pool} = require("../../db/querie");

// *** Users *** //

const getAllusers = (request, response) =>{
    pool.query("SELECT * FROM users ORDER BY full_name ASC", (error, results) => {
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

const getUserById = (request, response) =>{
    const id = parseInt(request.params.id);
    pool.query(`SELECT * FROM users WHERE id =${id}`, (error, results) => {
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

const addUser = (request, response) =>{
    const {full_name, email, password, sold} = request.body;

    pool.query('INSERT INTO users (full_name, email, password, sold) VALUES ($1, $2, $3, $4) RETURNING *', 
        [full_name, email, password, sold], 
        (error, results) => {
            if (error) {
                throw error
            };
            response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    })
};

const deleteUsers = (request, response) =>{
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`User ID: ${id} deleted`);
      });
};

const addSold = (request, response) =>{
    const id = parseInt(request.params.id);
    const { soldToAdd } = request.body;
    pool.query('UPDATE users SET sold = sold + $1 WHERE id = $2', [soldToAdd, id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`${soldToAdd}Kc added to user ID: ${id}`);
      });
};

module.exports = {
    getAllusers,
    getUserById,
    addUser,
    deleteUsers,
    addSold
};