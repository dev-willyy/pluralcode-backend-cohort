const express = require('express');
const { getSingleUserCart, addToCartController } = require('../controllers/cart.js');
const { ordinaryUserVerificationMiddleware } = require('../middlewares/verificationMiddleware.js');

const router = new express.Router();

router.get('/', ordinaryUserVerificationMiddleware, getSingleUserCart);
router.post('/add', ordinaryUserVerificationMiddleware, addToCartController);

module.exports = { cartRouter: router };
