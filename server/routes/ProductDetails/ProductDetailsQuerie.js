const {pool} = require("../../db/querie");

const getAllProductDetail = (request, response) =>{
    pool.query('SELECT * FROM product_details ORDER BY id_product ASC', (error, results) => {
        if(error){
            throw error;
        };
        response.status(200).json(results.rows)
    });
};

const deleteProductDetail = (request, response) =>{
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM product_details WHERE id_item = ($1)', 
        [id], 
        (error, results) => {
            if (error) {
                throw error
            };
            response.status(201).send(`product_details for Product ID:${id} deleted id_item: ${results.rows[0].id_item}`);
    });
};

module.exports = {
    getAllProductDetail, 
    deleteProductDetail
};