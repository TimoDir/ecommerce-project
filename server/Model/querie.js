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
const getUserRole = async(userId) =>{
  pool.query("SELECT * FROM users");
}
  

module.exports = {
    pool,
    getUser
};