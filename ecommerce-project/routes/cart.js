const express = require('express');
const { getCartController, addToCartController, deleteProductFromCartController } = require('../controllers/cart.js');
const { ordinaryUserVerificationMiddleware } = require('../middlewares/verificationMiddleware.js');

const router = new express.Router();

router.get('/', ordinaryUserVerificationMiddleware, getCartController);
router.post('/add-to-cart', ordinaryUserVerificationMiddleware, addToCartController);
router.delete('/products/:productId', ordinaryUserVerificationMiddleware, deleteProductFromCartController);

module.exports = { cartRouter: router };
