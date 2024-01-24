const ProductsRouter = require('express').Router();
const {
    getAllProducts, 
    getProductById, 
    addProduct, 
    deleteProductAndProductDetails, 
    addStock, 
    addProductDetail, 
    getProductDetailByProduct,
} =  require('../controllers/ProductsController');

// products manipulation
ProductsRouter.get('/', getAllProducts);
ProductsRouter.get('/:id', getProductById);
ProductsRouter.post('/addProduct', addProduct);
ProductsRouter.delete('/:id/deleteProduct', deleteProductAndProductDetails);

// Handle both POST and PUT requests for adding stock
ProductsRouter.route('/:id/addStock')
.post(addProductDetail)
.put(addStock);

// product_details manipulation by products
ProductsRouter.get('/:id/getProductDetailByProduct', getProductDetailByProduct);

module.exports = ProductsRouter;
