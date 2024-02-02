const Pool = require('pg').Pool;
const { DB } = require('../../config');

const pool = new Pool({
  user: DB.PGUSER,
  host: DB.PGHOST,
  database: DB.PGDATABASE,
  password: DB.PGPASSWORD,
  port: DB.PGPORT
});

// users Table
const getUser = async() =>{ 
  const allUser = await pool.query("SELECT * FROM users");
  return allUser;
};

const getUserById = async(id_user) =>{ 
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [id_user]);
  return user.rows[0];
};

// role Table
const getUserRoles = async(id_user) =>{
  const userRoles = await pool.query("SELECT role FROM roles_user WHERE id_user = $1", [id_user]);
  const userRolesArray = [];
  userRoles.rows.forEach(row => userRolesArray.push(row.role));
  return userRolesArray;
};

// product_details Table
const getOneProductDetailAviable = async(id_product) =>{
  const productDetail = await pool.query("SELECT * FROM product_details WHERE id_product = $1", [id_product]);
  const prodDetailAviable = productDetail.rows.filter(row => row.aviability === true);
  return prodDetailAviable[0];
};

const getProductDetailFromIdItem = async(id_item) =>{
  const productDetail = await pool.query("SELECT * FROM product_details WHERE id_item = $1", [id_item]);
  return productDetail.rows[0];
};

// products Table
const getProductFromId = async(id_product) =>{
  const product = await pool.query("SELECT * FROM products WHERE id = $1", [id_product]);
  return product.rows[0];
};

// Cart Table
const getCartProductDetailPrice = async(id_user) =>{
  const userCart = await pool.query(
    `WITH cartAndDetail AS(
      SELECT carts.id_item, product_details.id_product 
      FROM carts 
      JOIN product_details
        ON carts.id_item = product_details.id_item
      WHERE carts.id_user = $1
    )
    SELECT 
    cartAndDetail.id_item, cartAndDetail.id_product, products.price
    FROM cartAndDetail
    JOIN products
      ON cartAndDetail.id_product = products.id
    `
    , [id_user]
    );
  return userCart.rows;
};

  

module.exports = {
    pool,
    getUser,
    getUserById,
    getUserRoles,
    getOneProductDetailAviable,
    getProductDetailFromIdItem,
    getProductFromId,
    getCartProductDetailPrice,
};