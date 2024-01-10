const Pool = require('pg').Pool;
const { DB } = require('../config');

const pool = new Pool({
  user: DB.PGUSER,
  host: DB.PGHOST,
  database: DB.PGDATABASE,
  password: DB.PGPASSWORD,
  port: DB.PGPORT
});

// Products

const getAllProducts = (request, response) =>{
    pool.query("SELECT * FROM products ORDER BY name ASC", (error, results) => {
        if(error){
            throw error;
        };
        response.status(200).json(results.rows)
    });
};

const getProductById = (request, response) =>{
    const id = parseInt(request.params.id);
    pool.query(`SELECT * FROM products WHERE id =${id}`, (error, results) => {
        if(error){
            throw error;
        };
        response.status(200).json(results.rows)
    });
};

const addProduct = (request, response) =>{
    const {category, name, price, color} = request.body;

    pool.query('INSERT INTO products (category, name, price, color) VALUES ($1, $2, $3, $4) RETURNING *', 
        [category, name, price, color], 
        (error, results) => {
            if (error) {
                throw error
            };
            response.status(201).send(`Product added with ID: ${results.rows[0].id}`);
    })
};

const deleteProduct = (request, response) =>{
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Product deleted with ID: ${id}`)
      });
};

const addStock = (request, response) =>{
    const id = parseInt(request.params.id);
    const { qty } = request.body
    pool.query('UPDATE products SET qty = qty + $1 WHERE id = $2', [qty, id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Product quantity ${qty} added ID: ${id}`)
      });
};

const addProductDetail = (request, response) =>{
    const id = parseInt(request.params.id);
    pool.query('INSERT INTO product_details (id_product) VALUES ($1) RETURNING *', 
        [id], 
        (error, results) => {
            if (error) {
                throw error
            };
            response.status(201).send(`Product_details for Product ID:${id} \nAdded with ID: ${results.rows[0].id_item}`);
    })
};

const getProductDetailByProduct = (request, response) =>{
    const id = parseInt(request.params.id);
    pool.query(`SELECT * FROM product_details WHERE id_product =${id}`, (error, results) => {
    if(error){
        throw error;
    };
    response.status(200).json(results.rows)
});
};


module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    deleteProduct,
    addStock,
    addProductDetail,
    getProductDetailByProduct
};