const Pool = require('pg').Pool;
const { DB } = require('../../config');

const pool = new Pool({
  user: DB.PGUSER,
  host: DB.PGHOST,
  database: DB.PGDATABASE,
  password: DB.PGPASSWORD,
  port: DB.PGPORT
});

const getUser = () =>{ 
  const allUser = pool.query("SELECT * FROM users");
  return allUser;
};
const getUserRoles = async(userId) =>{
  const userRoles = await pool.query("SELECT role FROM roles_user WHERE id_user = $1", [userId]);
  const userRolesArray = [];
  userRoles.rows.forEach(row => userRolesArray.push(row.role));
  return userRolesArray;
};
  

module.exports = {
    pool,
    getUser,
    getUserRoles
};