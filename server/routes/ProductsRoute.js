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
const {verifyJWT} = require('../../middlewares/verifyJWT');

// products manipulation
ProductsRouter.get('/', verifyJWT, getAllProducts);
ProductsRouter.get('/:id', getProductById);
ProductsRouter.post('/addProduct', addProduct);
ProductsRouter.delete('/:id/deleteProduct', verifyJWT, deleteProductAndProductDetails);

// Handle both POST and PUT requests for adding stock
ProductsRouter.route('/:id/addStock')
.post(verifyJWT, addProductDetail)
.put(verifyJWT, addStock);

// product_details manipulation by products
ProductsRouter.get('/:id/getProductDetailByProduct', getProductDetailByProduct);

module.exports = ProductsRouter;
