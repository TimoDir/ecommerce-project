const Pool = require('pg').Pool;
require("dotenv").config();

const GITHUB_DB_PASSWORD = process.env.GITHUB_DB_PASSWORD;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Ecommerces',
  password: GITHUB_DB_PASSWORD,
  port: 5432,
});