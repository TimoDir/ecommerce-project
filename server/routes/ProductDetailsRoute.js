const ProductsDetailsRouter = require('express').Router();
const {
    getAllProductDetail, 
    deleteProductDetail
  } =  require('../controllers/ProductDetailsController');


// product_details manipulation
ProductsDetailsRouter.get('/', getAllProductDetail);
ProductsDetailsRouter.delete('/:id', deleteProductDetail);

module.exports = ProductsDetailsRouter;