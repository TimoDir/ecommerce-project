const CartRouter = require('express').Router();
const {
    addToUserCart,
    userRemoveProductCart,
    orderCart
} =  require('../controllers/cartController');
const {verifyJWT} = require('../../middlewares/verifyJWT');

CartRouter.route('')
.post(verifyJWT, addToUserCart)
.delete(verifyJWT, userRemoveProductCart);
CartRouter.post('/order', verifyJWT, orderCart);

module.exports = CartRouter;